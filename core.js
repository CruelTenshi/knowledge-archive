/* 화면과 독립적인 날짜·추첨·검색 함수. 브라우저와 Node에서 함께 사용합니다. */
((root) => {
  "use strict";
  function hash(value) {
    let h = 2166136261;
    for (const c of value) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function seededRandom(seed) {
    let state = seed >>> 0;
    return () => {
      state += 0x6D2B79F5;
      let t = state;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function shuffle(values, random = Math.random) {
    const result = [...values];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function dateKey(date = new Date(), timeZone = "Asia/Seoul") {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
    const part = type => parts.find(item => item.type === type).value;
    return `${part("year")}-${part("month")}-${part("day")}`;
  }
  function selectHome(articles, day, random = Math.random) {
    // 먼저 날짜로 고정된 4개를 뽑고, 남은 문서에서 새로고침용 4개를 뽑습니다.
    // db.js의 배열 순서만 바꿔도 오늘의 문서가 변하지 않도록 ID순으로 정규화합니다.
    const canonical = [...articles].sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
    const daily = shuffle(canonical, seededRandom(hash(`knowledge-daily:${day}`))).slice(0, 4);
    const dailyIds = new Set(daily.map(article => article.id));
    return { daily, random: shuffle(canonical.filter(article => !dailyIds.has(article.id)), random).slice(0, 4) };
  }
  function normalize(value) { return String(value).normalize("NFKC").toLocaleLowerCase("ko").replace(/\s+/g, " ").trim(); }
  function sortByDailyRandom(articles, day) {
    const canonical = [...articles].sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
    return shuffle(canonical, seededRandom(hash(`knowledge-order:${day}`)));
  }
  function createArticleIndex(articles, redirects = [], baseURL) {
    const byId = new Map();
    const byName = new Map();
    const byPath = new Map();
    for (const article of articles) {
      const entry = { article, section: "" };
      byId.set(article.id, entry);
      byName.set(normalize(article.title), entry);
      byPath.set(new URL(article.file, baseURL).href, entry);
    }
    for (const redirect of redirects) {
      const canonical = byId.get(redirect.target);
      if (!canonical) continue;
      const entry = { article: canonical.article, section: redirect.section || "" };
      if (!byId.has(redirect.id)) byId.set(redirect.id, entry);
      if (!byName.has(normalize(redirect.title))) byName.set(normalize(redirect.title), entry);
      const oldPath = new URL(redirect.file, baseURL).href;
      if (!byPath.has(oldPath)) byPath.set(oldPath, entry);
    }
    return { byId, byName, byPath };
  }
  function matches(article, query, body = "") {
    const haystack = normalize([article.title, article.summary || "", ...(article.tags || []), body].join(" "));
    return normalize(query).split(" ").filter(Boolean).every(term => haystack.includes(term));
  }
  function collectTags(articles) {
    return [...new Set(articles.flatMap(article => article.tags || []).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, "ko", { numeric: true, sensitivity: "base" }));
  }
  function matchesTag(article, tag) { return !tag || (article.tags || []).includes(tag); }
  function sortByName(articles) { return [...articles].sort((a, b) => a.title.localeCompare(b.title, "ko", { numeric: true, sensitivity: "base" })); }
  function sortByUpdated(articles) {
    const timestamp = article => {
      const value = article.updatedAt ? Date.parse(article.updatedAt) : NaN;
      return Number.isFinite(value) ? value : -Infinity;
    };
    return sortByName(articles).sort((a, b) => {
      const aTime = timestamp(a), bTime = timestamp(b);
      return aTime === bTime ? 0 : aTime > bTime ? -1 : 1;
    });
  }
  function escapeHTML(value) { return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]); }
  const api = { hash, seededRandom, shuffle, dateKey, selectHome, normalize, createArticleIndex, matches, collectTags, matchesTag, sortByName, sortByUpdated, sortByDailyRandom, escapeHTML };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ArchiveCore = Object.freeze(api);
})(globalThis);
