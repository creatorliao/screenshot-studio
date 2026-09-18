/**
 * 用户旅程模拟（确定性、可重复）
 *
 * 用真实 Chromium 走一遍核心旅程，全程收集 pageerror / console.error /
 * 失败请求，并在最后给出"应用自身错误"与"第三方噪声"分开的结论。
 *
 * 用法：
 *   npm run build && npm start          # 或 npm run dev
 *   node scripts/user-sim.mjs [baseUrl] # 默认 http://localhost:3000
 *
 * 退出码：应用自身有 pageerror / console.error / 步骤失败 → 1；否则 0。
 */
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const BASE = process.argv[2] ?? 'http://localhost:3000';
const ROOT = path.resolve('.');
const OUT = path.join(ROOT, '.sim', 'out');
const FIXTURES = path.join(ROOT, '.sim');
fs.mkdirSync(OUT, { recursive: true });

/**
 * 本机安装的 Chromium 构建号可能比当前 playwright 包期望的新，
 * 默认查找路径会落空。直接指定已安装的可执行文件，避免为跑一次模拟去下载浏览器。
 */
function resolveChromium() {
  const root = path.join(process.env.USERPROFILE ?? process.env.HOME ?? '', 'AppData', 'Local', 'ms-playwright');
  if (!fs.existsSync(root)) return undefined;
  const candidates = [];
  for (const dir of fs.readdirSync(root)) {
    if (dir.startsWith('chromium-')) {
      candidates.push(path.join(root, dir, 'chrome-win64', 'chrome.exe'));
    } else if (dir.startsWith('chromium_headless_shell-')) {
      candidates.push(path.join(root, dir, 'chrome_headless_shell-win64', 'chrome-headless-shell.exe'));
    }
  }
  return candidates.find((p) => fs.existsSync(p));
}

/** 第三方脚本的报错不算应用缺陷，但要在报告里列出来。 */
const THIRD_PARTY = [
  'posthog',
  'google-analytics',
  'googletagmanager',
  'googlesyndication',
  'doubleclick',
  'palmframe',
  'databuddy',
  'recaptcha',
  'AdSense',
];
const isThirdParty = (text) => THIRD_PARTY.some((k) => text.toLowerCase().includes(k.toLowerCase()));

/**
 * 浏览器对失败资源只给一句 "Failed to load resource: ... 404 ()"，**不带 URL**，
 * 所以无法按域名判断归属。真正的归属由 response/requestfailed 两个钩子按 URL 判定，
 * 这里只把这种泛化消息记为"待归因"，不直接当成应用缺陷。
 */
const isGenericResourceError = (text) => /Failed to load resource/i.test(text);

const appConsoleErrors = [];
const thirdPartyErrors = [];
const appWarnings = [];
const pageErrors = [];
const failedRequests = [];
const steps = [];

function step(name, ok, detail = '') {
  steps.push({ name, ok, detail });
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
}
function section(title) {
  console.log(`\n── ${title} ──`);
}

const browser = await chromium.launch({ executablePath: resolveChromium() });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  acceptDownloads: true,
});
const page = await context.newPage();

page.on('console', (msg) => {
  const text = msg.text();
  if (msg.type() === 'error') {
    if (isThirdParty(text) || isGenericResourceError(text)) thirdPartyErrors.push(text);
    else appConsoleErrors.push(text);
  } else if (msg.type() === 'warning') {
    (isThirdParty(text) ? thirdPartyErrors : appWarnings).push(text);
  }
});
page.on('pageerror', (err) => pageErrors.push(`${err.name}: ${err.message}`));
page.on('requestfailed', (req) => {
  const url = req.url();
  const err = req.failure()?.errorText ?? '';
  // Next.js 的 <Link> 预取（?_rsc=…）在页面跳转/被新的预取取代时会主动 abort，
  // 这是预期行为，不是失败。
  if (err.includes('ERR_ABORTED') && url.includes('_rsc=')) return;
  if (!isThirdParty(url)) failedRequests.push(`${req.method()} ${url} — ${err}`);
});
page.on('response', (res) => {
  const url = res.url();
  if (res.status() >= 400 && !isThirdParty(url)) failedRequests.push(`HTTP ${res.status()} ${url}`);
});

