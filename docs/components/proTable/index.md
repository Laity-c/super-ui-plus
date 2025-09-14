# ProTable

## 示例

### 基本使用
`props为$index自动生成索引`
<preview path="./proTableBase.vue"></preview>

### 单元格数据状态(tag)
`传入tag函数实现不同数据状态样式`
<preview path="./proTableTagState.vue"></preview>

### 单元格对齐方式
`表格默认为居中对齐，如果需要修改对齐方式，请设置align属性, 每列对齐方式可以单独设置`
<preview path="./proTableAlign.vue"></preview>

### 固定表头
`设置 height 属性，即可实现固定表头的表格`
<preview path="./proTableFixedHead.vue"></preview>

### 多级表头
`设置 _children 属性，即可实现多级表头表格`
<preview path="./proTableMultistageHeader.vue"></preview>

### 表格多选
`警告: rowKey必须设置`
<preview path="./proTableMultiple.vue"></preview>

### 多选树
<preview path="./proTableMultipleTree.vue"></preview>

### 展开行/单选列/拖拽排序
<preview path="./proTableExpand.vue"></preview>

### 自定义渲染表头(slot/tsx)
`通过 插槽 和 headerRender 属性，可以自定义表头`
<preview path="./proTableCustomHeader.vue"></preview>

### 自定义渲染内容(slot/tsx)
`通过 插槽 和 reder 属性，可以自定义单元格内容`
<preview path="./proTableCustomContent.vue"></preview>

### 表尾合计行
`show-summary属性显示表尾合计行`<br />
`sumText: 自定义合计行文本`<br />
`sumNaNText: 当数据为非数字时，该字段用于代替合计行显示的值`<br />
`sumDataPrefix: 自定义合计数据前缀`<br />
`sumFilter: 自定义合计内容`
<preview path="./proTableTotal.vue"></preview>

### 分页自动滚动到首行
`通过 autoScroll 控制分页自动滚动到首行`
<preview path="./proTableAutoScroll.vue"></preview>

### 数据格式化
`通过 format 实现数据格式化`<br/>
`目前只内置了日期格式化，通过传入 year,month,date显示效果`
<preview path="./proTableFormat.vue"></preview>

### 行和列合并
`通过 span-method 实现`
<preview path="./proTableSpanMethod.vue"></preview>

### 编辑表格
`共有三种编辑表格方式：双击编辑/行编辑/列编辑`<br/>
`想要启用单元格编辑必须设置单元格el和isEdit属性`
<preview path="./proTableEdit.vue"></preview>

### 编辑表格校验方法
`和在布局表单中一样，通过 required 或 formItemProps：{rules: [验证规则]} 进行校验`<br/>
`可以调用表格的validateTableForm方法进行手动校验`
<preview path="./proTableEditValidate.vue"></preview>

### 表格操作按钮
`使用operation插槽来实现`
<preview path="./proTableOperationBtn.vue"></preview>

### 表格头部操作按钮插槽
`toolButton可控制右侧功能按钮的显示隐藏：传true则显示，false则隐藏，传数组则显示指定的功能按钮，比如['refresh']就只显示刷新按钮`<br />
`tableHeader插槽可以自定义左侧内容`
<preview path="./proTableHeaderOperationBtn.vue"></preview>

### 使用搜索表格
`搜索表格支持searchForm和proTable的所有选项`<br />
`使用requestApi属性获取数据要求：接口返回正常数据格式：`<br />
`分页: { data: { list: [...], total: ... } }`<br />
`不分页: { data: [...] }`
<preview path="./proTableSearch.vue"></preview>

### 隐藏搜索表单/表单选项/列数据
`列设置isShow属性可以对列进行隐藏`<br/>
`showSearch 为true时显示搜索表单，默认为为false`
<preview path="./proTableSearchHide.vue"></preview>

### 隐藏表格分页
`设置pagination为false时隐藏分页`
<preview path="./proTablePaginationHide.vue"></preview>

## API

