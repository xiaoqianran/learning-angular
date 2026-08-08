import { useEffect, useId, useState } from "react";
import type { DemoKind } from "@/data/lessons";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { getDemoSource } from "@/data/demo-sources";
import { cn } from "@/lib/utils";
import { Plus, Trash2, Check, RotateCcw, Code2, ChevronDown, ChevronUp } from "lucide-react";

export function InteractiveDemo({
  kind,
  title,
  hint,
}: {
  kind: DemoKind;
  title: string;
  hint?: string;
}) {
  const [showSource, setShowSource] = useState(true);
  const source = getDemoSource(kind);

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border px-4 py-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            交互 Demo · 代码即组件
          </p>
          <h3 className="mt-0.5 font-display text-base font-semibold text-fg">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSource((v) => !v)}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-muted transition-colors hover:text-fg"
          >
            <Code2 className="h-3.5 w-3.5" />
            对应源码
            {showSource ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>
          <span className="rounded-full bg-primary-soft px-2.5 py-1 font-mono text-[10px] text-primary">
            live
          </span>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        {hint ? <p className="mb-4 text-sm text-muted">{hint}</p> : null}
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-sm bg-primary-soft px-1.5 py-0.5 font-mono text-[10px] text-primary">
            A · 运行结果
          </span>
          <span className="text-xs text-muted">下方源码编译/等价实现后的可交互界面</span>
        </div>
        <DemoBody kind={kind} />
        {showSource ? (
          <div className="mt-5 border-t border-border pt-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-sm bg-surface-3 px-1.5 py-0.5 font-mono text-[10px] text-muted">
                B · 对应源码
              </span>
              <span className="text-xs text-muted">与上方 Demo 同一套逻辑 — 读 B，操作 A</span>
            </div>
            <CodeBlock code={source.code} title={source.title} lang={source.lang} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function DemoBody({ kind }: { kind: DemoKind }) {
  switch (kind) {
    case "counter":
      return <CounterDemo />;
    case "template":
      return <TemplateDemo />;
    case "ref-vs-reactive":
      return <RefReactiveDemo />;
    case "computed":
      return <ComputedDemo />;
    case "list":
      return <ListDemo />;
    case "events":
      return <EventsDemo />;
    case "form":
      return <FormDemo />;
    case "component":
      return <ComponentDemo />;
    case "lifecycle":
      return <LifecycleDemo />;
    case "todo":
      return <TodoDemo />;
    case "router":
      return <RouterDemo />;
    case "pinia":
      return <PiniaDemo />;
    case "challenge":
      return <ChallengeDemo />;
    case "slots":
      return <SlotsDemo />;
    case "provide":
      return <ProvideDemo />;
    case "async":
      return <AsyncDemo />;
    case "guard":
      return <GuardDemo />;
    case "validate":
      return <ValidateDemo />;
    case "teleport":
      return <TeleportDemo />;
    case "keepalive":
      return <KeepAliveDemo />;
    case "directive":
      return <DirectiveDemo />;
    case "defer":
      return <DeferDemo />;
    case "pipe":
      return <PipeDemo />;
    case "resource":
      return <ResourceDemo />;
    case "linked":
      return <LinkedDemo />;
    case "model-input":
      return <ModelInputDemo />;
    case "zoneless":
      return <ZonelessDemo />;
    case "style-encap":
      return <StyleEncapDemo />;
    case "structural":
      return <StructuralDemo />;
    case "host-dir":
      return <HostDirDemo />;
    case "image-opt":
      return <ImageOptDemo />;
    case "query":
      return <QueryDemo />;
    case "typed-form":
      return <TypedFormDemo />;
    case "dynamic-form":
      return <DynamicFormDemo />;
    case "outlet":
      return <OutletDemo />;
    case "harness":
      return <HarnessDemo />;
    case "diagnostics":
      return <DiagnosticsDemo />;
    default:
      return null;
  }
}

function Panel({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-border bg-surface-2 p-3 sm:p-4", className)}>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-subtle">{label}</p>
      {children}
    </div>
  );
}

function CounterDemo() {
  const [count, setCount] = useState(0);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="template">
        <p className="font-mono text-sm text-code-fg">
          点了 <span className="text-primary">{count}</span> 次
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button onClick={() => setCount((c) => c + 1)}>count++</Button>
          <Button variant="secondary" onClick={() => setCount(0)}>
            重置
          </Button>
        </div>
      </Panel>
      <Panel label="class (signal)">
        <pre className="font-mono text-xs leading-relaxed text-code-fg">
          {`count = signal(${count})\n// count() === ${count}`}
        </pre>
      </Panel>
    </div>
  );
}

function TemplateDemo() {
  const [msg, setMsg] = useState("你好，Angular");
  const [active, setActive] = useState(true);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="控制数据">
        <label className="block text-xs text-muted">msg</label>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="mt-1 h-10 w-full rounded-md border border-border bg-bg px-3 text-sm text-fg"
        />
        <label className="mt-3 flex items-center gap-2 text-sm text-fg">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="h-4 w-4 accent-[var(--color-primary)]"
          />
          isActive
        </label>
      </Panel>
      <Panel label="渲染结果">
        <p className="text-sm">
          {"{{ msg() }} → "}
          <span className="text-primary">{msg}</span>
        </p>
        <p
          className={cn(
            "mt-2 rounded-md px-2 py-1 text-sm",
            active ? "bg-primary-soft text-primary" : "bg-surface-3 text-muted",
          )}
        >
          [class] 绑定 → {active ? "active" : "inactive"}
        </p>
      </Panel>
    </div>
  );
}

function RefReactiveDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Angular");
  const [n, setN] = useState(1);
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <Panel label="signal(count)">
        <p className="font-mono text-2xl font-semibold tabular-nums text-primary">{count}</p>
        <div className="mt-3 flex gap-2">
          <Button size="sm" onClick={() => setCount((c) => c + 1)}>
            {"count.update(c => c + 1)"}
          </Button>
          <Button size="sm" variant="secondary" onClick={() => setCount(0)}>
            归零
          </Button>
        </div>
      </Panel>
      <Panel label="signal({ name, n })">
        <p className="text-sm">
          name: <span className="text-primary">{name}</span>
        </p>
        <p className="mt-1 text-sm">
          n: <span className="font-mono text-primary">{n}</span>
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-9 min-w-0 flex-1 rounded-md border border-border bg-bg px-3 text-sm"
          />
          <Button size="sm" onClick={() => setN((x) => x + 1)}>
            {"state.update(...)"}
          </Button>
        </div>
      </Panel>
    </div>
  );
}

