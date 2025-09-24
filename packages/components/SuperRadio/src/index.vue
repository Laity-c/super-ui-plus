<template>
  <el-radio-group v-bind="$attrs" :size="size">
    <slot>
      <component
        v-for="(item, index) in optionsList"
        v-bind="item"
        :is="radioType"
        :key="index"
        :value="item[valueKey]"
        :label="item[valueKey]"
        :border="border"
        :disabled="typeof disabled === 'function' ? disabled(item) : disabled"
      >
        <slot :name="item.slot" v-bind="item">
          {{ renderLabel(item) }}
        </slot>
      </component>
    </slot>
  </el-radio-group>
</template>

<script name="SuperRadio" lang="tsx" setup>
import { computed } from 'vue'
import { include, exclude } from '../../../utils'
import type { SuperRadioProps } from './type'

defineOptions({
  name: 'SuperRadio',
})

const props = withDefaults(defineProps<SuperRadioProps>(), {
  type: 'radio',
  size: 'default',
  border: false,
  options: () => [],
  labelKey: 'label',
  valueKey: 'value',
  prefix: false,
})

// 根据type属性计算出应使用的radio组件类型
const radioType = computed(() => {
  const obj = {
    radio: 'el-radio',
    button: 'el-radio-button',
  }
  return obj[props.type] ?? 'el-radio'
})

// 为label添加前缀
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

// 过滤options选项
const optionsList = computed(() => {
  let _options = props.options

  if (props.include) {
    _options = include(props.options, props.include, props.valueKey)
  }

  if (props.exclude) {
    _options = exclude(props.options, props.exclude, props.valueKey)
  }

  return _options
})
</script>
