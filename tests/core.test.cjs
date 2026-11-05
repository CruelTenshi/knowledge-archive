const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const vm = require("node:vm");
const C = require("../core.js");
const { createStore } = require("../document-store.js");
const root = path.resolve(__dirname, "..");
const fixture = Array.from({ length: 20 }, (_, i) => ({ id: `doc-${i}`, title: `문서 ${i}` }));
const ids = values => values.map(value => value.id);

test("한국 자정에서 날짜가 바뀌며 해외 시각 표기도 같은 순간이면 동일하다", () => {
  assert.equal(C.dateKey(new Date("2026-11-01T14:59:59.999Z")), "2026-11-01");
  assert.equal(C.dateKey(new Date("2026-11-01T15:00:00.000Z")), "2026-11-02");
  assert.equal(C.dateKey(new Date("2026-11-02T00:00:00+09:00")), "2026-11-02");
});
test("일일 추첨은 새로고침 난수와 등록 순서에 영향을 받지 않는다", () => {
  const first = C.selectHome(fixture, "2026-11-02", () => 0);
  const second = C.selectHome([...fixture].reverse(), "2026-11-02", () => .99);
  assert.deepEqual(ids(first.daily), ids(second.daily));
  assert.notDeepEqual(ids(first.random), ids(second.random));
  assert.notDeepEqual(ids(first.daily), ids(C.selectHome(fixture, "2026-11-03").daily));
});
test("오늘의 무작위 순은 날짜·목록으로 고정되고 등록 순서에 독립적인 전체 순열이다", () => {
  const before = ids(fixture);
  const order = C.sortByDailyRandom(fixture, "2026-11-02");
  assert.deepEqual(ids(order), ids(C.sortByDailyRandom([...fixture].reverse(), "2026-11-02")));
  assert.notDeepEqual(ids(order), ids(C.sortByDailyRandom(fixture, "2026-11-03")));
  assert.equal(new Set(ids(order)).size, fixture.length);
  assert.deepEqual(ids(order).sort(), [...before].sort());
  assert.deepEqual(ids(fixture), before);
  assert.deepEqual(C.sortByDailyRandom([], "2026-11-02"), []);
  assert.deepEqual(C.sortByDailyRandom([fixture[0]], "2026-11-02"), [fixture[0]]);
});
test("빈 목록·적은 문서·많은 문서에서도 두 묶음은 중복 없이 가능한 수만큼 표시한다", () => {
  for (let count = 0; count <= 20; count++) {
    const docs = fixture.slice(0, count);
    const original = ids(docs);
    for (let day = 1; day <= 28; day++) {
      const result = C.selectHome(docs, `2026-11-${String(day).padStart(2, "0")}`);
      const combined = ids([...result.daily, ...result.random]);
      assert.equal(result.daily.length, Math.min(count, 4));
      assert.equal(result.random.length, Math.min(Math.max(count - 4, 0), 4));
      assert.equal(new Set(combined).size, Math.min(count, 8));
      assert.deepEqual(ids(docs), original);
    }
  }
});
test("최근 수정순은 최신부터, 같은 날짜는 ㄱㄴㄷ순, 없는 날짜와 잘못된 날짜는 마지막이다", () => {
  const docs = [
    { id: "none", title: "하", updatedAt: "" },
    { id: "old", title: "마", updatedAt: "2025-12-31" },
    { id: "new-b", title: "나", updatedAt: "2026-11-02" },
    { id: "invalid", title: "파", updatedAt: "오류" },
    { id: "new-a", title: "가", updatedAt: "2026-11-02" }
  ];
  assert.deepEqual(ids(C.sortByUpdated(docs)), ["new-a", "new-b", "old", "invalid", "none"]);
  assert.equal(docs[0].id, "none");
});
test("검색은 한글 정규화·대소문자·여러 단어·본문을 처리한다", () => {
  const doc = { title: "마크다운", summary: "문서 기록", tags: ["예시"] };
  assert.equal(C.matches(doc, "MARKDOWN 은빛", "Markdown 은빛책갈피"), true);
  assert.equal(C.matches(doc, "예시 기록"), true);
  assert.equal(C.matches(doc, "예시 없는단어"), false);
  assert.equal(C.matches(doc, "마크다운"), true);
});
test("태그는 실제 등록값에서 중복 없이 정렬되며 필터는 검색과 함께 정확히 일치한다", () => {
  const docs = [
    { title: "안보", tags: ["국제정치", "안보", "국제정치"] },
    { title: "공공재", tags: ["경제학", "국제정치경제"] },
    { title: "태그 없음" }
  ];
  assert.deepEqual(C.collectTags(docs), ["경제학", "국제정치", "국제정치경제", "안보"]);
  assert.deepEqual(C.collectTags([]), []);
  assert.equal(C.matchesTag(docs[0], "국제정치"), true);
  assert.equal(C.matchesTag(docs[1], "국제정치"), false);
  assert.equal(C.matchesTag(docs[2], "안보"), false);
  assert.equal(C.matchesTag(docs[2], ""), true);
  assert.deepEqual(docs.filter(d => C.matchesTag(d, "국제정치") && C.matches(d, "억제", "핵억제")), [docs[0]]);
});

