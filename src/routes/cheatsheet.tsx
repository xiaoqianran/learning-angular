import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked } from "lucide-react";

export const Route = createFileRoute("/cheatsheet")({
  component: CheatsheetPage,
});

const SECTIONS: { title: string; items: { k: string; v: string }[] }[] = [
  {
    title: "从 Vue 过来（对照）",
    items: [
      { k: "ref / reactive", v: "signal() · 读 count() · 写 set/update" },
      { k: "computed / watch", v: "computed() / effect()" },
      { k: "v-if / v-for", v: "@if / @for (track id)" },
      { k: "v-model", v: "[(ngModel)] 或 formControlName" },
      { k: "props / emits", v: "input() / output()" },
      { k: "provide/inject", v: "providers + inject() / InjectionToken" },
      { k: "Vue Router", v: "Angular Router · CanActivateFn" },
      { k: "Pinia", v: "root 服务 + signal 或 NgRx" },
      { k: "Teleport", v: "CDK Overlay / Dialog" },
      { k: "KeepAlive", v: "RouteReuseStrategy" },
    ],
  },
  {
    title: "Signals",
    items: [
      { k: "signal(x)", v: "可写信号；读 x()，写 set/update" },
      { k: "computed", v: "派生只读；依赖缓存" },
      { k: "effect", v: "副作用；注意清理" },
      { k: "linkedSignal", v: "与源信号联动的可写派生" },
      { k: "toSignal / toObservable", v: "与 RxJS 互操作" },
    ],
  },
  {
    title: "模板",
    items: [
      { k: "{{ }}", v: "文本插值" },
      { k: "[prop]", v: "属性绑定" },
      { k: "(event)", v: "事件绑定；$event" },
      { k: "[(ngModel)]", v: "双向绑定（FormsModule）" },
      { k: "@if / @for", v: "控制流；@for 必 track" },
      { k: "@switch", v: "多分支" },
    ],
  },
  {
    title: "组件与 DI",
    items: [
      { k: "input() / output()", v: "父↔子通信" },
      { k: "ng-content", v: "内容投影；select 多槽" },
      { k: "inject()", v: "函数式依赖注入" },
      { k: "providedIn: 'root'", v: "应用单例服务" },
      { k: "InjectionToken", v: "配置/接口注入" },
      { k: "OnPush", v: "更少变更检测" },
    ],
  },
  {
    title: "路由与状态",
    items: [
      { k: "provideRouter", v: "路由表" },
      { k: "routerLink / Router", v: "声明式 / 编程式导航" },
      { k: "CanActivateFn", v: "守卫；不能替代服务端鉴权" },
      { k: "loadComponent", v: "懒加载" },
      { k: "root service + signal", v: "多数场景足够" },
    ],
  },
  {
    title: "请求与全栈",
    items: [
      { k: "HttpClient", v: "官方 HTTP" },
      { k: "loading/error/data", v: "三态必备" },
      { k: "HttpInterceptorFn", v: "Token / 错误横切" },
      { k: "401", v: "清 token → 登录" },
      { k: "NestJS", v: "同 TS 全栈搭档" },
    ],
  },
  {
    title: "工程",
    items: [
      { k: "standalone: true", v: "默认组件形态" },
      { k: "Reactive Forms", v: "复杂校验首选" },
      { k: "TestBed", v: "组件/服务单测" },
      { k: "ng build", v: "生产构建" },
      { k: "SPA fallback", v: "history 刷新需服务器配置" },
    ],
  },
];

function CheatsheetPage() {
  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <BookMarked className="h-3.5 w-3.5" />
          v1 · 速查
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg sm:text-3xl">
          Angular 速查表
        </h1>
        <p className="mt-2 text-sm text-muted">
          面试前 / 写代码时快速扫一眼。详细讲解见对应课程；实战见{" "}
          <Link to="/studio" className="text-primary no-underline hover:underline">
            全栈工坊
          </Link>
          。
        </p>
      </header>

      <div className="grid gap-4">
        {SECTIONS.map((sec) => (
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
                  key={it.k}
                  className="grid gap-1 px-4 py-2.5 sm:grid-cols-[11rem_1fr] sm:gap-3"
                >
                  <code className="font-mono text-xs text-primary">{it.k}</code>
                  <span className="text-sm text-muted">{it.v}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-subtle">
        建议学习路径：基础 → 进阶 → 全栈准备 → 工坊闯关 → 工程化 → 进阶模式
      </p>
    </div>
  );
}
