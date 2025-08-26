<template>
  <div :class="[prefixCls, `${prefixCls}__${props.size}`, { border: props.border }]">
    <div :class="`${prefixCls}__block`"></div>
    <div :class="[`${prefixCls}-text`, { full: !props.divider }]">
      <!-- @slot 标题内容 -->
      <slot></slot>
    </div>
    <div v-if="props.divider" :class="`${prefixCls}__divider`"></div>
    <div v-if="slots.right" :class="`${prefixCls}-right`">
      <!-- @slot 右侧扩展插槽 -->
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script name="SuperHeader" lang="tsx" setup>
import { useSlots } from 'vue'
import { getPrefixCls } from '../../../utils'

defineOptions({
  name: 'SuperHeader',
})

export interface Props {
  /**
   * 是否显示分割线
   */
  divider?: boolean
  /**
   * 尺寸
   * @type "small" | "medium"
   */
  size?: 'small' | 'medium'
  /**
   * 底部边框线
   */
  border?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  divider: false,
  size: 'small',
  border: false,
})
const prefixCls = getPrefixCls('header')
const slots = useSlots()
</script>
