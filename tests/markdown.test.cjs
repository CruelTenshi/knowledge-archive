const { test } = require('node:test');
const assert = require('node:assert/strict');
const marked = require('../vendor/marked.umd.js');
const footnote = require('../vendor/marked-footnote/index.umd.js');
const katex = require('../vendor/katex/katex.js');
const { createParser, numberHeadings } = require('../markdown.js');
const parser = () => createParser(marked, footnote, text => `<a href="#/doc/test">${text}</a>`);

test('인라인·블록 수식과 역슬래시 구분자를 마크다운 변형 없이 보존한다', () => {
  const p = parser();
  for (const source of [String.raw`문장 $x_i^2 + \frac{a}{b}$ 끝`, String.raw`\(x_i\)`, '$$\n\\begin{aligned}\na&=b+c\\\\\nd&=e\n\\end{aligned}\n$$', String.raw`\[\sum_{i=1}^{n} i\]`]) {
    const html = p.parse(source);
    assert.match(html, /class="math-source"/);
    assert.doesNotMatch(html, /<em>/);
  }
  assert.match(p.parse('$$x^2$$'), /data-display="true"/);
  assert.match(p.parse('$x^2$'), /data-display="false"/);
  assert.match(katex.renderToString(String.raw`\frac{a}{b}+\sum_{i=1}^{n}i`, {throwOnError:true}), /class="katex"/);
});
test('코드의 수식·위키·각주 문법은 변환하지 않고, 이스케이프한 달러도 보존한다', () => {
  const html = parser().parse('`$x$ [[문서]] [^n]`\n\n```text\n$$x$$\n[[문서]]\n```\n\n\\$100');
  assert.doesNotMatch(html, /math-source|footnote-ref|href=/);
  assert.match(html, /\$100/);
});
test('각주는 참조순으로 번호를 붙이고 재참조·다중 문단·문서별 초기화를 지원한다', () => {
  const p = parser();
  const source = '설명[^나] 다시[^나] 또[^가]\n\n[^가]: **첫 정의**\n\n[^나]: 두 번째 정의\n\n    이어지는 문단';
  const html = p.parse(source);
  assert.match(html, /\[1\]/); assert.match(html, /\[2\]/);
  assert.match(html, /footnote-ref-%EB%82%98-2/);
  assert.match(html, /이어지는 문단/);
  const next = p.parse('새 문서[^x]\n\n[^x]: 새 각주');
  assert.match(next, /\[1\]/); assert.doesNotMatch(next, /두 번째 정의|\[2\]/);
});
test('위키 링크와 수식·각주를 함께 쓸 수 있다', () => {
  const html = parser().parse('[[문서#절|별칭]] $a_b$[^a]\n\n[^a]: [[다른 문서]]와 $c_d$');
  assert.equal((html.match(/href="#\/doc\/test"/g)||[]).length, 2);
  assert.equal((html.match(/class="math-source"/g)||[]).length, 2);
});
test('목차는 제목 단계를 건너뛰어도 0 없이 계층 번호를 표시한다', () => {
  const result = numberHeadings([2,3,4,3,2,5,6,2].map(level => ({level})));
  assert.deepEqual(result.map(item => item.number), ['1','1.1','1.1.1','1.2','2','2.1','2.1.1','3']);
  assert.deepEqual(numberHeadings([]), []);
});
