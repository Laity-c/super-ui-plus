<script lang="tsx">
// 注意：这里不再有 `setup` 关键字，但保留 `lang="tsx"` 仍然可以写 TSX
import { defineComponent, h, Fragment, type PropType, ref } from 'vue' // 导入 defineComponent, h, Fragment

// 假设 Element Plus 组件需要显式导入
// 根据您的实际情况调整这些导入，如果按需导入插件处理了，则可能不需要
import { ElTableColumn, ElFormItem, ElTag, ElPopover, ElButton } from 'element-plus'
// import { DocumentCopy, Check } from '@element-plus/icons-vue'
// import { useClipboard } from '@vueuse/core'

import { formatValue, isFunction, setRules, handleDict } from '../../../../utils'
import SearchFormItem from '../../../FormGrid/components/SearchFormItem.vue'
import type { ColumnProps, RenderScope, HeaderRenderScope } from '../../../../types/proTable'

// const { copy, isSupported } = useClipboard()

// --- 辅助函数：这些函数在组件内部或外部定义都可以 ---

// 渲染表格数据
const renderCellData = (item: ColumnProps, scope: RenderScope<any>) => {
  // 索引列
  if (item.prop === '$index') {
    // 从父组件传递的 pageable 获取分页信息
    const pageSize = scope.props.pageable?.pageSize ?? 0
    const pageNum = scope.props.pageable?.pageNum ?? 1
    return (pageNum - 1) * pageSize + scope.$index + 1
  }

  let value = scope.row[item.prop!]

  // 处理枚举值
  if (item.enum!) {
    value = handleDict(item.enum, scope.row[item.prop!])
  }

  // 显示复制按钮(因为el-table有too-tip功能，复制按钮无法添加到后面，放弃该功能，使用单击复制实现)
  // isSupported判断当前环境是否支持clipboard
  // if (item.copyable && isSupported.value) {
  //   const isClipboard = ref(false)
  //   const timeoutId = ref<any>(null)

  //   return h(Fragment, null, [
  //     h('span', null, formatValue(value, item.format)),
  //     h(
  //       ElPopover,
  //       { placement: 'top', effect: 'dark', content: '复制', width: '50px' },
  //       {
  //         reference: () =>
  //           h(ElButton, {
  //             class: 'copyable',
  //             type: 'text',
  //             icon: isClipboard.value ? Check : DocumentCopy,
  //             onClick: () => {
  //               isClipboard.value = true
  //               copy(formatValue(value, item.format))
  //               if (timeoutId.value) {
  //                 clearTimeout(timeoutId.value)
  //               }

  //               timeoutId.value = setTimeout(() => {
  //                 isClipboard.value = false
  //               }, 2000)
  //             },
  //           }),
  //       },
  //     ),
  //   ])
  // }

  // 以上为保留代码

  return formatValue(value, item.format)
}

// 获取表单验证规则
const getRules = (rules: any = [], item: any = {}) => {
  if (item.valueType && item.required) {
    const requiredRules = { required: true, message: `${item.label}必填` }
    return setRules(item.valueType, rules ? [requiredRules, ...rules] : [requiredRules], item.label)
  } else if (item.required) {
    return setRules('required', rules, item.label)
  } else if (item.valueType) {
    return setRules(item.valueType, rules, item.label)
  }
  return [...rules]
}

// --- 定义主组件 ---
export default defineComponent({
  name: 'TableColumn', // 组件名称
  // 显式声明所有 props，这些将从父组件传递进来
  props: {
    column: {
      type: Object as PropType<ColumnProps>,
      required: true,
    },
    // 将 TableColumnProps 中的所有属性都声明为 prop
    isValidate: {
      type: Boolean,
      default: false,
    },
    ifDblclick: {
      type: Boolean,
      default: false,
    },
    currentRowIndex: {
      type: Number,
      default: -1,
    },
    currentColumnIndex: {
      type: Number,
      default: -1,
    },
    pageable: {
      type: Object as PropType<{ pageSize?: number; pageNum?: number }>,
      default: () => ({}),
    },
    align: {
      type: String,
      default: 'center',
    },
    // 如果 TableColumnProps 中还有其他属性，也请在这里添加
  },
  setup(props, { slots }) {
    // setup 函数接收 props 和 slots

    // 内部辅助渲染函数，现在完全使用 h 函数
    // 这个函数需要能够访问到 setup 的 `props` 和 `slots`
    const renderRecursiveTableColumn = (item: ColumnProps) => {
      return h(Fragment, null, [
        item.isShow &&
          h(
            ElTableColumn,
            {
              ...item,
              align: item.align ?? props.align,
              showOverflowTooltip: item.showOverflowTooltip ?? item.prop !== 'operation',
            },
            {
              // default slot
              default: (scope: RenderScope<any>) => {
                // 单元格编辑逻辑
                const rowIndex = scope.$index
                const columnIndex = scope.cellIndex

                const deClickEdit =
                  (props.isValidate && item.isEdit && scope.row._edit) ||
                  (props.ifDblclick &&
                    scope.row._edit &&
                    rowIndex === props.currentRowIndex &&
                    columnIndex === props.currentColumnIndex)
                const rowEdit = !props.ifDblclick && item.isEdit && scope.row._edit
                const columnEdit = !props.ifDblclick && item.isEdit && item.edit

                if (deClickEdit || rowEdit || columnEdit) {
                  const field: any = { ...item, name: item.prop ?? 'defaultName' }
                  return h(
                    ElFormItem,
                    {
                      ...item.formItemProps,
                      prop: `${scope.$index}.${scope.column.property}`,
                      rules: getRules(item.formItemProps?.rules, item), // getRules is a local helper
                    },
                    () => h(SearchFormItem, { field: field, model: scope.row }),
                  )
                }

                // 多级表头内容渲染
                // 注意：这里递归调用 renderRecursiveTableColumn
                if (item._children)
                  return item._children.map(child => renderRecursiveTableColumn(child))
                if (item.render) return item.render(scope)
                if (item.prop && slots[item.prop]) return slots[item.prop]!(scope)
                if (isFunction(item.tag)) {
                  const _props = item.tag!(scope)
                  return h(ElTag, { ..._props }, () => renderCellData(item, { ...scope, props }))
                }
                return renderCellData(item, { ...scope, props })
              },
              // header slot
              header: (scope: HeaderRenderScope<any>) => {
                if (item.headerRender) return item.headerRender(scope)
                if (item.prop && slots[`${item.prop}Header`])
                  return slots[`${item.prop}Header`]!(scope)
                return item.label
              },
            },
          ),
      ])
    }

    // setup 函数返回组件的渲染函数
    return () => {
      // 检查 props.column 是否存在，确保传入了必需的 prop
      if (!props.column) {
        console.warn("TableColumn component expects a 'column' prop.")
        return null
      }
      return renderRecursiveTableColumn(props.column)
    }
  },
})
</script>

<style scoped lang="scss">
.copyable {
  margin-left: 6px;
}
</style>
