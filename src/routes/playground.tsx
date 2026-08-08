import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ANGULAR_PRESETS, getPreset } from "@/data/angular-presets";
import { AngularPlayground } from "@/components/AngularPlayground";
import { Code2, Keyboard } from "lucide-react";
import { cn } from "@/lib/utils";

type PlaygroundSearch = {
  example?: string;
};

export const Route = createFileRoute("/playground")({
  validateSearch: (search: Record<string, unknown>): PlaygroundSearch => ({
    example:
      typeof search.example === "string" && search.example.length > 0
        ? search.example
        : undefined,
  }),
  component: PlaygroundPage,
});

function PlaygroundPage() {
  const { example } = Route.useSearch();
  const [activeId, setActiveId] = useState(example ?? "counter");
  const preset = useMemo(() => getPreset(activeId), [activeId]);

  return (
    <div className="mx-auto max-w-5xl pb-16">
      <header className="mb-5">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Code2 className="h-3.5 w-3.5" />
          代码演练场
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          Angular 示例工坊
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          浏览真实{" "}
          <code className="rounded-sm bg-surface-3 px-1.5 py-0.5 font-mono text-xs text-primary">
            .ts
          </code>{" "}
          组件源码，右侧是与逻辑等价的交互预览。复制到本地{" "}
          <code className="rounded-sm bg-surface-3 px-1.5 py-0.5 font-mono text-xs">
            ng new
          </code>{" "}
          项目即可运行。
        </p>
      </header>

      <div className="mb-4 flex flex-wrap gap-2">
        {ANGULAR_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveId(p.id)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150",
              activeId === p.id
                ? "bg-primary text-primary-fg"
                : "bg-surface-3 text-muted hover:text-fg",
            )}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm">
          <span className="font-medium text-fg">{preset.title}</span>
          <span className="text-muted"> · {preset.summary}</span>
        </div>
        <p className="inline-flex items-center gap-1.5 text-[11px] text-subtle">
          <Keyboard className="h-3 w-3" />
          多文件标签切换 · 对照预览操作
        </p>
      </div>

      <AngularPlayground key={preset.id} preset={preset} />

      <aside className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          {
            t: "读源码",
            d: "左侧是完整 Standalone 组件示例，含 template / styles。",
          },
          {
            t: "看预览",
            d: "右侧交互面板与源码同一套逻辑，改输入立刻反馈。",
          },
          {
            t: "本地跑",
            d: "复制到 Angular CLI 项目，配合课程逐步加深。",
          },
        ].map((item) => (
          <div
            key={item.t}
            className="rounded-lg border border-border bg-surface-2 px-3.5 py-3"
          >
            <p className="text-sm font-medium text-fg">{item.t}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{item.d}</p>
          </div>
        ))}
      </aside>
    </div>
  );
}
