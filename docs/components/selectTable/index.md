# SelectTable

## 示例
### 基本使用
<preview path="./selectTableBase.vue"></preview>

### 禁用状态
<preview path="./selectTableDisabled.vue"></preview>

### 隐藏分页
<preview path="./selectTableHidePagination.vue"></preview>

### 模拟数据网络请求
<preview path="./selectTableRequestApi.vue"></preview>

### 默认值
<preview path="./selectTableDefaultValue.vue"></preview>

### 动态赋值
<preview path="./selectTableDynamicValue.vue"></preview>

### 显示搜索条件
<preview path="./selectTableSearch.vue"></preview>

### 键盘上下键选中数据
<preview path="./selectTableKeyup.vue"></preview>

## API
::: tip

在`el-select`基础上开发，更多属性参考[el-select](https://element-plus.org/zh-CN/component/select#select-api)

:::

### Select Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| modelValue | 绑定值 | `any ` | - | - |
| labelKey | 自定义label字段属性名 | `string` | - | `label` |
| valueKey | 自定义value字段属性名 | `string` | - | `value` |
| multiple | 是否多选 | `boolean` | `true \| false` | `false` |
| selectWidth | 选择框宽度 | `string` | - | `550px` |
| isRadio | 是否显示单选框 | `boolean` | - | `false` |
| isKeyup | 是否开启键盘上下键选择(仅在 isRadio 为 true 时生效) | `boolean` | - | `false` |
| disabled | 是否禁用 | `boolean \| ((item: any) => boolean)` | - | - |

### ProTable Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| tableWidth | 表格宽度 | `string` | - | `550px` |
| height | 表格高度 | `string \| number` | - | - |
| columns | 列配置项 | [`ColumnProps[]`](../proTable/index.md/#column-props) | - | - |
| data | 静态 table data 数据 | `(any[] \| undefined \| null)` | - | - |
| requestApi | 请求表格数据的 api ==> 非必传 | `(params: any) => Promise<any>` | - | - |
| dataCallback | 返回数据的回调函数，可以对数据进行处理 | `(data: any) => any`<t-tip content='dataCallBack && (data = dataCallBack(data))'/> | - | - |
| pagination | 是否需要分页组件 | `boolean` | `true/false` | `true` |
| initParam | 初始化请求参数 | `object` | - | - |
| showSearch | 是否显示搜索模块 | `boolean` | `true/false` | `false` |
| field | 表单配置列 | [`formGridItemProps[]`](../formGrid/index.md/#formgriditem-props) | - | `[]` |
| layout | 分页组件布局 | `string` | - | `'total, prev, pager, next'` |


### Slots

| 插槽名 | 说明 |
| --- | --- |
| label | select 组件自定义标签内容 |
| tag | 自定义标签tag内容 |

