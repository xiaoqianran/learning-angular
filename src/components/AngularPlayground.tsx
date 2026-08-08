import { useMemo, useState } from "react";
import type { AngularPreset } from "@/data/angular-presets";
import { CodeBlock } from "@/components/CodeBlock";
import { cn } from "@/lib/utils";
import { FileCode2 } from "lucide-react";

export function AngularPlayground({ preset }: { preset: AngularPreset }) {
  const fileNames = useMemo(() => Object.keys(preset.files), [preset]);
  const [active, setActive] = useState(preset.mainFile);

  const current = preset.files[active] ?? preset.files[preset.mainFile] ?? "";

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-surface-2 px-2 py-2">
        {fileNames.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setActive(name)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-[11px] transition-colors",
              active === name
                ? "bg-primary text-primary-fg"
                : "text-muted hover:bg-surface-3 hover:text-fg",
            )}
          >
            <FileCode2 className="h-3 w-3" />
            {name}
          </button>
        ))}
      </div>
      <div className="grid lg:grid-cols-2">
        <div className="min-h-[320px] border-b border-border lg:border-b-0 lg:border-r">
          <CodeBlock code={current} title={active} lang="typescript" />
        </div>
        <div className="flex min-h-[320px] flex-col bg-bg/40 p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-primary">
            预览说明 · 等价运行时
          </p>
          <LivePreview presetId={preset.id} />
          <p className="mt-4 text-xs leading-relaxed text-subtle">
            左侧为真实 Angular 源码示例。本站用交互面板模拟运行结果（不嵌入完整 Angular
            编译器），逻辑与源码一一对应。可复制到本地{" "}
            <code className="rounded bg-surface-3 px-1 font-mono text-[10px]">ng new</code>{" "}
            项目中运行。
          </p>
        </div>
      </div>
    </div>
  );
}

function LivePreview({ presetId }: { presetId: string }) {
  switch (presetId) {
    case "counter":
      return <CounterLive />;
    case "computed":
      return <ComputedLive />;
    case "list":
      return <ListLive />;
    case "todo":
      return <TodoLive />;
    case "di":
      return <DiLive />;
    case "forms":
      return <FormsLive />;
    default:
      return (
        <p className="text-sm text-muted">选择一个预设查看交互预览。</p>
      );
  }
}

function CounterLive() {
  const [count, setCount] = useState(0);
  return (
    <div className="rounded-lg border border-border bg-surface-2 p-4">
      <h3 className="font-display text-base font-semibold">Angular Signals</h3>
      <p className="mt-2 text-sm text-muted">
        你点了 <strong className="font-mono text-primary">{count}</strong> 次
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-fg"
        >
          count++
        </button>
        <button
          type="button"
          onClick={() => setCount(0)}
          className="rounded-md border border-border px-3 py-1.5 text-sm text-fg"
        >
          重置
        </button>
      </div>
      <pre className="mt-4 font-mono text-[11px] text-subtle">
        {`count = signal(${count})\n// count() === ${count}`}
      </pre>
    </div>
  );
}

function ComputedLive() {
  const [first, setFirst] = useState("Ada");
  const [last, setLast] = useState("Lovelace");
  return (
    <div className="grid gap-3 rounded-lg border border-border bg-surface-2 p-4">
      <label className="grid gap-1 text-xs text-muted">
        名
        <input
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          className="h-9 rounded-md border border-border bg-bg px-3 text-sm text-fg"
        />
      </label>
      <label className="grid gap-1 text-xs text-muted">
        姓
        <input
          value={last}
          onChange={(e) => setLast(e.target.value)}
          className="h-9 rounded-md border border-border bg-bg px-3 text-sm text-fg"
        />
      </label>
      <p className="font-display text-xl font-semibold text-primary">
        {first} {last}
      </p>
      <p className="font-mono text-[11px] text-subtle">
        {`full = computed(() => first() + ' ' + last())`}
      </p>
    </div>
  );
}

