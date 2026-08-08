import type { DemoKind } from "@/data/lessons";

export type DemoSource = {
  title: string;
  lang: string;
  code: string;
};

const SOURCES: Record<DemoKind, DemoSource> = {
  "counter": {
    "title": "CounterComponent · signal",
    "lang": "typescript",
    "code": "import { Component, signal } from '@angular/core';\n\n@Component({\n  selector: 'app-counter',\n  standalone: true,\n  template: `\n    <p>点了 {{ count() }} 次</p>\n    <button (click)=\"inc()\">count++</button>\n    <button (click)=\"count.set(0)\">重置</button>\n  `,\n})\nexport class CounterComponent {\n  count = signal(0);\n  inc() { this.count.update(c => c + 1); }\n}"
  },
  "template": {
    "title": "模板绑定",
    "lang": "typescript",
    "code": "@Component({\n  standalone: true,\n  template: `\n    <p>{{ msg() }}</p>\n    <p [class.active]=\"isActive()\">\n      [class] → {{ isActive() ? 'active' : 'inactive' }}\n    </p>\n  `,\n})\nexport class TplComponent {\n  msg = signal('你好，Angular');\n  isActive = signal(true);\n}"
  },
  "ref-vs-reactive": {
    "title": "Signals",
    "lang": "typescript",
    "code": "count = signal(0);\nstate = signal({ name: 'Angular', n: 1 });\n\n// 读：count()  写：count.set / update\n// 对象：不可变更新\nthis.state.update(s => ({ ...s, n: s.n + 1 }));"
  },
  "computed": {
    "title": "computed + effect",
    "lang": "typescript",
    "code": "first = signal('Ada');\nlast = signal('Lovelace');\nfull = computed(() => `${this.first()} ${this.last()}`);\n\nconstructor() {\n  effect(() => console.log('effect →', this.full()));\n}"
  },
  "list": {
    "title": "@if / @for",
    "lang": "html",
    "code": "@if (show()) {\n  <ul>\n    @for (item of items(); track item.id) {\n      <li>{{ item.text }}</li>\n    }\n  </ul>\n} @else {\n  <p>已隐藏</p>\n}"
  },
  "events": {
    "title": "事件绑定",
    "lang": "typescript",
    "code": "<button (click)=\"onClick($event)\">点我</button>\n\nonClick(e: MouseEvent) {\n  this.last.set(`x=${e.clientX}`);\n}"
  },
  "form": {
    "title": "ngModel",
    "lang": "typescript",
    "code": "@Component({\n  standalone: true,\n  imports: [FormsModule],\n  template: `<input [(ngModel)]=\"name\" /><p>{{ name }}</p>`,\n})\nexport class FormComponent {\n  name = 'Angular';\n}"
  },
  "component": {
    "title": "父子组件",
    "lang": "typescript",
    "code": "// 子\ntitle = input.required<string>();\nclosed = output<void>();\n\n// 父\n<app-card [title]=\"'你好'\" (closed)=\"onClose()\" />"
  },
  "lifecycle": {
    "title": "生命周期",
    "lang": "typescript",
    "code": "export class LifeComponent implements OnInit, OnDestroy {\n  ngOnInit() { console.log('init'); }\n  ngOnDestroy() { /* 取消订阅 */ }\n}"
  },
  "todo": {
    "title": "Todo",
    "lang": "typescript",
    "code": "items = signal<{id:number;text:string;done:boolean}[]>([]);\nadd(text: string) {\n  this.items.update(list => [...list, { id: Date.now(), text, done: false }]);\n}"
  },
  "router": {
    "title": "Router",
    "lang": "typescript",
    "code": "export const routes: Routes = [\n  { path: '', component: HomeComponent },\n  { path: 'lesson/:slug', component: LessonComponent },\n];\n// template: <a routerLink=\"/\">首页</a> <router-outlet />"
  },
  "pinia": {
    "title": "Signal Store",
    "lang": "typescript",
    "code": "@Injectable({ providedIn: 'root' })\nexport class CartStore {\n  private items = signal<{id:string;qty:number}[]>([]);\n  totalQty = computed(() => this.items().reduce((a,i)=>a+i.qty,0));\n  add(id: string) {\n    this.items.update(list => [...list, { id, qty: 1 }]);\n  }\n}"
  },
  "challenge": {
    "title": "找茬",
    "lang": "typescript",
    "code": "// 坑：订阅未取消 / track 用 index / 模板里重函数\n// 修：takeUntilDestroyed · 稳定 id · computed"
  },
  "slots": {
    "title": "ng-content",
    "lang": "html",
    "code": "<header><ng-content select=\"[card-title]\" /></header>\n<div class=\"body\"><ng-content /></div>"
  },
  "provide": {
    "title": "InjectionToken",
    "lang": "typescript",
    "code": "export const API_URL = new InjectionToken<string>('API_URL');\n// providers: [{ provide: API_URL, useValue: 'https://api.example' }]\nconst url = inject(API_URL);"
  },
  "async": {
    "title": "HttpClient 三态",
    "lang": "typescript",
    "code": "loading = signal(false);\nerror = signal<string | null>(null);\ndata = signal<User[]>([]);\n\nload() {\n  this.loading.set(true);\n  this.http.get<User[]>('/api/users').subscribe({\n    next: u => { this.data.set(u); this.loading.set(false); },\n    error: e => { this.error.set(e.message); this.loading.set(false); },\n  });\n}"
  },
  "guard": {
    "title": "authGuard",
    "lang": "typescript",
    "code": "export const authGuard: CanActivateFn = () => {\n  const auth = inject(AuthService);\n  const router = inject(Router);\n  return auth.isLoggedIn() || router.createUrlTree(['/login']);\n};"
  },
  "validate": {
    "title": "Validators",
    "lang": "typescript",
    "code": "new FormGroup({\n  email: new FormControl('', [Validators.required, Validators.email]),\n  password: new FormControl('', [Validators.required, Validators.minLength(8)]),\n});"
  },
  "teleport": {
    "title": "CDK Overlay",
    "lang": "typescript",
    "code": "// MatDialog / CDK Overlay 挂到 body，避免 overflow 裁剪\nthis.dialog.open(MyDialogComponent, { data: { id } });"
  },
  "keepalive": {
    "title": "RouteReuseStrategy",
    "lang": "typescript",
    "code": "// shouldDetach / store / shouldAttach / retrieve\n// 按 route.data['reuse'] 缓存列表页状态"
  },
  "directive": {
    "title": "Attribute Directive",
    "lang": "typescript",
    "code": "@Directive({ selector: '[appHighlight]', standalone: true })\nexport class HighlightDirective {\n  private el = inject(ElementRef);\n  @HostListener('mouseenter') onEnter() {\n    this.el.nativeElement.style.background = '#dd003133';\n  }\n}"
  }
,
  "defer": {
    "title": "@defer 阶段",
    "lang": "html",
    "code": "@defer (on interaction) {\n  <app-heavy />\n} @placeholder {\n  <p>占位</p>\n} @loading {\n  <p>加载中</p>\n} @error {\n  <p>失败</p>\n}"
  },
  "pipe": {
    "title": "Pipe",
    "lang": "typescript",
    "code": "@Pipe({ name: 'truncate', standalone: true })\nexport class TruncatePipe implements PipeTransform {\n  transform(value: string, max = 12) {\n    return value.length <= max ? value : value.slice(0, max) + '…';\n  }\n}"
  },
  "resource": {
    "title": "httpResource",
    "lang": "typescript",
    "code": "userId = signal('1');\nuser = httpResource(() => `/api/users/${this.userId()}`);\n// user.isLoading() / user.value() / user.error()"
  },
  "linked": {
    "title": "linkedSignal",
    "lang": "typescript",
    "code": "options = signal(['标准','加急','自提']);\nselected = linkedSignal(() => this.options()[0]);"
  },
  "model-input": {
    "title": "model()",
    "lang": "typescript",
    "code": "on = model(false);\n// 父：<app-toggle [(on)]=\"enabled\" />"
  },
  "zoneless": {
    "title": "Zoneless",
    "lang": "typescript",
    "code": "bootstrapApplication(App, {\n  providers: [provideZonelessChangeDetection()],\n});"
  },
  "style-encap": {
    "title": "ViewEncapsulation",
    "lang": "typescript",
    "code": "@Component({\n  encapsulation: ViewEncapsulation.Emulated,\n  styles: [`:host { display:block } .x { color: red }`],\n})"
  }

,
  "structural": { "title": "结构指令", "lang": "typescript", "code": "*appUnless=\"hidden\" · ViewContainerRef create/clear" },
  "host-dir": { "title": "hostDirectives", "lang": "typescript", "code": "hostDirectives: [{ directive: TooltipDirective, inputs: ['text: tooltip'] }]" },
  "image-opt": { "title": "NgOptimizedImage", "lang": "html", "code": "<img ngSrc=\"/a.png\" width=\"800\" height=\"400\" priority />" },
  "query": { "title": "viewChild", "lang": "typescript", "code": "box = viewChild.required<ElementRef>('box');\nthis.box().nativeElement.focus();" },
  "typed-form": { "title": "Typed forms", "lang": "typescript", "code": "fb.group({ email: fb.control('') }) // NonNullableFormBuilder" },
  "dynamic-form": { "title": "Dynamic forms", "lang": "typescript", "code": "for (const f of fields) group[f.key] = new FormControl('')" },
  "outlet": { "title": "router-outlet", "lang": "html", "code": "<router-outlet />\n<router-outlet name=\"modal\" />" },
  "harness": { "title": "Component Harness", "lang": "typescript", "code": "const btn = await loader.getHarness(MatButtonHarness.with({ text: '保存' }));\nawait btn.click();" },
  "diagnostics": { "title": "NG errors", "lang": "text", "code": "查 angular.dev/errors · 启用 strictTemplates / extended diagnostics" }

};

export function getDemoSource(kind: DemoKind): DemoSource {
  return SOURCES[kind];
}
