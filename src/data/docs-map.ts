/** Auto-aligned with angular.dev/llms.txt */

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

export const DOC_SECTIONS: DocSection[] = 
[
  {
    title: "Table of Contents",
    items: [
      {
        title: "What is Angular",
        official: "https://angular.dev/overview",
        lessonSlug: "intro"
      },
      {
        title: "Installation guide",
        official: "https://angular.dev/installation",
        lessonSlug: "install-cli"
      },
      {
        title: "Style Guide",
        official: "https://next.angular.dev/style-guide",
        lessonSlug: "style-guide"
      }
    ]
  },
  {
    title: "Components",
    items: [
      {
        title: "What is a component",
        official: "https://angular.dev/guide/components",
        lessonSlug: "components"
      },
      {
        title: "Component selectors",
        official: "https://angular.dev/guide/components/selectors",
        lessonSlug: "selectors-styling"
      },
      {
        title: "Styling components",
        official: "https://angular.dev/guide/components/styling",
        lessonSlug: "selectors-styling"
      },
      {
        title: "Accepting data with input properties",
        official: "https://angular.dev/guide/components/inputs",
        lessonSlug: "props-emits"
      },
      {
        title: "Custom events with output",
        official: "https://angular.dev/guide/components/outputs",
        lessonSlug: "props-emits"
      },
      {
        title: "Content projection",
        official: "https://angular.dev/guide/components/content-projection",
        lessonSlug: "slots"
      },
      {
        title: "Component lifecycle",
        official: "https://angular.dev/guide/components/lifecycle",
        lessonSlug: "lifecycle"
      }
    ]
  },
  {
    title: "Templates guides",
    items: [
      {
        title: "Template Overview",
        official: "https://angular.dev/guide/templates",
        lessonSlug: "template"
      },
      {
        title: "Adding event listeners",
        official: "https://angular.dev/guide/templates/event-listeners",
        lessonSlug: "events"
      },
      {
        title: "Binding text, properties and attributes",
        official: "https://angular.dev/guide/templates/binding",
        lessonSlug: "template"
      },
      {
        title: "Control Flow",
        official: "https://angular.dev/guide/templates/control-flow",
        lessonSlug: "list-render"
      },
      {
        title: "Template variable declaration",
        official: "https://angular.dev/guide/templates/variables",
        lessonSlug: "template-let"
      },
      {
        title: "Deferred loading of components",
        official: "https://angular.dev/guide/templates/defer",
        lessonSlug: "defer-loading"
      },
      {
        title: "Expression syntax",
        official: "https://angular.dev/guide/templates/expression-syntax",
        lessonSlug: "expression-syntax"
      }
    ]
  },
  {
    title: "Directives",
    items: [
      {
        title: "Directives overview",
        official: "https://angular.dev/guide/directives",
        lessonSlug: "custom-directive"
      },
      {
        title: "Attribute directives",
        official: "https://angular.dev/guide/directives/attribute-directives",
        lessonSlug: "custom-directive"
      },
      {
        title: "Structural directives",
        official: "https://angular.dev/guide/directives/structural-directives",
        lessonSlug: "structural-directives"
      },
      {
        title: "Directive composition",
        official: "https://angular.dev/guide/directives/directive-composition-api",
        lessonSlug: "directive-composition"
      },
      {
        title: "Optimizing images",
        official: "https://angular.dev/guide/image-optimization",
        lessonSlug: "image-optimization"
      }
    ]
  },
  {
    title: "Signals",
    items: [
      {
        title: "Signals overview",
        official: "https://angular.dev/guide/signals",
        lessonSlug: "reactivity"
      },
      {
        title: "Dependent state with linkedSignal",
        official: "https://angular.dev/guide/signals/linked-signal",
        lessonSlug: "linked-signal"
      },
      {
        title: "Async reactivity with resources",
        official: "https://angular.dev/guide/signals/resource",
        lessonSlug: "resource-api"
      }
    ]
  },
  {
    title: "Dependency injection (DI)",
    items: [
      {
        title: "Dependency Injection overview",
        official: "https://angular.dev/guide/di",
        lessonSlug: "provide-inject"
      },
      {
        title: "Understanding Dependency injection",
        official: "https://angular.dev/guide/di/dependency-injection",
        lessonSlug: "provide-inject"
      },
      {
        title: "Creating an injectable service",
        official: "https://angular.dev/guide/di/creating-injectable-service",
        lessonSlug: "composition"
      },
      {
        title: "Configuring dependency providers",
        official: "https://angular.dev/guide/di/dependency-injection-providers",
        lessonSlug: "provide-inject"
      },
      {
        title: "Lazy loading services",
        official: "https://angular.dev/guide/di/lazy-loading-services",
        lessonSlug: "lazy-services"
      },
      {
        title: "Injection context",
        official: "https://angular.dev/guide/di/dependency-injection-context",
        lessonSlug: "injection-context"
      },
      {
        title: "Hierarchical injectors",
        official: "https://angular.dev/guide/di/hierarchical-dependency-injection",
        lessonSlug: "provide-inject"
      },
      {
        title: "Optimizing Injection tokens",
        official: "https://angular.dev/guide/di/lightweight-injection-tokens",
        lessonSlug: "lightweight-tokens"
      }
    ]
  },
  {
    title: "RxJS",
    items: [
      {
        title: "RxJS interop with Angular signals",
        official: "https://angular.dev/ecosystem/rxjs-interop",
        lessonSlug: "rxjs-interop"
      },
      {
        title: "Component output interop",
        official: "https://angular.dev/ecosystem/rxjs-interop/output-interop",
        lessonSlug: "rxjs-interop"
      }
    ]
  },
  {
    title: "Loading Data",
    items: [
      {
        title: "HttpClient overview",
        official: "https://angular.dev/guide/http",
        lessonSlug: "async-data"
      },
      {
        title: "Setting up the HttpClient",
        official: "https://angular.dev/guide/http/setup",
        lessonSlug: "http-setup"
      },
      {
        title: "Making requests",
        official: "https://angular.dev/guide/http/making-requests",
        lessonSlug: "http-requests"
      },
      {
        title: "Intercepting requests",
        official: "https://angular.dev/guide/http/interceptors",
        lessonSlug: "auth-token"
      },
      {
        title: "Reactive data fetching with httpResource",
        official: "https://angular.dev/guide/http/http-resource",
        lessonSlug: "resource-api"
      },
      {
        title: "Testing",
        official: "https://angular.dev/guide/http/testing",
        lessonSlug: "testing-deep"
      }
    ]
  },
  {
    title: "Forms",
    items: [
      {
        title: "Forms overview",
        official: "https://angular.dev/guide/forms",
        lessonSlug: "forms"
      },
      {
        title: "Reactive Forms",
        official: "https://angular.dev/guide/forms/reactive-forms",
        lessonSlug: "form-validate"
      },
      {
        title: "Strictly types forms",
        official: "https://angular.dev/guide/forms/typed-forms",
        lessonSlug: "typed-forms"
      },
      {
        title: "Template driven forms",
        official: "https://angular.dev/guide/forms/template-driven-forms",
        lessonSlug: "forms"
      },
      {
        title: "Validate forms input",
        official: "https://angular.dev/guide/forms/form-validation",
        lessonSlug: "form-validate"
      },
      {
        title: "Building dynamic forms",
        official: "https://angular.dev/guide/forms/dynamic-forms",
        lessonSlug: "dynamic-forms"
      },
      {
        title: "Signal Forms",
        official: "https://angular.dev/guide/forms/signals/overview",
        lessonSlug: "intro"
      }
    ]
  },
  {
    title: "Accessibility",
    items: [
      {
        title: "Angular Aria overview",
        official: "https://angular.dev/guide/aria/overview",
        lessonSlug: "intro"
      }
    ]
  },
  {
    title: "Routing",
    items: [
      {
        title: "Routing overview",
        official: "https://angular.dev/guide/routing",
        lessonSlug: "router"
      },
      {
        title: "Define routes",
        official: "https://angular.dev/guide/routing/define-routes",
        lessonSlug: "router"
      },
      {
        title: "Route loading strategies",
        official: "https://angular.dev/guide/routing/loading-strategies",
        lessonSlug: "defer-loading"
      },
      {
        title: "Show routes with outlets",
        official: "https://angular.dev/guide/routing/show-routes-with-outlets",
        lessonSlug: "route-outlets"
      },
      {
        title: "Navigate to routes",
        official: "https://angular.dev/guide/routing/navigate-to-routes",
        lessonSlug: "navigate-state"
      },
      {
        title: "Read route state",
        official: "https://angular.dev/guide/routing/read-route-state",
        lessonSlug: "navigate-state"
      },
      {
        title: "Common routing tasks",
        official: "https://angular.dev/guide/routing/common-router-tasks",
        lessonSlug: "route-guards"
      },
      {
        title: "Creating custom route matches",
        official: "https://angular.dev/guide/routing/routing-with-urlmatcher",
        lessonSlug: "url-matcher"
      }
    ]
  },
  {
    title: "Server Side Rendering (SSR)",
    items: [
      {
        title: "SSR Overview",
        official: "https://angular.dev/guide/performance",
        lessonSlug: "perf-patterns"
      },
      {
        title: "Server and hybrid rendering",
        official: "https://angular.dev/guide/ssr",
        lessonSlug: "ssr-hydration"
      },
      {
        title: "Rendering strategies in Angular",
        official: "https://angular.dev/guide/routing/rendering-strategies",
        lessonSlug: "hybrid-rendering"
      },
      {
        title: "Hybrid rendering with server routing",
        official: "https://angular.dev/guide/hybrid-rendering",
        lessonSlug: "hybrid-rendering"
      },
      {
        title: "Hydration",
        official: "https://angular.dev/guide/hydration",
        lessonSlug: "ssr-hydration"
      },
      {
        title: "Incremental Hydration",
        official: "https://angular.dev/guide/incremental-hydration",
        lessonSlug: "incremental-hydration"
      }
    ]
  },
  {
    title: "CLI",
    items: [
      {
        title: "Angular CLI Overview",
        official: "https://angular.dev/tools/cli",
        lessonSlug: "install-cli"
      }
    ]
  },
  {
    title: "Testing",
    items: [
      {
        title: "Testing overview",
        official: "https://angular.dev/guide/testing",
        lessonSlug: "testing-vue"
      },
      {
        title: "Testing coverage",
        official: "https://angular.dev/guide/testing/code-coverage",
        lessonSlug: "testing-deep"
      },
      {
        title: "Testing services",
        official: "https://angular.dev/guide/testing/services",
        lessonSlug: "testing-deep"
      },
      {
        title: "Basics of component testing",
        official: "https://angular.dev/guide/testing/components-basics",
        lessonSlug: "testing-deep"
      },
      {
        title: "Component testing scenarios",
        official: "https://angular.dev/guide/testing/components-scenarios",
        lessonSlug: "testing-deep"
      },
      {
        title: "Testing attribute directives",
        official: "https://angular.dev/guide/testing/attribute-directives",
        lessonSlug: "custom-directive"
      },
      {
        title: "Testing pipes",
        official: "https://angular.dev/guide/testing/pipes",
        lessonSlug: "testing-deep"
      },
      {
        title: "Debugging tests",
        official: "https://angular.dev/guide/testing/debugging",
        lessonSlug: "testing-deep"
      },
      {
        title: "Testing utility apis",
        official: "https://angular.dev/guide/testing/utility-apis",
        lessonSlug: "testing-deep"
      },
      {
        title: "Component harness overview",
        official: "https://angular.dev/guide/testing/component-harnesses-overview",
        lessonSlug: "intro"
      },
      {
        title: "Using component harness in tests",
        official: "https://angular.dev/guide/testing/using-component-harnesses",
        lessonSlug: "component-harness"
      },
      {
        title: "Creating a component harness for your components",
        official: "https://angular.dev/guide/testing/creating-component-harnesses",
        lessonSlug: "component-harness"
      }
    ]
  },
  {
    title: "Animations",
    items: [
      {
        title: "Animations your content",
        official: "https://angular.dev/guide/animations/css",
        lessonSlug: "animations-css"
      },
      {
        title: "Route transition animation",
        official: "https://angular.dev/guide/routing/route-transition-animations",
        lessonSlug: "route-animations"
      },
      {
        title: "Migrating to native CSS animations",
        official: "https://next.angular.dev/guide/animations/migration",
        lessonSlug: "animations-css"
      }
    ]
  },
  {
    title: "APIs",
    items: [
      {
        title: "API reference",
        official: "https://angular.dev/api",
        note: "以官网为准"
      },
      {
        title: "CLI command reference",
        official: "https://angular.dev/cli",
        lessonSlug: "install-cli"
      }
    ]
  },
  {
    title: "Others",
    items: [
      {
        title: "Zoneless",
        official: "https://angular.dev/guide/zoneless",
        lessonSlug: "zoneless"
      },
      {
        title: "Error encyclopedia",
        official: "https://angular.dev/errors",
        lessonSlug: "errors-diagnostics"
      },
      {
        title: "Extended diagnostics",
        official: "https://angular.dev/extended-diagnostics",
        lessonSlug: "errors-diagnostics"
      },
      {
        title: "Update guide",
        official: "https://angular.dev/update-guide",
        lessonSlug: "update-angular"
      },
      {
        title: "Contribute to Angular",
        official: "https://github.com/angular/angular/blob/main/CONTRIBUTING.md",
        note: "以官网为准"
      },
      {
        title: "Angular's Roadmap",
        official: "https://angular.dev/roadmap",
        note: "以官网为准"
      },
      {
        title: "Keeping your projects up-to-date",
        official: "https://angular.dev/update",
        lessonSlug: "update-angular"
      },
      {
        title: "Security",
        official: "https://angular.dev/best-practices/security",
        lessonSlug: "security"
      },
      {
        title: "Internationalization (i18n)",
        official: "https://angular.dev/guide/i18n",
        lessonSlug: "i18n"
      }
    ]
  },
  {
    title: "AI / LLM 官方资源",
    items: [
      {
        title: "llms.txt",
        official: "https://angular.dev/llms.txt",
        note: "官方索引"
      },
      {
        title: "llms-full.txt",
        official: "https://angular.dev/assets/context/llms-full.txt",
        note: "完整上下文"
      },
      {
        title: "Develop with AI",
        official: "https://angular.dev/ai/develop-with-ai"
      },
      {
        title: "Angular AI Tutor",
        official: "https://angular.dev/ai/ai-tutor"
      }
    ]
  },
  {
    title: "本站特色（官网无对照课）",
    items: [
      {
        title: "全栈工坊 · 模拟 REST",
        official: "https://angular.dev/guide/http",
        lessonSlug: "rest-api",
        note: "本站互动闯关"
      },
      {
        title: "Token 会话工坊",
        official: "https://angular.dev/guide/http/interceptors",
        lessonSlug: "auth-token"
      },
      {
        title: "毕业作品清单",
        official: "https://angular.dev/overview",
        lessonSlug: "capstone"
      },
      {
        title: "面试串讲",
        official: "https://angular.dev/overview",
        lessonSlug: "interview-vue"
      }
    ]
  }
];
