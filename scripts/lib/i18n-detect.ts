/**
 * 共享的「用户可见文案」识别模块。
 *
 * 清点脚本与替换 codemod 必须用同一套判定逻辑，否则会出现
 * 「清单里有、替换时对不上」的静默漏改。故抽到这里共用。
 *
 * 输出的是「可替换区间」：
 *   - 字符串字面量：区间仅覆盖内容（不含引号），替换时再补引号与转义
 *   - JSX 文本节点：区间覆盖去空白后的核心文本，前后空白保留
 */
import ts from "typescript";

export const TEXT_ATTRS = new Set([
  "title", "placeholder", "alt", "label", "aria-label", "aria-description",
  "description", "ctaLabel", "headline", "tooltip", "helperText", "emptyText",
  // 经验性发现（scripts/i18n-props.ts）：组件自定义的文案属性
  "heroTitle", "heroSubtitle", "heroDescription", "videoTestimonialsTitle",
  "brandName", "ariaLabel", "metaTitle", "metaDescription",
]);

/** 承载文案的对象属性名（由 i18n-props.ts 从代码中统计得出，非拍脑袋枚举） */
export const TEXT_PROP_KEYS = new Set([
  "label", "title", "subtitle", "heading", "description", "desc", "text",
  "question", "answer", "name", "cta", "ctaLabel", "headline", "tagline",
  "caption", "summary", "body", "content", "note", "hint", "placeholder",
  "feature", "benefit", "step", "description2", "suffix", "prefix",
  // 以下为经验补充：FAQ 用 q/a，对比页用 studio/competitor，等等
  "q", "a", "detail", "studio", "competitor", "competitorName",
  "competitorPricing", "verdict", "meaning", "why", "intro", "h1",
  "notes", "endpoint", "error", "metaTitle", "metaDescription", "ariaLabel",
]);

/**
 * 绝不翻译的属性/属性名。多来自误判风险或必须原样传递的值：
 *   d        —— SVG 路径数据（含空格，会被误判为文案）
 *   sizes    —— img 的响应式尺寸描述
 *   fontFamily —— 字体族名，必须原样传给 canvas/CSS
 *   default / 200 / 800 / png —— 逻辑值或尺寸数字
 */
const NEVER_TRANSLATE_KEYS = new Set([
  "d", "sizes", "fontFamily", "default", "200", "800", "png",
  "dimensions", "category", "aria-keyshortcuts",
]);
export { NEVER_TRANSLATE_KEYS };

const STYLE_ATTRS = new Set(["className", "class", "style"]);
const STRUCT_ATTRS = new Set([
  "href", "src", "id", "key", "type", "name", "value", "htmlFor", "target",
  "rel", "role", "as", "size", "variant", "color", "fill", "stroke", "d",
  "width", "height", "xmlns", "srcSet", "sizes", "loading", "decoding",
  "crossOrigin", "referrerPolicy", "method", "action", "autoComplete",
  "inputMode", "pattern", "step", "min", "max", "data-testid", "slot", "slug",
]);
const CLASS_FNS = new Set(["cn", "clsx", "cva", "twMerge", "classNames", "cx"]);

const HAS_LATIN = /[A-Za-z]{2,}/;

/**
 * Tailwind / CSS 类名判定（收紧版）
 *
 * 旧版把 flex|grid|border|text|... 作为"整词命中"依据，导致
 * `"Toggle grid"`、`"Border radius"`、`"Text color"` 这类真实文案
 * 被误判为类名而丢弃。现改为要求"Tailwind 前缀 + 连字符"，
 * 或"全部 token 都是 kebab-case 且至少两段"。
 */
const TW_PREFIX =
  /^(flex|grid|block|inline|hidden|absolute|relative|fixed|sticky|static|rounded|border|shadow|text|bg|w|h|min|max|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|items|justify|self|font|leading|tracking|opacity|z|top|left|right|bottom|inset|overflow|transition|duration|delay|ease|animate|transform|scale|rotate|translate|skew|origin|space|divide|ring|outline|cursor|select|pointer|whitespace|break|truncate|uppercase|lowercase|capitalize|antialiased|sr|col|row|order|aspect|basis|grow|shrink|content|object|fill|stroke|list|decoration|indent|align|table|columns)-/;

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;

