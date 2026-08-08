export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
};

export type DemoKind =
  | "counter"
  | "template"
  | "ref-vs-reactive"
  | "computed"
  | "list"
  | "events"
  | "form"
  | "component"
  | "lifecycle"
  | "todo"
  | "router"
  | "pinia"
  | "challenge"
  | "slots"
  | "provide"
  | "async"
  | "guard"
  | "validate"
  | "teleport"
  | "keepalive"
  | "directive"
  | "defer"
  | "pipe"
  | "resource"
  | "linked"
  | "model-input"
  | "zoneless"
  | "style-encap"
  | "structural"
  | "host-dir"
  | "image-opt"
  | "query"
  | "typed-form"
  | "dynamic-form"
  | "outlet"
  | "harness"
  | "diagnostics";

export type LessonBlock =
  | { type: "text"; title?: string; body: string }
  | { type: "code"; title?: string; lang?: string; code: string }
  | { type: "tip"; body: string }
  | { type: "demo"; kind: DemoKind; title: string; hint?: string }
  | { type: "quiz"; questions: QuizQuestion[] };

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  level: "入门" | "进阶" | "实战";
  track: "基础" | "进阶" | "全栈准备" | "全栈实训" | "工程化" | "进阶模式";
  minutes: number;
  blocks: LessonBlock[];
};

