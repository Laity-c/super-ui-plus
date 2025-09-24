# Radio

## 示例
### 基本使用
<preview path="./radioBase.vue"></preview>

### 不同类型展示状态
<preview path="./radioType.vue"></preview>

### label-添加前缀
<preview path="./radioPrefix.vue"></preview>

### 禁用状态
<preview path="./radioDisabled.vue"></preview>

### 包含/排除选项
<preview path="./radioIncludeOrExclude.vue"></preview>

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 按钮样式 | `string` | `'radio' \| 'button'` | `radion` |
| size | 尺寸 | `string` | `small \| default \| large` | `default` |
| border | 是否显示边框	 | `boolean` | `true\|false` | `false` |
| labelKey | 自定义label字段属性名 | `string` | - | `label` |
| valueKey | 自定义value字段属性名 | `string` | - | `value` |
| prefix | 是否使用前缀 | `boolean \| ((item: any) => boolean)` | - | - |
| disabled | 是否禁用 | `boolean \| ((item: any) => boolean)` | - | - |
| include | 包含的选项 | `Array<string \| number>` | - | - |
| exclude | 排除的选项 | `Array<string \| number>` | - | - |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义默认内容