/** 背景面板的 4 个分类 Tab 在同一个 grid 里；用这个精确容器避免误点编辑器模式开关。 */
const bgTabBar = () => page.locator('div.grid.grid-cols-4').filter({ hasText: '纯色' }).first();

async function importViaHeader(label, file) {
  const [chooser] = await Promise.all([
    page.waitForEvent('filechooser', { timeout: 20000 }),
    page.getByRole('button', { name: label, exact: true }).click(),
  ]);
  await chooser.setFiles(file);
}

try {
  // ── 1. 空画布首屏 ────────────────────────────────────────────────
  section('1. 首屏（空画布）');
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForLoadState('networkidle', { timeout: 45000 }).catch(() => {});

  const errorOverlay = await page.evaluate(() => {
    const portal = document.querySelector('nextjs-portal');
    const shadow = portal?.shadowRoot;
    return !!(shadow && shadow.querySelector('[data-nextjs-dialog], [data-nextjs-error-overlay], nextjs-error-overlay'));
  });
  step('无 Next.js 错误浮层', !errorOverlay);

  await page.getByRole('heading', { name: '把图片放进来' }).waitFor({ timeout: 30000 });
  step('出现「把图片放进来」引导', true);

  const entries = await page.locator('button', { hasText: /^(选择文件|网页截图|粘贴或拖放)$/ }).count();
  step('三个带文字入口齐全', entries === 3, `count=${entries}`);
  step('显示格式与大小上限', (await page.getByText(/支持 PNG \/ JPG \/ WebP/).count()) > 0);
  step('空画布时左右属性面板已收起',
    (await page.getByText('绘制与标注').count()) === 0 && (await page.getByText('微调').count()) === 0);
  step('头部有常驻「导入图片」按钮',
    (await page.getByRole('button', { name: '导入图片', exact: true }).count()) === 1);
  await page.screenshot({ path: path.join(OUT, '01-empty.png') });

  // ── 2. 导入 ─────────────────────────────────────────────────────
  section('2. 导入第一张图');
  await importViaHeader('导入图片', path.join(FIXTURES, 'shot-a.png'));
  await page.waitForSelector('img[src^="blob:"]', { timeout: 30000 });
  step('画布出现主图', true);
  await page.getByRole('button', { name: '替换图片', exact: true }).waitFor({ timeout: 15000 });
  step('头部按钮变为「替换图片」', true);
  await page.getByText('绘制与标注').first().waitFor({ timeout: 20000 });
  step('左侧属性面板出现', true);
  step('出现「下一步」指引', (await page.getByText(/图片已导入。下一步/).count()) > 0);
  await page.screenshot({ path: path.join(OUT, '02-imported.png') });

  // ── 3. 换背景 ───────────────────────────────────────────────────
  section('3. 换背景');
  await page.getByRole('button', { name: '背景', exact: true }).first().click();
  await bgTabBar().waitFor({ timeout: 15000 });
  step('背景面板出现分类 Tab', true);
  step('四个分类 Tab 齐全',
    (await bgTabBar().locator('button').count()) === 4,
    `count=${await bgTabBar().locator('button').count()}`);
  step('渐变分类有搜索框', (await page.getByPlaceholder(/搜索渐变名称/).count()) > 0);

  /**
   * 背景面板的作用域：`SectionWrapper` 根节点是 `div.mb-1`，
   * 只有背景那一个含"背景调整"文案。必须这样收窄 ——
   * 直接写 `button[title]` 会先命中编辑器模式开关（它同样有 title 与 aria-pressed），
   * 于是"点了渐变"其实点的是"切到图片模式"，看起来像功能失效。
   */
  const bgPanel = page.locator('div.mb-1').filter({ hasText: '背景调整' }).first();
  const canvasBg = () =>
    page.evaluate(() => {
      const el = document.getElementById('canvas-background');
      if (!el) return '';
      const cs = getComputedStyle(el);
      return cs.backgroundImage !== 'none' ? cs.backgroundImage : cs.backgroundColor;
    });

  const bgBefore = await canvasBg();

  // 渐变候选网格是面板内唯一的 grid-cols-3
  const gradientSwatches = bgPanel.locator('div.grid-cols-3 button[title][aria-pressed]');
  const namedCount = await gradientSwatches.count();
  step('渐变候选渲染为带名字的可点卡片', namedCount > 0, `count=${namedCount}`);

  const targetSwatch = gradientSwatches.nth(1);
  const targetName = await targetSwatch.getAttribute('title');
  await targetSwatch.click();
  await page.waitForTimeout(1500); // 背景层有 400ms crossfade
  const bgAfterGradient = await canvasBg();
  step('点击渐变候选后画布背景真的变了',
    bgAfterGradient !== bgBefore && /gradient/.test(bgAfterGradient),
    `选中「${targetName}」→ ${bgAfterGradient.slice(0, 60)}`);

  await page.getByPlaceholder(/搜索渐变名称/).fill('ocean');
  await page.waitForTimeout(500);
  const filterText = (await page.getByText(/当前显示 \d+ 个/).first().textContent())?.trim() ?? '';
  const shown = Number(filterText.match(/当前显示 (\d+) 个/)?.[1] ?? -1);
  step('搜索可过滤候选', shown >= 0 && shown < namedCount, filterText);
  await page.getByPlaceholder(/搜索渐变名称/).fill('');
  await page.waitForTimeout(300);

  // 纯色：验证背景真的切成纯色
  await bgTabBar().getByRole('button', { name: '纯色', exact: true }).click();
  await page.waitForTimeout(600);
  const solidSwatches = bgPanel.locator('div.grid-cols-4 button[title][aria-pressed]');
  const solidCount = await solidSwatches.count();
  step('纯色分类有候选', solidCount > 0, `count=${solidCount}`);
  await solidSwatches.nth(1).click();
  await page.waitForTimeout(1200);
  const bgAfterSolid = await canvasBg();
  step('点击纯色后画布背景变成纯色',
    bgAfterSolid !== bgAfterGradient && /rgb/.test(bgAfterSolid),
    bgAfterSolid.slice(0, 50));

  // 回到渐变再做收藏
  await bgTabBar().getByRole('button', { name: '渐变', exact: true }).click();
  await page.waitForTimeout(600);
  const favCount = await page.locator('button[aria-label^="收藏 "]').count();
  step('候选可收藏（星标按钮存在）', favCount > 0, `count=${favCount}`);
  await page.locator('button[aria-label^="收藏 "]').first().click({ force: true });
  await page.waitForTimeout(800);
  step('点击收藏后出现「收藏」分组', (await page.getByText('收藏', { exact: true }).count()) > 0);
  step('出现「最近使用」分组', (await page.getByText('最近使用', { exact: true }).count()) > 0);

  step('背景调整三滑块齐全',
    (await page.getByText('不透明度', { exact: true }).count()) > 0 &&
    (await page.getByText('模糊', { exact: true }).count()) > 0 &&
    (await page.getByText('颗粒', { exact: true }).count()) > 0);
  await page.screenshot({ path: path.join(OUT, '03-background.png') });

  // 图片分类 Tab + 自定义背景上传
  section('4. 背景·图片分类与自定义上传');
  await bgTabBar().getByRole('button', { name: '图片', exact: true }).click();
  await page.waitForTimeout(800);
  const imgSwatches = await page.locator('button[title^="抽象 "]').count();
  step('图片分类候选带名字', imgSwatches > 0, `count=${imgSwatches}`);
  step('图片分类含「示例」分组（原本不可达的 11 张）',
    (await page.getByRole('button', { name: '示例', exact: true }).count()) > 0);

  const uploadZone = page.getByText('上传自己的背景图');
  step('存在自定义背景上传区', (await uploadZone.count()) > 0);
  const bgInput = page.locator('input[type="file"]').filter({ hasNot: page.locator('[multiple]') });
  const bgInputsBefore = await page.locator('input[type="file"]').count();
  // 背景上传 input 是 multiple=false 的那个
  const bgFileInput = page.locator('input[type="file"]:not([multiple])').first();
  step('背景上传 input 已挂载', (await bgFileInput.count()) > 0, `inputs=${bgInputsBefore}`);
  await bgFileInput.setInputFiles(path.join(FIXTURES, 'shot-b.jpg'));
  await page.waitForTimeout(2500);
  step('上传自定义背景图生效',
    (await page.locator('img[alt="当前自定义背景"]').count()) > 0);
  await page.screenshot({ path: path.join(OUT, '04-bg-upload.png') });

  // ── 5. 特效（阴影） ─────────────────────────────────────────────
  section('5. 背景·特效（阴影）');
  await bgTabBar().getByRole('button', { name: '特效', exact: true }).click();
  await page.waitForTimeout(800);
  // 只在特效面板的网格内计数，避免把隐藏的「模板」覆盖层里的预设预览图算进来
  const shadowGrid = page.locator('div.grid.grid-cols-4').filter({ hasText: '无' }).first();
  const shadowThumbs = await shadowGrid.locator('img[src*="/overlay-shadow/"]').count();
  step('阴影候选 19 个全部可达', shadowThumbs === 19, `count=${shadowThumbs}`);
  const shadowBtn = shadowGrid.locator('button[aria-pressed]').nth(1);
  await shadowBtn.click();
  await page.waitForTimeout(900);
  step('选中阴影后出现「阴影强度」滑块',
    (await page.getByText('阴影强度', { exact: true }).count()) > 0);

  // ── 6. 加文字 ───────────────────────────────────────────────────
  section('6. 添加文字');
  await page.getByRole('button', { name: '设计', exact: true }).first().click();
  await page.waitForTimeout(600);
  await page.getByRole('button', { name: '添加文字' }).first().click();
  await page.waitForTimeout(800);
  const textBefore = await page.locator('text=文字').count();
  step('可添加文字层', textBefore > 0, `命中 ${textBefore}`);

  // ── 7. 换主图（保留样式） ───────────────────────────────────────
  section('7. 换主图（保留样式）');
  const shadowBefore = await page.getByText('阴影强度', { exact: true }).count();
  await importViaHeader('替换图片', path.join(FIXTURES, 'shot-b.jpg'));
  await page.waitForTimeout(3000);
  step('换主图后画布仍有主图',
    (await page.locator('img[src^="blob:"]').count()) > 0);
  const textAfter = await page.locator('text=文字').count();
  step('换主图后文字层仍在', textAfter >= textBefore, `before=${textBefore} after=${textAfter}`);
  await page.screenshot({ path: path.join(OUT, '05-replaced.png') });

  // ── 8. 导出 ─────────────────────────────────────────────────────
  section('8. 导出');
  const openExport = async () => {
    await page.locator('header button').filter({ hasText: /^保存$/ }).first().click();
    await page.waitForTimeout(900);
  };
  await openExport();
  step('导出面板可打开', (await page.getByText(/导出为/).count()) > 0);

  const exportBtn = page.locator('[data-radix-popper-content-wrapper] button').last();
  const exportLabel = ((await exportBtn.textContent()) ?? '').replace(/\s+/g, ' ').trim();
  step('导出按钮文案为「导出为 <格式>」', /^导出为\s*(JPEG|PNG|WebP)$/.test(exportLabel), exportLabel);

  const [dl] = await Promise.all([
    page.waitForEvent('download', { timeout: 90000 }),
    exportBtn.click(),
  ]);
  const saved = path.join(OUT, 'export-default' + path.extname(dl.suggestedFilename() || '.png'));
  await dl.saveAs(saved);
  const size = fs.statSync(saved).size;
  step('默认格式导出成功落盘', size > 1000, `${dl.suggestedFilename()} ${size}B`);

  // 切 PNG 再导一次
  await page.waitForTimeout(1500);
  await openExport();
  await page.locator('[data-radix-popper-content-wrapper] button').filter({ hasText: /^PNG$/ }).first().click();
  await page.waitForTimeout(500);
  const exportBtn2 = page.locator('[data-radix-popper-content-wrapper] button').last();
  const [dl2] = await Promise.all([
    page.waitForEvent('download', { timeout: 90000 }),
    exportBtn2.click(),
  ]);
  const saved2 = path.join(OUT, 'export-png' + path.extname(dl2.suggestedFilename() || '.png'));
  await dl2.saveAs(saved2);
  step('切换 PNG 后导出成功落盘',
    fs.statSync(saved2).size > 1000 && /\.png$/i.test(saved2),
    `${dl2.suggestedFilename()} ${fs.statSync(saved2).size}B`);
  await page.screenshot({ path: path.join(OUT, '06-exported.png') });

  // ── 9. 移动端 ───────────────────────────────────────────────────
  section('9. 移动端视口');
  const mobile = await context.newPage();
  mobile.on('pageerror', (e) => pageErrors.push(`[mobile] ${e.message}`));
  mobile.on('console', (m) => {
    if (m.type() === 'error') (isThirdParty(m.text()) ? thirdPartyErrors : appConsoleErrors).push(`[mobile] ${m.text()}`);
  });
  await mobile.setViewportSize({ width: 390, height: 844 });
  await mobile.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await mobile.getByRole('heading', { name: '把图片放进来' }).waitFor({ timeout: 30000 });
  step('移动端首屏出现引导', true);
  step('移动端空画布时「设置」入口已收起',
    (await mobile.getByRole('button', { name: '设置' }).count()) === 0);
  await mobile.screenshot({ path: path.join(OUT, '07-mobile.png') });
  await mobile.close();
} catch (err) {
  step('模拟过程未中断', false, String(err).slice(0, 400));
  await page.screenshot({ path: path.join(OUT, '99-crash.png') }).catch(() => {});
} finally {
  await browser.close();
}

