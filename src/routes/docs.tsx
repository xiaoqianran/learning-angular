import { createFileRoute, Link } from "@tanstack/react-router";
import { DOC_SECTIONS } from "@/data/docs-map";
import { BookOpen, ExternalLink, Library } from "lucide-react";

export const Route = createFileRoute("/docs")({
  component: DocsMapPage,
});

function DocsMapPage() {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const llms = `${base}/llms.txt`;
  const llmsFull = `${base}/llms-full.txt`;
  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Library className="h-3.5 w-3.5" />
          v3 · 对照官方 llms.txt
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg sm:text-3xl">
          文档地图
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          按{" "}
          <a
            href="https://angular.dev/llms.txt"
            target="_blank"
            rel="noreferrer"
            className="text-primary no-underline hover:underline"
          >
            angular.dev/llms.txt
          </a>{" "}
          的结构整理。左侧官方权威文档，右侧本站交互课（有则跳转）。我们做「动手 + 测验 + 工坊」，官网做「规范全文 + API」。
        </p>
      </header>

      <div className="mb-6 space-y-3 rounded-xl border border-border bg-surface-2 px-4 py-3 text-xs leading-relaxed text-muted">
        <p>
          <span className="font-medium text-fg">本站 LLM 文件（已发布）：</span>
          <a className="mx-1 text-primary hover:underline" href={llms} target="_blank" rel="noreferrer">llms.txt</a>
          ·
          <a className="mx-1 text-primary hover:underline" href={llmsFull} target="_blank" rel="noreferrer">llms-full.txt</a>
          <span className="text-subtle"> — 构建时从课程自动生成，GitHub Pages 静态托管</span>
        </p>
        <p>
          官方 AI 资源：
          <a className="mx-1 text-primary hover:underline" href="https://angular.dev/llms.txt" target="_blank" rel="noreferrer">angular.dev/llms.txt</a>
          ·
          <a className="mx-1 text-primary hover:underline" href="https://angular.dev/assets/context/llms-full.txt" target="_blank" rel="noreferrer">llms-full.txt</a>
          ·
          <a className="mx-1 text-primary hover:underline" href="https://angular.dev/ai" target="_blank" rel="noreferrer">Build with AI</a>
        </p>
      </div>

      <div className="grid gap-4">
        {DOC_SECTIONS.map((sec) => (
          <section
            key={sec.title}
            className="overflow-hidden rounded-xl border border-border bg-surface"
          >
            <h2 className="border-b border-border bg-surface-2 px-4 py-2.5 font-display text-sm font-semibold text-fg">
              {sec.title}
            </h2>
            <ul className="divide-y divide-border">
              {sec.items.map((it) => (
                <li
                  key={it.title + it.official}
                  className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-fg">{it.title}</p>
                    {it.note ? (
                      <p className="mt-0.5 text-xs text-subtle">{it.note}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={it.official}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-bg px-2.5 py-1 text-[11px] text-muted no-underline hover:text-fg"
                    >
                      官网
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    {it.lessonSlug ? (
                      <Link
                        to="/lesson/$slug"
                        params={{ slug: it.lessonSlug }}
                        className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-[11px] text-primary no-underline hover:opacity-90"
                      >
                        <BookOpen className="h-3 w-3" />
                        本站课
                      </Link>
                    ) : (
                      <span className="rounded-full bg-surface-3 px-2.5 py-1 text-[11px] text-subtle">
                        以官网为准
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