function ComputedDemo() {
  const [first, setFirst] = useState("Ada");
  const [last, setLast] = useState("Lovelace");
  const full = `${first} ${last}`;
  const [logs, setLogs] = useState<string[]>([`初始: ${full}`]);

  useEffect(() => {
    setLogs((prev) => {
      const line = `effect → "${full}"`;
      if (prev[prev.length - 1] === line) return prev;
      return [...prev.slice(-4), line];
    });
  }, [full]);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="输入">
        <label className="text-xs text-muted">first</label>
        <input
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          className="mt-1 mb-3 h-10 w-full rounded-md border border-border bg-bg px-3 text-sm"
        />
        <label className="text-xs text-muted">last</label>
        <input
          value={last}
          onChange={(e) => setLast(e.target.value)}
          className="mt-1 h-10 w-full rounded-md border border-border bg-bg px-3 text-sm"
        />
      </Panel>
      <div className="grid gap-3">
        <Panel label="computed full()">
          <p className="font-display text-xl font-semibold text-primary">{full}</p>
        </Panel>
        <Panel label="watch 日志">
          <ul className="space-y-1 font-mono text-xs text-muted">
            {logs.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function ListDemo() {
  const [show, setShow] = useState(true);
  const [items, setItems] = useState([
    { id: 1, text: "学 signal" },
    { id: 2, text: "学 @for" },
  ]);
  const [nextId, setNextId] = useState(3);
  const [draft, setDraft] = useState("");

  function add() {
    const t = draft.trim();
    if (!t) return;
    setItems((xs) => [...xs, { id: nextId, text: t }]);
    setNextId((n) => n + 1);
    setDraft("");
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="控制">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={show}
            onChange={(e) => setShow(e.target.checked)}
            className="h-4 w-4 accent-[var(--color-primary)]"
          />
          @if = {String(show)}
        </label>
        <div className="mt-3 flex gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="新项目"
            className="h-10 min-w-0 flex-1 rounded-md border border-border bg-bg px-3 text-sm"
          />
          <Button onClick={add} size="icon" aria-label="添加">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </Panel>
      <Panel label="template 输出">
        {show ? (
          <p className="mb-2 text-sm text-primary">@if：列表可见</p>
        ) : (
          <p className="mb-2 text-sm text-muted">@else：已隐藏</p>
        )}
        {show ? (
          <ul className="space-y-1.5">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-md bg-bg px-2.5 py-2 text-sm"
              >
                <span>
                  <span className="mr-2 font-mono text-xs text-subtle">#{item.id}</span>
                  {item.text}
                </span>
                <button
                  type="button"
                  className="text-muted hover:text-danger"
                  onClick={() => setItems((xs) => xs.filter((x) => x.id !== item.id))}
                  aria-label="删除"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </Panel>
    </div>
  );
}

function EventsDemo() {
  const [n, setN] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="事件">
        <p className="font-mono text-3xl font-semibold tabular-nums text-primary">{n}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button onClick={() => setN((x) => x + 1)}>(click) +1</Button>
          <Button variant="secondary" onClick={() => setN((x) => x + 5)}>
            (click)="add(5)"
          </Button>
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              setLog((xs) =>
                [`submit.prevent @ ${new Date().toLocaleTimeString()}`, ...xs].slice(0, 4),
              );
            }}
          >
            (submit) $event.preventDefault()
          </Button>
        </div>
      </Panel>
      <Panel label="事件日志">
        {log.length === 0 ? (
          <p className="text-sm text-muted">点击按钮产生日志</p>
        ) : (
          <ul className="space-y-1 font-mono text-xs text-muted">
            {log.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

function FormDemo() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(18);
  const [agree, setAgree] = useState(false);
  const [color, setColor] = useState("green");
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="[(ngModel)] 表单">
        <label className="text-xs text-muted">name (.trim)</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setName((n) => n.trim())}
          className="mt-1 mb-3 h-10 w-full rounded-md border border-border bg-bg px-3 text-sm"
          placeholder="你的名字"
        />
        <label className="text-xs text-muted">age (.number)</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="mt-1 mb-3 h-10 w-full rounded-md border border-border bg-bg px-3 text-sm"
        />
        <label className="mb-3 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="h-4 w-4 accent-[var(--color-primary)]"
          />
          同意条款
        </label>
        <label className="text-xs text-muted">color</label>
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-1 h-10 w-full rounded-md border border-border bg-bg px-3 text-sm"
        >
          <option value="green">绿</option>
          <option value="blue">蓝</option>
        </select>
      </Panel>
      <Panel label="实时预览">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-2">
            <dt className="text-muted">name</dt>
            <dd className="font-medium text-fg">{name || "—"}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted">age</dt>
            <dd className="font-mono text-primary">{age}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted">agree</dt>
            <dd>{agree ? "true" : "false"}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted">color</dt>
            <dd className="capitalize">{color}</dd>
          </div>
        </dl>
      </Panel>
    </div>
  );
}

function ChildCounter({ label }: { label: string }) {
  const [n, setN] = useState(0);
  return (
    <div className="rounded-md border border-border bg-bg p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-mono text-xl text-primary">{n}</p>
      <Button size="sm" className="mt-2" onClick={() => setN((x) => x + 1)}>
        子组件 +1
      </Button>
    </div>
  );
}

function ComponentDemo() {
  return (
    <div>
      <p className="mb-3 text-sm text-muted">父组件渲染两个独立的子组件实例：</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <ChildCounter label="<CounterCard /> #1" />
        <ChildCounter label="<CounterCard /> #2" />
      </div>
    </div>
  );
}

function LifecycleDemo() {
  const [mounted, setMounted] = useState(true);
  const [ticks, setTicks] = useState(0);
  const [log, setLog] = useState<string[]>(["准备挂载…"]);

  useEffect(() => {
    if (!mounted) return;
    setLog((xs) => [...xs, "ngOnInit → 启动计时器"].slice(-6));
    setTicks(0);
    const id = window.setInterval(() => setTicks((t) => t + 1), 1000);
    return () => {
      clearInterval(id);
      setLog((xs) => [...xs, "ngOnDestroy → clearInterval"].slice(-6));
    };
  }, [mounted]);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="组件实例">
        {mounted ? (
          <div>
            <p className="font-mono text-3xl tabular-nums text-primary">{ticks}s</p>
            <p className="mt-1 text-xs text-muted">已挂载，计时中</p>
            <Button className="mt-3" variant="secondary" onClick={() => setMounted(false)}>
              卸载组件
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-muted">组件已卸载</p>
            <Button className="mt-3" onClick={() => setMounted(true)}>
              重新挂载
            </Button>
          </div>
        )}
      </Panel>
      <Panel label="生命周期日志">
        <ul className="space-y-1 font-mono text-xs text-muted">
          {log.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

type Todo = { id: number; text: string; done: boolean };

function TodoDemo() {
  const [items, setItems] = useState<Todo[]>([
    { id: 1, text: "读完 Props 一节", done: false },
    { id: 2, text: "完成小测验", done: true },
  ]);
  const [draft, setDraft] = useState("");
  const [nextId, setNextId] = useState(3);
  const formId = useId();

  function add() {
    const t = draft.trim();
    if (!t) return;
    setItems((xs) => [...xs, { id: nextId, text: t, done: false }]);
    setNextId((n) => n + 1);
    setDraft("");
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="flex gap-2">
        <input
          id={formId}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="新任务…"
          className="h-10 min-w-0 flex-1 rounded-md border border-border bg-bg px-3 text-sm"
        />
        <Button onClick={add}>添加</Button>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2"
          >
            <button
              type="button"
              onClick={() =>
                setItems((xs) => xs.map((x) => (x.id === item.id ? { ...x, done: !x.done } : x)))
              }
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border",
                item.done
                  ? "border-primary bg-primary text-primary-fg"
                  : "border-border text-transparent",
              )}
              aria-label={item.done ? "标为未完成" : "标为完成"}
            >
              <Check className="h-3.5 w-3.5" />
            </button>
            <span className={cn("min-w-0 flex-1 text-sm", item.done && "text-muted line-through")}>
              {item.text}
            </span>
            <button
              type="button"
              className="text-muted hover:text-danger"
              onClick={() => setItems((xs) => xs.filter((x) => x.id !== item.id))}
              aria-label="删除"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
      <Button
        variant="ghost"
        size="sm"
        className="mt-2"
        onClick={() =>
          setItems([
            { id: 1, text: "读完 Props 一节", done: false },
            { id: 2, text: "完成小测验", done: true },
          ])
        }
      >
        <RotateCcw className="h-3.5 w-3.5" />
        重置示例
      </Button>
    </div>
  );
}

function RouterDemo() {
  const pages = [
    { path: "/", title: "Home", body: "欢迎页 · router-outlet 渲染 Home" },
    {
      path: "/lesson/intro",
      title: "Lesson",
      body: "动态路由 /lesson/:slug → intro",
    },
    { path: "/about", title: "About", body: "关于页" },
  ] as const;
  const [path, setPath] = useState<(typeof pages)[number]["path"]>("/");
  const current = pages.find((p) => p.path === path) ?? pages[0];

  return (
    <div className="grid gap-3 sm:grid-cols-[11rem_1fr]">
      <Panel label="routerLink">
        <nav className="flex flex-col gap-1">
          {pages.map((p) => (
            <button
              key={p.path}
              type="button"
              onClick={() => setPath(p.path)}
              className={cn(
                "rounded-md px-2.5 py-2 text-left text-sm transition-colors",
                path === p.path
                  ? "bg-primary-soft text-primary"
                  : "text-muted hover:bg-surface-3 hover:text-fg",
              )}
            >
              {p.path === "/" ? "/" : p.path}
            </button>
          ))}
        </nav>
      </Panel>
      <Panel label="router-outlet">
        <p className="font-mono text-xs text-subtle">route.path = {path}</p>
        <h4 className="mt-2 font-display text-lg font-semibold text-fg">{current.title}</h4>
        <p className="mt-1 text-sm text-muted">{current.body}</p>
      </Panel>
    </div>
  );
}

function PiniaDemo() {
  const [items, setItems] = useState<string[]>(["学 Signal Store"]);
  const [draft, setDraft] = useState("");
  const count = items.length;

  function add() {
    const t = draft.trim();
    if (!t) return;
    setItems((xs) => [...xs, t]);
    setDraft("");
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="组件 A · inject(CartStore)">
        <p className="text-sm text-muted">
          count: <span className="font-mono text-primary tabular-nums">{count}</span>
        </p>
        <div className="mt-2 flex gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            className="h-9 min-w-0 flex-1 rounded-md border border-border bg-bg px-2 text-sm"
            placeholder="商品名"
          />
          <Button size="sm" onClick={add}>
            add()
          </Button>
        </div>
      </Panel>
      <Panel label="组件 B · 同一 CartStore">
        <ul className="space-y-1 text-sm">
          {items.map((it, i) => (
            <li key={i} className="rounded-md bg-bg px-2 py-1.5">
              {it}
            </li>
          ))}
        </ul>
        <Button size="sm" variant="secondary" className="mt-2" onClick={() => setItems([])}>
          clear()
        </Button>
      </Panel>
    </div>
  );
}

function ChallengeDemo() {
  const [code, setCode] = useState(
    `let count = 0\nfunction inc() { count++ }\n// 视图不更新？`,
  );
  const [status, setStatus] = useState<"idle" | "pass" | "fail">("idle");

  function check() {
    const ok =
      /signal\s*\(/.test(code) &&
      (/\.update\s*\(/.test(code) || /\.set\s*\(/.test(code)) &&
      !/let count = 0/.test(code);
    setStatus(ok ? "pass" : "fail");
  }

  return (
    <div className="grid gap-3">
      <Panel label="有问题的脚本">
        <textarea
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setStatus("idle");
          }}
          rows={5}
          className="w-full rounded-md border border-border bg-bg p-3 font-mono text-xs text-code-fg"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" onClick={check}>
            运行检查
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setCode(
                `import { signal } from '@angular/core'\ncount = signal(0)\nfunction inc() { count.update(c => c + 1) }`,
              );
              setStatus("idle");
            }}
          >
            查看参考答案
          </Button>
        </div>
        {status === "pass" ? (
          <p className="mt-2 text-sm text-primary">通过：使用 signal + set/update</p>
        ) : null}
        {status === "fail" ? (
          <p className="mt-2 text-sm text-warn">
            未通过：需要 signal(...) 且用 set/update 更新（普通 let 不会触发视图）
          </p>
        ) : null}
      </Panel>
    </div>
  );
}

/* ——— v4 demos ——— */

function SlotsDemo() {
  const [customHeader, setCustomHeader] = useState(true);
  const [customFooter, setCustomFooter] = useState(true);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="父模板控制插槽">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={customHeader}
            onChange={(e) => setCustomHeader(e.target.checked)}
            className="h-4 w-4 accent-[var(--color-primary)]"
          />
          投影 [card-title]
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={customFooter}
            onChange={(e) => setCustomFooter(e.target.checked)}
            className="h-4 w-4 accent-[var(--color-primary)]"
          />
          默认投影主体 + footer
        </label>
      </Panel>
      <Panel label="Card 渲染结果">
        <div className="rounded-lg border border-border bg-bg p-3">
          <header className="border-b border-border pb-2 text-sm font-medium text-primary">
            {customHeader ? "自定义头 · 来自父级" : "默认 title prop"}
          </header>
          <div className="py-3 text-sm text-fg">默认 ng-content：卡片主体</div>
          <footer className="border-t border-border pt-2 text-xs text-muted">
            {customFooter ? "© 2026 · 父级投影页脚" : "默认页脚"}
          </footer>
        </div>
      </Panel>
    </div>
  );
}

function ProvideDemo() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  return (
    <div className="grid gap-3">
      <Panel label="祖先 providers: [{ provide: THEME, useValue }]">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={theme === "dark" ? "default" : "secondary"}
            onClick={() => setTheme("dark")}
          >
            dark
          </Button>
          <Button
            size="sm"
            variant={theme === "light" ? "default" : "secondary"}
            onClick={() => setTheme("light")}
          >
            light
          </Button>
        </div>
      </Panel>
      <div
        className={cn(
          "rounded-lg border p-4 transition-colors",
          theme === "dark" ? "border-border bg-bg text-fg" : "border-border-strong bg-fg text-bg",
        )}
      >
        <p className="text-xs opacity-70">深层子组件 inject(THEME)</p>
        <p className="mt-1 text-sm font-medium">当前主题：{theme}（无需 props 逐层传递）</p>
      </div>
    </div>
  );
}

