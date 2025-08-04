# Super UI Plus

一个现代化的 Vue 3 UI 组件库，基于 TypeScript 和 Vite 构建。

## 特性

- 🚀 基于 Vue 3 + TypeScript
- 📦 支持按需引入
- 🎨 可定制的主题系统
- 📱 响应式设计
- 🔧 完整的 TypeScript 支持
- ⚡ 轻量级，高性能

## 快速开始

### 安装

```bash
npm install super-ui-plus
# 或
yarn add super-ui-plus
# 或
pnpm add super-ui-plus
```

### 使用

```typescript
import { createApp } from 'vue'
import SuperUIPlus from 'super-ui-plus'
import 'super-ui-plus/dist/style.css'

const app = createApp(App)
app.use(SuperUIPlus)
app.mount('#app')
```

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建组件库
pnpm build:lib

# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 运行测试
pnpm test
```

## 文档

详细文档请查看 [packages/README.md](./packages/README.md)

## 许可证

MIT License
