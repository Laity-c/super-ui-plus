import {
  NOOP
} from "./chunk-SA74HL4V.js";

// node_modules/.pnpm/element-plus@2.11.1_vue@3.5.20_typescript@5.8.3_/node_modules/element-plus/es/utils/vue/install.mjs
var withInstall = (main, extra) => {
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
      app.component(comp.name, comp);
    }
  };
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      main[key] = comp;
    }
  }
  return main;
};
var withInstallFunction = (fn, name) => {
  fn.install = (app) => {
    fn._context = app._context;
    app.config.globalProperties[name] = fn;
  };
  return fn;
};
var withInstallDirective = (directive, name) => {
  directive.install = (app) => {
    app.directive(name, directive);
  };
  return directive;
};
var withNoopInstall = (component) => {
  component.install = NOOP;
  return component;
};

export {
  withInstall,
  withInstallFunction,
  withInstallDirective,
  withNoopInstall
};
//# sourceMappingURL=chunk-LSARDTUI.js.map