// 把"会被用户看见的渲染缺陷"提升为断言：next/image 的 fill 需要已定位父元素，
// 缺了它图片铺不满（这一条曾经因为漏写 `relative` 真实发生过）。
section('10. 渲染缺陷断言');
const fillWarnings = appWarnings.filter((w) => /has "fill" and parent element with invalid "position"/.test(w));
step('无 next/image fill 定位告警', fillWarnings.length === 0, `count=${fillWarnings.length}`);

// ── 报告 ──────────────────────────────────────────────────────────
const failedSteps = steps.filter((s) => !s.ok);

console.log('\n================ 应用自身错误 ================');
console.log(`pageerror        : ${pageErrors.length}`);
pageErrors.forEach((e) => console.log(`   ✗ ${e}`));
console.log(`console.error    : ${appConsoleErrors.length}`);
appConsoleErrors.forEach((e) => console.log(`   ✗ ${e.slice(0, 300)}`));
console.log(`失败请求         : ${failedRequests.length}`);
failedRequests.forEach((e) => console.log(`   ✗ ${e.slice(0, 200)}`));
console.log(`console.warn     : ${appWarnings.length}`);
appWarnings.forEach((e) => console.log(`   ! ${e.slice(0, 200)}`));

console.log('\n================ 第三方噪声（非应用缺陷） ================');
console.log(`条数: ${thirdPartyErrors.length}`);
thirdPartyErrors.slice(0, 10).forEach((e) => console.log(`   · ${e.slice(0, 160)}`));

console.log(`\n步骤：${steps.length - failedSteps.length}/${steps.length} 通过`);
failedSteps.forEach((s) => console.log(`   FAIL ${s.name}  ${s.detail}`));

fs.writeFileSync(
  path.join(OUT, 'report.json'),
  JSON.stringify({ base: BASE, steps, pageErrors, appConsoleErrors, appWarnings, failedRequests, thirdPartyErrors }, null, 2),
);
console.log(`\n报告：${path.join(OUT, 'report.json')}`);

const healthy = failedSteps.length === 0 && pageErrors.length === 0 && appConsoleErrors.length === 0;
console.log(healthy ? '\n✅ 结论：用户旅程全通过，应用自身 0 报错' : '\n❌ 结论：存在问题，见上');
process.exit(healthy ? 0 : 1);
