# CheckBox

## 示例
### 基本使用
<preview path="./checkboxBase.vue"></preview>

### 不同类型展示状态
<preview path="./checkboxType.vue"></preview>

### label-添加前缀
<preview path="./checkboxPrefix.vue"></preview>

### 禁用状态
<preview path="./checkboxDisabled.vue"></preview>

### 包含/排除选项
<preview path="./checkboxIncludeOrExclude.vue"></preview>

### 显示全选按钮
<preview path="./checkboxAll.vue"></preview>

### 选项互斥
<preview path="./checkboxExclusion.vue"></preview>

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| modelValue | 绑定值 | `Array<any>` | - | - |
| type | 按钮样式 | `string` | `'checkbox' \| 'button'` | `checkbox` |
| size | 尺寸 | `string` | `small \| default \| large` | `default` |
| border | 是否显示边框	 | `boolean` | `true\|false` | `false` |
| options | 选项数据源	 | `Array<any>` | - | - |
| labelKey | 自定义label字段属性名 | `string` | - | `label` |
| valueKey | 自定义value字段属性名 | `string` | - | `value` |
| prefix | 是否使用前缀 | `boolean \| ((item: any) => boolean)` | - | - |
| disabled | 是否禁用 | `boolean \| ((item: any) => boolean)` | - | - |
| include | 包含的选项 | `Array<string \| number>` | - | - |
| exclude | 排除的选项 | `Array<string \| number>` | - | - |
| hasCheckAll | 是否显示全选 | `boolean` | `true/false` | `false` |
| valueKeys | 选中项的值类型配置 | `{ valueKey: string; labelKey: string }` | - | - |
| exclusion | 选项互斥 | `number \| string \| { value: string; exclusion: string} \| Array<{ value: string; exclusion: string}>[]` | - | - |

#### exclusion 属性用法说明
exclusion 四种格式
- number/string 当为 number 或者 字符串时，exclusion 的值与其他项互斥
- map 当为 map 对象时，格式为{ value: "2", exclusion: "3" }选中 2 则 3 取消选中，选中 3 则 2 取消选中 或者 { value: "2", exclusion: ["3", "4"] } ；选中 2 则 3、4 取消选中，选中 3 或者 4 则 2 取消选中
- array 当为 array 时，格式为[{ value: "2", exclusion: "3" }, { value: "4", exclusion: ["3", "5"] }] 选中 2 时，3 取消选中，选择 4 时，3 和 5 取消选中

### Events
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 当绑定值变化时触发的事件 | `Function`<t-tip content='(value:[string/number], result: values[]) => void
'/> |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

