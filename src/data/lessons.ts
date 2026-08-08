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
  | "directive";

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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        hint: undefined
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
        type: "code",
        title: "对应源码 · signal 口述",
        lang: "typescript",
        code: "count = signal(0);\ndouble = computed(() => this.count() * 2);\n// 模板 {{ double() }} 自动追踪"
      },
      {
        type: "demo",
        kind: "ref-vs-reactive",
        title: "口述时配合此 Demo",
        hint: undefined
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
