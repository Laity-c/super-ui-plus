import DefaultTheme from "vitepress/theme";
import type { App } from "vue";
import { ElementPlusContainer } from "vitepress-demo-preview-fock-component";
import "vitepress-demo-preview-fock-component/dist/style.css";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import SuperUi from '../../../packages/index';


 // 自定义样式
import "./custom.css";
import "./index.scss";

export default {
  ...DefaultTheme,
  async enhanceApp({ app }: { app: App }) {
    app.use(ElementPlus as any, {
      locale: zhCn,
    });
    app.use(SuperUi);
    app.component("demo-preview", ElementPlusContainer);
  },
};