function AsyncDemo() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [items, setItems] = useState<{ id: number; title: string }[]>([]);

  function load(mode: "ok" | "error") {
    setStatus("loading");
    setItems([]);
    window.setTimeout(() => {
      if (mode === "error") {
        setStatus("error");
        return;
      }
      setItems([
        { id: 1, title: "学 HttpClient 服务" },
        { id: 2, title: "处理 loading / error" },
        { id: 3, title: "准备接真实 API" },
      ]);
      setStatus("ok");
    }, 700);
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="触发请求">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => load("ok")} disabled={status === "loading"}>
            模拟成功
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => load("error")}
            disabled={status === "loading"}
          >
            模拟失败
          </Button>
        </div>
        <p className="mt-3 font-mono text-xs text-muted">status = {status}</p>
      </Panel>
      <Panel label="UI 三态">
        {status === "idle" ? <p className="text-sm text-muted">尚未请求</p> : null}
        {status === "loading" ? <p className="text-sm text-primary">loading…</p> : null}
        {status === "error" ? (
          <p className="text-sm text-danger">error: HTTP 500（可点重试）</p>
        ) : null}
        {status === "ok" ? (
          <ul className="space-y-1 text-sm">
            {items.map((it) => (
              <li key={it.id} className="rounded-md bg-bg px-2 py-1.5">
                {it.title}
              </li>
            ))}
          </ul>
        ) : null}
      </Panel>
    </div>
  );
}

