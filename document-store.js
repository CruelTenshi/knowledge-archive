/* HTTP에서 마크다운 원본을 읽고, 성공한 요청을 메모리에 보관합니다. */
((root) => {
  "use strict";
  function createStore({ baseURL, fetch: request }) {
    const cache = new Map();
    async function load(article) {
      if (!cache.has(article.file)) {
        const pending = (async () => {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 12000);
          try {
            const response = await request(new URL(article.file, baseURL), { signal: controller.signal });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.text();
          } finally { clearTimeout(timeout); }
        })();
        cache.set(article.file, pending);
        pending.catch(() => cache.delete(article.file));
      }
      return cache.get(article.file);
    }
    return { load };
  }
  if (typeof module !== "undefined" && module.exports) module.exports = { createStore };
  else root.ArchiveDocumentStore = Object.freeze({ createStore });
})(globalThis);