function ListLive() {
  const [show, setShow] = useState(true);
  const [items, setItems] = useState([
    { id: 1, text: "学 signal" },
    { id: 2, text: "学 @for" },
  ]);
  const [draft, setDraft] = useState("");
  return (
    <div className="rounded-lg border border-border bg-surface-2 p-4">
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-fg"
      >
        切换显示
      </button>
      {show ? (
        <ul className="mt-3 space-y-1 text-sm">
          {items.map((i) => (
            <li key={i.id}>· {i.text}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-muted">已隐藏</p>
      )}
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const t = draft.trim();
          if (!t) return;
          setItems((list) => [...list, { id: Date.now(), text: t }]);
          setDraft("");
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="新项"
          className="h-9 min-w-0 flex-1 rounded-md border border-border bg-bg px-3 text-sm"
        />
        <button
          type="submit"
          className="rounded-md bg-primary px-3 text-sm font-semibold text-primary-fg"
        >
          添加
        </button>
      </form>
    </div>
  );
}

function TodoLive() {
  const [todos, setTodos] = useState<
    { id: number; text: string; done: boolean }[]
  >([]);
  const [draft, setDraft] = useState("");
  const remaining = todos.filter((t) => !t.done).length;
  return (
    <div className="rounded-lg border border-border bg-surface-2 p-4">
      <h3 className="font-display text-sm font-semibold">
        Todos ({remaining} left)
      </h3>
      <form
        className="mt-2"
        onSubmit={(e) => {
          e.preventDefault();
          const t = draft.trim();
          if (!t) return;
          setTodos((list) => [...list, { id: Date.now(), text: t, done: false }]);
          setDraft("");
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What needs doing?"
          className="h-9 w-full rounded-md border border-border bg-bg px-3 text-sm"
        />
      </form>
      <ul className="mt-3 space-y-2">
        {todos.map((t) => (
          <li
            key={t.id}
            className={cn(
              "flex items-center justify-between gap-2 text-sm",
              t.done && "text-muted line-through",
            )}
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() =>
                  setTodos((list) =>
                    list.map((x) =>
                      x.id === t.id ? { ...x, done: !x.done } : x,
                    ),
                  )
                }
              />
              {t.text}
            </label>
            <button
              type="button"
              className="text-primary"
              onClick={() => setTodos((list) => list.filter((x) => x.id !== t.id))}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DiLive() {
  const [count, setCount] = useState(0);
  return (
    <div className="rounded-lg border border-border bg-surface-2 p-4">
      <p className="text-xs text-muted">inject(CounterStore)</p>
      <p className="mt-2 font-mono text-3xl font-semibold text-primary">{count}</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-fg"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => setCount(0)}
          className="rounded-md border border-border px-3 py-1.5 text-sm"
        >
          reset
        </button>
      </div>
    </div>
  );
}

function FormsLive() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passOk = password.length >= 8;
  const valid = emailOk && passOk;
  return (
    <form
      className="grid max-w-xs gap-2 rounded-lg border border-border bg-surface-2 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!valid) return;
        alert(`登录模拟：${email}`);
      }}
    >
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
        placeholder="email"
        className="h-9 rounded-md border border-border bg-bg px-3 text-sm"
      />
      {touched.email && !emailOk ? (
        <p className="text-xs text-danger">请输入有效邮箱</p>
      ) : null}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, password: true }))}
        placeholder="password"
        className="h-9 rounded-md border border-border bg-bg px-3 text-sm"
      />
      {touched.password && !passOk ? (
        <p className="text-xs text-danger">至少 8 位</p>
      ) : null}
      <button
        type="submit"
        disabled={!valid}
        className="rounded-md bg-primary py-2 text-sm font-semibold text-primary-fg disabled:opacity-50"
      >
        登录
      </button>
    </form>
  );
}