function GuardDemo() {
  const [token, setToken] = useState<string | null>(null);
  const [page, setPage] = useState<"home" | "dash" | "login">("home");
  const [msg, setMsg] = useState("在首页");

  function go(target: "home" | "dash" | "login") {
    if (target === "dash" && !token) {
      setPage("login");
      setMsg("CanActivateFn：未登录 → createUrlTree(['/login'])");
      return;
    }
    if (target === "login" && token) {
      setPage("home");
      setMsg("已登录访问 /login → 重定向 /");
      return;
    }
    setPage(target);
    setMsg(
      target === "dash" ? "进入 /dashboard（受保护）" : target === "login" ? "登录页" : "首页",
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="导航">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={() => go("home")}>
            /
          </Button>
          <Button size="sm" variant="secondary" onClick={() => go("dash")}>
            /dashboard
          </Button>
          <Button size="sm" variant="secondary" onClick={() => go("login")}>
            /login
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={() => {
              setToken("demo-token");
              setMsg("localStorage token 已写入（模拟）");
            }}
          >
            登录
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setToken(null);
              setPage("home");
              setMsg("已退出");
            }}
          >
            退出
          </Button>
        </div>
        <p className="mt-2 font-mono text-xs text-muted">token: {token ? "present" : "null"}</p>
      </Panel>
      <Panel label="当前视图">
        <p className="font-mono text-xs text-subtle">page = {page}</p>
        <p className="mt-2 text-sm font-medium text-fg">
          {page === "dash"
            ? "Dashboard · 私有内容"
            : page === "login"
              ? "Login · 请先登录"
              : "Home · 公开"}
        </p>
        <p className="mt-2 text-xs text-muted">{msg}</p>
      </Panel>
    </div>
  );
}

function ValidateDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [ok, setOk] = useState(false);

  function submit() {
    const e: { email?: string; password?: string } = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "邮箱格式不正确";
    if (password.length < 8) e.password = "密码至少 8 位";
    setErrors(e);
    setOk(Object.keys(e).length === 0);
  }

  return (
    <div className="mx-auto max-w-sm space-y-3">
      <div>
        <label className="text-xs text-muted">email</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setOk(false);
          }}
          className={cn(
            "mt-1 h-10 w-full rounded-md border bg-bg px-3 text-sm",
            errors.email ? "border-danger" : "border-border",
          )}
          placeholder="you@example.com"
        />
        {errors.email ? <p className="mt-1 text-xs text-danger">{errors.email}</p> : null}
      </div>
      <div>
        <label className="text-xs text-muted">password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setOk(false);
          }}
          className={cn(
            "mt-1 h-10 w-full rounded-md border bg-bg px-3 text-sm",
            errors.password ? "border-danger" : "border-border",
          )}
          placeholder="至少 8 位"
        />
        {errors.password ? <p className="mt-1 text-xs text-danger">{errors.password}</p> : null}
      </div>
      <Button onClick={submit}>提交</Button>
      {ok ? <p className="text-sm text-primary">校验通过，可以请求 /api/login</p> : null}
    </div>
  );
}

function TeleportDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>打开弹层</Button>
      <p className="mt-2 text-xs text-muted">
        模拟 CDK Overlay / Dialog：弹层挂 body，不受父级 overflow 裁剪。
      </p>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg/70 p-4 backdrop-blur-[2px]"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-sm rounded-xl border border-border bg-surface p-5 shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-display text-base font-semibold text-fg">对话框</h4>
            <p className="mt-2 text-sm text-muted">内容仍由当前组件状态控制，DOM 挂在高层。</p>
            <Button className="mt-4" size="sm" onClick={() => setOpen(false)}>
              关闭
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function KeepAliveDemo() {
  const [tab, setTab] = useState<"a" | "b">("a");
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  return (
    <div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={tab === "a" ? "default" : "secondary"}
          onClick={() => setTab("a")}
        >
          Tab A
        </Button>
        <Button
          size="sm"
          variant={tab === "b" ? "default" : "secondary"}
          onClick={() => setTab("b")}
        >
          Tab B
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted">模拟 RouteReuseStrategy：切换 tab 保留输入状态。</p>
      <div className="mt-3 rounded-lg border border-border bg-surface-2 p-3">
        {tab === "a" ? (
          <label className="block text-sm">
            <span className="text-xs text-muted">A 的草稿</span>
            <input
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-border bg-bg px-3 text-sm"
              placeholder="在 A 输入…"
            />
          </label>
        ) : (
          <label className="block text-sm">
            <span className="text-xs text-muted">B 的草稿</span>
            <input
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-border bg-bg px-3 text-sm"
              placeholder="在 B 输入…"
            />
          </label>
        )}
      </div>
    </div>
  );
}

function DirectiveDemo() {
  const [show, setShow] = useState(true);
  const [key, setKey] = useState(0);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => {
            setShow(true);
            setKey((k) => k + 1);
          }}
        >
          挂载并聚焦
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setShow(false)}>
          卸载
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted">模拟指令 appFocus：ngOnInit 时 el.focus()</p>
      {show ? (
        <input
          key={key}
          autoFocus
          className="mt-3 h-10 w-full max-w-xs rounded-md border border-border bg-bg px-3 text-sm"
          placeholder="应自动获得焦点"
        />
      ) : (
        <p className="mt-3 text-sm text-muted">输入框已卸载</p>
      )}
    </div>
  );
}


function DeferDemo() {
  const [phase, setPhase] = useState<"placeholder" | "loading" | "ready" | "error">("placeholder");
  function load(ok: boolean) {
    setPhase("loading");
    window.setTimeout(() => setPhase(ok ? "ready" : "error"), 800);
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="触发">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => load(true)}>on interaction · 成功</Button>
          <Button size="sm" variant="secondary" onClick={() => load(false)}>模拟 @error</Button>
          <Button size="sm" variant="ghost" onClick={() => setPhase("placeholder")}>重置</Button>
        </div>
        <p className="mt-2 font-mono text-xs text-muted">phase = {phase}</p>
      </Panel>
      <Panel label="@defer 视图">
        {phase === "placeholder" ? <p className="text-sm text-muted">@placeholder · 占位内容</p> : null}
        {phase === "loading" ? <p className="text-sm text-primary">@loading · 拉取懒 chunk…</p> : null}
        {phase === "ready" ? (
          <div className="rounded-md bg-bg p-3 text-sm">
            <p className="font-medium text-primary">HeavyChart 已加载</p>
            <p className="mt-1 text-muted">模拟懒组件渲染完成</p>
          </div>
        ) : null}
        {phase === "error" ? <p className="text-sm text-danger">@error · 加载失败</p> : null}
      </Panel>
    </div>
  );
}

function PipeDemo() {
  const [text, setText] = useState("Angular Signals 实战非常有趣");
  const [max, setMax] = useState(12);
  const out = text.length <= max ? text : text.slice(0, max) + "…";
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="输入">
        <input value={text} onChange={(e) => setText(e.target.value)} className="mb-2 h-10 w-full rounded-md border border-border bg-bg px-3 text-sm" />
        <label className="text-xs text-muted">max = {max}</label>
        <input type="range" min={4} max={40} value={max} onChange={(e) => setMax(Number(e.target.value))} className="mt-1 w-full" />
      </Panel>
      <Panel label={"{{ text | truncate:" + max + " }}"}>
        <p className="font-mono text-lg text-primary">{out}</p>
      </Panel>
    </div>
  );
}

