<template>
  <div :style="style">
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="SuperGrid">
import {
  ref,
  watch,
  useSlots,
  computed,
  provide,
  onBeforeMount,
  onMounted,
  onUnmounted,
  onDeactivated,
  onActivated,
  type VNodeArrayChildren,
  type VNode,
} from 'vue'
import type { BreakPoint } from '../../../types/grid'

defineOptions({
  name: 'SuperGrid',
})

type Props = {
  cols?: number | Record<BreakPoint, number>
  collapsed?: boolean
  collapsedRows?: number
  gap?: [number, number] | number
}

const props = withDefaults(defineProps<Props>(), {
  cols: () => ({ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }),
  collapsed: false,
  collapsedRows: 1,
  gap: 0,
})

onBeforeMount(() => props.collapsed && findIndex())
onMounted(() => {
  resize({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent)
  window.addEventListener('resize', resize)
})
onActivated(() => {
  resize({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent)
  window.addEventListener('resize', resize)
})
onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
onDeactivated(() => {
  window.removeEventListener('resize', resize)
})

// 监听屏幕变化
const resize = (e: UIEvent) => {
  const width = (e.target as Window).innerWidth
  switch (!!width) {
    case width < 768:
      breakPoint.value = 'xs'
      break
    case width >= 768 && width < 992:
      breakPoint.value = 'sm'
      break
    case width >= 992 && width < 1200:
      breakPoint.value = 'md'
      break
    case width >= 1200 && width < 1920:
      breakPoint.value = 'lg'
      break
    case width >= 1920:
      breakPoint.value = 'xl'
      break
  }
}

// 注入 gap 间距
provide('gap', Array.isArray(props.gap) ? props.gap[0] : props.gap)

// 注入响应式断点
const breakPoint = ref<BreakPoint>('xl')
provide('breakPoint', breakPoint)

// 注入要开始折叠的 index
const hiddenIndex = ref(-1)
provide('shouldHiddenIndex', hiddenIndex)

// 注入 cols
const gridCols = computed(() => {
  if (typeof props.cols === 'object') return props.cols[breakPoint.value] ?? props.cols
  return props.cols
})
provide('cols', gridCols)

// 寻找需要开始折叠的字段 index
const slots = useSlots().default!()

/**
 * 响应式与折叠功能
 *
 * 解决方案一：（目前使用该方案）
 *  通过 Grid 组件提供的 breakPoint 响应式变量来感知当前屏幕断点，并据此计算布局。
 *  折叠逻辑：
 *    showCollapse 计算属性是实现折叠功能的关键。它遍历所有 field 项，累加它们在当前断点下的实际占用列数（span + offset），
 *    并与 searchCol 在该断点下的值进行比较。一旦总列数超过设定值，showCollapse 就会返回 true，从而在 UI 上显示“展开/合并”按钮。
 *
 * 解决方案二：
 *  通过直接在FormGrid中添加一个collapsible控制人为的传入是否需要开启收起/展开按钮
 *  然后再设置一个retentionCount属性来控制显示的个数，我们直接对传入的find对象做切割处理，这样页面上就只会显示指定个数的元素了
 *  代码：if (this.collapsible && this.retentionCount) {
        fields = fields.slice(0, this.retentionCount);
      }
 */

/**
 * 查找需要隐藏的元素索引，用于在折叠行中确定从哪个元素开始隐藏。
 * 该函数会遍历插槽中的内容，识别出 suffix 元素和普通子元素，
 * 并根据断点、列数、偏移等信息计算每个元素所占的列宽，
 * 最终确定在指定折叠行数内可以容纳的元素数量，超出部分将被隐藏。
 *
 * @returns {void} 无返回值，结果存储在 hiddenIndex 响应式变量中
 */
const findIndex = () => {
  // 存储所有可遍历的子节点
  const fields: VNodeArrayChildren = []
  // 存储 suffix 类型的节点（用于展示在末尾的特殊项）
  let suffix: VNode | null = null

  // 遍历所有插槽内容，识别 suffix 节点及普通子节点
  slots.forEach((slot: any) => {
    // 判断是否为 suffix 节点：组件名为 SuperGridItem 且具有 suffix 属性
    if (
      typeof slot.type === 'object' &&
      slot.type.name === 'SuperGridItem' &&
      slot.props?.suffix !== undefined
    )
      suffix = slot

    // 如果是 fragment 类型的 slot，则将其子节点加入 fields
    if (typeof slot.type === 'symbol' && Array.isArray(slot.children)) fields.push(...slot.children)
  })

  // 计算 suffix 节点所占用的列数（包括 span 和 offset）
  let suffixCols = 0
  if (suffix) {
    suffixCols =
      ((suffix as VNode).props![breakPoint.value]?.span ?? (suffix as VNode).props?.span ?? 1) +
      ((suffix as VNode).props![breakPoint.value]?.offset ?? (suffix as VNode).props?.offset ?? 0)
  }

  try {
    let find = false
    // fields.reduce((prev, current, index) => {
    //   prev +=
    //     ((current as VNode)!.props![breakPoint.value]?.span ??
    //       (current as VNode)!.props?.span ??
    //       1) +
    //     ((current as VNode)!.props![breakPoint.value]?.offset ??
    //       (current as VNode)!.props?.offset ??
    //       0)
    //   if (Number(prev) > props.collapsedRows * gridCols.value - suffixCols) {
    //     hiddenIndex.value = index
    //     find = true
    //     throw new Error('find it')
    //   }
    //   return prev
    // }, 0)

    let prev = 0

    // 使用 for 循环遍历 fields，计算每个节点所占列数之和
    // 当总列数超过允许的最大列数（折叠行数 * 每行列数 - suffix占用列数）时，记录当前索引并跳出循环

    for (let index = 0; index < fields.length; index++) {
      const current = fields[index]
      prev +=
        ((current as VNode)!.props![breakPoint.value]?.span ??
          (current as VNode)!.props?.span ??
          1) +
        ((current as VNode)!.props![breakPoint.value]?.offset ??
          (current as VNode)!.props?.offset ??
          0)

      if (Number(prev) > props.collapsedRows * gridCols.value - suffixCols) {
        hiddenIndex.value = index
        find = true
        break // 找到后直接跳出循环
      }
    }

    // 如果未找到超出范围的节点，则设置为 -1 表示无需隐藏
    if (!find) hiddenIndex.value = -1
  } catch (e) {
    console.warn(e)
  }
}

// 断点变化时 执行 findIndex
watch(
  () => breakPoint.value,
  () => {
    if (props.collapsed) findIndex()
  },
)

// 监听 collapsed
watch(
  () => props.collapsed,
  value => {
    if (value) return findIndex()
    hiddenIndex.value = -1
  },
)

// 设置间距
const gridGap = computed(() => {
  if (typeof props.gap === 'number') return `${props.gap}px`
  if (Array.isArray(props.gap)) return `${props.gap[1]}px ${props.gap[0]}px`
  return 'unset'
})

// 设置 style
const style = computed(() => {
  return {
    display: 'grid',
    gridGap: gridGap.value,
    gridTemplateColumns: `repeat(${gridCols.value}, minmax(0, 1fr))`,
  }
})

defineExpose({ breakPoint })
</script>
