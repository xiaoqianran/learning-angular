# Angular 实战学习

交互式中文 Angular 教程：课程 + 测验 + 进度 + 代码演练场 + 模拟全栈工坊。

**参考姊妹项目：** [learning-vue3](https://github.com/xiaoqianran/learning-vue3)  
**仓库：** [https://github.com/xiaoqianran/learning-angular](https://github.com/xiaoqianran/learning-angular)

---

## 这是什么

面向想系统学习 **Angular**（Standalone + Signals）、并逐步过渡到 **全栈能力** 的同学。内容以「读一点、动手一点、测一点」组织，而不是纯文档站。

你可以：

- 按路径学完 **49 节** 课程（**讲解 + 对应源码 + 交互 Demo + 小测验**）
- 在 **代码演练场** 里对照真实 Angular 组件源码与交互预览
- 在 **全栈工坊** 里练登录、401、笔记 CRUD（模拟 REST API）
- 用 **速查表** 复习，用 **学习中心 / 错题本 / 结业证明** 跟进度

> 说明：本站本身用 React + TanStack Start 承载教学内容；演练场展示的是可复制的 Angular 源码，并用等价交互面板验证逻辑。

---

## 从 Vue 过来？

速查表内置 **Vue→Angular 对照**（ref→signal、v-if→@if、Pinia→服务…）。姊妹项目：[learning-vue3](https://github.com/xiaoqianran/learning-vue3)。

## 功能一览

| 模块 | 路径 | 说明 |
|------|------|------|
| 课程 | `/lesson/:slug` | 正文、对应源码、Live Demo、测验、笔记 |
| 首页大纲 | `/` | 搜索、路径筛选、进度条 |
| 代码演练场 | `/playground` | Angular 组件示例 + 交互预览 |
| 全栈工坊 | `/studio` | 模拟 API + 闯关任务 |
| 文档地图 | `/docs` | 对照 angular.dev/llms.txt 与本站课 |
| 速查表 | `/cheatsheet` | 一页核心 API 与约定 |
| 学习中心 | `/hub` | 打卡、收藏、路径进度 |
| 练习场 | `/lab` | 综合练习 |
| 错题本 | `/mistakes` | 测验错题回顾 |
| 结业证明 | `/certificate` | 全部完成后解锁 |

### 全栈工坊演示账号

```text
邮箱：demo@angular.dev
密码：password123
```

闯关任务：成功登录 → 触发一次 401 → 创建 / 编辑 / 删除笔记 → 退出。

---

## 学习路径（6 条）

| 路径 | 你学到什么 |
|------|------------|
| **基础** | 模板、Signals、列表/事件/表单、组件、生命周期、组合逻辑 |
| **进阶** | Router、状态服务、常见坑、从零搭项目 |
| **全栈准备** | 内容投影、DI、异步请求态、路由守卫、表单校验 |
| **全栈实训** | REST/CRUD、Token 会话、SSR 地图、毕业作品清单 |
| **工程化** | Angular+TS、API 客户端、测试入门、生产部署 |
| **进阶模式** | Overlay、路由复用、自定义指令、性能、面试串讲 |

建议顺序：

```text
基础 → 进阶 → 全栈准备 → 工坊闯关 → 工程化 → 进阶模式 → 自己的作品
```

---

## 本地运行

环境：Node 22+ 推荐。

```bash
git clone https://github.com/xiaoqianran/learning-angular.git
cd learning-angular
npm install
npm run dev
```

开发服务默认：`http://127.0.0.1:8080`（绑定 `0.0.0.0:8080`）。

```bash
npm run dev        # 开发
npm run build      # 生产构建
npm run typecheck  # TypeScript 检查
```

GitHub Pages 静态构建会设置 `GITHUB_PAGES=true`，`base` 为 `/learning-angular/`。

---

## 技术栈

- **界面与路由：** React 19、TanStack Start / Router、Vite
- **样式：** Tailwind CSS v4
- **状态：** Zustand（学习进度持久化）
- **教学内容：** Angular（Standalone、Signals、Router、DI…）
- **部署：** GitHub Actions → GitHub Pages

---

## 进度与隐私

- 学习进度、笔记、错题、工坊数据保存在 **浏览器 localStorage**
- 不上传到服务器；清站点数据会丢失进度
- 结业证明为本地成就展示，**非正式官方证书**

---

## 相关链接

- 姊妹项目：[learning-vue3](https://github.com/xiaoqianran/learning-vue3)
- Angular 官方文档：[https://angular.dev/](https://angular.dev/)