export const LESSONS: Lesson[] = [
  {
    slug: "intro",
    title: "Angular 是什么",
    summary: "平台级框架、组件与信号。",
    level: "入门",
    track: "基础",
    minutes: 6,
    blocks: [
      {
        type: "text",
        title: "Angular 是什么",
        body: "Angular 是 Google 维护的全功能前端框架：组件 + 依赖注入 + 路由 + 表单 + HttpClient 一站式。现代 Angular 推荐 Standalone 组件与 Signals 响应式。\n\n学习方法：先看「对应源码」，再点 Demo 验证 — 源码里的 count 就是 Demo 里跳动的数字。"
      },
      {
        type: "code",
        title: "对应源码 · 计数器 · Signals",
        lang: "typescript",
        code: "import { Component, signal } from '@angular/core';\n\n@Component({\n  selector: 'app-counter',\n  standalone: true,\n  template: `\n    <p>点了 {{ count() }} 次</p>\n    <button (click)=\"inc()\">count++</button>\n    <button (click)=\"count.set(0)\">重置</button>\n  `,\n})\nexport class CounterComponent {\n  count = signal(0);\n  inc() { this.count.update(c => c + 1); }\n}"
      },
      {
        type: "demo",
        kind: "counter",
        title: "动手：计数器",
      },
      {
        type: "tip",
        body: "和 Vue 对比：Vue 是渐进式库可逐步引入；Angular 是完整平台（CLI/DI/Router/Forms 开箱）。两者都能做大型应用，团队栈决定选型。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "i1",
            question: "Angular 定位？",
            options: [
              "仅视图库",
              "全功能应用框架",
              "仅 CSS 工具",
              "数据库"
            ],
            answer: 1,
            explain: "组件/DI/路由/表单一体。"
          },
          {
            id: "i2",
            question: "现代 Angular 推荐？",
            options: [
              "仅 NgModule",
              "Standalone + Signals",
              "仅 jQuery",
              "仅 Options API"
            ],
            answer: 1,
            explain: "Standalone 与 Signals。"
          }
        ]
      }
    ]
  },
  {
    slug: "template",
    title: "模板语法",
    summary: "插值、属性与事件绑定。",
    level: "入门",
    track: "基础",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "模板语法",
        body: "模板用 {{ }} 插值；[prop] 绑属性；(event) 绑事件；[(ngModel)] 双向绑定（需 FormsModule）。[innerHTML] 会插入原始 HTML，注意 XSS。\n\n改 Demo 左侧数据，右侧立刻反映绑定结果。"
      },
      {
        type: "code",
        title: "对应源码 · 模板插值与绑定",
        lang: "typescript",
        code: "import { Component, signal } from '@angular/core';\n\n@Component({\n  selector: 'app-tpl',\n  standalone: true,\n  template: `\n    <p>{{ msg() }}</p>\n    <p [class.active]=\"isActive()\">\n      [class] 绑定 → {{ isActive() ? 'active' : 'inactive' }}\n    </p>\n  `,\n})\nexport class TplComponent {\n  msg = signal('你好，Angular');\n  isActive = signal(true);\n}"
      },
      {
        type: "demo",
        kind: "template",
        title: "动手：模板",
      },
      {
        type: "tip",
        body: "记忆口诀：方括号绑属性 [x]，圆括号绑事件 (x)，香蕉盒双向 [(x)]。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "t1",
            question: "属性绑定写法？",
            options: [
              "[attr]",
              "@attr",
              "#attr",
              ".attr"
            ],
            answer: 0,
            explain: "[title]=\"x\""
          },
          {
            id: "t2",
            question: "innerHTML 风险？",
            options: [
              "慢",
              "XSS",
              "移除",
              "仅数字"
            ],
            answer: 1,
            explain: "XSS。"
          }
        ]
      }
    ]
  },
  {
    slug: "reactivity",
    title: "响应式：Signals",
    summary: "signal / model / linkedSignal。",
    level: "入门",
    track: "基础",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "Signals 响应式",
        body: "signal() 创建可写信号，读用 count()，写用 set/update。模板里自动追踪依赖。复杂对象可放 signal 里整表替换，或用 mutable 模式配合 markForCheck。\n\n对照 Demo：左边点 count++，右边改对象字段。"
      },
      {
        type: "code",
        title: "对应源码 · signal",
        lang: "typescript",
        code: "import { Component, signal } from '@angular/core';\n\n@Component({\n  standalone: true,\n  selector: 'app-sig',\n  template: `\n    <p>{{ count() }}</p>\n    <button (click)=\"count.update(c => c + 1)\">++</button>\n    <p>{{ state().name }} / {{ state().n }}</p>\n    <button (click)=\"bump()\">n++</button>\n  `,\n})\nexport class SigComponent {\n  count = signal(0);\n  state = signal({ name: 'Angular', n: 1 });\n  bump() {\n    this.state.update(s => ({ ...s, n: s.n + 1 }));\n  }\n}"
      },
      {
        type: "demo",
        kind: "ref-vs-reactive",
        title: "动手：Signals",
      },
      {
        type: "tip",
        body: "对象更新务必不可变：state.update(s => ({...s, n: s.n+1}))，便于 OnPush 与调试。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "r1",
            question: "读 signal？",
            options: [
              "count",
              "count()",
              "count.value",
              "val"
            ],
            answer: 1,
            explain: "函数调用 count()。"
          },
          {
            id: "r2",
            question: "更新 signal？",
            options: [
              "仅赋值",
              "set / update",
              "只能模板改",
              "用 $"
            ],
            answer: 1,
            explain: "set 或 update。"
          }
        ]
      }
    ]
  },
  {
    slug: "computed",
    title: "计算属性与 effect",
    summary: "computed / effect。",
    level: "入门",
    track: "基础",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "computed 与 effect",
        body: "computed() 是有缓存的派生信号，依赖不变不重算。effect() 做副作用（日志、同步）。不要在 computed 里发请求。"
      },
      {
        type: "code",
        title: "对应源码 · computed + effect",
        lang: "typescript",
        code: "import { Component, signal, computed, effect } from '@angular/core';\n\n@Component({\n  standalone: true,\n  selector: 'app-comp',\n  template: `\n    <input [value]=\"first()\" (input)=\"first.set($any($event.target).value)\" />\n    <input [value]=\"last()\" (input)=\"last.set($any($event.target).value)\" />\n    <p>{{ full() }}</p>\n  `,\n})\nexport class CompComponent {\n  first = signal('Ada');\n  last = signal('Lovelace');\n  full = computed(() => `${this.first()} ${this.last()}`);\n  constructor() {\n    effect(() => console.log('effect →', this.full()));\n  }\n}"
      },
      {
        type: "demo",
        kind: "computed",
        title: "动手：computed",
      },
      {
        type: "tip",
        body: "effect 在构造期创建时注意：仅用于同步副作用；HTTP 请求更适合显式方法 + 订阅清理。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "c1",
            question: "computed？",
            options: [
              "无缓存",
              "有缓存派生",
              "仅 HTTP",
              "无返回"
            ],
            answer: 1,
            explain: "有缓存。"
          },
          {
            id: "c2",
            question: "副作用用？",
            options: [
              "computed",
              "effect",
              "selector",
              "pipe"
            ],
            answer: 1,
            explain: "effect。"
          }
        ]
      }
    ]
  },
  {
    slug: "list-render",
    title: "条件与列表渲染",
    summary: "@if / @for / track。",
    level: "入门",
    track: "基础",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "@if 与 @for",
        body: "Angular 控制流：@if / @else、@for (item of items; track item.id)。track 必须稳定，优先业务 id 而非 index。"
      },
      {
        type: "code",
        title: "对应源码 · @if @for",
        lang: "typescript",
        code: "import { Component, signal } from '@angular/core';\n\n@Component({\n  standalone: true,\n  selector: 'app-list',\n  template: `\n    @if (show()) {\n      <ul>\n        @for (item of items(); track item.id) {\n          <li>{{ item.text }}</li>\n        }\n      </ul>\n    } @else {\n      <p>已隐藏</p>\n    }\n  `,\n})\nexport class ListComponent {\n  show = signal(true);\n  items = signal([\n    { id: 1, text: '学 signal' },\n    { id: 2, text: '学 @for' },\n  ]);\n}"
      },
      {
        type: "demo",
        kind: "list",
        title: "动手：列表",
      },
      {
        type: "tip",
        body: "@for 的 track 决定 diff 身份；动画/状态挂在错误 key 上会出现「输入框串值」。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "l1",
            question: "列表 track 优先？",
            options: [
              "index",
              "稳定业务 id",
              "随机",
              "不要 track"
            ],
            answer: 1,
            explain: "稳定 id。"
          },
          {
            id: "l2",
            question: "条件渲染？",
            options: [
              "@if",
              "v-if",
              "*ngIf only 强制",
              "css only"
            ],
            answer: 0,
            explain: "@if 控制流。"
          }
        ]
      }
    ]
  },
  {
    slug: "events",
    title: "事件处理",
    summary: "(click) 与 $event。",
    level: "入门",
    track: "基础",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "事件绑定",
        body: "用 (event)=\"handler($event)\"。可写模板语句或调用组件方法。修饰可用 .preventDefault() 等在方法里处理。"
      },
      {
        type: "code",
        title: "对应源码 · 事件",
        lang: "typescript",
        code: "import { Component, signal } from '@angular/core';\n\n@Component({\n  standalone: true,\n  selector: 'app-evt',\n  template: `\n    <button (click)=\"onClick($event)\">点我</button>\n    <p>上次：{{ last() }}</p>\n  `,\n})\nexport class EvtComponent {\n  last = signal('-');\n  onClick(e: MouseEvent) {\n    this.last.set(`x=${e.clientX}`);\n  }\n}"
      },
      {
        type: "demo",
        kind: "events",
        title: "动手：事件",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "e1",
            question: "事件绑定？",
            options: [
              "(click)",
              "@click",
              "on-click",
              "v-on"
            ],
            answer: 0,
            explain: "(click)。"
          },
          {
            id: "e2",
            question: "拿到原生事件？",
            options: [
              "$event",
              "event()",
              "this.e",
              "args"
            ],
            answer: 0,
            explain: "$event。"
          }
        ]
      }
    ]
  },
  {
    slug: "forms",
    title: "表单与 ngModel",
    summary: "模板驱动表单入门。",
    level: "入门",
    track: "基础",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "模板驱动表单",
        body: "引入 FormsModule 后可用 [(ngModel)] 双向绑定。适合简单表单；复杂校验更推荐 Reactive Forms。"
      },
      {
        type: "code",
        title: "对应源码 · ngModel",
        lang: "typescript",
        code: "import { Component } from '@angular/core';\nimport { FormsModule } from '@angular/forms';\n\n@Component({\n  standalone: true,\n  imports: [FormsModule],\n  selector: 'app-form',\n  template: `\n    <input [(ngModel)]=\"name\" name=\"name\" />\n    <p>你好，{{ name }}</p>\n  `,\n})\nexport class FormComponent {\n  name = 'Angular';\n}"
      },
      {
        type: "demo",
        kind: "form",
        title: "动手：表单",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "f1",
            question: "双向绑定？",
            options: [
              "[(ngModel)]",
              "[ngModel]",
              "(ngModel)",
              "v-model"
            ],
            answer: 0,
            explain: "香蕉盒语法。"
          },
          {
            id: "f2",
            question: "ngModel 需要？",
            options: [
              "FormsModule",
              "HttpClient",
              "Router",
              "无"
            ],
            answer: 0,
            explain: "FormsModule。"
          }
        ]
      }
    ]
  },
  {
    slug: "components",
    title: "组件基础",
    summary: "Standalone 组件与选择器。",
    level: "入门",
    track: "基础",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "组件",
        body: "Angular 一切 UI 都是组件：@Component 装饰器 + 类。Standalone 组件在 imports 里声明依赖，无需 NgModule。"
      },
      {
        type: "code",
        title: "对应源码 · 父子组件",
        lang: "typescript",
        code: "import { Component } from '@angular/core';\nimport { ChildComponent } from './child';\n\n@Component({\n  standalone: true,\n  imports: [ChildComponent],\n  selector: 'app-root',\n  template: `<app-child title=\"你好\" />`,\n})\nexport class AppComponent {}"
      },
      {
        type: "demo",
        kind: "component",
        title: "动手：组件",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "co1",
            question: "组件装饰器？",
            options: [
              "@Component",
              "@View",
              "@Page",
              "@Widget"
            ],
            answer: 0,
            explain: "@Component。"
          },
          {
            id: "co2",
            question: "Standalone 依赖写在？",
            options: [
              "imports",
              "providers only",
              "styles",
              "index.html"
            ],
            answer: 0,
            explain: "imports 数组。"
          }
        ]
      }
    ]
  },
  {
    slug: "props-emits",
    title: "Input 与 Output",
    summary: "input() / output()。",
    level: "入门",
    track: "基础",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "输入与输出",
        body: "父→子用 input()（或 @Input），子→父用 output()（或 @Output EventEmitter）。现代 API 更简洁且类型友好。"
      },
      {
        type: "code",
        title: "对应源码 · input/output",
        lang: "typescript",
        code: "import { Component, input, output } from '@angular/core';\n\n@Component({\n  standalone: true,\n  selector: 'app-card',\n  template: `\n    <h3>{{ title() }}</h3>\n    <button (click)=\"closed.emit()\">关闭</button>\n  `,\n})\nexport class CardComponent {\n  title = input.required<string>();\n  closed = output<void>();\n}"
      },
      {
        type: "demo",
        kind: "component",
        title: "动手：输入输出",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "p1",
            question: "父传子？",
            options: [
              "input()",
              "output()",
              "inject()",
              "pipe"
            ],
            answer: 0,
            explain: "input。"
          },
          {
            id: "p2",
            question: "子通知父？",
            options: [
              "output()",
              "input()",
              "signal only",
              "window"
            ],
            answer: 0,
            explain: "output emit。"
          }
        ]
      }
    ]
  },
  {
    slug: "lifecycle",
    title: "生命周期",
    summary: "ngOnInit / destroy 钩子。",
    level: "入门",
    track: "基础",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "生命周期",
        body: "常用：constructor → ngOnInit → ngOnChanges → ngAfterViewInit → ngOnDestroy。订阅要在 destroy 时取消。也可用 DestroyRef + takeUntilDestroyed。"
      },
      {
        type: "code",
        title: "对应源码 · 生命周期",
        lang: "typescript",
        code: "import { Component, OnInit, OnDestroy } from '@angular/core';\n\n@Component({ standalone: true, selector: 'app-life', template: `...` })\nexport class LifeComponent implements OnInit, OnDestroy {\n  ngOnInit() { console.log('init'); }\n  ngOnDestroy() { console.log('destroy'); }\n}"
      },
      {
        type: "demo",
        kind: "lifecycle",
        title: "动手：生命周期",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "lc1",
            question: "首次数据初始化？",
            options: [
              "ngOnInit",
              "constructor only",
              "ngOnDestroy",
              "pipe"
            ],
            answer: 0,
            explain: "ngOnInit。"
          },
          {
            id: "lc2",
            question: "清理订阅？",
            options: [
              "ngOnDestroy",
              "ngOnInit",
              "不用清",
              "HTML"
            ],
            answer: 0,
            explain: "destroy。"
          }
        ]
      }
    ]
  },
  {
    slug: "composition",
    title: "组合逻辑实践",
    summary: "服务、inject、可复用逻辑。",
    level: "入门",
    track: "基础",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "组合逻辑",
        body: "把可复用状态/方法抽成 injectable 服务或纯函数。组件保持薄：模板 + 协调。用 inject() 替代冗长 constructor 注入。"
      },
      {
        type: "code",
        title: "对应源码 · inject 服务",
        lang: "typescript",
        code: "import { Injectable, inject, signal } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class CounterStore {\n  count = signal(0);\n  inc() { this.count.update(c => c + 1); }\n}\n\n// 组件内\n// private store = inject(CounterStore);"
      },
      {
        type: "demo",
        kind: "todo",
        title: "动手：Todo 小应用",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "cp1",
            question: "全局单例服务？",
            options: [
              "providedIn: root",
              "每个组件 new",
              "window",
              "CSS"
            ],
            answer: 0,
            explain: "root 单例。"
          },
          {
            id: "cp2",
            question: "现代注入？",
            options: [
              "inject()",
              "仅 Reflect",
              "全局变量",
              "require"
            ],
            answer: 0,
            explain: "inject()。"
          }
        ]
      }
    ]
  },
  {
    slug: "router",
    title: "Angular Router",
    summary: "路由表、参数与导航。",
    level: "进阶",
    track: "进阶",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "路由",
        body: "provideRouter(routes) 配置路由。RouterLink / RouterOutlet 渲染。ActivatedRoute 读参数，Router 编程式导航。"
      },
      {
        type: "code",
        title: "对应源码 · 路由",
        lang: "typescript",
        code: "import { Routes } from '@angular/router';\n\nexport const routes: Routes = [\n  { path: '', component: HomeComponent },\n  { path: 'lesson/:slug', component: LessonComponent },\n  { path: '**', redirectTo: '' },\n];"
      },
      {
        type: "demo",
        kind: "router",
        title: "动手：路由",
      },
      {
        type: "tip",
        body: "懒加载：loadComponent / loadChildren 按路由拆包，首屏更轻。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rt1",
            question: "渲染出口？",
            options: [
              "router-outlet",
              "router-view",
              "ng-content",
              "slot"
            ],
            answer: 0,
            explain: "router-outlet。"
          },
          {
            id: "rt2",
            question: "声明式链接？",
            options: [
              "routerLink",
              "href only",
              "a-href",
              "navigate-to"
            ],
            answer: 0,
            explain: "routerLink。"
          }
        ]
      }
    ]
  },
  {
    slug: "pinia",
    title: "状态管理",
    summary: "服务 + Signals / NgRx 心智。",
    level: "进阶",
    track: "进阶",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "状态管理",
        body: "多数应用用 root 服务 + signals 即可。复杂领域可上 NgRx / ComponentStore。原则：单一数据源、不可变更新、组件只读状态。"
      },
      {
        type: "code",
        title: "对应源码 · Signal Store",
        lang: "typescript",
        code: "import { Injectable, signal, computed } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class CartStore {\n  private items = signal<{ id: string; qty: number }[]>([]);\n  totalQty = computed(() => this.items().reduce((a, i) => a + i.qty, 0));\n  add(id: string) {\n    this.items.update(list => [...list, { id, qty: 1 }]);\n  }\n}"
      },
      {
        type: "demo",
        kind: "pinia",
        title: "动手：全局状态",
      },
      {
        type: "tip",
        body: "简单全局状态用 root 服务 + signal 即可；跨功能复杂工作流再考虑 NgRx。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "st1",
            question: "简单全局状态？",
            options: [
              "root 服务 + signal",
              "必须 NgRx",
              "localStorage only",
              "CSS 变量"
            ],
            answer: 0,
            explain: "服务足够。"
          },
          {
            id: "st2",
            question: "派生数量？",
            options: [
              "computed",
              "setInterval",
              "DOM 数",
              "output"
            ],
            answer: 0,
            explain: "computed。"
          }
        ]
      }
    ]
  },
  {
    slug: "pitfalls",
    title: "常见坑与性能",
    summary: "变更检测、异步管道、内存泄漏。",
    level: "进阶",
    track: "进阶",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "常见坑",
        body: "1) 订阅未取消导致泄漏 2) 模板里重函数调用触发多余 CD 3) 可变对象原地改却期望 OnPush 更新 4) track 用 index 导致错位。优先 OnPush + signals。"
      },
      {
        type: "code",
        title: "对应源码 · OnPush + async",
        lang: "typescript",
        code: "import { Component, ChangeDetectionStrategy } from '@angular/core';\nimport { AsyncPipe } from '@angular/common';\nimport { of } from 'rxjs';\n\n@Component({\n  standalone: true,\n  imports: [AsyncPipe],\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  template: `<p>{{ data$ | async }}</p>`,\n})\nexport class SafeComponent {\n  data$ = of('ok');\n}"
      },
      {
        type: "demo",
        kind: "challenge",
        title: "动手：找茬挑战",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pf1",
            question: "订阅清理？",
            options: [
              "takeUntilDestroyed / destroy",
              "永不",
              "只 console",
              "HTML"
            ],
            answer: 0,
            explain: "必须清理。"
          },
          {
            id: "pf2",
            question: "OnPush 更新靠？",
            options: [
              "输入引用变化 / signal / async",
              "任意 this.x=1 必然",
              "setInterval",
              "CSS"
            ],
            answer: 0,
            explain: "不可变 + 信号。"
          }
        ]
      }
    ]
  },
  {
    slug: "project",
    title: "从零搭一个小项目",
    summary: "CLI 脚手架与目录。",
    level: "进阶",
    track: "进阶",
    minutes: 14,
    blocks: [
      {
        type: "text",
        title: "脚手架",
        body: "npx @angular/cli new my-app --standalone。目录：app/ 组件、routes、services。用 environments 管理配置。先跑通列表页再加鉴权。"
      },
      {
        type: "code",
        title: "对应源码 · 最小路由应用",
        lang: "typescript",
        code: "// app.routes.ts\nexport const routes = [\n  { path: '', loadComponent: () => import('./home').then(m => m.HomeComponent) },\n  { path: 'todos', loadComponent: () => import('./todos').then(m => m.TodosComponent) },\n];"
      },
      {
        type: "demo",
        kind: "todo",
        title: "动手：项目雏形 Todo",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pj1",
            question: "官方脚手架？",
            options: [
              "Angular CLI",
              "create-react-app",
              "vue create",
              "rails"
            ],
            answer: 0,
            explain: "ng new。"
          },
          {
            id: "pj2",
            question: "懒加载组件？",
            options: [
              "loadComponent",
              "require sync",
              "script 标签",
              "iframe"
            ],
            answer: 0,
            explain: "loadComponent。"
          }
        ]
      }
    ]
  },
  {
    slug: "slots",
    title: "内容投影",
    summary: "ng-content 与多槽。",
    level: "进阶",
    track: "全栈准备",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "内容投影",
        body: "ng-content 把父模板投影进子组件。select 属性区分多槽，类似 Vue 具名插槽。"
      },
      {
        type: "code",
        title: "对应源码 · ng-content",
        lang: "typescript",
        code: "@Component({\n  standalone: true,\n  selector: 'app-card',\n  template: `\n    <header><ng-content select=\"[card-title]\" /></header>\n    <div class=\"body\"><ng-content /></div>\n  `,\n})\nexport class CardComponent {}\n\n// 使用：\n// <app-card>\n//   <h2 card-title>标题</h2>\n//   <p>正文</p>\n// </app-card>"
      },
      {
        type: "demo",
        kind: "slots",
        title: "动手：内容投影",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sl1",
            question: "投影标签？",
            options: [
              "ng-content",
              "ng-template only",
              "slot Vue",
              "iframe"
            ],
            answer: 0,
            explain: "ng-content。"
          },
          {
            id: "sl2",
            question: "多槽？",
            options: [
              "select 选择器",
              "无法多槽",
              "仅 CSS",
              "output"
            ],
            answer: 0,
            explain: "select。"
          }
        ]
      }
    ]
  },
  {
    slug: "provide-inject",
    title: "依赖注入进阶",
    summary: "InjectionToken 与层级。",
    level: "进阶",
    track: "全栈准备",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "DI 层级",
        body: "providers 可在 root / 路由 / 组件级。组件级 provider 每次创建独立实例。InjectionToken 给接口/配置用。"
      },
      {
        type: "code",
        title: "对应源码 · Token",
        lang: "typescript",
        code: "import { InjectionToken, inject } from '@angular/core';\n\nexport const API_URL = new InjectionToken<string>('API_URL');\n\n// bootstrap: providers: [{ provide: API_URL, useValue: 'https://api.example' }]\n// 组件: const url = inject(API_URL);"
      },
      {
        type: "demo",
        kind: "provide",
        title: "动手：DI",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "di1",
            question: "配置注入？",
            options: [
              "InjectionToken",
              "window.x",
              "CSS 变量",
              "localStorage only"
            ],
            answer: 0,
            explain: "Token。"
          },
          {
            id: "di2",
            question: "组件 providers 效果？",
            options: [
              "该子树新实例",
              "全局覆盖 root 永久",
              "无效果",
              "删除 DI"
            ],
            answer: 0,
            explain: "子树作用域。"
          }
        ]
      }
    ]
  },
  {
    slug: "async-data",
    title: "异步数据与请求态",
    summary: "HttpClient 与 loading 三态。",
    level: "进阶",
    track: "全栈准备",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "请求三态",
        body: "loading / error / data 必备。HttpClient 返回 Observable，用 async 管道或转为 signal。取消用 switchMap / takeUntilDestroyed。"
      },
      {
        type: "code",
        title: "对应源码 · HttpClient",
        lang: "typescript",
        code: "import { inject, signal } from '@angular/core';\nimport { HttpClient } from '@angular/common/http';\n\nexport class UsersService {\n  private http = inject(HttpClient);\n  loading = signal(false);\n  error = signal<string | null>(null);\n  users = signal<User[]>([]);\n\n  load() {\n    this.loading.set(true);\n    this.http.get<User[]>('/api/users').subscribe({\n      next: (u) => { this.users.set(u); this.loading.set(false); },\n      error: (e) => { this.error.set(e.message); this.loading.set(false); },\n    });\n  }\n}"
      },
      {
        type: "demo",
        kind: "async",
        title: "动手：异步三态",
      },
      {
        type: "tip",
        body: "把 HttpClient 逻辑放服务，组件只展示三态；方便单测与复用。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "as1",
            question: "HTTP 模块？",
            options: [
              "HttpClient",
              "fetch 必须手写包装 only",
              "axios 内置",
              "XML"
            ],
            answer: 0,
            explain: "HttpClient。"
          },
          {
            id: "as2",
            question: "三态？",
            options: [
              "loading/error/data",
              "只有 data",
              "只有 error",
              "无状态"
            ],
            answer: 0,
            explain: "三态。"
          }
        ]
      }
    ]
  },
  {
    slug: "route-guards",
    title: "路由守卫与鉴权心智",
    summary: "CanActivateFn 等。",
    level: "进阶",
    track: "全栈准备",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "守卫",
        body: "CanActivateFn 决定能否进入路由。前端守卫只是 UX，真正鉴权在服务端。未登录 redirect 到 /login?returnUrl=。"
      },
      {
        type: "code",
        title: "对应源码 · 守卫",
        lang: "typescript",
        code: "import { inject } from '@angular/core';\nimport { CanActivateFn, Router } from '@angular/router';\nimport { AuthService } from './auth';\n\nexport const authGuard: CanActivateFn = () => {\n  const auth = inject(AuthService);\n  const router = inject(Router);\n  if (auth.isLoggedIn()) return true;\n  return router.createUrlTree(['/login']);\n};"
      },
      {
        type: "demo",
        kind: "guard",
        title: "动手：守卫",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "g1",
            question: "现代守卫类型？",
            options: [
              "CanActivateFn",
              "only class",
              "middleware express",
              "nginx"
            ],
            answer: 0,
            explain: "函数守卫。"
          },
          {
            id: "g2",
            question: "前端守卫能替代服务端？",
            options: [
              "不能",
              "能完全替代",
              "仅 HTTPS 时",
              "仅 PWA"
            ],
            answer: 0,
            explain: "不能。"
          }
        ]
      }
    ]
  },
  {
    slug: "form-validate",
    title: "表单校验",
    summary: "Validators 与错误展示。",
    level: "进阶",
    track: "全栈准备",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "响应式表单校验",
        body: "FormControl 带 Validators.required / email / minLength。模板用 control.invalid && control.touched 显示错误。跨字段用组级 validator。"
      },
      {
        type: "code",
        title: "对应源码 · Reactive Forms",
        lang: "typescript",
        code: "import { FormControl, FormGroup, Validators } from '@angular/forms';\n\nconst form = new FormGroup({\n  email: new FormControl('', [Validators.required, Validators.email]),\n  password: new FormControl('', [Validators.required, Validators.minLength(8)]),\n});"
      },
      {
        type: "demo",
        kind: "validate",
        title: "动手：校验",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "v1",
            question: "必填？",
            options: [
              "Validators.required",
              "required()",
              "must",
              "need"
            ],
            answer: 0,
            explain: "Validators.required。"
          },
          {
            id: "v2",
            question: "何时显示错误？",
            options: [
              "invalid && touched",
              "永远",
              "从不",
              "仅 blur 服务端"
            ],
            answer: 0,
            explain: "交互后再提示。"
          }
        ]
      }
    ]
  },
  {
    slug: "rest-api",
    title: "REST API 与 CRUD",
    summary: "资源与动词。",
    level: "实战",
    track: "全栈实训",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "REST",
        body: "资源用名词复数：/notes。GET 列表/详情，POST 创建，PUT/PATCH 更新，DELETE 删除。状态码：200/201/204/400/401/404/500。"
      },
      {
        type: "code",
        title: "对应源码 · Notes API",
        lang: "typescript",
        code: "// GET    /api/notes\n// POST   /api/notes\n// PUT    /api/notes/:id\n// DELETE /api/notes/:id\n\nthis.http.post<Note>('/api/notes', { title, body }).subscribe();"
      },
      {
        type: "demo",
        kind: "async",
        title: "动手：体会请求",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "re1",
            question: "创建资源？",
            options: [
              "POST",
              "GET",
              "DELETE",
              "HEAD"
            ],
            answer: 0,
            explain: "POST。"
          },
          {
            id: "re2",
            question: "未登录？",
            options: [
              "401",
              "200",
              "301",
              "418"
            ],
            answer: 0,
            explain: "401。"
          }
        ]
      }
    ]
  },
  {
    slug: "auth-token",
    title: "Token 登录与会话",
    summary: "Bearer 与拦截器。",
    level: "实战",
    track: "全栈实训",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "Token 会话",
        body: "登录换 JWT/Token，存内存或 httpOnly cookie。HttpInterceptor 附加 Authorization。401 清会话并跳登录。"
      },
      {
        type: "code",
        title: "对应源码 · 拦截器",
        lang: "typescript",
        code: "export const authInterceptor: HttpInterceptorFn = (req, next) => {\n  const token = inject(AuthService).token();\n  if (token) {\n    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });\n  }\n  return next(req);\n};"
      },
      {
        type: "demo",
        kind: "guard",
        title: "动手：会话心智",
      },
      {
        type: "tip",
        body: "Token 优先 httpOnly Cookie 防 XSS；若放 localStorage 必须配合 CSP 与严格消毒。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "au1",
            question: "附带 Token？",
            options: [
              "Interceptor",
              "每个组件手写 only",
              "CSS",
              "router only"
            ],
            answer: 0,
            explain: "拦截器。"
          },
          {
            id: "au2",
            question: "401 处理？",
            options: [
              "清 token 去登录",
              "忽略",
              "死循环请求",
              "alert 仅"
            ],
            answer: 0,
            explain: "清会话。"
          }
        ]
      }
    ]
  },
  {
    slug: "nuxt-map",
    title: "全栈与 SSR 地图",
    summary: "Angular SSR / Analog / 后端边界。",
    level: "实战",
    track: "全栈实训",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "全栈地图",
        body: "Angular 前端 + 任意后端（NestJS 很搭）。需要 SEO 用 Angular SSR / AnalogJS。API 边界清晰：前端不碰密钥。"
      },
      {
        type: "code",
        title: "对应源码 · 环境配置",
        lang: "typescript",
        code: "// environment.ts\nexport const environment = {\n  production: false,\n  apiBase: 'http://localhost:3000/api',\n};"
      },
      {
        type: "demo",
        kind: "challenge",
        title: "动手：架构选择",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "nx1",
            question: "Angular 后端好搭档？",
            options: [
              "NestJS",
              "仅 PHP 强制",
              "Excel",
              "Flash"
            ],
            answer: 0,
            explain: "Nest 同 TS。"
          },
          {
            id: "nx2",
            question: "密钥放前端？",
            options: [
              "绝不",
              "可以 localStorage 明文",
              "写死组件",
              "CSS"
            ],
            answer: 0,
            explain: "仅后端。"
          }
        ]
      }
    ]
  },
  {
    slug: "capstone",
    title: "毕业作品清单",
    summary: "做出可演示的全栈小应用。",
    level: "实战",
    track: "全栈实训",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "作品清单",
        body: "建议：登录 + 列表 CRUD + 路由守卫 + 表单校验 + 错误处理 + 基础测试 + 部署。在本站「全栈工坊」先跑通模拟流程。"
      },
      {
        type: "tip",
        body: "完成全部课程 + 工坊闯关后可领取结业证明（本地成就）。"
      },
      {
        type: "demo",
        kind: "todo",
        title: "动手：作品核心 Todo",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ca1",
            question: "最小可演示？",
            options: [
              "登录+CRUD+守卫",
              "仅静态页",
              "仅 README",
              "仅颜色"
            ],
            answer: 0,
            explain: "端到端主路径。"
          },
          {
            id: "ca2",
            question: "工坊用途？",
            options: [
              "模拟 REST 闯关",
              "真生产库",
              "发邮件",
              "挖矿"
            ],
            answer: 0,
            explain: "模拟 API。"
          }
        ]
      }
    ]
  },
  {
    slug: "angular-ts",
    title: "Angular 与 TypeScript",
    summary: "类型化组件与表单。",
    level: "进阶",
    track: "工程化",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "TypeScript",
        body: "Angular 默认 TS。给 input/output、Http 泛型、FormGroup 类型，消灭 any。strict 模板检查能抓绑定错误。"
      },
      {
        type: "code",
        title: "对应源码 · 类型化 HTTP",
        lang: "typescript",
        code: "this.http.get<User[]>('/api/users') // User[] 而非 any"
      },
      {
        type: "demo",
        kind: "form",
        title: "动手：类型化表单感",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ts1",
            question: "HTTP 泛型？",
            options: [
              "get<User[]>",
              "get any 强制",
              "无泛型",
              "only string"
            ],
            answer: 0,
            explain: "泛型。"
          },
          {
            id: "ts2",
            question: "strictTemplates？",
            options: [
              "检查模板绑定",
              "仅 CSS",
              "禁用 TS",
              "打包图片"
            ],
            answer: 0,
            explain: "模板类型检查。"
          }
        ]
      }
    ]
  },
  {
    slug: "api-client",
    title: "封装 API 客户端",
    summary: "统一 baseURL / 错误 / Token。",
    level: "进阶",
    track: "工程化",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "API 客户端",
        body: "一个 ApiService：拼接 baseURL、JSON、错误映射、带 token。业务服务只调语义化方法 listNotes()。"
      },
      {
        type: "code",
        title: "对应源码 · ApiService",
        lang: "typescript",
        code: "@Injectable({ providedIn: 'root' })\nexport class ApiService {\n  private http = inject(HttpClient);\n  private base = environment.apiBase;\n  get<T>(path: string) {\n    return this.http.get<T>(`${this.base}${path}`);\n  }\n}"
      },
      {
        type: "demo",
        kind: "async",
        title: "动手：统一请求",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ap1",
            question: "为何封装？",
            options: [
              "统一错误与鉴权",
              "变慢",
              "必须多一层 class 炫技",
              "替代 HTML"
            ],
            answer: 0,
            explain: "横切能力。"
          },
          {
            id: "ap2",
            question: "业务层调用？",
            options: [
              "语义化方法",
              "到处拼 URL",
              "直接 XMLHttp",
              "eval"
            ],
            answer: 0,
            explain: "listNotes 等。"
          }
        ]
      }
    ]
  },
  {
    slug: "testing-vue",
    title: "测试入门",
    summary: "TestBed 与组件测试。",
    level: "进阶",
    track: "工程化",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "测试",
        body: "单元：服务纯逻辑。组件：TestBed + 触发事件断言 DOM。E2E：Playwright/Cypress 走登录→CRUD。先测关键路径。"
      },
      {
        type: "code",
        title: "对应源码 · 组件测试",
        lang: "typescript",
        code: "TestBed.configureTestingModule({\n  imports: [CounterComponent],\n});\nconst fixture = TestBed.createComponent(CounterComponent);\nfixture.detectChanges();\nexpect(fixture.nativeElement.textContent).toContain('0');"
      },
      {
        type: "demo",
        kind: "challenge",
        title: "动手：测什么",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "te1",
            question: "组件测试床？",
            options: [
              "TestBed",
              "only Jest DOM",
              "Photoshop",
              "SSH"
            ],
            answer: 0,
            explain: "TestBed。"
          },
          {
            id: "te2",
            question: "E2E 覆盖？",
            options: [
              "主用户路径",
              "每个 private 方法",
              "node_modules",
              "颜色像素"
            ],
            answer: 0,
            explain: "主路径。"
          }
        ]
      }
    ]
  },
  {
    slug: "deploy-prod",
    title: "生产部署清单",
    summary: "build、环境、SPA fallback。",
    level: "进阶",
    track: "工程化",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "部署",
        body: "ng build 产出静态文件。history 路由需服务器 SPA fallback。环境变量区分 prod API。开启 budgets 与 source map 策略。GitHub Pages / Vercel / Nginx 均可。"
      },
      {
        type: "code",
        title: "对应源码 · 构建",
        lang: "typescript",
        code: "ng build --configuration production\n# 输出 dist/ 下浏览器资源"
      },
      {
        type: "demo",
        kind: "challenge",
        title: "动手：上线检查项",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "dp1",
            question: "history 刷新 404？",
            options: [
              "配 SPA fallback",
              "放弃路由",
              "只用 hash 强制",
              "关 CDN"
            ],
            answer: 0,
            explain: "fallback。"
          },
          {
            id: "dp2",
            question: "生产 API 地址？",
            options: [
              "环境配置",
              "写死开发机 IP",
              "用户猜",
              "注释里"
            ],
            answer: 0,
            explain: "environment。"
          }
        ]
      }
    ]
  },
  {
    slug: "teleport",
    title: "CDK Overlay 与传送",
    summary: "弹层挂到 body。",
    level: "实战",
    track: "进阶模式",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "Overlay",
        body: "模态/下拉常用 Angular CDK Overlay 或对话框服务，挂到 body 避免 overflow 裁剪。类似 Vue Teleport。"
      },
      {
        type: "code",
        title: "对应源码 · Dialog 思路",
        lang: "typescript",
        code: "// 使用 MatDialog / CDK Overlay\n// this.dialog.open(MyDialogComponent, { data });"
      },
      {
        type: "demo",
        kind: "teleport",
        title: "动手：弹层",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "tp1",
            question: "弹层为何挂 body？",
            options: [
              "避免裁剪/层叠问题",
              "更快网络",
              "SEO",
              "更小包"
            ],
            answer: 0,
            explain: "层叠上下文。"
          },
          {
            id: "tp2",
            question: "官方辅助？",
            options: [
              "CDK Overlay",
              "仅 alert",
              "window.open only",
              "iframe"
            ],
            answer: 0,
            explain: "CDK。"
          }
        ]
      }
    ]
  },
  {
    slug: "keep-alive",
    title: "路由复用缓存",
    summary: "RouteReuseStrategy。",
    level: "实战",
    track: "进阶模式",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "缓存路由",
        body: "自定义 RouteReuseStrategy 可缓存组件实例（类似 KeepAlive）。适合列表↔详情返回保持滚动。别滥用：内存与状态过期要处理。"
      },
      {
        type: "code",
        title: "对应源码 · 复用心智",
        lang: "typescript",
        code: "// 实现 RouteReuseStrategy\n// shouldDetach / store / shouldAttach / retrieve\n// 按 route.data['reuse'] 决定是否缓存"
      },
      {
        type: "demo",
        kind: "keepalive",
        title: "动手：缓存切换",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ka1",
            question: "缓存路由接口？",
            options: [
              "RouteReuseStrategy",
              "KeepAlive 指令 Vue 强制",
              "localStorage 组件",
              "CSS"
            ],
            answer: 0,
            explain: "ReuseStrategy。"
          },
          {
            id: "ka2",
            question: "滥用风险？",
            options: [
              "内存与脏状态",
              "更快一定无代价",
              "自动清服务器",
              "无"
            ],
            answer: 0,
            explain: "内存。"
          }
        ]
      }
    ]
  },
  {
    slug: "custom-directive",
    title: "自定义指令",
    summary: "Attribute Directive。",
    level: "实战",
    track: "进阶模式",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "指令",
        body: "@Directive 给宿主加行为：高亮、点击外部关闭、权限隐藏。优先组合组件；指令适合横切 DOM 行为。"
      },
      {
        type: "code",
        title: "对应源码 · 高亮指令",
        lang: "typescript",
        code: "@Directive({\n  selector: '[appHighlight]',\n  standalone: true,\n})\nexport class HighlightDirective {\n  private el = inject(ElementRef);\n  @HostListener('mouseenter') onEnter() {\n    this.el.nativeElement.style.background = '#dd003133';\n  }\n}"
      },
      {
        type: "demo",
        kind: "directive",
        title: "动手：指令",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "cd1",
            question: "指令装饰器？",
            options: [
              "@Directive",
              "@Component only",
              "@Pipe",
              "@NgModule"
            ],
            answer: 0,
            explain: "@Directive。"
          },
          {
            id: "cd2",
            question: "指令适合？",
            options: [
              "横切 DOM 行为",
              "整页业务",
              "数据库",
              "DNS"
            ],
            answer: 0,
            explain: "DOM 行为。"
          }
        ]
      }
    ]
  },
  {
    slug: "perf-patterns",
    title: "性能模式",
    summary: "OnPush、track、懒加载。",
    level: "实战",
    track: "进阶模式",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "性能",
        body: "OnPush + signals；@for track；路由/组件懒加载；大列表虚拟滚动；避免模板重计算；图片懒加载与预算。"
      },
      {
        type: "code",
        title: "对应源码 · 懒加载路由",
        lang: "typescript",
        code: "{\n  path: 'admin',\n  loadChildren: () => import('./admin/routes').then(m => m.ADMIN_ROUTES),\n}"
      },
      {
        type: "demo",
        kind: "challenge",
        title: "动手：性能清单",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pfp1",
            question: "大列表？",
            options: [
              "虚拟滚动 + track",
              "一次渲染 10 万 DOM",
              "不用 track",
              "setInterval 刷新"
            ],
            answer: 0,
            explain: "虚拟化。"
          },
          {
            id: "pfp2",
            question: "拆包？",
            options: [
              "懒加载路由/组件",
              "全部打一个巨大 main",
              "禁用 tree-shake",
              "inline 一切"
            ],
            answer: 0,
            explain: "懒加载。"
          }
        ]
      }
    ]
  },
  {
    slug: "interview-vue",
    title: "面试高频串讲",
    summary: "DI、变更检测、Signals 一口说清。",
    level: "实战",
    track: "进阶模式",
    minutes: 14,
    blocks: [
      {
        type: "text",
        title: "怎么答「Angular DI」",
        body: "层次化注入器：root / 路由 / 组件。Token 映射到 provider。组件树可覆盖服务实例。"
      },
      {
        type: "text",
        title: "怎么答「变更检测」",
        body: "默认检查整棵树；OnPush 只在输入引用变化、事件、async、signal 时检查。Ivy 与 signals 让精细更新更自然。"
      },
      {
        type: "text",
        title: "怎么答「Signals」",
        body: "细粒度响应式原语：读时收集依赖，写时通知。computed 缓存，effect 副作用。可与 RxJS 互操作。"
      },
      {
        type: "tip",
        body: "开口顺序：场景 → 原理一句话 → 代码点 → 坑。可配合速查表背骨架。"
      },
      {
        type: "tip",
        body: "面试时主动对比 Signals 与 RxJS：同步细粒度 UI 状态用 signal；多事件流组合用 Observable。zoneless + signals 是演进方向。",
      },
      {
        type: "code",
        title: "对应源码 · signal 口述",
        lang: "typescript",
        code: "count = signal(0);\ndouble = computed(() => this.count() * 2);\n// 模板 {{ double() }} 自动追踪"
      },
      {
        type: "demo",
        kind: "ref-vs-reactive",
        title: "口述时配合此 Demo",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "iv1",
            question: "Angular 响应式新原语？",
            options: [
              "Signals",
              "仅 Zone 永远",
              "jQuery",
              "SOAP"
            ],
            answer: 0,
            explain: "Signals。"
          },
          {
            id: "iv2",
            question: "OnPush 含义？",
            options: [
              "更少检查更可控",
              "关闭一切更新",
              "仅 SSR",
              "禁用 DI"
            ],
            answer: 0,
            explain: "策略优化。"
          },
          {
            id: "iv3",
            question: "Zone.js 方向？",
            options: [
              "zoneless + signals 演进",
              "永远强制 Zone",
              "已删除浏览器",
              "仅 IE"
            ],
            answer: 0,
            explain: "更细粒度更新。",
          }
        ]
      }
    ]
  }

  ,
  {
    slug: "install-cli",
    title: "安装与 Angular CLI",
    summary: "ng new、工作区结构与本地开发。",
    level: "入门",
    track: "基础",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "官方安装路径",
        body: "需要 Node LTS。创建项目：\nnpx @angular/cli@latest new my-app\ncd my-app && ng serve\n\nCLI 负责脚手架、生成组件、构建、测试与更新。生产构建：ng build。"
      },
      {
        type: "code",
        title: "对应源码 · 常用 CLI",
        lang: "bash",
        code: "ng new learning-app --defaults\nng generate component features/hello --standalone\nng generate service core/api\nng serve --port 4200\nng build --configuration production\nng update @angular/core @angular/cli"
      },
      {
        type: "tip",
        body: "官方文档：angular.dev/installation 与 angular.dev/tools/cli。本站侧重「概念 + 动手」，CLI 细节以官网为准。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "cli1",
            question: "创建项目？",
            options: ["ng new", "ng init", "npm create-angular", "angular create"],
            answer: 0,
            explain: "ng new。"
          },
          {
            id: "cli2",
            question: "生成组件？",
            options: ["ng generate component", "ng add component", "ng make", "ng scaffold"],
            answer: 0,
            explain: "ng g c 亦可。"
          }
        ]
      }
    ]
  },
  {
    slug: "selectors-styling",
    title: "选择器与样式封装",
    summary: "selector 约定与 ViewEncapsulation。",
    level: "入门",
    track: "基础",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "选择器",
        body: "组件常用元素选择器 app-user-card；指令常用属性选择器 [appHighlight]。加应用前缀避免冲突。:not、组合选择器可用于精细匹配。"
      },
      {
        type: "text",
        title: "样式封装",
        body: "默认 ViewEncapsulation.Emulated：样式只作用于组件模板。ShadowDom 用原生 shadow root；None 则全局泄漏。优先 Emulated；第三方全局样式放 styles.css。"
      },
      {
        type: "code",
        title: "对应源码 · 封装模式",
        lang: "typescript",
        code: "@Component({\n  selector: 'app-badge',\n  standalone: true,\n  encapsulation: ViewEncapsulation.Emulated, // 默认\n  styles: [`:host { display: inline-flex; } .dot { color: #dd0031; }`],\n  template: `<span class=\"dot\">●</span><ng-content />`,\n})\nexport class BadgeComponent {}"
      },
      { type: "demo", kind: "style-encap", title: "动手：封装对比" },
      {
        type: "quiz",
        questions: [
          {
            id: "ss1",
            question: "默认封装？",
            options: ["Emulated", "None", "ShadowDom 强制", "无封装"],
            answer: 0,
            explain: "Emulated。"
          },
          {
            id: "ss2",
            question: "指令选择器常见？",
            options: ["[appX]", "app-x 元素强制", "#id", ".class only"],
            answer: 0,
            explain: "属性选择器。"
          }
        ]
      }
    ]
  },
  {
    slug: "model-inputs",
    title: "model() 双向输入",
    summary: "可写 input，简化双向绑定。",
    level: "进阶",
    track: "进阶",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "model input",
        body: "model() 创建可写信号型输入，父模板可用 [(value)] 双向绑定。适合可编辑状态；只读数据仍用 input()。"
      },
      {
        type: "code",
        title: "对应源码 · model",
        lang: "typescript",
        code: "@Component({\n  standalone: true,\n  selector: 'app-toggle',\n  template: `<button (click)=\"on.set(!on())\">{{ on() ? 'ON' : 'OFF' }}</button>`,\n})\nexport class ToggleComponent {\n  on = model(false);\n}\n\n// 父级：\n// <app-toggle [(on)]=\"enabled\" />"
      },
      { type: "demo", kind: "model-input", title: "动手：model 双向" },
      {
        type: "quiz",
        questions: [
          {
            id: "mi1",
            question: "双向输入 API？",
            options: ["model()", "input.only", "output.twoWay", "ngModel 强制"],
            answer: 0,
            explain: "model()。"
          },
          {
            id: "mi2",
            question: "只读数据？",
            options: ["input()", "model 必须", "signal 全局", "window"],
            answer: 0,
            explain: "input 只读。"
          }
        ]
      }
    ]
  },
  {
    slug: "template-let",
    title: "模板变量 @let",
    summary: "模板内声明局部变量。",
    level: "进阶",
    track: "进阶",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "@let",
        body: "@let name = expr; 在模板声明局部变量，避免重复写长表达式。不提升到父级；作用域与控制流块相关。也可配合 signal：@let v = count()。"
      },
      {
        type: "code",
        title: "对应源码 · @let",
        lang: "html",
        code: "@let full = first() + ' ' + last();\n<p>{{ full }}</p>\n\n@if (user(); as u) {\n  @let label = u.name + ' · ' + u.role;\n  <p>{{ label }}</p>\n}"
      },
      {
        type: "tip",
        body: "官网 Templates → Variables。复杂派生仍优先放 computed，模板保持薄。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "tl1",
            question: "模板声明局部变量？",
            options: ["@let", "var", "const 在 html", "let-"],
            answer: 0,
            explain: "@let。"
          },
          {
            id: "tl2",
            question: "@let 是否提升到父级？",
            options: ["否", "是全局", "仅 SSR", "仅模块模式"],
            answer: 0,
            explain: "不提升。"
          }
        ]
      }
    ]
  },
  {
    slug: "defer-loading",
    title: "@defer 延迟加载",
    summary: "按需加载组件与依赖。",
    level: "进阶",
    track: "进阶模式",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "为什么 @defer",
        body: "@defer 把重型组件及其依赖拆到懒 chunk，用 trigger 控制何时加载：viewport、interaction、idle、timer、when 条件等。可配 @placeholder / @loading / @error，以及 prefetch。"
      },
      {
        type: "code",
        title: "对应源码 · @defer",
        lang: "html",
        code: "@defer (on viewport; prefetch on idle) {\n  <app-heavy-chart [data]=\"data()\" />\n} @placeholder {\n  <p>图表占位</p>\n} @loading (minimum 200ms) {\n  <p>加载中…</p>\n} @error {\n  <p>加载失败</p>\n}"
      },
      { type: "demo", kind: "defer", title: "动手：模拟 defer 阶段" },
      {
        type: "tip",
        body: "避免嵌套 defer 造成瀑布请求；注意布局偏移与无障碍。SSR/SSG 下行为见官网 defer 指南。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "df1",
            question: "进入视口再加载？",
            options: ["on viewport", "on always", "on bootstrap", "on zone"],
            answer: 0,
            explain: "viewport trigger。"
          },
          {
            id: "df2",
            question: "失败分支？",
            options: ["@error", "@catch", "@fail", "@else"],
            answer: 0,
            explain: "@error。"
          }
        ]
      }
    ]
  },
  {
    slug: "linked-signal",
    title: "linkedSignal 联动状态",
    summary: "依赖其他状态的可写信号。",
    level: "进阶",
    track: "进阶模式",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "linkedSignal",
        body: "当本地状态需要跟随源信号重置/派生，又允许用户改写时用 linkedSignal。例如选项列表变化时，选中项默认跟到第一项，用户仍可改选。"
      },
      {
        type: "code",
        title: "对应源码 · linkedSignal",
        lang: "typescript",
        code: "options = signal(['标准', '加急', '自提']);\nselected = linkedSignal(() => this.options()[0]);\n\n// 源变化 → selected 重算默认\n// 用户仍可 selected.set('加急')"
      },
      { type: "demo", kind: "linked", title: "动手：选项联动" },
      {
        type: "quiz",
        questions: [
          {
            id: "ls1",
            question: "可写且依赖源状态？",
            options: ["linkedSignal", "仅 computed", "仅 effect", "FormControl"],
            answer: 0,
            explain: "linkedSignal。"
          },
          {
            id: "ls2",
            question: "纯只读派生？",
            options: ["computed", "linkedSignal 必须", "model", "output"],
            answer: 0,
            explain: "computed。"
          }
        ]
      }
    ]
  },
  {
    slug: "resource-api",
    title: "resource 与 httpResource",
    summary: "异步资源的信号式状态。",
    level: "进阶",
    track: "进阶模式",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "Resource API",
        body: "resource 把异步加载建模为信号状态：value / status / error / isLoading / reload。httpResource 是基于 HttpClient 的封装，走拦截器栈，适合声明式请求。"
      },
      {
        type: "code",
        title: "对应源码 · httpResource 思路",
        lang: "typescript",
        code: "userId = signal('1');\nuser = httpResource(() => `/api/users/${this.userId()}`);\n\n// 模板\n// @if (user.isLoading()) { Loading }\n// @else if (user.error()) { Error }\n// @else { {{ user.value()?.name }} }"
      },
      { type: "demo", kind: "resource", title: "动手：资源三态" },
      {
        type: "tip",
        body: "与手写 loading/error/data 相比，resource 统一状态机，减少样板代码。详见 angular.dev/guide/signals/resource 与 http-resource。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rs1",
            question: "HTTP 版 resource？",
            options: ["httpResource", "fetchSignal", "ajax()", "HttpClient.only"],
            answer: 0,
            explain: "httpResource。"
          },
          {
            id: "rs2",
            question: "resource 典型状态？",
            options: ["value/status/error", "仅 Promise", "仅 DOM", "仅 CSS"],
            answer: 0,
            explain: "信号状态机。"
          }
        ]
      }
    ]
  },
  {
    slug: "pipes",
    title: "管道 Pipes",
    summary: "纯变换与自定义管道。",
    level: "入门",
    track: "基础",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "管道",
        body: "模板中用 | 变换显示值：date、currency、json、async… 自定义管道实现 PipeTransform。纯管道可缓存；默认 pure: true。复杂逻辑优先在组件/ computed 完成。"
      },
      {
        type: "code",
        title: "对应源码 · 自定义管道",
        lang: "typescript",
        code: "@Pipe({ name: 'truncate', standalone: true })\nexport class TruncatePipe implements PipeTransform {\n  transform(value: string, max = 12): string {\n    return value.length <= max ? value : value.slice(0, max) + '…';\n  }\n}\n// 模板：{{ title | truncate:20 }}"
      },
      { type: "demo", kind: "pipe", title: "动手：管道变换" },
      {
        type: "quiz",
        questions: [
          {
            id: "pp1",
            question: "管道语法？",
            options: ["value | pipe", "pipe(value)", "{{pipe value}}", "#pipe"],
            answer: 0,
            explain: "| 管道。"
          },
          {
            id: "pp2",
            question: "实现接口？",
            options: ["PipeTransform", "OnInit", "CanActivate", "HttpInterceptor"],
            answer: 0,
            explain: "transform 方法。"
          }
        ]
      }
    ]
  },
  {
    slug: "rxjs-interop",
    title: "RxJS 与 Signals 互通",
    summary: "toSignal / toObservable。",
    level: "进阶",
    track: "进阶",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "互通原则",
        body: "UI 局部状态优先 signal；多事件流、组合、取消用 RxJS。toSignal(obs$) 进入信号世界；toObservable(sig) 进入流世界。outputToObservable 等见 rxjs-interop 包。"
      },
      {
        type: "code",
        title: "对应源码 · toSignal",
        lang: "typescript",
        code: "import { toSignal, toObservable } from '@angular/core/rxjs-interop';\n\nid$ = this.route.paramMap.pipe(map(p => p.get('id')!));\nid = toSignal(this.id$, { initialValue: '' });\n\nidChanges$ = toObservable(this.id);"
      },
      {
        type: "tip",
        body: "官网：angular.dev/ecosystem/rxjs-interop。不要在模板里订阅 Observable 却忘记 async 管道或 toSignal。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rx1",
            question: "Observable → Signal？",
            options: ["toSignal", "toObservable", "async only 强制", "JSON.parse"],
            answer: 0,
            explain: "toSignal。"
          },
          {
            id: "rx2",
            question: "Signal → Observable？",
            options: ["toObservable", "toSignal", "fromEvent only", "zone.run"],
            answer: 0,
            explain: "toObservable。"
          }
        ]
      }
    ]
  },
  {
    slug: "signal-forms",
    title: "Signal Forms 入门",
    summary: "以信号为中心的新型表单。",
    level: "进阶",
    track: "进阶模式",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "Signal Forms",
        body: "Angular 正在演进 Signal Forms：表单模型与校验更贴近 signals，减少与 RxJS/ControlValueAccessor 样板。现有 Reactive Forms 仍是生产主力；新项目关注官网 Signal Forms 指南。"
      },
      {
        type: "code",
        title: "对应源码 · 心智对照",
        lang: "typescript",
        code: "// 今日主力：Reactive Forms\nform = new FormGroup({\n  email: new FormControl('', { nonNullable: true, validators: [Validators.email] }),\n});\n\n// Signal Forms：模型即信号，字段状态可细粒度订阅\n// 详见 angular.dev/guide/forms/signals/overview"
      },
      { type: "demo", kind: "validate", title: "动手：先掌握校验心智" },
      {
        type: "quiz",
        questions: [
          {
            id: "sf1",
            question: "目前生产表单主力？",
            options: ["Reactive Forms 仍常用", "只能 Signal Forms", "只能模板表单", "不能表单"],
            answer: 0,
            explain: "成熟稳定。"
          },
          {
            id: "sf2",
            question: "Signal Forms 目标？",
            options: ["信号化模型与更少样板", "删除 TypeScript", "替代 HTTP", "只做动画"],
            answer: 0,
            explain: "演进方向。"
          }
        ]
      }
    ]
  },
  {
    slug: "zoneless",
    title: "Zoneless 变更检测",
    summary: "去掉 ZoneJS 的现代路径。",
    level: "实战",
    track: "进阶模式",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "为什么 Zoneless",
        body: "ZoneJS 通过补丁异步任务粗粒度触发变更检测，可能过度刷新。Zoneless 依赖 signals、显式通知、异步管道等精确调度，提升性能与 Core Web Vitals，减小包体。"
      },
      {
        type: "code",
        title: "对应源码 · 提供 zoneless",
        lang: "typescript",
        code: "bootstrapApplication(AppComponent, {\n  providers: [\n    provideZonelessChangeDetection(),\n    // ...\n  ],\n});\n\n// 组件内优先 signal / OnPush\n// 第三方非信号库需注意手动 markForCheck 或适配"
      },
      { type: "demo", kind: "zoneless", title: "动手：精确更新 vs 粗粒度" },
      {
        type: "tip",
        body: "官网：angular.dev/guide/zoneless。新应用优先信号 + zoneless；迁移时逐步替换依赖 Zone 的模式。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "zn1",
            question: "Zoneless 优势？",
            options: ["更精确 CD / 更好性能", "必须 jQuery", "禁用 HTTP", "删除组件"],
            answer: 0,
            explain: "精确调度。"
          },
          {
            id: "zn2",
            question: "状态通知手段？",
            options: ["signals 等", "只有 setInterval", "只有 CSS", "eval"],
            answer: 0,
            explain: "信号驱动。"
          }
        ]
      }
    ]
  },
  {
    slug: "ssr-hydration",
    title: "SSR 与 Hydration",
    summary: "服务端渲染与增量激活。",
    level: "实战",
    track: "全栈实训",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "SSR / Hybrid",
        body: "服务端先出 HTML 利于 SEO 与首屏；浏览器再 hydration 接上事件。Angular 支持全 SSR、客户端、以及按路由的渲染策略。Incremental Hydration 可推迟非关键块激活。"
      },
      {
        type: "code",
        title: "对应源码 · 心智",
        lang: "typescript",
        code: "// ng new --ssr\n// 路由级渲染模式、hydrate 配置见官网\n// 避免在构造期直接碰 window/document\n// 用 afterNextRender 做仅浏览器逻辑"
      },
      {
        type: "tip",
        body: "官网：SSR、Hydration、Incremental Hydration、Hybrid rendering。本站工坊是客户端模拟 API，部署真实 SSR 用 CLI 脚手架。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sr1",
            question: "SSR 主要收益？",
            options: ["首屏 HTML / SEO", "更慢网络", "删除 CSS", "替代数据库"],
            answer: 0,
            explain: "可索引与首屏。"
          },
          {
            id: "sr2",
            question: "浏览器专用逻辑？",
            options: ["afterNextRender 等", "constructor 直接 window", "CSS only", "index.html 脚本强制"],
            answer: 0,
            explain: "平台安全。"
          }
        ]
      }
    ]
  },
  {
    slug: "security",
    title: "安全最佳实践",
    summary: "XSS、消毒与信任策略。",
    level: "实战",
    track: "工程化",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "Angular 安全模型",
        body: "默认对绑定做消毒，降低 XSS。避免绕过安全（随便 bypassSecurityTrust*）。不要把不可信 HTML 塞进 [innerHTML]。Token 勿长期放可被脚本读的存储；配合 CSP、HTTPS、严格后端鉴权。"
      },
      {
        type: "code",
        title: "对应源码 · 危险模式（反例）",
        lang: "typescript",
        code: "// 反例：信任用户输入 HTML\n// this.html = this.sanitizer.bypassSecurityTrustHtml(userInput)\n\n// 正例：纯文本插值 {{ userInput }}\n// 或服务端严格白名单后再展示"
      },
      {
        type: "tip",
        body: "官网 Best practices → Security。安全是全栈问题：前端消毒 ≠ 后端可省略校验。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sec1",
            question: "默认防护？",
            options: ["模板绑定消毒", "无防护", "仅 HTTPS 就够", "关闭 CSP"],
            answer: 0,
            explain: "框架默认消毒。"
          },
          {
            id: "sec2",
            question: "用户 HTML？",
            options: ["极度谨慎 / 消毒", "直接 bypass", "eval 执行", "innerHTML 无脑"],
            answer: 0,
            explain: "防 XSS。"
          }
        ]
      }
    ]
  },
  {
    slug: "i18n",
    title: "国际化 i18n",
    summary: "多语言与本地化。",
    level: "进阶",
    track: "工程化",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "i18n 概览",
        body: "Angular 本地化方案：模板标记、提取文案、按 locale 构建。也可用运行时库（如 ngx-translate）做动态切换。日期/数字/货币用 locale 感知管道。"
      },
      {
        type: "code",
        title: "对应源码 · 模板标记思路",
        lang: "html",
        code: "<h1 i18n=\"@@homeHello\">你好</h1>\n<p>{{ price | currency: 'CNY' }}</p>\n<p>{{ now | date: 'medium' }}</p>"
      },
      {
        type: "tip",
        body: "官网：angular.dev/guide/i18n。产品若需运行时切语言，评估运行时 i18n 方案与打包体积。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "i18n1",
            question: "模板本地化标记？",
            options: ["i18n 属性", "v-t", "translate.js 强制", "innerText"],
            answer: 0,
            explain: "i18n。"
          },
          {
            id: "i18n2",
            question: "货币显示？",
            options: ["currency 管道", "手写 $ 拼接 only", "CSS content", "alert"],
            answer: 0,
            explain: "locale 管道。"
          }
        ]
      }
    ]
  },
  {
    slug: "animations-css",
    title: "动画与路由过渡",
    summary: "CSS 动画与路由转场。",
    level: "进阶",
    track: "进阶模式",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "现代动画",
        body: "优先原生 CSS / 网页动画 API。路由过渡可用 Angular 路由动画能力。旧 @angular/animations 语法可迁移到 CSS。尊重 prefers-reduced-motion。"
      },
      {
        type: "code",
        title: "对应源码 · CSS 过渡",
        lang: "css",
        code: ".fade-enter {\n  opacity: 0;\n  transform: translateY(4px);\n}\n.fade-enter-active {\n  opacity: 1;\n  transform: none;\n  transition: 180ms ease;\n}\n@media (prefers-reduced-motion: reduce) {\n  * { transition: none !important; }\n}"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "an1",
            question: "现代优先？",
            options: ["CSS / 原生动画", "必须 jQuery animate", "setInterval 改 top", "Flash"],
            answer: 0,
            explain: "CSS 优先。"
          },
          {
            id: "an2",
            question: "无障碍？",
            options: ["prefers-reduced-motion", "忽略", "强制 3s 动画", "自动音效"],
            answer: 0,
            explain: "尊重系统设置。"
          }
        ]
      }
    ]
  },
  {
    slug: "style-guide",
    title: "官方风格指南精华",
    summary: "命名、结构、inject 偏好。",
    level: "进阶",
    track: "工程化",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "一致性优先",
        body: "文件名连字符 user-profile.ts；测试 user-profile.spec.ts；按功能目录组织；一文件一概念。依赖注入优先 inject()。组件专注展示，复杂逻辑进服务。模板避免复杂表达式。"
      },
      {
        type: "code",
        title: "对应源码 · 风格",
        lang: "typescript",
        code: "// 优先\nprivate readonly api = inject(ApiService);\nreadonly title = input.required<string>();\n\n// 模板成员可用 protected\nprotected onSave(): void { /* ... */ }\n\n// 类与样式绑定优先 [class]/[style]，而非 ngClass 堆叠"
      },
      {
        type: "tip",
        body: "完整指南：next.angular.dev/style-guide 与 angular.dev 文档。团队内用 ESLint + 格式化固化。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sg1",
            question: "注入偏好？",
            options: ["inject()", "仅构造器参数永远", "全局变量", "require"],
            answer: 0,
            explain: "官方推荐 inject。"
          },
          {
            id: "sg2",
            question: "文件命名？",
            options: ["kebab-case", "PascalCase 文件名强制", "无规则", "空格"],
            answer: 0,
            explain: "连字符。"
          }
        ]
      }
    ]
  }

