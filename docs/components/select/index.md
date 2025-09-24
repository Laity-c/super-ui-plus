# Header

## 示例
### 基本使用
<preview path="./selectBase.vue"></preview>

### leable添加前缀
<preview path="./selectPrefix.vue"></preview>

### 对象类型数据
<preview path="./selectIsObject.vue"></preview>

### 禁用状态
<preview path="./selectDisabled.vue"></preview>

### 多选功能
<preview path="./selectMultiple.vue"></preview>

### 多选添加添加全选按钮
<preview path="./selectMultipleAll.vue"></preview>

### collapse-tags 和 collapse-tags-tooltip 多选功能
<preview path="./selectMultipleTags.vue"></preview>

### 虚拟列表
<preview path="./selectVirtual.vue"></preview>

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| modelValue | 绑定值 | `string \| number \| Array<any> \| Record<string, any> ` | - | - |
| useVirtual | 是否使用虚拟列表 | `boolean` | `true \| false` | `false` |
| options | 选项数据源	 | `Array<any>` | - | - |
| labelKey | 自定义label字段属性名 | `string` | - | `label` |
| valueKey | 自定义value字段属性名 | `string` | - | `value` |
| prefix | 是否使用前缀 | `boolean \| ((item: any) => boolean)` | - | - |
| disabled | 是否禁用 | `boolean \| ((item: any) => boolean)` | - | - |
| filterable | 是否可搜索 | `boolean` | `true \| false` | `false` |
| hasCheckAll | 是否显示全选 | `boolean` | `true/false` | `false` |
| valueIsObject | 值是否为对象 | `boolean` | `true/false` | `false` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| header | 下拉列表顶部的内容 |

