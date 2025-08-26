// packages/index.ts
import type { App, Plugin } from 'vue' // 导入 Plugin 类型
import { SuperHeader } from './components/Header'
import { SuperGrid } from './components/Grid'
import { SuperGridItem } from './components/GridItem'
import { SuperFormGrid } from './components/FormGrid'
import { SuperSearchForm } from './components/SearchForm'

// 导入你的组件库样式（如果你的样式是全量导入的）
// 如果你采用了Element Plus的按需导入样式策略，这里可以省略，
// 或者只导入公共的SCSS变量文件。
import './styles/index.scss' // 导入编译后的所有样式

// 定义所有要注册的组件数组
// 这里我们将组件直接声明为 Vue Plugin 类型，因为它会被 app.use() 处理
// 或者只是一个常规的 Vue Component 对象，然后我们在 install 方法中进行注册
const components = [
  SuperHeader,
  SuperGrid,
  SuperGridItem,
  SuperFormGrid,
  SuperSearchForm
]

// 定义组件库的安装函数（Plugin 对象的 install 方法）
// 这是一个符合 Vue Plugin 规范的 install 函数
const SuperUiPlugin: Plugin = {
  install(app: App) {
    // 遍历所有组件并进行全局注册
    components.forEach(component => {
      // 检查组件是否有 install 方法（例如 SuperHeader 就有，用于自动注册自己）
      if ((component as any).install) {
        app.use(component as Plugin) // 如果组件本身是一个插件（有 install 方法），则通过 app.use() 注册
      } else if ((component as any).name) {
        // 如果没有 install 方法，但有 name 属性，则直接注册为组件
        app.component((component as any).name, component)
      } else {
        console.warn(
          'Component is missing a name property and no install method. Skipping global registration:',
          component,
        )
      }
    })

    // 你也可以在这里提供一些全局配置或方法
    // app.config.globalProperties.$myLib = { /* ... */ };
  },
}

// 导出所有组件（用于按需导入）
export {
  SuperHeader,
  SuperGrid,
  SuperGridItem,
  SuperFormGrid,
  SuperSearchForm
}

// 默认导出插件对象，用于 `app.use()` 全局注册
export default SuperUiPlugin