### table Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| columns | 列配置项 | [`ColumnProps[]`](./index.md/#column-props) | - | - |
| data | 静态 table data 数据 <t-tip content='若存在则不会使用 requestApi 返回的 data ==> 非必传' /> | `any[]` | - | - |
| requestApi | 请求表格数据的 api ==> 非必传 | `(params: any) => Promise<any>` | - | - |
| requestAuto | 是否自动执行请求 | `boolean` | `true/false` | `true` |
| requestError | 表格 api 请求错误监听回调函数 | `(params: any) => void`<t-tip content='requestError && requestError(error)'/> | - | - |
| dataCallback | 返回数据的回调函数，可以对数据进行处理 | `(data: any) => any`<t-tip content='dataCallBack && (data = dataCallBack(data))'/> | - | - |
| pagination | 是否需要分页组件 | `boolean` | `true/false` | `true` |
| initParam | 初始化请求参数 | `object` | - | - |
| border | 是否带有纵向边框 | `boolean` | `true/false` | `true` |
| toolButton | 是否显示表格功能按钮 | `array \| boolean` | `('refresh' \| 'setting' \| 'search')[]`<t-tip content='Array.isArray(props.toolButton) ? props.toolButton.includes(key) : props.toolButton' /> \| `boolean` | `true` |
| rowKey | 行数据的 Key，用来优化 Table 的渲染； 在使用reserve-selection功能与显示树形数据时，该属性是必填的 | `string` | - | - |
| showSummary | 是否在表格底部显示合计行 | `boolean` | `true/false` | `false` |
| sumText | 自定义合计行文本 | `string` | - | `合计` |
| sumNaNText | 自定义合计行文本 | `string` | - | `N/A` |
| ifDblclick | 是否开启双击单元格编辑 | `boolean` | `true/false` | `false` |
| align | 单元格对齐方式 | `string` | - | `center` |
| height | 表格高度 | `string \| number` | - | - |
| ifContinuousMultiple | 是否开启列表数据连续多选 | `boolean` | `true/false` | `true` |
| autoScroll | 分页自动滚动到首行 | `boolean` | `true/false` | `true` |
| showSearch | 是否显示搜索模块 | `boolean` | `true/false` | `false` |
| field | 搜索配置列 | [`formGridItemProps[]`](../formGrid/index.md/#formgriditem-props) | - | - |


### Column Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 列类型 | `enum` | `enum`<t-tip content='index selection radio sort'/> | - |
| tag | 是否是标签展示 | `function` | `(scope: RenderScope<T>) => any` <t-tip content='{ row: T, $index: number, column: TableColumnCtx<T extends DefaultRow ? T : DefaultRow>;[key: string]: any;}' /> | - |
| isShow | 是否显示 | `boolean` | `true/false` | `true` |
| isSetting | 是否在 ColSetting 中可配置 | `boolean` | `true/false` | `true` |
| isEdit | 是否可编辑 | `boolean` | `true/false` | `false` |
| edit | 编辑状态 | `boolean` | `true/false` | `false` |
| required | 是否必填 | `boolean` | `true/false` | `false` |
| valueType | 内置验证规则类型 | `string`<t-tip content='phone'/>  | - | - |
| formItemProps | 透传 el-form-item 属性 | [`Partial<FormItemProps>`](https://element-plus.org/zh-CN/component/form.html#formitem-attributes) | - | - |
| el | 渲染组件名称 | `strigng` | - | - |
| enum | 枚举字典数据 | `EnumProps[]` | - | - |
| headerRender | 自定义表头内容渲染（tsx语法） | `(scope: HeaderRenderScope<T>) => VNode` | `HeaderRenderScope`<t-tip content='{$index: number, column: TableColumnCtx<T extends DefaultRow ? T : DefaultRow>, [key: string]: any}' /> | - |
| render | 自定义单元格内容渲染（tsx语法） | `(scope: RenderScope<T>) => VNode \| string` | - | - |
| format | 内置格式化方式 | `((value: any) => string) \| string;` | - | - |
| sumFilter | 自定义合计内容 | `(value: any, param: SummaryMethodProps) => string` | `SummaryMethodProps`<t-tip content='{columns: TableColumnCtx[], data: T[]}'/> | - |
| sumDataPrefix | 合计数据前缀 | `strigng` | - | - |
| _children | 多级表头 | `ColumnProps<T>[]` | - | - |
| align | 单元格对齐方式 | `string` | - | `center` |


### table Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 表格默认内容插槽 |
| tableHeader | 表格上方插槽 |
| toolButton | 右侧工具扩展插槽 |
| append | 插入表格最后一行之后的插槽 |
| pagination | 分页组件插槽 |
| [`searchForm`](../searchForm/index.md/#slots) | 搜索表单插槽 |
| [`formGridSlots/formGridItemSlots`](../formGrid/index.md/#formgrid-slots) | 搜索表单元素内容插槽 |

### table Colum Slots

| 插槽名 | 说明 |
| --- | --- |
| header | 自定义表头的内容 |
| expand | 展开列的自定义内容 |
