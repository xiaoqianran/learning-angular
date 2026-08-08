/**
 * Generate public/llms.txt + public/llms-full.txt
 *
 *   node scripts/generate-llms.mjs
 *
 * Requires: npx esbuild (devDependency via template) or global.
 * Wired into build:pages so GitHub Pages always ships fresh files.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public");
const bundle = path.join(root, "node_modules/.cache/lessons-llms.mjs");
fs.mkdirSync(path.dirname(bundle), { recursive: true });

execSync(
  `npx esbuild ${path.join(root, "src/data/lessons.ts")} --bundle --format=esm --platform=node --outfile=${bundle}`,
  { stdio: "inherit", cwd: root },
);

const { LESSONS } = await import(pathToFileURL(bundle).href + `?t=${Date.now()}`);
const SITE = "https://xiaoqianran.github.io/learning-angular";

function blockMd(b) {
  if (b.type === "text") {
    const head = b.title ? `### ${b.title}\n\n` : "";
    return `${head}${b.body || ""}\n`;
  }
  if (b.type === "tip") return `> **提示：** ${b.body || ""}\n`;
  if (b.type === "code") {
    const head = b.title ? `### ${b.title}\n\n` : "";
    return `${head}\`\`\`${b.lang || ""}\n${b.code || ""}\n\`\`\`\n`;
  }
  if (b.type === "demo") {
    const h = b.hint ? ` — ${b.hint}` : "";
    return `**交互 Demo：** ${b.title || ""}${h}（kind: \`${b.kind}\`）\n`;
  }
  if (b.type === "quiz") {
    const lines = ["**测验：**"];
    for (const q of b.questions || []) {
      lines.push(`- Q: ${q.question}`);
      (q.options || []).forEach((o, i) => {
        lines.push(`  - [${i === q.answer ? "✓" : " "}] ${o}`);
      });
      lines.push(`  - 解析: ${q.explain}`);
    }
    return lines.join("\n") + "\n";
  }
  return "";
}

const byTrack = new Map();
for (const l of LESSONS) {
  const t = l.track || "其他";
  if (!byTrack.has(t)) byTrack.set(t, []);
  byTrack.get(t).push(l);
}
const order = ["基础", "进阶", "全栈准备", "全栈实训", "工程化", "进阶模式"];
const tracks = [
  ...order.filter((t) => byTrack.has(t)),
  ...[...byTrack.keys()].filter((t) => !order.includes(t)),
];

const index = [
  "# learning-angular",
  "",
  "> 交互式中文 Angular 教程：课程 + 源码 + Demo + 测验 + 全栈工坊。对齐 [angular.dev/llms.txt](https://angular.dev/llms.txt) 主路径；权威 API 以官网为准。",
  "",
  `完整上下文（全文）：[${SITE}/llms-full.txt](${SITE}/llms-full.txt)`,
  "",
  "## 官方权威（务必优先）",
  "",
  "- [angular.dev/llms.txt](https://angular.dev/llms.txt) — 官方索引",
  "- [angular.dev/assets/context/llms-full.txt](https://angular.dev/assets/context/llms-full.txt) — 官方全文",
  "- [Build with AI](https://angular.dev/ai) · [Develop with AI](https://angular.dev/ai/develop-with-ai)",
  "",
  "## 站点入口",
  "",
  `- [首页大纲](${SITE}/): 搜索、路径筛选、学习进度`,
  `- [文档地图](${SITE}/docs): 官方文档 ⇄ 本站课`,
  `- [代码演练场](${SITE}/playground): 示例源码 + 预览`,
  `- [全栈工坊](${SITE}/studio): 全栈工坊 · REST 闯关`,
  `- [速查表](${SITE}/cheatsheet): API 与 Vue→Angular 对照`,
  `- [学习中心](${SITE}/hub): 打卡 / 收藏 / 错题`,
  `- [练习场](${SITE}/lab): 随机测验`,
  `- [结业证明](${SITE}/certificate): 完成后解锁`,
  "",
];
for (const tr of tracks) {
  index.push(`## 课程 · ${tr}`, "");
  for (const l of byTrack.get(tr)) {
    index.push(
      `- [${l.title}](${SITE}/lesson/${l.slug}): ${l.summary || ""}（${l.level} · ${l.minutes} 分钟）`,
    );
  }
  index.push("");
}
index.push(
  "## 官方 Angular（权威）",
  "",
  "- [angular.dev/llms.txt](https://angular.dev/llms.txt): 官方文档索引",
  "- [angular.dev llms-full.txt](https://angular.dev/assets/context/llms-full.txt): 官方完整上下文",
  "- [Develop with AI](https://angular.dev/ai/develop-with-ai)",
  "",
  "## 可选",
  "",
  "- [GitHub 仓库](https://github.com/xiaoqianran/learning-angular)",
  "- [姊妹项目 learning-vue3](https://github.com/xiaoqianran/learning-vue3)",
  "",
  "## 给工具的提示",
  "",
  "- 生成代码时优先：Standalone、`signal`/`computed`/`input`/`output`、`inject()`、`provideHttpClient`、`@if`/`@for`。",
  "- 不要默认生成 NgModule 旧风格，除非用户明确要求。",
  "",
);

const full = [
  "# learning-angular — Full curriculum context",
  "",
  "> 供 LLM / IDE 一次拉取的完整课程正文。索引见 llms.txt。",
  `> 站点：${SITE}`,
  `> 生成时间：${new Date().toISOString()}`,
  `> 课程数：${LESSONS.length}`,
  "",
  "## How to use",
  "",
  "1. 将本文件作为 context 附件，生成现代 Angular 代码（Standalone + Signals）。",
  "2. 权威 API 以 https://angular.dev 为准。",
  "3. 本站强调中文讲解、Demo 逻辑、测验与全栈工坊心智。",
  "",
  "---",
  "",
];
for (const tr of tracks) {
  full.push(`# Track: ${tr}`, "");
  for (const l of byTrack.get(tr)) {
    full.push(
      `## ${l.title}`,
      "",
      `- slug: \`${l.slug}\``,
      `- level: ${l.level}`,
      `- minutes: ${l.minutes}`,
      `- url: ${SITE}/lesson/${l.slug}`,
      `- summary: ${l.summary}`,
      "",
    );
    for (const b of l.blocks || []) {
      full.push(blockMd(b), "");
    }
    full.push("---", "");
  }
}
full.push(
  "# Studio mock API",
  "",
  "演示账号：`demo@angular.dev` / `password123`",
  "闯关：登录 → 401 → 笔记 CRUD → 退出",
  `URL: ${SITE}/studio`,
  "",
);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "llms.txt"), index.join("\n"));
fs.writeFileSync(path.join(outDir, "llms-full.txt"), full.join("\n"));
console.log("llms.txt", fs.statSync(path.join(outDir, "llms.txt")).size);
console.log("llms-full.txt", fs.statSync(path.join(outDir, "llms-full.txt")).size);
