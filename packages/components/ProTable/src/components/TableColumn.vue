<template>
  <RenderTableColumn v-bind="column" />
</template>

<script setup lang="tsx" name="TableColumn">
import { useSlots } from 'vue'
import type { ColumnProps, RenderScope, HeaderRenderScope } from '../../../../types/proTable'
import type { Pageable } from './Pagination.vue'
import { formatValue, isFunction, setRules } from '../../../../utils'
import SearchFormItem from '../../../FormGrid/components/SearchFormItem.vue'
const props = defineProps<{
  column: ColumnProps
  currentRowIndex?: number
  currentColumnIndex?: number
  ifDblclick?: boolean
  isValidate?: boolean // 是否开启数据验证
  pageable?: Pageable // 分页信息
}>()

const slots = useSlots()

// 渲染表格数据
const renderCellData = (item: ColumnProps, scope: RenderScope<any>) => {
  // 索引列
  if (item.prop === '$index') {
    const pageSize = props.pageable?.pageSize ?? 0
    const pageNum = props.pageable?.pageNum ?? 1
    return (pageNum - 1) * pageSize + scope.$index + 1
  }

  return formatValue(scope.row[item.prop!], item.format)
}

// 获取表单验证规则
const getRules = (rules: any = [], item: any) => {
  if (item.valueType && item.required) {
    const requiredRules = { required: true, message: `${item.label}必填` }
    return setRules(item.valueType, rules ? [requiredRules, ...rules] : [requiredRules], item.label)
  } else if (item.required) {
    return setRules('required', rules, item.label)
  } else if (item.valueType) {
    return setRules(item.valueType, rules, item.label)
  }

  return [...rules, { index: 1 }]
}

const RenderTableColumn = (item: ColumnProps) => {
  return (
    <>
      {item.isShow && (
        <el-table-column
          {...item}
          align={item.align ?? 'center'}
          showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== 'operation'}
        >
          {{
            default: (scope: RenderScope<any>) => {
              // 单元格编辑逻辑
              // 获取当前单元格的行和列索引
              const rowIndex = scope.$index
              const columnIndex = scope.cellIndex
              // 1. 开启双击编辑
              const deClickEdit =
                (props.isValidate && item.isEdit && scope.row._edit) ||
                (props.ifDblclick &&
                  scope.row._edit &&
                  rowIndex === props.currentRowIndex &&
                  columnIndex === props.currentColumnIndex)
              // 2. 开启整行编辑
              const rowEdit = !props.ifDblclick && item.isEdit && scope.row._edit
              // 3. 开启整列编辑（只有设置了编辑状态的列才会被编辑）
              const columnEdit = !props.ifDblclick && item.isEdit && item.edit

              if (deClickEdit || rowEdit || columnEdit) {
                const field: any = { ...item, name: item.prop ?? 'defaultName' }
                return (
                  <el-form-item
                    {...item.formItemProps}
                    prop={`${scope.$index}.${scope.column.property}`}
                    rules={getRules(item.formItemProps?.rules, item)}
                  >
                    <SearchFormItem field={field} model={scope.row}></SearchFormItem>
                  </el-form-item>
                )
              }

              // 多级表头内容渲染
              if (item._children) return item._children.map(child => RenderTableColumn(child))
              if (item.render) return item.render(scope)
              if (item.prop && slots[item.prop]) return slots[item.prop]!(scope)
              if (isFunction(item.tag)) {
                const _props = item.tag!(scope)
                return <el-tag {..._props}>{renderCellData(item, scope)}</el-tag>
              }
              return renderCellData(item, scope)
            },
            header: (scope: HeaderRenderScope<any>) => {
              if (item.headerRender) return item.headerRender(scope)
              if (item.prop && slots[`${item.prop}Header`])
                return slots[`${item.prop}Header`]!(scope)
              return item.label
            },
          }}
        </el-table-column>
      )}
    </>
  )
}
</script>
