<template>
  <component
    :is="!useVirtual ? 'el-select' : 'el-select-v2'"
    popper-class="super_select"
    ref="superSelect"
    v-model="selectedValue"
    :options="!useVirtual ? null : options"
    :style="{ width: width || '100%' }"
    v-bind="{
      clearable: true,
      filterable: filterable,
      multiple: multiple,
      vableKey: valueKey,
      ...$attrs,
    }"
    :disabled="typeof disabled === 'function' ? false : disabled"
    @change="handleSelectChange"
    @input="handlesSelectInput"
  >
    <template v-for="name in slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>

    <template #header v-if="hasCheckAll">
      <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
        全选
      </el-checkbox>
    </template>
    <template v-if="!useVirtual">
      <el-option
        v-for="(item, index) in options"
        :key="index + 'i'"
        :label="renderLabel(item)"
        :value="valueIsObject ? item : item[valueKey]"
        :disabled="typeof disabled === 'function' ? disabled(item) : disabled"
      />
    </template>
  </component>
</template>

<script name="SuperSelect" lang="tsx" setup>
import { ref, useTemplateRef, useSlots, watch } from 'vue'
import type { SuperSelectProps } from './type'
import type { CheckboxValueType } from 'element-plus'

defineOptions({
  name: 'SuperSelect',
})

const props = withDefaults(defineProps<SuperSelectProps>(), {
  useVirtual: false,
  options: () => [],
  labelKey: 'label',
  valueKey: 'value',
  filterable: true,
  multiple: false,
  hasCheckAll: false,
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
  (e: 'select-input', value: string): void
}>()

const slots = useSlots()
const superSelectRef = useTemplateRef('superSelect')

// 初始化 selectedValue 为 props.modelValue
const selectedValue = ref(props.modelValue)

const checkAll = ref(false)
const indeterminate = ref(false)

// 监听 modelValue 变化，动态设置 indeterminate 和 checkAll
watch(
  () => props.modelValue,
  val => {
    // 同步外部传入的值
    selectedValue.value = val

    // 只在有全选功能时处理
    if (!props.hasCheckAll) return

    const total = props.options.length
    const checkedCount = Array.isArray(val) ? val.length : 0

    indeterminate.value = checkedCount > 0 && checkedCount < total
    checkAll.value = checkedCount === total
  },
  { immediate: true },
)

const handleCheckAll = (val: CheckboxValueType) => {
  indeterminate.value = false
  if (val) {
    if (props.valueIsObject) {
      selectedValue.value = props.options.slice()
    } else {
      selectedValue.value = props.options.map(item => item[props.valueKey])
    }
  } else {
    selectedValue.value = []
  }

  emits('change', selectedValue.value)
  emits('update:modelValue', selectedValue.value)
}

const handleSelectChange = (value: any) => {
  emits('change', value)
  emits('update:modelValue', value)
}

const handlesSelectInput = (e: any) => {
  emits('select-input', e.target.value)
}

const renderLabel = (item: any) => {
  if (typeof props.prefix === 'boolean' && props.prefix) {
    return `${item[props.valueKey] || ''}.${item[props.labelKey] || ''}`
  }
  if (typeof props.prefix === 'function') {
    return `${props.prefix(item)}${item[props.labelKey] || ''}`
  }
  if (typeof props.prefix === 'string') {
    return `${props.prefix}${item[props.labelKey] || ''}`
  }
  return item[props.labelKey]
}

defineExpose({
  superSelectRef,
})
</script>
