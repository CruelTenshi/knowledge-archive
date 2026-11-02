(() => {
  "use strict";
  const C = window.ArchiveCore;
  const db = window.KNOWLEDGE_DB;
  const $ = id => document.getElementById(id);
  const esc = C.escapeHTML;
  const articles = db.articles;
  const tags = C.collectTags(articles);
  const baseURL = new URL("./db/", location.href);
  const articleURL = article => new URL(article.file, baseURL);
  const { byId, byName, byPath } = C.createArticleIndex(articles, db.redirects, baseURL);
  const store = window.ArchiveDocumentStore.createStore({
    baseURL,
    fetch: window.fetch.bind(window)
  });
  let currentDay = C.dateKey(new Date(), db.timeZone);
  let home = C.selectHome(articles, currentDay);
  let randomOrder = C.shuffle(articles);
  let routeVersion = 0;
  let searchTimer;
  let bodyIndex;
  let lastBrowseRoute = "#/";

  function docHref(article, section = "") {
    return `#/doc/${encodeURIComponent(article.id)}${section ? `?section=${encodeURIComponent(section)}` : ""}`;
  }
  function route() {
    const [path, query = ""] = (location.hash.slice(1) || "/").split("?");
    const params = new URLSearchParams(query);
    let id = "";
    try { id = decodeURIComponent(path.slice(5)); } catch { /* 잘못된 주소는 없는 문서로 표시 */ }
    return { path, params, id, query: params.get("q") || "", tag: params.get("tag") || "", sort: ["random", "daily", "updated"].includes(params.get("sort")) ? params.get("sort") : "name" };
  }
  function card(article, index) {
    return `<a class="document-card" href="${esc(docHref(article))}"><span class="card-fx" aria-hidden="true"></span><div class="document-card-top"><span class="document-tags">${article.tags.map(tag => `<span>${esc(tag)}</span>`).join("")}</span><span class="document-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span></div><h3>${esc(article.title)}</h3><p>${esc(article.summary || "아카이브의 문서를 읽어보세요.")}</p><span class="document-card-bottom"><span>문서 읽기</span><svg class="icon"><use href="#i-arrow"/></svg></span></a>`;
  }
  function fillGrid(id, values) { $(id).innerHTML = values.map(card).join(""); }
  function announce(message) { $("announcement").textContent = message; }
  function updateHome() {
    fillGrid("random-grid", home.random);
    fillGrid("daily-grid", home.daily);
    $("random-count").textContent = home.random.length;
    $("daily-count").textContent = home.daily.length;
    $("daily-date").dateTime = currentDay;
    $("daily-date").textContent = currentDay.replaceAll("-", ". ");
    $("home-empty").hidden = articles.length > 0;
    $("small-collection-note").hidden = articles.length === 0 || articles.length >= 8;
    $("reshuffle-button").disabled = !home.random.length;
  }
  async function loadBody(article) {
    return store.load(article);
  }
  function buildIndex() {
    if (!bodyIndex) {
      bodyIndex = (async () => {
        let cursor = 0;
        const index = new Map();
        const failed = [];
        // 대량 문서에서도 동시에 요청하는 파일은 최대 네 개로 제한합니다.
        await Promise.all(Array.from({ length: Math.min(4, articles.length) }, async () => {
          while (cursor < articles.length) {
            const article = articles[cursor++];
            try { index.set(article.id, await loadBody(article)); }
            catch { failed.push(article.id); }
          }
        }));
        if (failed.length) bodyIndex = null; // 다음 검색에서 누락된 파일을 다시 시도합니다.
        return { index, failed };
      })();
    }
    return bodyIndex;
  }
  async function renderList(state, version) {
    const query = state.query.trim();
    $("sort-select").value = state.sort;
    // 과거 URL의 태그가 목록에서 사라져도 선택 조건을 숨기지 않습니다.
    const filterTags = state.tag && !tags.includes(state.tag) ? [...tags, state.tag] : tags;
    $("tag-filter").replaceChildren(new Option("전체 태그", ""), ...filterTags.map(tag => new Option(tag, tag)));
    $("tag-filter").value = state.tag;
    $("list-reshuffle").hidden = state.sort !== "random";
    const heading = $("list-title");
    heading.replaceChildren(document.createTextNode(query ? `“${query}” 검색 결과 ` : "전체 문서 "));
    const count = document.createElement("span");
    heading.append(count);
    const inTag = article => C.matchesTag(article, state.tag);
    let results = articles.filter(article => inTag(article) && (!query || C.matches(article, query)));
    const paint = () => {
      const ids = new Set(results.map(article => article.id));
      if (state.sort === "daily") results = C.sortByDailyRandom(articles, currentDay).filter(article => ids.has(article.id));
      else if (state.sort === "random") results = randomOrder.filter(article => ids.has(article.id));
      else results = state.sort === "updated" ? C.sortByUpdated(results) : C.sortByName(results);
      fillGrid("list-grid", results);
      count.textContent = results.length;
      $("list-empty").hidden = results.length > 0;
    };
    paint();
    $("search-status").textContent = query ? "본문까지 검색하고 있어요…" : state.tag ? `‘${state.tag}’ 태그의 문서 ${results.length}개입니다.` : `아카이브에 ${articles.length}개의 문서가 있습니다.`;
    $("list-grid").setAttribute("aria-busy", String(Boolean(query)));
    if (query) {
      const { index, failed } = await buildIndex();
      if (version !== routeVersion) return;
      results = articles.filter(article => inTag(article) && C.matches(article, query, index.get(article.id) || ""));
      paint();
      $("search-status").textContent = `${results.length}개의 문서를 찾았습니다.${failed.length ? ` ${failed.length}개 파일을 읽지 못해 해당 문서는 제목·태그·요약만 검색했습니다.` : " 제목·태그·요약·본문에서 검색했습니다."}`;
      $("list-grid").setAttribute("aria-busy", "false");
    }
  }
  function resolveWiki(target) { return byId.get(target) || byName.get(C.normalize(target)); }
  function wikiLink(text) {
    const [reference, label] = text.split("|");
    const [target, ...sections] = reference.trim().split("#");
    const resolved = target ? resolveWiki(target) : byId.get(route().id);
    const article = resolved?.article;
    const caption = (label || target || sections.join("#")).trim();
    return article ? `<a href="${esc(docHref(article, sections.length ? sections.join("#") : resolved.section))}">${esc(caption)}</a>` : `<span class="missing-link" title="등록되지 않은 문서">${esc(caption)}</span>`;
  }
  const markdown = window.ArchiveMarkdown.createParser(marked, markedFootnote, wikiLink);

  const footnotePopup = $("footnote-popup");
  let footnoteOpener;
  let restoreFootnoteFocus = true;
  function closeFootnote(restore = true) {
    if (!footnotePopup.open) return;
    restoreFootnoteFocus = restore;
    footnotePopup.close();
  }
  function showFootnote(link) {
    const hash = new URL(link.href, location.href).hash;
    const section = new URLSearchParams(hash.split("?")[1] || "").get("section");
    const target = [...$("document-body").querySelectorAll(".footnotes [id]")].find(node => node.id === section);
    if (!target) return false;
    const copy = target.cloneNode(true);
    for (const back of copy.querySelectorAll("[data-footnote-backref]")) back.remove();
    for (const node of copy.querySelectorAll("[id]")) node.removeAttribute("id");
    // 본문에서 이미 정리하고 수식까지 표시한 각주 내용을 복사합니다.
    $("footnote-popup-content").replaceChildren(...copy.childNodes);
    $("footnote-popup-title").textContent = `각주 ${link.textContent.replace(/[\[\]]/g, "").trim()}`;
    $("footnote-popup-source").href = link.href;
    if (footnoteOpener) footnoteOpener.setAttribute("aria-expanded", "false");
    if (!footnotePopup.contains(link)) footnoteOpener = link;
    footnoteOpener?.setAttribute("aria-expanded", "true");
    restoreFootnoteFocus = true;
    if (!footnotePopup.open) footnotePopup.showModal();
    $("footnote-popup-content").scrollTop = 0;
    return true;
  }
  function handleFootnoteClick(event) {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.("a[data-footnote-ref]");
    if (link && showFootnote(link)) event.preventDefault();
  }
  $("document-body").addEventListener("click", handleFootnoteClick);
  $("footnote-popup-content").addEventListener("click", handleFootnoteClick);
  $("footnote-popup-close").addEventListener("click", () => closeFootnote());
  footnotePopup.addEventListener("cancel", event => { event.preventDefault(); closeFootnote(); });
  footnotePopup.addEventListener("close", () => {
    const opener = footnoteOpener;
    footnoteOpener = undefined;
    opener?.setAttribute("aria-expanded", "false");
    if (restoreFootnoteFocus && opener?.isConnected) opener.focus({ preventScroll: true });
  });
  footnotePopup.addEventListener("click", event => {
    const box = footnotePopup.getBoundingClientRect();
    if (event.target === footnotePopup && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) closeFootnote();
  });
  $("footnote-popup-source").addEventListener("click", event => {
    event.preventDefault();
    const href = new URL(event.currentTarget.href, location.href).hash;
    closeFootnote(false);
    if (location.hash === href) scrollSection(renderedHeadings, route().params.get("section"));
    else location.hash = href;
  });

  function prepareMarkdown(source, article) {
    const body = $("document-body");
    body.innerHTML = DOMPurify.sanitize(markdown.parse(source), {
      USE_PROFILES: { html: true }, FORBID_TAGS: ["style", "form", "iframe", "object", "embed"], FORBID_ATTR: ["style"]
    });
    const first = body.firstElementChild;
    if (first?.tagName === "H1" && C.normalize(first.textContent) === C.normalize(article.title)) first.remove();
    const lead = body.firstElementChild;
    if (lead?.tagName === "P" && article.summary && C.normalize(lead.textContent) === C.normalize(article.summary)) lead.remove();
    // 원본 md 파일을 기준으로 이미지와 다른 문서 링크를 해석합니다.
    for (const img of body.querySelectorAll("img")) {
      const raw = img.getAttribute("src");
      if (!raw) continue;
      const src = /^\.?\/?db\/img\//.test(raw) ? new URL(raw.replace(/^\.?\//, ""), new URL("./", location.href)) : new URL(raw, articleURL(article));
      if (!["http:", "https:"].includes(src.protocol)) { img.removeAttribute("src"); continue; }
      img.src = src.href;
      img.loading = "lazy";
      img.addEventListener("error", () => {
        const note = document.createElement("span"); note.className = "image-error";
        note.textContent = `이미지를 불러오지 못했어요${img.alt ? `: ${img.alt}` : "."}`;
        img.replaceWith(note);
      }, { once: true });
    }
    const headings = [...body.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter(h => !h.closest('.footnotes'));
    headings.forEach((heading, index) => {
      const label = heading.cloneNode(true);
      for (const math of label.querySelectorAll('.math-source')) math.replaceWith(math.dataset.tex);
      heading.dataset.sectionTitle = label.textContent;
      heading.id = `section-${index + 1}`; heading.tabIndex = -1;
    });
    const findSection = value => headings.find(h => h.id === value || C.normalize(h.dataset.sectionTitle) === C.normalize(value));
    for (const link of body.querySelectorAll("a[href]")) {
      const raw = link.getAttribute("href");
      if (raw.startsWith("#/")) continue;
      if (raw.startsWith("#")) {
        let section = raw.slice(1); try { section = decodeURIComponent(section); } catch { /* 그대로 사용 */ }
        const rawId = raw.slice(1);
        const target = [...body.querySelectorAll('[id]')].find(node => node.id === rawId || node.id === section);
        link.href = docHref(article, target?.id || findSection(section)?.id || section);
        continue;
      }
      const url = new URL(raw, articleURL(article));
      const fragment = url.hash; url.hash = "";
      const resolved = byPath.get(url.href);
      const target = resolved?.article;
      if (target) {
        let section = fragment.slice(1); try { section = decodeURIComponent(section); } catch { /* 그대로 사용 */ }
        link.href = docHref(target, section || resolved.section);
      } else if (url.protocol === "https:" || url.protocol === "http:") {
        link.href = url.href;
        if (url.origin !== location.origin) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
      } else if (url.protocol !== "mailto:") {
        link.removeAttribute("href");
      }
    }
    for (const table of body.querySelectorAll("table")) {
      const wrapper = document.createElement("div"); wrapper.className = "table-scroll"; wrapper.tabIndex = 0;
      wrapper.setAttribute("role", "region"); wrapper.setAttribute("aria-label", "표 · 좌우로 스크롤");
      table.before(wrapper); wrapper.append(table);
    }
    const toc = window.ArchiveMarkdown.numberHeadings(headings.map(h => ({ id: h.id, title: h.dataset.sectionTitle, level: Number(h.tagName.slice(1)) })));
    $("toc-panel").hidden = !toc.length;
    $("document-toc").innerHTML = toc.map(h => `<a class="toc-depth-${h.depth}" href="${esc(docHref(article, h.id))}"><span class="toc-number">${h.number}</span> ${esc(h.title)}</a>`).join("");
    for (const ref of body.querySelectorAll("a[data-footnote-ref]")) {
      ref.setAttribute("aria-haspopup", "dialog");
      ref.setAttribute("aria-controls", "footnote-popup");
      ref.setAttribute("aria-expanded", "false");
    }
    for (const math of body.querySelectorAll('.math-source')) {
      katex.render(math.dataset.tex, math, { displayMode: math.dataset.display === 'true', throwOnError: false, trust: false, strict: 'warn', maxExpand: 1000 });
      math.removeAttribute('data-tex');
    }
    return headings;
  }
  function scrollSection(headings, section) {
    if (!section) return;
    const heading = headings.find(h => h.id === section || C.normalize(h.dataset.sectionTitle) === C.normalize(section)) || [...$("document-body").querySelectorAll('[id]')].find(node => node.id === section);
    if (heading && !heading.hasAttribute('tabindex')) heading.tabIndex = -1;
    if (heading) { heading.scrollIntoView({ block: "start" }); heading.focus({ preventScroll: true }); }
  }
  let renderedArticle = "";
  let renderedHeadings = [];
  async function renderDocument(state, version) {
    const resolved = byId.get(state.id);
    const article = resolved?.article;
    const section = state.params.get("section") || resolved?.section;
    const body = $("document-body");
    $("document-view").hidden = false;
    $("browse-view").hidden = true;
    if (!article) {
      renderedArticle = "";
      document.title = "문서를 찾을 수 없어요 — 지식 아카이브";
      $("document-title").textContent = "문서를 찾을 수 없어요";
      $("breadcrumb-title").textContent = "없는 문서";
      $("document-summary").textContent = "문서 주소가 바뀌었거나 아직 등록되지 않은 문서입니다.";
      $("document-meta").replaceChildren(); $("toc-panel").hidden = true;
      body.innerHTML = '<p>전체 문서에서 원하는 문서를 다시 찾아보세요.</p><a class="button button-secondary" href="#/all">전체 문서 보기</a>';
      body.setAttribute("aria-busy", "false");
      return;
    }
    if (renderedArticle === article.id) { scrollSection(renderedHeadings, section); return; }
    renderedArticle = "";
    document.title = `${article.title} — 지식 아카이브`;
    $("document-title").textContent = article.title;
    $("breadcrumb-title").textContent = article.title;
    $("document-summary").textContent = article.summary || "";
    $("document-meta").innerHTML = article.tags.map(tag => `<a class="tag-link" href="#/all?tag=${encodeURIComponent(tag)}">${esc(tag)}</a>`).join("") + (article.updatedAt ? `<span>수정 <time datetime="${esc(article.updatedAt)}">${esc(article.updatedAt)}</time></span>` : "");
    $("toc-panel").hidden = true;
    body.textContent = "문서를 불러오고 있어요…"; body.setAttribute("aria-busy", "true");
    window.scrollTo(0, 0);
    try {
      const source = await loadBody(article);
      if (version !== routeVersion) return;
      renderedHeadings = prepareMarkdown(source, article);
      renderedArticle = article.id;
      body.setAttribute("aria-busy", "false");
      $("document-title").focus({ preventScroll: true });
      scrollSection(renderedHeadings, section);
      announce(`${article.title} 문서를 열었습니다.`);
    } catch {
      if (version !== routeVersion) return;
      renderedArticle = ""; body.setAttribute("aria-busy", "false");
      body.innerHTML = `<div class="document-error"><h2>문서를 불러오지 못했어요</h2><p>파일이 있는지, 연결이 정상인지 확인한 뒤 다시 시도해 주세요.</p><p><code>db/${esc(article.file)}</code></p><button class="button button-secondary" id="retry-document" type="button">다시 시도</button></div>`;
      $("retry-document").addEventListener("click", render);
    }
  }
  function refreshDay() {
    const day = C.dateKey(new Date(), db.timeZone);
    if (day !== currentDay) { currentDay = day; home = C.selectHome(articles, day); updateHome(); return true; }
    return false;
  }
  function refreshVisibleDay() {
    if (refreshDay() && route().sort === "daily") render();
  }
  function render() {
    closeFootnote(false);
    clearTimeout(searchTimer);
    const version = ++routeVersion;
    const state = route();
    refreshDay();
    if (state.path.startsWith("/doc/")) { renderDocument(state, version); return; }
    lastBrowseRoute = location.hash || "#/";
    renderedArticle = "";
    $("document-view").hidden = true; $("browse-view").hidden = false;
    const isList = state.path === "/all" || state.path === "/search";
    $("home-view").hidden = isList; $("list-view").hidden = !isList;
    $("home-tab").classList.toggle("active", !isList); $("all-tab").classList.toggle("active", isList);
    for (const [id, active] of [["home-tab", !isList], ["all-tab", isList]]) {
      if (active) $(id).setAttribute("aria-current", "page"); else $(id).removeAttribute("aria-current");
    }
    $("search-input").value = state.query;
    $("browse-caption").textContent = isList ? "쌓인 지식을, 나의 속도로 탐색하기." : "하나의 문서에서, 또 다른 생각으로.";
    document.title = isList ? `${state.query ? "문서 검색" : "전체 문서"} — 지식 아카이브` : "지식 아카이브 — 나의 지식이 연결되는 곳";
    if (isList) renderList(state, version); else updateHome();
  }
  function submitSearch(input = $("search-input")) {
    clearTimeout(searchTimer);
    const value = input.value.trim();
    const state = route();
    const params = new URLSearchParams();
    if (value) params.set("q", value);
    if (state.sort !== "name") params.set("sort", state.sort);
    if (state.tag) params.set("tag", state.tag);
    const path = state.path === "/all" || state.tag ? "/all" : value ? "/search" : "/";
    const hash = `#${path}${params.size ? `?${params}` : ""}`;
    if (hash !== location.hash) location.hash = hash; else render();
  }
  function openRandom() {
    const currentId = byId.get(route().id)?.article.id;
    const candidates = articles.filter(article => article.id !== currentId);
    const pool = candidates.length ? candidates : articles;
    if (pool.length) location.hash = docHref(pool[Math.floor(Math.random() * pool.length)]);
  }
  $("search-form").addEventListener("submit", event => { event.preventDefault(); submitSearch(); });
  $("document-search-form").addEventListener("submit", event => {
    event.preventDefault();
    if (!$("document-search-input").value.trim()) return;
    submitSearch($("document-search-input"));
  });
  $("search-input").addEventListener("input", event => { clearTimeout(searchTimer); if (!event.isComposing) searchTimer = setTimeout(submitSearch, 350); });
  $("search-input").addEventListener("compositionend", () => { clearTimeout(searchTimer); searchTimer = setTimeout(submitSearch, 350); });
  $("reshuffle-button").addEventListener("click", () => { refreshDay(); home = C.selectHome(articles, currentDay); updateHome(); announce("우연한 발견 문서를 다시 뽑았습니다."); });
  $("random-button").addEventListener("click", openRandom);
  $("next-random-button").addEventListener("click", openRandom);
  $("sort-select").addEventListener("change", () => {
    const state = route(); state.params.set("sort", $("sort-select").value);
    if ($("sort-select").value === "random") randomOrder = C.shuffle(articles);
    location.hash = `#${state.path}?${state.params}`;
  });
  $("list-reshuffle").addEventListener("click", () => { randomOrder = C.shuffle(articles); render(); });
  $("tag-filter").addEventListener("change", () => {
    const state = route();
    if ($("tag-filter").value) state.params.set("tag", $("tag-filter").value);
    else state.params.delete("tag");
    location.hash = `#${state.path}${state.params.size ? `?${state.params}` : ""}`;
  });
  // 입력 중에는 단축키가 타이핑이나 브라우저 기본 동작을 가로채지 않습니다.
  document.addEventListener("keydown", event => {
    if (footnotePopup.open) {
      if (event.key === "Escape") { event.preventDefault(); closeFootnote(); }
      return;
    }
    if (event.defaultPrevented || event.isComposing || event.repeat || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    if (event.target.isContentEditable || event.target.closest?.('input,textarea,select,[role="textbox"]')) return;
    if (event.code === "KeyA" || event.key.toLowerCase() === "a") {
      event.preventDefault(); openRandom();
    } else if (event.key === "Escape" && route().path.startsWith("/doc/")) location.hash = lastBrowseRoute;
  });
  window.addEventListener("hashchange", render);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) refreshVisibleDay(); });
  setInterval(refreshVisibleDay, 30000);
  $("total-count").textContent = articles.length;
  $("all-link-count").textContent = `${articles.length} DOCUMENTS`;
  $("random-button").disabled = !articles.length;
  $("next-random-button").disabled = !articles.length;
  render();
})();
