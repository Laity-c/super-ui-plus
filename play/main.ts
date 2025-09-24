import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import SuperUi from '../packages/super-ui-plus'
// import SuperUi2 from '../dist/super-ui-plus'
// import '../dist/super-ui-plus/index.css'
import "../packages/theme-chalk/src/index.scss"

const app = createApp(App)

// 注册ElementPlus
app.use(ElementPlus, {
  locale, // 语言设置
  // size: Cookies.get('size') || 'medium' // 设置默认尺寸
})

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(SuperUi)

app.mount('#app')