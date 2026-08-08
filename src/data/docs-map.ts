/** Official angular.dev map ↔ our interactive lessons (aligned with llms.txt) */

export type DocLink = {
  title: string;
  official: string;
  lessonSlug?: string;
  note?: string;
};

export type DocSection = {
  title: string;
  items: DocLink[];
};

export const DOC_SECTIONS: DocSection[] = [
  {
    title: "起步",
    items: [
      { title: "What is Angular", official: "https://angular.dev/overview", lessonSlug: "intro" },
      { title: "Installation", official: "https://angular.dev/installation", lessonSlug: "install-cli" },
      { title: "Style Guide", official: "https://angular.dev/style-guide", lessonSlug: "style-guide" },
      { title: "CLI", official: "https://angular.dev/tools/cli", lessonSlug: "install-cli" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Components overview", official: "https://angular.dev/guide/components", lessonSlug: "components" },
      { title: "Selectors", official: "https://angular.dev/guide/components/selectors", lessonSlug: "selectors-styling" },
      { title: "Styling / encapsulation", official: "https://angular.dev/guide/components/styling", lessonSlug: "selectors-styling" },
      { title: "Inputs", official: "https://angular.dev/guide/components/inputs", lessonSlug: "props-emits" },
      { title: "Outputs", official: "https://angular.dev/guide/components/outputs", lessonSlug: "props-emits" },
      { title: "Model inputs", official: "https://angular.dev/guide/components/inputs", lessonSlug: "model-inputs", note: "model()" },
      { title: "Content projection", official: "https://angular.dev/guide/components/content-projection", lessonSlug: "slots" },
      { title: "Lifecycle", official: "https://angular.dev/guide/components/lifecycle", lessonSlug: "lifecycle" },
    ],
  },
  {
    title: "Templates",
    items: [
      { title: "Templates overview", official: "https://angular.dev/guide/templates", lessonSlug: "template" },
      { title: "Event listeners", official: "https://angular.dev/guide/templates/event-listeners", lessonSlug: "events" },
      { title: "Binding", official: "https://angular.dev/guide/templates/binding", lessonSlug: "template" },
      { title: "Control flow", official: "https://angular.dev/guide/templates/control-flow", lessonSlug: "list-render" },
      { title: "Variables (@let)", official: "https://angular.dev/guide/templates/variables", lessonSlug: "template-let" },
      { title: "Deferred loading", official: "https://angular.dev/guide/templates/defer", lessonSlug: "defer-loading" },
      { title: "Expression syntax", official: "https://angular.dev/guide/templates/expression-syntax", lessonSlug: "template" },
    ],
  },
  {
    title: "Directives & Pipes",
    items: [
      { title: "Directives", official: "https://angular.dev/guide/directives", lessonSlug: "custom-directive" },
      { title: "Attribute directives", official: "https://angular.dev/guide/directives/attribute-directives", lessonSlug: "custom-directive" },
      { title: "Image optimization", official: "https://angular.dev/guide/image-optimization", note: "NgOptimizedImage" },
      { title: "Pipes", official: "https://angular.dev/guide/templates", lessonSlug: "pipes" },
    ],
  },
  {
    title: "Signals",
    items: [
      { title: "Signals overview", official: "https://angular.dev/guide/signals", lessonSlug: "reactivity" },
      { title: "computed / effect", official: "https://angular.dev/guide/signals", lessonSlug: "computed" },
      { title: "linkedSignal", official: "https://angular.dev/guide/signals/linked-signal", lessonSlug: "linked-signal" },
      { title: "resource", official: "https://angular.dev/guide/signals/resource", lessonSlug: "resource-api" },
    ],
  },
  {
    title: "DI",
    items: [
      { title: "DI overview", official: "https://angular.dev/guide/di", lessonSlug: "provide-inject" },
      { title: "Injectable services", official: "https://angular.dev/guide/di/creating-injectable-service", lessonSlug: "composition" },
      { title: "Providers", official: "https://angular.dev/guide/di/dependency-injection-providers", lessonSlug: "provide-inject" },
      { title: "Hierarchical injectors", official: "https://angular.dev/guide/di/hierarchical-dependency-injection", lessonSlug: "provide-inject" },
    ],
  },
  {
    title: "RxJS & Data",
    items: [
      { title: "RxJS interop", official: "https://angular.dev/ecosystem/rxjs-interop", lessonSlug: "rxjs-interop" },
      { title: "HttpClient", official: "https://angular.dev/guide/http", lessonSlug: "async-data" },
      { title: "Interceptors", official: "https://angular.dev/guide/http/interceptors", lessonSlug: "auth-token" },
      { title: "httpResource", official: "https://angular.dev/guide/http/http-resource", lessonSlug: "resource-api" },
    ],
  },
  {
    title: "Forms",
    items: [
      { title: "Forms overview", official: "https://angular.dev/guide/forms", lessonSlug: "forms" },
      { title: "Reactive Forms", official: "https://angular.dev/guide/forms/reactive-forms", lessonSlug: "form-validate" },
      { title: "Template-driven", official: "https://angular.dev/guide/forms/template-driven-forms", lessonSlug: "forms" },
      { title: "Validation", official: "https://angular.dev/guide/forms/form-validation", lessonSlug: "form-validate" },
      { title: "Signal Forms", official: "https://angular.dev/guide/forms/signals/overview", lessonSlug: "signal-forms" },
    ],
  },
  {
    title: "Routing",
    items: [
      { title: "Routing overview", official: "https://angular.dev/guide/routing", lessonSlug: "router" },
      { title: "Define routes", official: "https://angular.dev/guide/routing/define-routes", lessonSlug: "router" },
      { title: "Loading strategies", official: "https://angular.dev/guide/routing/loading-strategies", lessonSlug: "defer-loading" },
      { title: "Guards / common tasks", official: "https://angular.dev/guide/routing/common-router-tasks", lessonSlug: "route-guards" },
    ],
  },
  {
    title: "SSR & Performance",
    items: [
      { title: "SSR", official: "https://angular.dev/guide/ssr", lessonSlug: "ssr-hydration" },
      { title: "Hydration", official: "https://angular.dev/guide/hydration", lessonSlug: "ssr-hydration" },
      { title: "Incremental hydration", official: "https://angular.dev/guide/incremental-hydration", lessonSlug: "ssr-hydration" },
      { title: "Zoneless", official: "https://angular.dev/guide/zoneless", lessonSlug: "zoneless" },
      { title: "Performance patterns", official: "https://angular.dev/guide/performance", lessonSlug: "perf-patterns" },
    ],
  },
  {
    title: "Testing & Quality",
    items: [
      { title: "Testing", official: "https://angular.dev/guide/testing", lessonSlug: "testing-vue" },
      { title: "Security", official: "https://angular.dev/best-practices/security", lessonSlug: "security" },
      { title: "i18n", official: "https://angular.dev/guide/i18n", lessonSlug: "i18n" },
      { title: "Animations", official: "https://angular.dev/guide/animations/css", lessonSlug: "animations-css" },
      { title: "Errors encyclopedia", official: "https://angular.dev/errors" },
      { title: "Update guide", official: "https://angular.dev/update-guide" },
    ],
  },
  {
    title: "AI / LLM 官方资源",
    items: [
      { title: "llms.txt（索引）", official: "https://angular.dev/llms.txt", note: "官方文档索引，供 LLM 使用" },
      { title: "llms-full.txt", official: "https://angular.dev/assets/context/llms-full.txt", note: "完整上下文（体积大）" },
      { title: "Develop with AI", official: "https://angular.dev/ai/develop-with-ai" },
      { title: "Angular AI Tutor", official: "https://angular.dev/ai/ai-tutor" },
    ],
  },
];