function ResourceDemo() {
  const [id, setId] = useState("1");
  const [status, setStatus] = useState<"idle" | "loading" | "resolved" | "error">("idle");
  const [value, setValue] = useState<string | null>(null);
  function load() {
    setStatus("loading");
    setValue(null);
    window.setTimeout(() => {
      if (id === "0") {
        setStatus("error");
        return;
      }
      setValue(`User#${id} · Ada`);
      setStatus("resolved");
    }, 600);
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="httpResource 参数">
        <input value={id} onChange={(e) => setId(e.target.value)} className="mb-2 h-10 w-full rounded-md border border-border bg-bg px-3 text-sm" />
        <Button size="sm" onClick={load}>reload()</Button>
        <p className="mt-2 text-xs text-muted">id=0 模拟 error</p>
      </Panel>
      <Panel label="resource 状态">
        <p className="font-mono text-xs text-muted">status = {status}</p>
        {status === "loading" ? <p className="mt-2 text-sm text-primary">isLoading</p> : null}
        {status === "error" ? <p className="mt-2 text-sm text-danger">error</p> : null}
        {status === "resolved" ? <p className="mt-2 text-sm text-primary">{value}</p> : null}
      </Panel>
    </div>
  );
}

function LinkedDemo() {
  const [options, setOptions] = useState(["标准", "加急", "自提"]);
  const [selected, setSelected] = useState("标准");
  function changeSource() {
    const next = options[0] === "标准" ? ["空运", "海运"] : ["标准", "加急", "自提"];
    setOptions(next);
    setSelected(next[0]);
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="源 options">
        <p className="text-sm text-muted">{options.join(" / ")}</p>
        <Button size="sm" className="mt-2" onClick={changeSource}>切换选项列表</Button>
      </Panel>
      <Panel label="linkedSignal selected">
        <div className="flex flex-wrap gap-2">
          {options.map((o) => (
            <Button key={o} size="sm" variant={selected === o ? "default" : "secondary"} onClick={() => setSelected(o)}>
              {o}
            </Button>
          ))}
        </div>
        <p className="mt-2 text-sm">当前：<span className="text-primary">{selected}</span></p>
      </Panel>
    </div>
  );
}

function ModelInputDemo() {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="父组件 enabled">
        <p className="font-mono text-2xl text-primary">{String(enabled)}</p>
        <Button size="sm" className="mt-2" onClick={() => setEnabled((v) => !v)}>父级切换</Button>
      </Panel>
      <Panel label="子 model() · [(on)]">
        <button
          type="button"
          onClick={() => setEnabled((v) => !v)}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-fg"
        >
          {enabled ? "ON" : "OFF"}
        </button>
        <p className="mt-2 text-xs text-muted">点击子按钮同样写回父状态</p>
      </Panel>
    </div>
  );
}

function ZonelessDemo() {
  const [n, setN] = useState(0);
  const [ticks, setTicks] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTicks((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="粗粒度（类 Zone 直觉）">
        <p className="text-sm text-muted">定时器一直跑：{ticks}s</p>
        <p className="mt-1 text-xs text-subtle">Zone 可能因任意异步触发检查</p>
      </Panel>
      <Panel label="精确（Signals / Zoneless）">
        <p className="font-mono text-3xl text-primary">{n}</p>
        <Button size="sm" className="mt-2" onClick={() => setN((x) => x + 1)}>仅在 set 时更新</Button>
      </Panel>
    </div>
  );
}

function StyleEncapDemo() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="Emulated（默认）">
        <div className="rounded-md border border-primary/40 bg-primary-soft p-3 text-sm text-primary">
          组件内 .btn 只影响此范围
        </div>
        <p className="mt-2 text-xs text-muted">生成唯一属性选择器隔离样式</p>
      </Panel>
      <Panel label="None（全局）">
        <div className="rounded-md border border-border bg-surface-3 p-3 text-sm text-muted">
          样式可能泄漏到全应用
        </div>
        <p className="mt-2 text-xs text-muted">第三方主题才考虑，慎用</p>
      </Panel>
    </div>
  );
}


function StructuralDemo() {
  const [hidden, setHidden] = useState(false);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="*appUnless">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} className="h-4 w-4 accent-[var(--color-primary)]" />
          hidden = {String(hidden)}
        </label>
      </Panel>
      <Panel label="DOM">
        {!hidden ? (
          <p className="rounded-md bg-primary-soft px-3 py-2 text-sm text-primary">段落在 DOM 中</p>
        ) : (
          <p className="text-sm text-muted">已 clear() · 无节点</p>
        )}
      </Panel>
    </div>
  );
}

function HostDirDemo() {
  const [tip, setTip] = useState("保存到云端");
  const [show, setShow] = useState(false);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="hostDirectives 输入">
        <input value={tip} onChange={(e) => setTip(e.target.value)} className="h-10 w-full rounded-md border border-border bg-bg px-3 text-sm" />
      </Panel>
      <Panel label="组合后的按钮">
        <button
          type="button"
          className="relative rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-fg"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          帮助
          {show ? (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-surface-3 px-2 py-1 text-[11px] text-fg">
              {tip}
            </span>
          ) : null}
        </button>
      </Panel>
    </div>
  );
}

