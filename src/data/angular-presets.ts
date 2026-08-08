export type AngularPreset = {
  id: string;
  title: string;
  summary: string;
  mainFile: string;
  files: Record<string, string>;
};

export const ANGULAR_PRESETS: AngularPreset[] = [
  {
    id: "counter",
    title: "计数器",
    summary: "signal + 事件，最经典的第一课",
    mainFile: "counter.component.ts",
    files: {
      "counter.component.ts": `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <div class="wrap">
      <h1>Angular Signals</h1>
      <p>你点了 <strong>{{ count() }}</strong> 次</p>
      <button (click)="inc()">count++</button>
      <button class="ghost" (click)="count.set(0)">重置</button>
    </div>
  \`,
  styles: [\`
    .wrap { font-family: system-ui, sans-serif; padding: 1.25rem; color: #e8ebe9; }
    h1 { font-size: 1.25rem; margin: 0 0 0.75rem; }
    p { color: #8b958e; }
    strong { color: #dd0031; font-variant-numeric: tabular-nums; }
    button {
      margin-right: 0.5rem; margin-top: 0.75rem;
      padding: 0.5rem 0.9rem; border-radius: 8px; border: none;
      background: #dd0031; color: #fff; font-weight: 600; cursor: pointer;
    }
    button.ghost {
      background: transparent; border: 1px solid #3a4540; color: #e8ebe9;
    }
  \`],
})
export class CounterComponent {
  count = signal(0);
  inc() {
    this.count.update((c) => c + 1);
  }
}
`,
    },
  },
  {
    id: "computed",
    title: "计算属性",
    summary: "computed 派生全名",
    mainFile: "name.component.ts",
    files: {
      "name.component.ts": `import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-name',
  standalone: true,
  template: \`
    <div class="wrap">
      <label>名 <input [value]="first()" (input)="first.set($any($event.target).value)" /></label>
      <label>姓 <input [value]="last()" (input)="last.set($any($event.target).value)" /></label>
      <p class="full">{{ full() }}</p>
    </div>
  \`,
  styles: [\`
    .wrap { display: grid; gap: 0.75rem; padding: 1.25rem; color: #e8ebe9; }
    label { display: grid; gap: 0.25rem; font-size: 0.85rem; color: #8b958e; }
    input {
      padding: 0.5rem 0.75rem; border-radius: 8px;
      border: 1px solid #3a4540; background: #0b0d0c; color: #e8ebe9;
    }
    .full { font-size: 1.5rem; font-weight: 600; color: #dd0031; }
  \`],
})
export class NameComponent {
  first = signal('Ada');
  last = signal('Lovelace');
  full = computed(() => \`\${this.first()} \${this.last()}\`);
  constructor() {
    effect(() => console.log('effect →', this.full()));
  }
}
`,
    },
  },
  {
    id: "list",
    title: "列表 @for",
    summary: "控制流与 track",
    mainFile: "list.component.ts",
    files: {
      "list.component.ts": `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  template: \`
    <div class="wrap">
      <button (click)="show.set(!show())">切换显示</button>
      @if (show()) {
        <ul>
          @for (item of items(); track item.id) {
            <li>{{ item.text }}</li>
          }
        </ul>
      } @else {
        <p class="muted">已隐藏</p>
      }
      <form (submit)="add($event)">
        <input name="t" placeholder="新项" />
        <button type="submit">添加</button>
      </form>
    </div>
  \`,
  styles: [\`
    .wrap { padding: 1.25rem; color: #e8ebe9; }
    .muted { color: #8b958e; }
    li { margin: 0.35rem 0; }
    input { margin-right: 0.5rem; padding: 0.4rem 0.6rem; border-radius: 6px;
      border: 1px solid #3a4540; background: #0b0d0c; color: #e8ebe9; }
    button { padding: 0.4rem 0.8rem; border-radius: 6px; border: none;
      background: #dd0031; color: #fff; cursor: pointer; }
  \`],
})
export class ListComponent {
  show = signal(true);
  items = signal([
    { id: 1, text: '学 signal' },
    { id: 2, text: '学 @for' },
  ]);
  add(e: Event) {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const text = String(fd.get('t') || '').trim();
    if (!text) return;
    this.items.update((list) => [...list, { id: Date.now(), text }]);
    (e.target as HTMLFormElement).reset();
  }
}
`,
    },
  },
  {
    id: "todo",
    title: "Todo",
    summary: "signal 列表小应用",
    mainFile: "todo.component.ts",
    files: {
      "todo.component.ts": `import { Component, signal, computed } from '@angular/core';

type Todo = { id: number; text: string; done: boolean };

@Component({
  selector: 'app-todo',
  standalone: true,
  template: \`
    <div class="wrap">
      <h1>Todos ({{ remaining() }} left)</h1>
      <form (submit)="add($event)">
        <input name="t" placeholder="What needs doing?" />
      </form>
      <ul>
        @for (t of todos(); track t.id) {
          <li [class.done]="t.done">
            <label>
              <input type="checkbox" [checked]="t.done" (change)="toggle(t.id)" />
              {{ t.text }}
            </label>
            <button type="button" (click)="remove(t.id)">×</button>
          </li>
        }
      </ul>
    </div>
  \`,
  styles: [\`
    .wrap { padding: 1.25rem; color: #e8ebe9; max-width: 360px; }
    h1 { font-size: 1.1rem; }
    .done { opacity: 0.5; text-decoration: line-through; }
    li { display: flex; justify-content: space-between; gap: 0.5rem; margin: 0.4rem 0; }
    input[type="text"], input:not([type]) {
      width: 100%; padding: 0.5rem; border-radius: 8px;
      border: 1px solid #3a4540; background: #0b0d0c; color: #e8ebe9;
    }
    button { background: transparent; border: none; color: #dd0031; cursor: pointer; font-size: 1.1rem; }
  \`],
})
export class TodoComponent {
  todos = signal<Todo[]>([]);
  remaining = computed(() => this.todos().filter((t) => !t.done).length);

  add(e: Event) {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const text = String(fd.get('t') || '').trim();
    if (!text) return;
    this.todos.update((list) => [...list, { id: Date.now(), text, done: false }]);
    (e.target as HTMLFormElement).reset();
  }
  toggle(id: number) {
    this.todos.update((list) =>
      list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }
  remove(id: number) {
    this.todos.update((list) => list.filter((t) => t.id !== id));
  }
}
`,
    },
  },
  {
    id: "di",
    title: "依赖注入",
    summary: "inject + root 服务",
    mainFile: "counter.store.ts",
    files: {
      "counter.store.ts": `import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterStore {
  count = signal(0);
  inc() {
    this.count.update((c) => c + 1);
  }
  reset() {
    this.count.set(0);
  }
}
`,
      "counter-page.component.ts": `import { Component, inject } from '@angular/core';
import { CounterStore } from './counter.store';

@Component({
  selector: 'app-counter-page',
  standalone: true,
  template: \`
    <p>{{ store.count() }}</p>
    <button (click)="store.inc()">+</button>
    <button (click)="store.reset()">reset</button>
  \`,
})
export class CounterPageComponent {
  store = inject(CounterStore);
}
`,
    },
  },
  {
    id: "forms",
    title: "响应式表单",
    summary: "FormGroup + Validators",
    mainFile: "login.component.ts",
    files: {
      "login.component.ts": `import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="email" placeholder="email" />
      @if (form.controls.email.touched && form.controls.email.invalid) {
        <p class="err">请输入有效邮箱</p>
      }
      <input formControlName="password" type="password" placeholder="password" />
      @if (form.controls.password.touched && form.controls.password.invalid) {
        <p class="err">至少 8 位</p>
      }
      <button type="submit" [disabled]="form.invalid">登录</button>
    </form>
  \`,
  styles: [\`
    form { display: grid; gap: 0.5rem; padding: 1.25rem; max-width: 320px; }
    input { padding: 0.5rem; border-radius: 8px; border: 1px solid #3a4540;
      background: #0b0d0c; color: #e8ebe9; }
    .err { color: #e07a6a; font-size: 0.8rem; margin: 0; }
    button { padding: 0.55rem; border: none; border-radius: 8px;
      background: #dd0031; color: #fff; font-weight: 600; }
    button:disabled { opacity: 0.5; }
  \`],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  submit() {
    if (this.form.invalid) return;
    console.log(this.form.getRawValue());
  }
}
`,
    },
  },
];

export function getPreset(id: string): AngularPreset {
  return ANGULAR_PRESETS.find((p) => p.id === id) ?? ANGULAR_PRESETS[0];
}