function looksLikeClass(s: string): boolean {
  // 先排除"明确是文案"的特征，避免被单个像类名的 token 带偏。
  // 实例：某条文案含 "pointer-events" 一词，而 pointer- 是 Tailwind 前缀，
  // 结果整句被判成类名丢弃（changelog 里真实出现过）。
  if (/\s[A-Z]/.test(s)) return false;      // 词首大写（Moveable、Fixed…）
  if (/[.!?,;:。，、；：]/.test(s)) return false; // 句子标点
  if (s.length > 60) return false;           // 长串基本是文案

  if (/^[a-z-]+:/.test(s)) return true;                 // 变体前缀 hover: / data-[...]:
  if (/\[[^\]]*\]/.test(s)) return true;                // 任意值 bg-[#fff]
  const tokens = s.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return false;
  if (tokens.some((t) => TW_PREFIX.test(t))) return true;      // 出现 Tailwind 工具类
  if (tokens.length >= 2 && tokens.every((t) => KEBAB.test(t))) return true; // 全 kebab
  return false;
}

export function isMeaningfulText(s: string): boolean {
  if (!s || !HAS_LATIN.test(s) || s.length < 2) return false;
  if (/^(https?:|\/|\.\/|#|@\/)/.test(s)) return false;
  if (/^[\w-]+\.(tsx?|json|png|jpg|svg|webp|css)$/.test(s)) return false;
  if (looksLikeClass(s)) return false;
  if (/^[A-Z_0-9]+$/.test(s)) return false;
  if (/^[a-z]+[A-Z][A-Za-z]*$/.test(s)) return false;
  if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(s)) return false;
  return true;
}

/**
 * 「展示形态」判定：用于数组元素。
 *
 * 数组元素必须区分两类，否则要么漏翻、要么改坏逻辑：
 *   const FEATURES = ["100+ gradient, mesh, and pattern backgrounds", ...]  ← 展示文案，要翻
 *   (["added","improved","fixed"] as const).map(...)                        ← 枚举值，绝不能翻
 * 判据取"长度 + 含空格 + 首字符形态"：长句多词才算展示文案，
 * 短小写 token 一律视为枚举/标识。
 */
export function isDisplayShaped(s: string): boolean {
  if (s.length < 10) return false;
  if (!/\s/.test(s)) return false;
  if (!/^[A-Z0-9(~$]/.test(s)) return false;
  return true;
}

export type Edit = {
  /** 替换区间（不含引号） */
  start: number;
  /** 替换区间结束（不含） */
  end: number;
  /** 字典键 = 英文原文 */
  key: string;
  kind: "jsxText" | "jsxAttr" | "jsxExpr" | "dataProp";
  /** 字符串字面量使用的引号字符；JSX 文本为 null */
  quote: string | null;
  /** JSX 文本节点：原始节点整段文本（用于保留前后空白） */
  raw?: string;
  /** JSX 文本节点：前导空白 */
  lead?: string;
  /** JSX 文本节点：尾随空白 */
  trail?: string;
};

export function collectEdits(filePath: string, src: string): Edit[] {
  const isTsx = /\.tsx$/.test(filePath);
  const sf = ts.createSourceFile(
    filePath, src, ts.ScriptTarget.Latest, true,
    isTsx ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const edits: Edit[] = [];

  const inNonText = (node: ts.Node): boolean => {
    let cur: ts.Node | undefined = node;
    while (cur) {
      if (
        ts.isJsxAttribute(cur) &&
        (STYLE_ATTRS.has(cur.name.getText(sf)) || STRUCT_ATTRS.has(cur.name.getText(sf)))
      ) return true;
      if (ts.isCallExpression(cur) && CLASS_FNS.has(cur.expression.getText(sf))) return true;
      if (ts.isPropertyAssignment(cur)) {
        const nm = cur.name.getText(sf).replace(/['"]/g, "");
        if (["className", "style", "keywords", "alternates", "images", "icons"].includes(nm)) return true;
      }
      // schema.org 结构化数据对象：含 @context/@graph/@type/@id 等以 @ 开头的键。
      // 这些值供搜索引擎解析，不是界面文案；且 @type 等枚举一旦翻译会破坏结构化数据。
      // 注意要穿过嵌套（{"@graph":[{ name: ... }]} 内层对象自身没有 @ 键）。
      if (ts.isObjectLiteralExpression(cur)) {
        for (const prop of cur.properties) {
          const name = prop.name?.getText(sf).replace(/['"]/g, "") ?? "";
          if (name.startsWith("@")) return true;
        }
      }
      cur = cur.parent;
    }
    return false;
  };

  // 字符串字面量的「内容区间」：跳过首尾引号
  const pushLiteral = (node: ts.StringLiteral | ts.NoSubstitutionTemplateLiteral, key: string, kind: Edit["kind"]) => {
    const start = node.getStart(sf);
    const end = node.getEnd();
    const quote = src[start];
    edits.push({ start: start + 1, end: end - 1, key, kind, quote });
  };

  /**
   * 判断字符串是否处于「渲染位」——即它的值会变成界面文字。
   *
   * 反例（必须排除，否则翻译会改变程序行为）：
   *   e.key === 'Enter'          → 比较运算
   *   setMode('gradient')        → 函数实参
   *   switch (v) { case 'tl': }  → case 标签
   *   { value: 'mac' }           → 对象属性值
   *
   * 正例（保留）：
   *   {"纯文本"}                  → JsxExpression 的直接表达式
   *   {cond ? "是" : "否"}        → 三元的分支
   *   {cond && "提示"}            → 逻辑与的右操作数
   */
  const isRenderPosition = (node: ts.Node): boolean => {
    let cur: ts.Node = node;
    let parent: ts.Node | undefined = cur.parent;
    while (parent) {
      if (ts.isJsxExpression(parent)) return parent.expression === cur;
      if (ts.isJsxAttribute(parent)) return false;
      if (ts.isJsxElement(parent) || ts.isJsxFragment(parent)) return false;

      if (ts.isBinaryExpression(parent)) {
        const k = parent.operatorToken.kind;
        const isComparison =
          k === ts.SyntaxKind.EqualsEqualsToken ||
          k === ts.SyntaxKind.EqualsEqualsEqualsToken ||
          k === ts.SyntaxKind.ExclamationEqualsToken ||
          k === ts.SyntaxKind.ExclamationEqualsEqualsToken ||
          k === ts.SyntaxKind.LessThanToken ||
          k === ts.SyntaxKind.GreaterThanToken ||
          k === ts.SyntaxKind.LessThanEqualsToken ||
          k === ts.SyntaxKind.GreaterThanEqualsToken;
        if (isComparison) return false;
        // `&&` / `||`：仅右操作数算渲染分支；`+` 拼接一律保守排除
        if (k === ts.SyntaxKind.AmpersandAmpersandToken || k === ts.SyntaxKind.BarBarToken) {
          if (parent.right !== cur) return false;
        } else {
          return false;
        }
      }
      // 函数实参：默认不是渲染。
      // 例外：toast / alert / confirm / setError 这类"用户可见提示"，
      // 其字符串实参本身就是界面文案（console.* 属开发者日志，不在此列）。
      if (ts.isCallExpression(parent) && parent.arguments.includes(cur as ts.Expression)) {
        const callee = parent.expression.getText(sf);
        if (/^(toast(\.[a-z]+)?|alert|confirm|setError|setErrorMessage)$/.test(callee)) return true;
        return false;
      }
      if (ts.isNewExpression(parent) && parent.arguments?.includes(cur as ts.Expression)) return false;
      // case / 属性名 / 属性值：交给 dataProp 通道或直接排除
      if (ts.isCaseClause(parent)) return false;
      if (ts.isPropertyAssignment(parent)) return false;
      if (ts.isVariableDeclaration(parent)) return false;
      if (ts.isReturnStatement(parent)) return false;

      // 数组字面量：元素通常是"数据/标识枚举"而非展示文本。
      // 例：{(["added","improved","fixed"] as const).map(...)} 里的枚举值，
      // 翻译后会破坏 c.type === type 这类比较（已在构建中被抓到过一次）。
      // 直接渲染字符串数组的场景极罕见，故一律保守排除。
      if (ts.isArrayLiteralExpression(parent)) return false;

      // 方法调用（.map/.filter/.find...）的对象：说明该值是被程序消费的，不是渲染
      if (ts.isPropertyAccessExpression(parent) && parent.expression === cur) {
        const gp = parent.parent;
        if (ts.isCallExpression(gp)) return false;
      }

      cur = parent;
      parent = parent.parent;
    }
    return false;
  };

  const visit = (node: ts.Node) => {
    if (isTsx && ts.isJsxText(node)) {
      const raw = node.getText(sf);
      const norm = raw.replace(/\s+/g, " ").trim();
      if (isMeaningfulText(norm)) {
        const lead = raw.match(/^\s*/)![0];
        const trail = raw.match(/\s*$/)![0];
        const s = node.getStart(sf) + lead.length;
        const e = node.getEnd() - trail.length;
        edits.push({ start: s, end: e, key: norm, kind: "jsxText", quote: null, raw, lead, trail });
      }
    } else if (isTsx && ts.isJsxAttribute(node) && node.initializer && ts.isStringLiteral(node.initializer)) {
      const attr = node.name.getText(sf);
      if (
        TEXT_ATTRS.has(attr) && !NEVER_TRANSLATE_KEYS.has(attr) &&
        isMeaningfulText(node.initializer.text)
      ) {
        pushLiteral(node.initializer, node.initializer.text, "jsxAttr");
      }
    } else if (isTsx && ts.isStringLiteral(node)) {
      let cur: ts.Node | undefined = node.parent;
      let insideJsxChild = false;
      while (cur) {
        if (ts.isJsxExpression(cur)) { insideJsxChild = true; break; }
        if (ts.isJsxAttribute(cur)) break;
        cur = cur.parent;
      }
      if (
        insideJsxChild &&
        isMeaningfulText(node.text) &&
        !inNonText(node) &&
        isRenderPosition(node)
      ) {
        pushLiteral(node, node.text, "jsxExpr");
      }
    }

    if (ts.isPropertyAssignment(node) && node.initializer && ts.isStringLiteral(node.initializer)) {
      const key = node.name.getText(sf).replace(/['"]/g, "");
      const val = node.initializer.text;
      if (
        TEXT_PROP_KEYS.has(key) && !NEVER_TRANSLATE_KEYS.has(key) &&
        isMeaningfulText(val) &&
        !ts.isJsxAttribute(node.parent) && !inNonText(node)
      ) {
        pushLiteral(node.initializer, val, "dataProp");
      }
    }

    // 数组元素中的展示文案：const FEATURES = ["...", "..."]
    // 仅收"展示形态"的长句，短枚举值（["added","improved"]）保持原样。
    if (
      ts.isStringLiteral(node) &&
      node.parent && ts.isArrayLiteralExpression(node.parent) &&
      isMeaningfulText(node.text) &&
      isDisplayShaped(node.text) &&
      !inNonText(node)
    ) {
      pushLiteral(node, node.text, "dataProp");
    }

    // 用户可见提示：toast / alert / confirm / setError 的字符串实参。
    // 它们位于事件处理函数体内，不经过 JSX 表达式，需单独一条通道收集。
    // console.* 属开发者日志，刻意不收。
    if (
      ts.isStringLiteral(node) && node.parent && ts.isCallExpression(node.parent) &&
      node.parent.arguments.includes(node) &&
      /^(toast(\.[a-z]+)?|alert|confirm|setError|setErrorMessage)$/.test(
        node.parent.expression.getText(sf),
      ) &&
      isMeaningfulText(node.text) && !inNonText(node)
    ) {
      pushLiteral(node, node.text, "jsxExpr");
    }

    ts.forEachChild(node, visit);
  };
  visit(sf);

  // 去重：同一区间可能被 jsxExpr 与 dataProp 两条通道各记一次，
  // 不去重会导致从后往前替换时二次替换，直接改坏源码。
  const byRange = new Map<string, Edit>();
  for (const e of edits) {
    const k = `${e.start}:${e.end}`;
    const prev = byRange.get(k);
    // 同一区间优先保留 dataProp（语义更明确）
    if (!prev || (prev.kind === "jsxExpr" && e.kind === "dataProp")) byRange.set(k, e);
  }
  return [...byRange.values()].sort((a, b) => a.start - b.start);
}

/**
 * 转义译文，**不带引号**。
 *
 * 注意：替换区间只覆盖引号内部（见 pushLiteral），引号原样保留在区间外，
 * 因此这里绝不能补引号——否则会得到 aria-label=""值"" 这种双引号。
 *
 * JSX 属性值不是 JS 字符串字面量，不能用反斜杠转义，
 * 需要改成 HTML 实体；而 JS 表达式/对象属性里的字符串则相反。
 */
export function encodeLiteral(zh: string, quote: string, kind: Edit["kind"]): string {
  if (kind === "jsxAttr") {
    // JSX 属性：不能反斜杠转义
    return zh
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\r?\n/g, " ");
  }
  // 真实 JS 字符串字面量
  let out = zh.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n");
  if (quote === "`") {
    out = out.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  } else {
    out = out.split(quote).join("\\" + quote);
  }
  return out;
}

export const EXCLUDE_FILES = [
  "lib/api/openapi.ts",
  "lib/agents/",
  "lib/constants/fonts.ts",
  "lib/constants/aspect-ratios.ts",
  // schema.org 结构化数据：字段值供搜索引擎解析，不是界面文案
  "lib/seo/json-ld.ts",
];

export function isExcluded(relPath: string): boolean {
  return EXCLUDE_FILES.some((x) => relPath.startsWith(x));
}
