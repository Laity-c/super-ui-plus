# FormGrid

## 示例

### 基本使用
<preview path="./formGridBase.vue"></preview>

### 全部禁用
需要配置: `disabled`
<preview path="./formGridDisabled.vue"></preview>

### 设置组件属性
需要配置: `componentProps`
<preview path="./formGridComponentProps.vue"></preview>

### 表单验证
必填验证: `required: true`
手机号验证: `valueType: 'phone'`
自定义验证验证: `formItemProps: {rules: [required: false, message: '必填', trigger: 'blur']}`
<preview path="./formGridValidate.vue"></preview>

### 表单组件联动
需要配置: `show`
警告：`当传递给show是一个响应式数据时, 需要使用函数返回`
<preview path="./formGridComponentLinkage.vue"></preview>

### 使用插槽
需要配置: `show`
<preview path="./formGridSlot.vue"></preview>

## API

### formGrid Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| field | 表单配置列 | `formItemProps[]` | - | `[]` |
| model | 表单数据绑定 | `object` | - | `{}` |
| searchCol | 响应式布局参数 | `number/object` | - | `{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }` |
| ifCardStyle | 是否使用 card 样式 | `boolean` | `true/false` | `true` |

### formGridItem Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| el | 渲染组件名称 | `strigng` | - | - |
| label | 标题名称 | `string` | - | - |
| name | props绑定名称 | `string` | - | - |
| labelWidth | 标题宽度 | `number` | - | - |
| tooltip | 标题文字提示 | `string` | - | - |
| required | 是否必填 | `boolean` | - | - |
| valueType | 内置验证规则类型 | `string`<t-tip content='phone'/>  | - | - |
| fieldNames | 指定 label && value && children 的 key 值 可以指定el-select他们的labelkey或valueKey | `object`<t-tip content='FormRules'/> | object<t-tip content='{label: string,value: string,children?: string}'/> | - |
| options | 下拉选项数据 | `EnumProps[]` | `object`<t-tip content='{label: string,value: string,disabled?: bolean,tagType?: string,children?: EnumProps[]}'/> | - |
| span | 表单项所占用的列数 | `number` | - | 1 |
| offset | 表单项左侧偏移列数 | `number` | - | - |
| render | 自定义表单项内容渲染 | `(scope: SearchRenderScope) => VNode`<t-tip content='{searchParam: { [key: string]: any },placeholder: string,clearable: boolean,options: EnumProps[], data: data: EnumProps[]}'/> | - | - |
| scopedSlots | 组件内插槽<t-tip content='比如ElInput的prefix或suffix'/> | `any` | - | - |
| formItemProps | 透传 el-form-item 属性 | [`Partial<FormItemProps>`](https://element-plus.org/zh-CN/component/form.html#formitem-attributes) | - | - |
| componentProps | 透传组件属性 | `any` | - | - |


### formGrid Slots

| 插槽名 | 说明 |
| --- | --- |
| slotName | 自定义搜索内容插槽名称 <t-tip content='需要自己写el-form-item标签, 插槽名称后面不能出现Component字符' /> |
| append | 自定义表单尾部内容 | 
| default | 默认插槽,出现在表单底部 |

### formGridItem Slots

| 插槽名 | 说明 |
| --- | --- |
| slotName | 组件内插槽<t-tip content='无需自己写el-form-item标签,内容会默认渲染到el-form-item标签内部, 尾部必须加Component字符'/> | `any` | - | - |