,
{
    slug: "structural-directives",
    title: "结构型指令",
    summary: "自定义 * 语法与微语法。",
    level: "进阶",
    track: "进阶",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "结构型指令",
        body: "结构型指令改变 DOM 结构（添加/移除元素）。现代模板优先 @if/@for；理解 *ngIf 微语法与自定义结构指令仍有助于读旧代码与库。一元素通常只能有一个结构指令。"
      },
      {
        type: "code",
        title: "对应源码 · 自定义结构指令思路",
        lang: "typescript",
        code: "@Directive({\n  selector: '[appUnless]',\n  standalone: true,\n})\nexport class UnlessDirective {\n  private tpl = inject(TemplateRef);\n  private vcr = inject(ViewContainerRef);\n  private hasView = false;\n\n  @Input() set appUnless(condition: boolean) {\n    if (!condition && !this.hasView) {\n      this.vcr.createEmbeddedView(this.tpl);\n      this.hasView = true;\n    } else if (condition && this.hasView) {\n      this.vcr.clear();\n      this.hasView = false;\n    }\n  }\n}\n// 使用：<p *appUnless=\"hidden\">可见</p>"
      },
      {
        type: "demo",
        kind: "structural",
        title: "动手：结构指令开关"
      },
      {
        type: "tip",
        body: "官网：guide/directives/structural-directives。新代码优先内置控制流 @if/@for/@switch。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sd1",
            question: "结构指令主要做什么？",
            options: [
              "改 DOM 结构",
              "只改颜色",
              "发 HTTP",
              "打包"
            ],
            answer: 0,
            explain: "增删 DOM。"
          },
          {
            id: "sd2",
            question: "现代优先？",
            options: [
              "@if/@for",
              "必须自定义 *",
              "jQuery",
              "innerHTML"
            ],
            answer: 0,
            explain: "控制流块。"
          }
        ]
      }
    ]
  },
{
    slug: "directive-composition",
    title: "指令组合 API",
    summary: "hostDirectives 复用行为。",
    level: "进阶",
    track: "进阶模式",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "Directive composition",
        body: "hostDirectives 让组件/指令声明式挂载其他指令，并转发 inputs/outputs。适合横切行为：tooltip、菜单、焦点陷阱，避免巨型基类继承。"
      },
      {
        type: "code",
        title: "对应源码 · hostDirectives",
        lang: "typescript",
        code: "@Directive({ selector: '[appTooltip]', standalone: true })\nexport class TooltipDirective {\n  text = input('');\n}\n\n@Component({\n  standalone: true,\n  selector: 'app-help-btn',\n  hostDirectives: [\n    { directive: TooltipDirective, inputs: ['text: tooltip'] },\n  ],\n  template: `<button>帮助</button>`,\n})\nexport class HelpBtnComponent {}\n// <app-help-btn tooltip=\"说明\" />"
      },
      {
        type: "demo",
        kind: "host-dir",
        title: "动手：组合行为"
      },
      {
        type: "tip",
        body: "官网：directive-composition-api。注意 host 指令的注入器与导出语义。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "hc1",
            question: "声明式挂载指令？",
            options: [
              "hostDirectives",
              "NgModule only",
              "eval",
              "CSS @import"
            ],
            answer: 0,
            explain: "组合 API。"
          },
          {
            id: "hc2",
            question: "适合场景？",
            options: [
              "横切 UI 行为复用",
              "替代路由",
              "写 SQL",
              "DNS"
            ],
            answer: 0,
            explain: "行为复用。"
          }
        ]
      }
    ]
  },
{
    slug: "image-optimization",
    title: "NgOptimizedImage",
    summary: "图片性能与 loader。",
    level: "进阶",
    track: "工程化",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "图片优化",
        body: "NgOptimizedImage（NgSrc）自动处理优先级、srcset、懒加载与尺寸警告。fill 模式适合响应式容器。可配置 CDN loader。"
      },
      {
        type: "code",
        title: "对应源码 · ngSrc",
        lang: "typescript",
        code: "import { NgOptimizedImage } from '@angular/common';\n\n@Component({\n  standalone: true,\n  imports: [NgOptimizedImage],\n  template: `\n    <img ngSrc=\"/assets/hero.png\" width=\"800\" height=\"400\" priority />\n    <img ngSrc=\"/assets/card.png\" width=\"400\" height=\"300\" />\n  `,\n})\nexport class HeroComponent {}"
      },
      {
        type: "demo",
        kind: "image-opt",
        title: "动手：priority vs lazy"
      },
      {
        type: "tip",
        body: "官网：guide/image-optimization。LCP 图加 priority；其余默认懒加载。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "io1",
            question: "优化图片指令？",
            options: [
              "NgOptimizedImage / ngSrc",
              "img-magic",
              "background only",
              "base64 全塞"
            ],
            answer: 0,
            explain: "官方图片指令。"
          },
          {
            id: "io2",
            question: "首屏大图？",
            options: [
              "priority",
              "永远 lazy",
              "隐藏",
              "iframe"
            ],
            answer: 0,
            explain: "优先加载。"
          }
        ]
      }
    ]
  },
{
    slug: "queries",
    title: "视图查询 viewChild",
    summary: "查询子组件与模板引用。",
    level: "进阶",
    track: "进阶",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "Queries",
        body: "viewChild/viewChildren 查询模板中的组件、指令或模板引用；contentChild 查询投影内容。信号版 query API 更贴合现代写法。"
      },
      {
        type: "code",
        title: "对应源码 · viewChild",
        lang: "typescript",
        code: "@Component({\n  standalone: true,\n  template: `\n    <input #box />\n    <app-child />\n    <button (click)=\"focus()\">聚焦</button>\n  `,\n})\nexport class HostComponent {\n  box = viewChild.required<ElementRef>('box');\n  child = viewChild(ChildComponent);\n  focus() { this.box().nativeElement.focus(); }\n}"
      },
      {
        type: "demo",
        kind: "query",
        title: "动手：查询子元素"
      },
      {
        type: "tip",
        body: "少用直接操作 DOM；优先输入输出与信号状态。查询在 afterNextRender / 视图稳定后更安全。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "qy1",
            question: "查模板子节点？",
            options: [
              "viewChild",
              "HttpClient",
              "Router only",
              "pipe"
            ],
            answer: 0,
            explain: "viewChild。"
          },
          {
            id: "qy2",
            question: "查投影内容？",
            options: [
              "contentChild",
              "viewChild 相同",
              "document.query",
              "css"
            ],
            answer: 0,
            explain: "contentChild。"
          }
        ]
      }
    ]
  },
{
    slug: "injection-context",
    title: "注入上下文",
    summary: "inject() 能在哪里调用。",
    level: "进阶",
    track: "进阶",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "Injection context",
        body: "inject() 只能在注入上下文中调用：构造期字段初始化、工厂函数、某些框架回调。异步回调/事件处理里直接 inject 会报错，需提前注入保存引用。"
      },
      {
        type: "code",
        title: "对应源码 · 正误对比",
        lang: "typescript",
        code: "export class CartComponent {\n  private store = inject(CartStore); // OK：字段初始化\n\n  onClick() {\n    // inject(CartStore); // 错误：不在注入上下文\n    this.store.add('sku');\n  }\n}"
      },
      {
        type: "tip",
        body: "官网：dependency-injection-context。runInInjectionContext 用于特殊桥接，勿滥用。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ic1",
            question: "inject 字段初始化？",
            options: [
              "可以",
              "永远不行",
              "仅 SSR",
              "仅测试"
            ],
            answer: 0,
            explain: "构造上下文。"
          },
          {
            id: "ic2",
            question: "click 回调里 inject？",
            options: [
              "通常不行",
              "推荐",
              "更快",
              "自动"
            ],
            answer: 0,
            explain: "先保存引用。"
          }
        ]
      }
    ]
  },
{
    slug: "lazy-services",
    title: "服务懒加载",
    summary: "路由级 providers 与拆包。",
    level: "进阶",
    track: "全栈准备",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "懒加载服务",
        body: "providedIn: 'root' 会进主包（可树摇）。要按功能拆包：在懒路由 providers 提供服务，使实例与 chunk 绑定，离开作用域可释放。"
      },
      {
        type: "code",
        title: "对应源码 · 路由 providers",
        lang: "typescript",
        code: "export const ADMIN_ROUTES: Routes = [\n  {\n    path: '',\n    providers: [AdminApiService],\n    loadComponent: () => import('./admin').then(m => m.AdminComponent),\n  },\n];"
      },
      {
        type: "tip",
        body: "官网：lazy-loading-services。大功能模块的 API 客户端适合路由级提供。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "lz1",
            question: "功能作用域服务？",
            options: [
              "路由 providers",
              "必须 root",
              "window",
              "CSS"
            ],
            answer: 0,
            explain: "路由级。"
          },
          {
            id: "lz2",
            question: "root 服务？",
            options: [
              "应用单例可树摇",
              "每个组件新实例",
              "不能注入",
              "仅测试"
            ],
            answer: 0,
            explain: "单例。"
          }
        ]
      }
    ]
  },
{
    slug: "lightweight-tokens",
    title: "轻量 InjectionToken",
    summary: "优化库的 token 设计。",
    level: "实战",
    track: "工程化",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "Lightweight tokens",
        body: "库作者可用轻量 token 减少保留名称、优化 tree-shaking。应用侧用 InjectionToken 配置 API_URL、FEATURE_FLAGS 等。"
      },
      {
        type: "code",
        title: "对应源码 · Token",
        lang: "typescript",
        code: "export const API_BASE = new InjectionToken<string>('API_BASE');\n\nbootstrapApplication(App, {\n  providers: [{ provide: API_BASE, useValue: 'https://api.example.com' }],\n});"
      },
      {
        type: "tip",
        body: "官网：lightweight-injection-tokens。应用开发掌握 InjectionToken + 多 provider 即可。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "lt1",
            question: "配置注入常用？",
            options: [
              "InjectionToken",
              "全局 var",
              "localStorage only",
              "CSS 变量强制"
            ],
            answer: 0,
            explain: "Token。"
          },
          {
            id: "lt2",
            question: "提供值？",
            options: [
              "provide/useValue",
              "只能 class",
              "HTML attr",
              "dns"
            ],
            answer: 0,
            explain: "providers。"
          }
        ]
      }
    ]
  },
{
    slug: "http-setup",
    title: "配置 HttpClient",
    summary: "provideHttpClient 与功能。",
    level: "入门",
    track: "全栈准备",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "Setup",
        body: "standalone 应用用 provideHttpClient()。可组合 withInterceptors、withFetch、withJsonp 等功能。不要忘记在测试中 provideHttpClientTesting。"
      },
      {
        type: "code",
        title: "对应源码 · provideHttpClient",
        lang: "typescript",
        code: "bootstrapApplication(AppComponent, {\n  providers: [\n    provideHttpClient(\n      withInterceptors([authInterceptor, loggingInterceptor]),\n    ),\n  ],\n});"
      },
      {
        type: "tip",
        body: "官网：guide/http/setup。拦截器顺序有意义：认证、日志、缓存按团队约定排列。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "hs1",
            question: "提供 HttpClient？",
            options: [
              "provideHttpClient",
              "import HttpModule 唯一",
              "fetch 全局",
              "jQuery"
            ],
            answer: 0,
            explain: "standalone 推荐。"
          },
          {
            id: "hs2",
            question: "注册拦截器？",
            options: [
              "withInterceptors",
              "withCss",
              "withRouter",
              "withZone"
            ],
            answer: 0,
            explain: "功能组合。"
          }
        ]
      }
    ]
  },
{
    slug: "http-requests",
    title: "发起 HTTP 请求",
    summary: "动词、类型与观察结果。",
    level: "入门",
    track: "全栈准备",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "Making requests",
        body: "get/post/put/patch/delete；泛型指定响应类型；observe: 'response' 拿完整响应；context 传拦截器元数据；progress 事件可追踪上传。"
      },
      {
        type: "code",
        title: "对应源码 · 请求",
        lang: "typescript",
        code: "this.http.get<User[]>('/api/users', {\n  headers: { 'X-Trace': '1' },\n  params: { page: 1 },\n}).subscribe(users => this.users.set(users));\n\nthis.http.post<User>('/api/users', body).subscribe();"
      },
      {
        type: "demo",
        kind: "async",
        title: "动手：请求三态回顾"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "hr1",
            question: "类型化 GET？",
            options: [
              "get<User[]>",
              "get any 强制",
              "get()",
              "ajax"
            ],
            answer: 0,
            explain: "泛型。"
          },
          {
            id: "hr2",
            question: "创建资源？",
            options: [
              "post",
              "get",
              "head",
              "options only"
            ],
            answer: 0,
            explain: "POST。"
          }
        ]
      }
    ]
  },
{
    slug: "typed-forms",
    title: "严格类型表单",
    summary: "NonNullable 与类型推断。",
    level: "进阶",
    track: "工程化",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "Typed forms",
        body: "Reactive Forms 支持严格类型：FormControl<string>、NonNullableFormBuilder、FormGroup 嵌套类型推断。减少 getRawValue 的 any。"
      },
      {
        type: "code",
        title: "对应源码 · 类型化",
        lang: "typescript",
        code: "const fb = inject(NonNullableFormBuilder);\nconst form = fb.group({\n  email: fb.control('', { validators: [Validators.email] }),\n  age: fb.control(18),\n});\n// form.controls.email.value 类型为 string"
      },
      {
        type: "demo",
        kind: "typed-form",
        title: "动手：类型化控件"
      },
      {
        type: "tip",
        body: "官网：guide/forms/typed-forms。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "tf1",
            question: "非空 builder？",
            options: [
              "NonNullableFormBuilder",
              "AnyBuilder",
              "Signal only",
              "jQuery"
            ],
            answer: 0,
            explain: "NN fb。"
          },
          {
            id: "tf2",
            question: "收益？",
            options: [
              "编译期类型",
              "更慢网络",
              "删除校验",
              "无"
            ],
            answer: 0,
            explain: "类型安全。"
          }
        ]
      }
    ]
  },
{
    slug: "dynamic-forms",
    title: "动态表单",
    summary: "配置驱动生成控件。",
    level: "实战",
    track: "全栈准备",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "Dynamic forms",
        body: "用元数据描述字段（类型、校验、标签），运行时创建 FormGroup/FormArray。适合 CMS、问卷、管理后台可配置表单。"
      },
      {
        type: "code",
        title: "对应源码 · FormArray",
        lang: "typescript",
        code: "type Field = { key: string; label: string; required?: boolean };\n\nbuild(fields: Field[]) {\n  const group: Record<string, FormControl> = {};\n  for (const f of fields) {\n    group[f.key] = new FormControl('', f.required ? Validators.required : null);\n  }\n  return new FormGroup(group);\n}"
      },
      {
        type: "demo",
        kind: "dynamic-form",
        title: "动手：配置生成表单"
      },
      {
        type: "tip",
        body: "官网：guide/forms/dynamic-forms。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "df1",
            question: "动态字段容器？",
            options: [
              "FormGroup/FormArray",
              "仅 CSS grid",
              "router",
              "pipe"
            ],
            answer: 0,
            explain: "响应式表单树。"
          },
          {
            id: "df2",
            question: "适用？",
            options: [
              "可配置问卷/CMS",
              "只能登录页",
              "静态文案",
              "字体"
            ],
            answer: 0,
            explain: "配置驱动。"
          }
        ]
      }
    ]
  },
{
    slug: "template-refs",
    title: "模板引用变量",
    summary: "#ref 与查询配合。",
    level: "入门",
    track: "基础",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "Template refs",
        body: "#name 在模板声明引用，可指向 DOM 或子组件。用于聚焦、读取子组件 API。配合 viewChild 在类中访问。"
      },
      {
        type: "code",
        title: "对应源码 · #ref",
        lang: "typescript",
        code: "<input #email type=\"email\" />\n<button (click)=\"email.focus()\">聚焦邮箱</button>\n<app-player #player />\n<button (click)=\"player().play()\">播放</button>"
      },
      {
        type: "demo",
        kind: "query",
        title: "动手：模板引用"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "tr1",
            question: "模板引用语法？",
            options: [
              "#name",
              "@name",
              "$name",
              ".name"
            ],
            answer: 0,
            explain: "#ref。"
          },
          {
            id: "tr2",
            question: "类中访问？",
            options: [
              "viewChild",
              "document 必须",
              "eval",
              "cookie"
            ],
            answer: 0,
            explain: "查询 API。"
          }
        ]
      }
    ]
  },
{
    slug: "expression-syntax",
    title: "模板表达式语法",
    summary: "允许的运算符与限制。",
    level: "入门",
    track: "基础",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "Expression syntax",
        body: "模板表达式是受限 JS：支持字面量、属性读写、调用、管道、安全导航 ?. 与非空断言。不支持赋值、new、增量语句等副作用语法（事件语句略宽）。复杂逻辑放组件方法或 computed。"
      },
      {
        type: "code",
        title: "对应源码 · 表达式",
        lang: "typescript",
        code: "{{ user?.name || '访客' }}\n{{ items[0]?.price * qty() }}\n<button [disabled]=\"!form.valid || saving()\">提交</button>"
      },
      {
        type: "tip",
        body: "官网：templates/expression-syntax。保持模板纯：无重计算、无隐藏副作用。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "es1",
            question: "安全导航？",
            options: [
              "?.",
              "??.",
              "!!",
              "try"
            ],
            answer: 0,
            explain: "?. "
          },
          {
            id: "es2",
            question: "复杂逻辑放哪？",
            options: [
              "组件/computed",
              "模板连环三元",
              "eval",
              "HTML 注释"
            ],
            answer: 0,
            explain: "保持薄模板。"
          }
        ]
      }
    ]
  },
{
    slug: "aria-a11y",
    title: "无障碍与 ARIA",
    summary: "可访问组件基础。",
    level: "进阶",
    track: "工程化",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "Accessibility",
        body: "语义化 HTML 优先，再补 ARIA。焦点顺序、键盘操作、对比度、live region 公告。Angular 提供 ARIA 指南与 CDK a11y 工具（FocusTrap、LiveAnnouncer）。"
      },
      {
        type: "code",
        title: "对应源码 · 对话框要点",
        lang: "typescript",
        code: "<!-- role、标签、焦点陷阱 -->\n<div role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"t\">\n  <h2 id=\"t\">确认删除</h2>\n  <button type=\"button\">取消</button>\n  <button type=\"button\">删除</button>\n</div>"
      },
      {
        type: "tip",
        body: "官网：guide/aria。测试：键盘-only、读屏、强制颜色。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "aa1",
            question: "优先？",
            options: [
              "语义 HTML",
              "满屏 div+role",
              "仅颜色提示",
              "自动播放声"
            ],
            answer: 0,
            explain: "语义优先。"
          },
          {
            id: "aa2",
            question: "模态框？",
            options: [
              "焦点陷阱+标签",
              "无焦点管理",
              "禁止 Esc 永远",
              "闪烁"
            ],
            answer: 0,
            explain: "a11y 模式。"
          }
        ]
      }
    ]
  },
{
    slug: "route-outlets",
    title: "路由出口 outlet",
    summary: "主出口与命名出口。",
    level: "进阶",
    track: "进阶",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "Outlets",
        body: "router-outlet 是路由组件的挂载点。命名出口可同时显示侧栏/弹层路由。主出口 name 默认为 primary。"
      },
      {
        type: "code",
        title: "对应源码 · 命名出口",
        lang: "typescript",
        code: "// routes\n{ path: 'compose', component: ComposeComponent, outlet: 'modal' }\n\n// template\n<router-outlet />\n<router-outlet name=\"modal\" />\n\n// 导航\nthis.router.navigate([{ outlets: { modal: ['compose'] } }]);"
      },
      {
        type: "demo",
        kind: "outlet",
        title: "动手：主出口与辅助出口"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ro1",
            question: "挂载点？",
            options: [
              "router-outlet",
              "ng-content only",
              "iframe",
              "slot"
            ],
            answer: 0,
            explain: "outlet。"
          },
          {
            id: "ro2",
            question: "侧栏并行路由？",
            options: [
              "命名 outlet",
              "只能嵌套一层",
              "禁止",
              "CSS float"
            ],
            answer: 0,
            explain: "named outlet。"
          }
        ]
      }
    ]
  },
{
    slug: "navigate-state",
    title: "导航与路由状态",
    summary: "Router 与 ActivatedRoute。",
    level: "入门",
    track: "进阶",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "Navigate & state",
        body: "routerLink 声明式导航；Router.navigate/navigateByUrl 编程式。ActivatedRoute 读 paramMap、queryParamMap、data、fragment。toSignal 可把 paramMap 转信号。"
      },
      {
        type: "code",
        title: "对应源码 · 读参",
        lang: "typescript",
        code: "slug = toSignal(\n  inject(ActivatedRoute).paramMap.pipe(map(p => p.get('slug') ?? '')),\n  { initialValue: '' },\n);\n\ngo() {\n  this.router.navigate(['/lesson', 'router'], { queryParams: { from: 'hub' } });\n}"
      },
      {
        type: "demo",
        kind: "router",
        title: "动手：导航"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ns1",
            question: "声明式链接？",
            options: [
              "routerLink",
              "href 硬跳 only",
              "window.open 必须",
              "form action"
            ],
            answer: 0,
            explain: "routerLink。"
          },
          {
            id: "ns2",
            question: "读 :slug？",
            options: [
              "paramMap",
              "body",
              "cookie",
              "css"
            ],
            answer: 0,
            explain: "paramMap。"
          }
        ]
      }
    ]
  },
{
    slug: "url-matcher",
    title: "自定义路由匹配",
    summary: "UrlMatcher 高级规则。",
    level: "实战",
    track: "进阶模式",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "UrlMatcher",
        body: "当 path 字符串不够用：多段可选、文件扩展名、校验格式，可用自定义 matcher 函数返回消费的 UrlSegment 或 null。"
      },
      {
        type: "code",
        title: "对应源码 · matcher",
        lang: "typescript",
        code: "export const digitMatcher: UrlMatcher = (segments) => {\n  if (segments.length === 1 && /^\\d+$/.test(segments[0].path)) {\n    return { consumed: segments, posParams: { id: segments[0] } };\n  }\n  return null;\n};\n\n{ matcher: digitMatcher, component: ItemComponent }"
      },
      {
        type: "tip",
        body: "官网：routing-with-urlmatcher。优先标准 path/参数；matcher 留给特殊协议。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "um1",
            question: "自定义匹配？",
            options: [
              "UrlMatcher",
              "RegexRoute 强制 Vue",
              "nginx only",
              "DNS"
            ],
            answer: 0,
            explain: "matcher。"
          },
          {
            id: "um2",
            question: "不匹配返回？",
            options: [
              "null",
              "false 字符串",
              "throw 必须",
              "0"
            ],
            answer: 0,
            explain: "null。"
          }
        ]
      }
    ]
  },
{
    slug: "hybrid-rendering",
    title: "混合渲染策略",
    summary: "按路由 SSR/CSR。",
    level: "实战",
    track: "全栈实训",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "Hybrid rendering",
        body: "可按路由选择服务端渲染、客户端渲染或预渲染。营销页 SSR/SSG，后台工具 CSR。配合 hydration 与增量激活。"
      },
      {
        type: "code",
        title: "对应源码 · 心智配置",
        lang: "typescript",
        code: "// 路由级 render mode（概念）\n// home: Server\n// dashboard: Client\n// docs: Prerender\n// 具体 API 见 angular.dev/guide/hybrid-rendering"
      },
      {
        type: "tip",
        body: "与 ssr-hydration 课互补。选择策略看 SEO、首屏、交互复杂度。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "hy1",
            question: "后台工具常见？",
            options: [
              "CSR",
              "必须全站 SSR",
              "仅 PDF",
              "关 JS"
            ],
            answer: 0,
            explain: "CSR 合适。"
          },
          {
            id: "hy2",
            question: "营销落地页？",
            options: [
              "SSR/SSG",
              "只能 CSR",
              "ftp",
              "邮件"
            ],
            answer: 0,
            explain: "利于 SEO。"
          }
        ]
      }
    ]
  },
{
    slug: "incremental-hydration",
    title: "增量 Hydration",
    summary: "分块激活以提升 TTI。",
    level: "实战",
    track: "进阶模式",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "Incremental hydration",
        body: "不必一次激活整页：用 @defer 等边界推迟 hydrate，用户交互或进入视口再激活，降低主线程压力。"
      },
      {
        type: "code",
        title: "对应源码 · 思路",
        lang: "typescript",
        code: "@defer (hydrate on interaction) {\n  <app-comments />\n} @placeholder {\n  <p>评论区占位</p>\n}"
      },
      {
        type: "demo",
        kind: "defer",
        title: "动手：分阶段加载/激活"
      },
      {
        type: "tip",
        body: "官网：incremental-hydration。与 defer 触发器配合。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ih1",
            question: "增量 hydrate 目的？",
            options: [
              "降主线程/提升交互",
              "增大包体",
              "禁用缓存",
              "删 CSS"
            ],
            answer: 0,
            explain: "性能。"
          },
          {
            id: "ih2",
            question: "常见边界？",
            options: [
              "@defer",
              "只有 index.html",
              "SQL",
              "DNS"
            ],
            answer: 0,
            explain: "defer。"
          }
        ]
      }
    ]
  },
{
    slug: "testing-deep",
    title: "测试深入",
    summary: "服务、组件场景与覆盖率。",
    level: "进阶",
    track: "工程化",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "Testing depth",
        body: "服务：直接 new 或 TestBed 注入 mock 依赖。组件：TestBed + 触发事件 + 断言 DOM。覆盖率看分支而非追求 100%。调试：fdescribe/fit 临时聚焦。"
      },
      {
        type: "code",
        title: "对应源码 · 服务测试",
        lang: "typescript",
        code: "describe('CartStore', () => {\n  it('adds item', () => {\n    const store = new CartStore();\n    store.add('a');\n    expect(store.totalQty()).toBe(1);\n  });\n});"
      },
      {
        type: "tip",
        body: "官网 testing 系列：services、components-basics、scenarios、debugging、coverage。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "td1",
            question: "组件测试床？",
            options: [
              "TestBed",
              "only Playwright",
              "Photoshop",
              "SSH"
            ],
            answer: 0,
            explain: "TestBed。"
          },
          {
            id: "td2",
            question: "覆盖率目标？",
            options: [
              "关键路径优先",
              "必须 100% 每一行",
              "0",
              "只测 CSS"
            ],
            answer: 0,
            explain: "风险驱动。"
          }
        ]
      }
    ]
  },
{
    slug: "component-harness",
    title: "Component Harness",
    summary: "稳定的组件测试 API。",
    level: "实战",
    track: "工程化",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "Harness",
        body: "Component Harness 为组件提供测试专用 API，屏蔽内部 DOM 结构变化，单元/集成/e2e 可复用。CDK Testing 支持。"
      },
      {
        type: "code",
        title: "对应源码 · 使用 harness",
        lang: "typescript",
        code: "const loader = TestbedHarnessEnvironment.loader(fixture);\nconst btn = await loader.getHarness(MatButtonHarness.with({ text: '保存' }));\nawait btn.click();"
      },
      {
        type: "demo",
        kind: "harness",
        title: "动手：通过 API 点按钮"
      },
      {
        type: "tip",
        body: "官网：component-harnesses-overview。库作者应为公开组件提供 harness。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ch1",
            question: "Harness 好处？",
            options: [
              "稳定测试 API",
              "更慢编译必须",
              "替代生产代码",
              "加密"
            ],
            answer: 0,
            explain: "抗重构。"
          },
          {
            id: "ch2",
            question: "环境？",
            options: [
              "TestbedHarnessEnvironment 等",
              "only Selenium IDE",
              "Excel",
              "FTP"
            ],
            answer: 0,
            explain: "CDK testing。"
          }
        ]
      }
    ]
  },
{
    slug: "route-animations",
    title: "路由过渡动画",
    summary: "页面切换动效。",
    level: "进阶",
    track: "进阶模式",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "Route animations",
        body: "在路由 data 标记动画状态，结合路由出口绑定动画触发器。现代更推荐 CSS 视图过渡；旧 animations 模块可迁移。"
      },
      {
        type: "code",
        title: "对应源码 · data 标记",
        lang: "typescript",
        code: "{ path: 'home', component: Home, data: { animation: 'HomePage' } }\n{ path: 'about', component: About, data: { animation: 'AboutPage' } }\n\n// 模板 outlet 绑定动画触发器（概念）\n// [@routeAnimations]=\"prepareRoute(outlet)\" "
      },
      {
        type: "tip",
        body: "官网：route-transition-animations 与 CSS animations 迁移指南。prefers-reduced-motion！"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ra1",
            question: "路由动画状态常放？",
            options: [
              "route data",
              "localStorage",
              "DNS",
              "favicon"
            ],
            answer: 0,
            explain: "data。"
          },
          {
            id: "ra2",
            question: "无障碍？",
            options: [
              "reduced-motion",
              "强制 5s",
              "闪烁",
              "自动声"
            ],
            answer: 0,
            explain: "尊重系统。"
          }
        ]
      }
    ]
  },
{
    slug: "errors-diagnostics",
    title: "错误与扩展诊断",
    summary: "NG 错误码与编译诊断。",
    level: "进阶",
    track: "工程化",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "Errors & diagnostics",
        body: "运行时错误有 NG 错误码百科。扩展诊断（extended diagnostics）在编译期抓模板坏味道。遇到报错先查官方 error encyclopedia。"
      },
      {
        type: "code",
        title: "对应源码 · 配置诊断（概念）",
        lang: "typescript",
        code: "// angular.json / tsconfig 中启用严格模板与扩展诊断\n// strictTemplates: true\n// 根据文档打开具体 diagnostic 规则"
      },
      {
        type: "demo",
        kind: "diagnostics",
        title: "动手：读懂错误信息"
      },
      {
        type: "tip",
        body: "官网：/errors 与 /extended-diagnostics。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ed1",
            question: "查 NG 错误？",
            options: [
              "Error encyclopedia",
              "随机猜",
              "删 node_modules 必好",
              "关 TS"
            ],
            answer: 0,
            explain: "官方百科。"
          },
          {
            id: "ed2",
            question: "模板坏味道？",
            options: [
              "extended diagnostics",
              "only runtime",
              "csslint 替代一切",
              "无"
            ],
            answer: 0,
            explain: "编译期。"
          }
        ]
      }
    ]
  },
{
    slug: "update-angular",
    title: "升级与版本更新",
    summary: "ng update 与兼容。",
    level: "进阶",
    track: "工程化",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "Keeping updated",
        body: "ng update @angular/core @angular/cli 执行官方迁移 schematic。先读 update guide，单步升级主版本，跑测试与 build。"
      },
      {
        type: "code",
        title: "对应源码 · 升级",
        lang: "typescript",
        code: "ng update @angular/core@20 @angular/cli@20\n# 查看可用迁移\nng update"
      },
      {
        type: "tip",
        body: "官网：update-guide 与 /update。锁定 package-lock，CI 验证。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "up1",
            question: "官方升级？",
            options: [
              "ng update",
              "手动改号即可永远",
              "npm ignore",
              "del node"
            ],
            answer: 0,
            explain: "schematics。"
          },
          {
            id: "up2",
            question: "大版本策略？",
            options: [
              "按指南逐步",
              "一次跳 5 大版本无测",
              "不升级",
              "只改 README"
            ],
            answer: 0,
            explain: "可控迁移。"
          }
        ]
      }
    ]
  },
{
    slug: "change-detection",
    title: "变更检测深入",
    summary: "默认策略与 OnPush。",
    level: "进阶",
    track: "进阶",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "Change detection",
        body: "默认从根向下检查。OnPush 仅在输入引用变化、事件、async 管道、信号等时检查子树。Zoneless 下更依赖信号与框架通知。"
      },
      {
        type: "code",
        title: "对应源码 · OnPush",
        lang: "typescript",
        code: "@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  // ...\n})\nexport class ListComponent {\n  items = input.required<Item[]>();\n}"
      },
      {
        type: "demo",
        kind: "zoneless",
        title: "动手：精确更新"
      },
      {
        type: "tip",
        body: "不可变更新 + OnPush + signals 是现代默认组合。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "cd1",
            question: "OnPush 含义？",
            options: [
              "更少检查",
              "关闭更新",
              "仅 SSR",
              "禁用 DI"
            ],
            answer: 0,
            explain: "策略。"
          },
          {
            id: "cd2",
            question: "列表项更新？",
            options: [
              "新引用/信号",
              "原地 mute 对象期望刷新",
              "改 CSS 强制",
              "alert"
            ],
            answer: 0,
            explain: "不可变。"
          }
        ]
      }
    ]
  },
{
    slug: "host-bindings",
    title: "Host 绑定与监听",
    summary: "host 中的 class/style/事件。",
    level: "进阶",
    track: "进阶",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "Host bindings",
        body: "在 @Component/@Directive 的 host 上绑定 class、style、属性与事件，或用 host 对象。信号版 host bindings 保持同步。"
      },
      {
        type: "code",
        title: "对应源码 · host",
        lang: "typescript",
        code: "@Component({\n  selector: 'app-chip',\n  standalone: true,\n  host: {\n    'class': 'chip',\n    '[class.active]': 'active()',\n    '(click)': 'toggle()',\n  },\n  template: `<ng-content />`,\n})\nexport class ChipComponent {\n  active = signal(false);\n  toggle() { this.active.update(v => !v); }\n}"
      },
      {
        type: "demo",
        kind: "directive",
        title: "动手：宿主行为"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "hb1",
            question: "宿主 class 绑定？",
            options: [
              "host 对象",
              "只能全局 CSS",
              "index.html",
              "dns"
            ],
            answer: 0,
            explain: "host。"
          },
          {
            id: "hb2",
            question: "宿主点击？",
            options: [
              "(click) in host",
              "无法监听",
              "window 必须",
              "alert"
            ],
            answer: 0,
            explain: "host 事件。"
          }
        ]
      }
    ]
  }
];

export const TRACKS = ["基础", "进阶", "全栈准备", "全栈实训", "工程化", "进阶模式"] as const;

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function getLessonIndex(slug: string): number {
  return LESSONS.findIndex((l) => l.slug === slug);
}

export function getAdjacent(slug: string): {
  prev?: Lesson;
  next?: Lesson;
} {
  const i = getLessonIndex(slug);
  if (i < 0) return {};
  return {
    prev: i > 0 ? LESSONS[i - 1] : undefined,
    next: i < LESSONS.length - 1 ? LESSONS[i + 1] : undefined,
  };
}

export function getLessonsByTrack(track: Lesson["track"]) {
  return LESSONS.filter((l) => l.track === track);
}

export function getAllQuizQuestions(): Array<
  QuizQuestion & { lessonSlug: string; lessonTitle: string }
> {
  const out: Array<QuizQuestion & { lessonSlug: string; lessonTitle: string }> = [];
  for (const lesson of LESSONS) {
    for (const block of lesson.blocks) {
      if (block.type === "quiz") {
        for (const q of block.questions) {
          out.push({
            ...q,
            lessonSlug: lesson.slug,
            lessonTitle: lesson.title,
          });
        }
      }
    }
  }
  return out;
}
