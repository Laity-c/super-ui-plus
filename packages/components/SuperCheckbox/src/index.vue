<template>
  <div :class="[prefixCls]">
    <!-- 全选功能 -->
    <component
      v-if="hasCheckAll"
      :class="[`${prefixCls}-check-all`]"
      :is="checkboxType"
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      :border="border"
      :disabled="disabled"
      @update:modelValue="handleCheckAllChange"
    >
      全选
    </component>
    <!-- 复选框组 -->
    <el-checkbox-group
      v-bind="$attrs"
      :model-value="checkboxValue"
      :size="size"
      @change="handleGroupChange"
    >
      <slot>
        <component
          v-for="(item, index) in optionsList"
          v-bind="item"
          ref="checkboxs"
          :is="checkboxType"
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
    </el-checkbox-group>
  </div>
</template>

<script name="SuperCheckbox" lang="tsx" setup>
import { computed, ref, watch } from 'vue'
import { include, exclude, getPrefixCls } from '../../../utils'
import type { SuperCheckboxProps } from './type'

/**
 * 组件选项定义
 */
defineOptions({
  name: 'SuperCheckbox',
})

/**
 * 组件属性定义及默认值
 */
const props = withDefaults(defineProps<SuperCheckboxProps>(), {
  type: 'checkbox',
  size: 'default',
  border: false,
  options: () => [],
  labelKey: 'label',
  valueKey: 'value',
  prefix: false,
  hasCheckAll: false,
})

/**
 * 事件定义
 */
const emit = defineEmits(['update:modelValue', 'change'])

/**
 * 前缀类名
 */
const prefixCls = getPrefixCls('checkbox')

/**
 * 根据type属性计算应使用的checkbox组件类型
 */
const checkboxType = computed(() => {
  const obj = {
    checkbox: 'el-checkbox',
    button: 'el-checkbox-button',
  }
  return obj[props.type] ?? 'el-checkbox'
})

/**
 * 渲染label文本，支持前缀
 */
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

/**
 * 过滤options选项，支持include/exclude
 */
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

/**
 * 互斥逻辑处理
 * @param {Array} values 当前选中的值数组
 * @returns {Array} 处理后的值数组
 */
const handleExclusion = (values: any[]) => {
  if (!props.exclusion) return values

  let exclusionRules: any[] = []

  // 1. 单个值（number/string）
  if (typeof props.exclusion === 'number' || typeof props.exclusion === 'string') {
    exclusionRules = [
      {
        value: props.exclusion,
        exclusion: optionsList.value
          .filter(i => i[props.valueKey] !== props.exclusion)
          .map(i => i[props.valueKey]),
      },
    ]
  }
  // 2. 对象映射
  else if (typeof props.exclusion === 'object' && !Array.isArray(props.exclusion)) {
    exclusionRules = [props.exclusion]
  }
  // 3. 数组
  else if (Array.isArray(props.exclusion)) {
    exclusionRules = props.exclusion
  }

  // 生成互斥映射
  const exclusionMap: Record<string, string[]> = {}
  exclusionRules.forEach(rule => {
    const val = rule.value
    const exc = Array.isArray(rule.exclusion) ? rule.exclusion : [rule.exclusion]
    exclusionMap[val] = exc
    exc.forEach((e: string | number) => {
      exclusionMap[e] = exclusionMap[e] || []
      exclusionMap[e].push(val)
    })
  })

  // 处理互斥
  let result = [...values]
  for (const val of values) {
    if (exclusionMap[val]) {
      result = result.filter(v => !exclusionMap[val].includes(v) || v === val)
    }
  }

  // 保证最后点击的选项被选中
  const last = values[values.length - 1]
  if (last && !result.includes(last)) {
    result.push(last)
  }

  return result
}

/**
 * 全选相关状态
 */
const checkAll = ref(false) // 是否全选
const checkboxValue = ref<any[]>([]) // 当前选中的值
const allCheckboxValue = computed(() => optionsList.value.map(item => item[props.valueKey]))
const isIndeterminate = ref(false) // 是否半选

/**
 * 根据当前选中数量计算全选/半选状态
 */
const calcState = () => {
  const count = props.modelValue!.length
  checkAll.value = count === allCheckboxValue.value.length
  isIndeterminate.value = count > 0 && count < allCheckboxValue.value.length
}

/**
 * 监听选项数据变化，更新checkboxValue
 */
watch(
  () => props.modelValue,
  value => {
    if (value) {
      // 如果是对象数组，转换为值数组
      checkboxValue.value = Array.isArray(value)
        ? value.map(v => (typeof v === 'object' && v !== null ? v[props.valueKey] : v))
        : []
      calcState()
    } else {
      checkboxValue.value = []
    }
  },
  { immediate: true },
)

/**
 * 获取选项值，支持返回对象或原始值
 */
const getItemValue = (value: any, type?: string) => {
  const options = optionsList.value
  if (props.valueKeys || type === 'item') {
    const item = options.find(item => item[props.valueKey] === value)
    if (type === 'item') {
      return item
    }
    return {
      [props.valueKeys!.valueKey ?? props.valueKey]: item[props.valueKey],
      [props.valueKeys!.labelKey ?? props.labelKey]: item[props.labelKey],
    }
  }
  return value
}

/**
 * 全选变化事件
 */
const handleCheckAllChange = (value: boolean) => {
  let checkedValues
  if (value) {
    checkedValues = handleExclusion(allCheckboxValue.value) // 处理互斥
  } else {
    checkedValues = [] // 取消全选时直接清空
  }
  checkboxValue.value = checkedValues
  checkAll.value = value
  isIndeterminate.value = false

  const result = checkboxValue.value.map(v => getItemValue(v))
  emit('update:modelValue', result)
  emit('change', checkboxValue.value, result)
}

/**
 * 组内选中值变化事件
 */
const handleGroupChange = (values: any[]) => {
  let checkedValues = handleExclusion(values) // 处理互斥
  checkboxValue.value = checkedValues
  const result = checkedValues.map(v => getItemValue(v))
  emit('update:modelValue', result)
  emit('change', checkboxValue.value, result)
  calcState()
}
</script>