test("검색 관련도는 제목 완전일치·앞부분·포함·태그·요약·본문 순으로 정렬한다", () => {
  const docs = [
    {id:"body", title:"가나다"},
    {id:"summary", title:"나라마", summary:"재무제표를 읽는 방법"},
    {id:"tag", title:"다라마", tags:["재무제표"]},
    {id:"contains", title:"연결재무제표"},
    {id:"prefix", title:"재무제표 분석"},
    {id:"exact", title:"재무제표"},
    {id:"missing", title:"없는 문서"}
  ];
  const bodies = new Map([["body", "재무제표 ".repeat(1000)]]);
  assert.deepEqual(ids(C.sortByRelevance(docs, "재무제표", bodies)),
    ["exact","prefix","contains","tag","summary","body"]);
  assert.deepEqual(ids(C.sortByRelevance([...docs].reverse(), "재무 제표", bodies)),
    ["exact","prefix","contains","tag","summary","body"]);
  assert.equal(docs[0].id, "body");
  assert.equal(C.searchScore(docs[5], "재무제표"), 10000);
  assert.equal(C.searchScore({title:"ＡＩ"}, "ai"), 10000);
});

test("여러 검색어는 필드에 걸쳐 모두 일치해야 하며 제목 일치 수와 동일 점수의 제목순을 반영한다", () => {
  const docs = [
    {id:"body", title:"다", summary:"현금", tags:["회계"]},
    {id:"some-title", title:"현금", summary:"흐름", tags:["회계"]},
    {id:"all-title", title:"흐름과 현금"},
    {id:"exact", title:"현금 흐름"},
    {id:"tie-b", title:"나", summary:"현금 흐름"},
    {id:"tie-a", title:"가", summary:"현금 흐름"},
    {id:"missing", title:"현금"}
  ];
  const bodies = new Map([["body", "흐름"]]);
  assert.deepEqual(ids(C.sortByRelevance(docs, "현금 흐름", bodies)),
    ["exact","all-title","some-title","tie-a","tie-b","body"]);
  assert.equal(C.matches({title:"현금"}, "현금 없는말"), false);
  assert.equal(C.matches({title:"현금"}, "현금 현금"), true);
  assert.deepEqual(ids(C.sortByRelevance(docs.slice(0,2), "")), ["body","some-title"]);
});
test("모든 등록 문서는 중복 없는 ID와 실제 md 원본을 갖는다", async () => {
  const context = { window: {} };
  vm.runInNewContext(await fs.readFile(path.join(root, "db.js"), "utf8"), context);
  const articles = context.window.KNOWLEDGE_DB.articles;
  const seen = new Set();
  for (const article of articles) {
    assert.equal(seen.has(article.id), false); seen.add(article.id);
    assert.equal(path.extname(article.file), ".md");
    const source = await fs.readFile(path.join(root, "db", article.file), "utf8");
    assert.ok(source.startsWith("# "));
  }
});
test("통합·개명 전 ID·제목·파일 링크는 새 문서와 통합 절로 연결된다", async () => {
  const context = { window: {} };
  vm.runInNewContext(await fs.readFile(path.join(root, "db.js"), "utf8"), context);
  const { articles, redirects } = context.window.KNOWLEDGE_DB;
  const baseURL = "https://archive.example/db/";
  const index = C.createArticleIndex(articles, redirects, baseURL);
  for (const redirect of redirects) {
    assert.ok(articles.some(article => article.id === redirect.target), redirect.id);
    for (const entry of [index.byId.get(redirect.id), index.byName.get(C.normalize(redirect.title)), index.byPath.get(new URL(redirect.file, baseURL).href)]) {
      assert.equal(entry.article.id, redirect.target);
      if (redirect.id !== redirect.target) assert.equal(entry.section, redirect.section);
    }
    if (redirect.section) {
      const source = await fs.readFile(path.join(root, "db", index.byId.get(redirect.target).article.file), "utf8");
      assert.ok(source.split("\n").includes(`## ${redirect.section}`), redirect.section);
    }
  }
  assert.equal(index.byId.get("ai-governance").article.title, "AI 경영");
  assert.equal(index.byId.get("esg").article.title, "기업 윤리");
  assert.equal(index.byId.get("business-ethics").section, "");
});
test("문서 제목·목록·위키 링크와 절 참조가 정리된 구조와 일치한다", async () => {
  const context = { window: {} };
  vm.runInNewContext(await fs.readFile(path.join(root, "db.js"), "utf8"), context);
  const { articles, redirects } = context.window.KNOWLEDGE_DB;
  const index = C.createArticleIndex(articles, redirects, "https://archive.example/db/");
  const sources = new Map(await Promise.all(articles.map(async article => [article.id, await fs.readFile(path.join(root, "db", article.file), "utf8")])));
  assert.equal(new Set(articles.map(article => article.title)).size, articles.length);
  assert.equal(new Set(articles.map(article => article.file)).size, articles.length);
  const files = (await fs.readdir(path.join(root, "db"))).filter(file => file.endsWith(".md")).sort();
  assert.deepEqual(files, Array.from(articles, article => article.file).sort());
  for (const article of articles) {
    const source = sources.get(article.id);
    assert.equal(source.split("\n")[0], `# ${article.title}`);
    for (const match of source.matchAll(/\[\[([^\]\n]+)\]\]/g)) {
      const [reference] = match[1].split("|");
      const [target, section] = reference.split("#");
      const entry = target ? index.byId.get(target) || index.byName.get(C.normalize(target)) : index.byId.get(article.id);
      assert.ok(entry, `${article.title}: ${reference}`);
      if (section) {
        assert.ok(sources.get(entry.article.id).split("\n").some(line => /^#{1,6} /.test(line) && C.normalize(line.replace(/^#+ /, "")) === C.normalize(section)), `${article.title}: ${reference}`);
      }
    }
  }
});
test("읽기 흐름의 문서·단계·첨부가 일치하고 분야 탐색 틀도 유효하다", async () => {
  const context = {window: {}};
  vm.runInNewContext(await fs.readFile(path.join(root, "db.js"), "utf8"), context);
  vm.runInNewContext(await fs.readFile(path.join(root, "wiki-templates.js"), "utf8"), context);
  const articles = context.window.KNOWLEDGE_DB.articles;
  const templates = context.window.ARCHIVE_TEMPLATES;
  const sources = new Map(await Promise.all(articles.map(async article =>
    [article.id, await fs.readFile(path.join(root, "db", article.file), "utf8")])));
  for (const [key, template] of Object.entries(templates)) {
    assert.ok(template.title);
    const ids = template.groups.flatMap(group => {
      assert.ok(group.label);
      assert.ok(group.articles.length);
      return Array.from(group.articles);
    });
    assert.equal(new Set(ids).size, ids.length, key);
    for (const id of ids) assert.ok(sources.has(id), key + ": " + id);
    if (template.flow) {
      assert.ok(template.description, key);
      assert.ok(template.groups.length >= 2, key);
      for (const id of ids) {
        assert.ok(sources.get(id).includes("{{틀:" + key + "}}"), key + ": " + id);
      }
    }
  }
  for (const [id, source] of sources) {
    const keys = [...source.matchAll(/^\{\{틀:([a-z0-9-]+)\}\}\r?$/gm)].map(match => match[1]);
    assert.equal(keys.length, new Set(keys).size, id);
    for (const key of keys) {
      assert.ok(Object.hasOwn(templates, key), id + ": " + key);
      if (templates[key].flow) {
        assert.ok(templates[key].groups.some(group => group.articles.includes(id)), id + ": " + key);
        assert.ok(source.indexOf("{{틀:" + key + "}}") < source.indexOf("\n## "), id + ": " + key);
      }
    }
  }
});

test("HTTP에서 md를 읽고, 실패한 읽기는 다음 호출에서 재시도한다", async () => {
  let requests = 0;
  const store = createStore({ baseURL: "http://localhost/db/", fetch: async url => {
    assert.equal(url.href, "http://localhost/db/new.md"); requests++;
    if (requests === 1) return { ok: false, status: 404 };
    return { ok: true, text: async () => "최신 본문" };
  } });
  await assert.rejects(store.load({ file: "new.md" }), /404/);
  assert.equal(await store.load({ file: "new.md" }), "최신 본문");
  assert.equal(await store.load({ file: "new.md" }), "최신 본문");
  assert.equal(requests, 2);
});
