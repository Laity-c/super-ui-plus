<template>
  <div v-if="preview">
    {{
      field.format && typeof field.format === 'function'
        ? field.format(_searchParam[field.name], _searchParam)
        : _searchParam[field.name]
    }}
  </div>
  <component
    v-else
    :is="field?.render ?? field.el"
    v-bind="{ ...props.field.componentProps, searchParam: _searchParam, ...placeholder }"
    v-model.trim="_searchParam[field.name]"
    :data="field.el === 'ElTreeSelect' ? columnEnum : []"
    :options="['ElCascader', 'ElSelectV2'].includes(field.el!) ? columnEnum : []"
  >
    <!-- 组件内插槽 -->
    <template v-for="(value, slot) in field?.scopedSlots" #[slot] :key="slot">
      <component :is="value()" />
    </template>

    <template v-if="field?.el === 'ElCascader'" #default="{ data }">
      <span>{{ data[fieldNames.label] }}</span>
    </template>
    <template
      v-if="['ElSelect', 'ElCheckboxGroup', 'ElRadioGroup'].find(ctype => ctype === field?.el)"
    >
      <component
        :is="sublevelDropdownName[field.el!]"
        v-for="(col, index) in columnEnum"
        :key="index"
        :label="col[fieldNames.label]"
        :value="col[fieldNames.value]"
      ></component>
    </template>
    <slot v-else></slot>
  </component>
</template>

<script setup lang="ts" name="SearchFormItem">
import { computed } from 'vue'
import type { SearchFormItemProps } from '../src/type'

const props = defineProps<SearchFormItemProps>()

const _searchParam = computed(() => props.model)

// 主要用于类型el-select这种多个选项时的label和value的key值
const fieldNames = computed(() => {
  return {
    label: props.field.fieldNames?.label ?? 'label',
    value: props.field.fieldNames?.value ?? 'value',
    children: props.field.fieldNames?.children ?? 'children',
  }
})

// 获取列的枚举数据
const columnEnum = computed(() => {
  const enumData = props.field?.options ?? []
  return enumData
})

// 处理默认 placeholder
const placeholder = computed(() => {
  // if (
  //   ['datetimerange', 'daterange', 'monthrange'].includes(search?.props?.type) ||
  //   search?.props?.isRange
  // ) {
  //   return { rangeSeparator: '至', startPlaceholder: '开始时间', endPlaceholder: '结束时间' }
  // }
  const placeholder =
    props.field?.componentProps?.placeholder ??
    (props.field?.el?.includes('ElInput') ? '请输入' : '请选择')

  return { placeholder }
})

// 处理是否多选/下拉/单选组组件
const sublevelDropdownName: Record<string, string> = {
  ElSelect: 'el-option',
  ElCheckboxGroup: 'el-checkbox',
  ElRadioGroup: 'el-radio',
}
</script>
