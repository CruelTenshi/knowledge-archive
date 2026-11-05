/* 마크다운 확장: 수식은 HTML 정리 후 KaTeX로 렌더링합니다. */
((root) => {
  "use strict";
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  function mathToken(src, block) {
    const pairs = block ? [["$$", "$$"], ["\\[", "\\]"]] : [["$$", "$$"], ["\\(", "\\)"], ["\\[", "\\]"], ["$", "$"]];
    for (const [left, right] of pairs) {
      if (!src.startsWith(left)) continue;
      for (let end = left.length; (end = src.indexOf(right, end)) !== -1; end += right.length) {
        let slashes = 0;
        for (let i = end - 1; i >= 0 && src[i] === "\\"; i--) slashes++;
        if (slashes % 2) continue;
        const text = src.slice(left.length, end);
        if (!text.trim() || (left === "$" && (/\n/.test(text) || /^\s|\s$/.test(text)))) return;
        const display = left === "$$" || left === "\\[";
        const raw = src.slice(0, end + right.length);
        return { type: block ? "mathBlock" : "mathInline", raw, text, display };
      }
      return;
    }
  }
  function createParser(marked, footnote, resolveWiki, renderTemplate) {
    const parser = new marked.Marked({ gfm: true });
    const renderMath = token => `<${token.display ? "div" : "span"} class="math-source" data-tex="${escape(token.text)}" data-display="${token.display}"></${token.display ? "div" : "span"}>`;
    parser.use(footnote({ description: "각주", headingClass: "footnotes-heading", refMarkers: true, backRefLabel: "본문의 각주 {0} 위치로 돌아가기" }));
    parser.use({ extensions: [
      { name: "mathBlock", level: "block", tokenizer(src) { return mathToken(src, true); }, renderer: renderMath },
      { name: "mathInline", level: "inline", start(src) { const match = /\$|\\[([]/.exec(src); return match?.index; }, tokenizer(src) { return mathToken(src, false); }, renderer: renderMath },
      { name: "wikilink", level: "inline", start(src) { return src.indexOf("[["); },
        tokenizer(src) { const match = /^\[\[([^\]\n]+)\]\]/.exec(src); if (match) return { type: "wikilink", raw: match[0], text: match[1] }; },
        renderer(token) { return resolveWiki(token.text); } }
    ] });
    if (renderTemplate) parser.use({ extensions: [{
      name: "wikiTemplate", level: "block",
      start(src) { return src.search(/^\{\{틀:/m); },
      tokenizer(src) {
        const match = /^\{\{틀:([a-z0-9-]+)\}\}[ \t]*(?:\n|$)/.exec(src);
        if (match) return { type: "wikiTemplate", raw: match[0], key: match[1] };
      },
      renderer(token) { return renderTemplate(token.key); }
    }] });
    return parser;
  }
  function renderTemplate(template, renderArticle) {
    const groups = template.groups.map((group, index) => {
      const links = group.articles.map(id => {
        const link = renderArticle(id);
        return link ? "<li>" + link + "</li>" : "";
      }).join("");
      if (template.flow) {
        return '<li class="wiki-flow-stage"><span class="wiki-flow-number" aria-hidden="true">' + (index + 1) + '</span><div><strong class="wiki-flow-label">' + escape(group.label) + '</strong><ul>' + links + '</ul></div></li>';
      }
      return '<div class="wiki-template-group"><strong>' + escape(group.label) + '</strong><ul>' + links + '</ul></div>';
    }).join("");
    const title = escape(template.title);
    if (template.flow) {
      return '<nav class="wiki-template wiki-reading-flow" aria-label="' + title + ' 읽기 흐름"><details><summary class="wiki-template-title">읽기 흐름 · ' + title + '</summary><p class="wiki-flow-description">' + escape(template.description) + '</p><p class="wiki-flow-guide">번호 순서로 읽으며, 같은 단계의 문서는 함께 참고합니다.</p><ol class="wiki-flow-steps">' + groups + '</ol></details></nav>';
    }
    return '<nav class="wiki-template" aria-label="' + title + '"><strong class="wiki-template-title">' + title + '</strong>' + groups + '</nav>';
  }
  function numberHeadings(headings) {
    const stack = [];
    return headings.map(heading => {
      const level = heading.level;
      while (stack.length && stack.at(-1).level > level) stack.pop();
      if (stack.length && stack.at(-1).level === level) stack.at(-1).count++;
      else stack.push({ level, count: 1 });
      return { ...heading, number: stack.map(item => item.count).join("."), depth: stack.length - 1 };
    });
  }
  const api = { createParser, renderTemplate, numberHeadings };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ArchiveMarkdown = Object.freeze(api);
})(globalThis);
