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
  function createParser(marked, footnote, resolveWiki) {
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
    return parser;
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
  const api = { createParser, numberHeadings };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ArchiveMarkdown = Object.freeze(api);
})(globalThis);
