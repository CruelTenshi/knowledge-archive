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
