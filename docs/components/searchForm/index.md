# SearchForm

## 示例
`在 formGrid 基础上扩展，完全支持 formGrid 全部功能`

### 基本使用
<preview path="./searchFormBase.vue"></preview>

### 关闭自动查询功能
`关闭后需要手动点击查询按钮`

<preview path="./searchFormOffAutoSearch.vue"></preview>

### 查询按钮前后插槽
<preview path="./searchFormSlot.vue"></preview>

### 关闭展开收起/查询/重置按钮
`通过设置 ifCollapsed/hideSearch/hideReset`
<preview path="./searchFormHideButton.vue"></preview>

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| field | 表单配置列 | [`formGridItemProps[]`](../formGrid/index.md/#formgriditem-props) | - | `[]` |
| model | 表单数据绑定 | `object` | - | `{}` |
| searchCol | 响应式布局参数 | `number/object` | - | `{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }` |
| ifCollapsed | 是否显示展开/收起 | `boolean` | `true/false` | `true` |
| ifCardStyle | 是否使用 card 样式 | `boolean` | `true/false` | `true` |
| autoSearch | 是否开启自动搜索 | `boolean` | `true/false` | `true` |
| hideReset | 是否隐藏重置按钮 | `boolean` | `true/false` | `true` |


### Slots

| 插槽名 | 说明 |
| --- | --- |
| beforeContent | 往查询按钮前面添加内容 | - | - | - |
| afterContent | 往查询按钮后面添加内容 | - | - | - |

