# Layout 布局

## 示例

### 基本使用
<preview path="./layoutBase.vue"></preview>

### 分栏间隔
分栏之间存在间隔。
<preview path="./layoutGap.vue"></preview>

### 混合布局
通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。
<preview path="./layoutMixed.vue"></preview>

### 分栏偏移
支持偏移指定的栏数。(需要配合当前处于什么大小参数使用，如 :lg="{ span: 2, offset: 2 }")
<preview path="./layoutOffset.vue"></preview>

## API

### Grid Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| cols | 响应式布局参数 | `number/object` | - | `{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }` |
| gap | 栅格间隔 | `[number, number]/number` | - | `0` |

### GridItem Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| offset | 栅格左侧的间隔格数	 | `number` | - | `0` |
| span | 栅格占据的列数	 | `number` | - | `1` |
| suffix | 是否预留尾部(展开/收起)按钮位置 | `boolean` | `true/false` | `false` |