function ImageOptDemo() {
  const [priority, setPriority] = useState(true);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="配置">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={priority} onChange={(e) => setPriority(e.target.checked)} className="h-4 w-4 accent-[var(--color-primary)]" />
          priority（LCP）
        </label>
      </Panel>
      <Panel label="ngSrc 结果">
        <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-border bg-bg text-xs text-muted">
          {priority ? "高优先级 · 预加载" : "懒加载 · 进入视口再请求"}
        </div>
      </Panel>
    </div>
  );
}

function QueryDemo() {
  const [focused, setFocused] = useState(false);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="模板 #box">
        <input
          id="q-box"
          className="h-10 w-full rounded-md border border-border bg-bg px-3 text-sm"
          placeholder="viewChild 目标"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </Panel>
      <Panel label="类中 focus()">
        <Button
          size="sm"
          onClick={() => {
            document.getElementById("q-box")?.focus();
          }}
        >
          box().nativeElement.focus()
        </Button>
        <p className="mt-2 text-xs text-muted">focused: {String(focused)}</p>
      </Panel>
    </div>
  );
}

function TypedFormDemo() {
  const [email, setEmail] = useState("");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return (
    <div className="rounded-lg border border-border bg-surface-2 p-4">
      <p className="mb-2 font-mono text-[11px] text-subtle">{"FormControl<string>"}</p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-10 w-full max-w-sm rounded-md border border-border bg-bg px-3 text-sm"
        placeholder="email"
      />
      <p className="mt-2 text-sm">
        value 类型推断为 string · valid:{" "}
        <span className={valid ? "text-primary" : "text-danger"}>{String(valid)}</span>
      </p>
    </div>
  );
}

function DynamicFormDemo() {
  const [fields, setFields] = useState([
    { key: "name", label: "姓名" },
    { key: "role", label: "角色" },
  ]);
  const [values, setValues] = useState<Record<string, string>>({ name: "", role: "" });
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="字段配置">
        <Button
          size="sm"
          onClick={() => {
            const key = `f${fields.length + 1}`;
            setFields((xs) => [...xs, { key, label: `字段${fields.length + 1}` }]);
            setValues((v) => ({ ...v, [key]: "" }));
          }}
        >
          添加字段
        </Button>
        <ul className="mt-2 space-y-1 text-xs text-muted">
          {fields.map((f) => (
            <li key={f.key}>{f.key}</li>
          ))}
        </ul>
      </Panel>
      <Panel label="运行时 FormGroup">
        {fields.map((f) => (
          <label key={f.key} className="mb-2 block text-xs text-muted">
            {f.label}
            <input
              value={values[f.key] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              className="mt-1 h-9 w-full rounded-md border border-border bg-bg px-2 text-sm text-fg"
            />
          </label>
        ))}
      </Panel>
    </div>
  );
}

function OutletDemo() {
  const [modal, setModal] = useState(false);
  return (
    <div className="relative min-h-[140px] rounded-lg border border-border bg-surface-2 p-4">
      <p className="text-xs text-muted">primary outlet</p>
      <p className="mt-1 font-medium text-fg">主页面内容</p>
      <Button size="sm" className="mt-3" onClick={() => setModal(true)}>
        打开 modal outlet
      </Button>
      {modal ? (
        <div className="absolute inset-3 flex items-center justify-center rounded-md border border-primary/40 bg-bg/95">
          <div className="text-center">
            <p className="text-xs text-primary">outlet: modal</p>
            <p className="mt-1 text-sm">Compose 面板</p>
            <Button size="sm" className="mt-2" variant="secondary" onClick={() => setModal(false)}>
              关闭
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function HarnessDemo() {
  const [log, setLog] = useState<string[]>([]);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="组件内部 DOM（可改）">
        <button
          type="button"
          data-testid="save"
          className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-fg"
          onClick={() => setLog((xs) => [`click @ ${new Date().toLocaleTimeString()}`, ...xs].slice(0, 4))}
        >
          保存
        </button>
      </Panel>
      <Panel label="Harness API">
        <Button
          size="sm"
          onClick={() => {
            document.querySelector<HTMLButtonElement>('[data-testid="save"]')?.click();
          }}
        >
          await btn.click()
        </Button>
        <ul className="mt-2 space-y-1 font-mono text-xs text-muted">
          {log.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

function DiagnosticsDemo() {
  const [code, setCode] = useState("NG0100");
  const map: Record<string, string> = {
    NG0100: "ExpressionChangedAfterItHasBeenCheckedError · 检查期又改了值",
    NG0200: "循环依赖 · 检查 providers 图",
    NG0300: "选择器冲突/未知元素 · 检查 imports",
    NG9: "未知错误码 · 打开 angular.dev/errors",
  };
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="错误码">
        <div className="flex flex-wrap gap-2">
          {Object.keys(map).map((k) => (
            <Button key={k} size="sm" variant={code === k ? "default" : "secondary"} onClick={() => setCode(k)}>
              {k}
            </Button>
          ))}
        </div>
      </Panel>
      <Panel label="百科解释">
        <p className="text-sm text-fg">{map[code]}</p>
        <p className="mt-2 text-xs text-muted">生产环境请查官方 Error encyclopedia</p>
      </Panel>
    </div>
  );
}

