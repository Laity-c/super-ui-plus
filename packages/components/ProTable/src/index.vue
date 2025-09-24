<!-- 📚📚📚 Pro-Table 文档: https://juejin.cn/post/7166068828202336263 -->

<template>
  <!-- 查询表单 -->
  <SuperSearchForm v-show="isShowSearch" :field="field" :model="searchParam" @search="_search">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="{ ...slotData, searchParam }" />
    </template>
  </SuperSearchForm>

  <!-- 表格主体 -->
  <div :class="['card', `${prefixCls}-main`]">
    <!-- 表格头部 操作按钮 -->
    <div :class="`${prefixCls}-header`">
      <div :class="`${prefixCls}-header-button-lf`">
        <slot
          name="tableHeader"
          :selected-list="selectedList"
          :selected-list-ids="selectedListIds"
          :is-selected="isSelected"
        />
      </div>
      <div v-if="toolButton" :class="`${prefixCls}-header-button-ri`">
        <slot name="toolButton">
          <el-button
            v-if="showToolButton('refresh')"
            :icon="Refresh"
            circle
            @click="getTableList"
          />
          <el-button
            v-if="showToolButton('setting') && columns.length"
            :icon="Operation"
            circle
            @click="openColSetting"
          />
          <el-button
            v-if="showToolButton('search') && field?.length"
            :icon="Search"
            circle
            @click="isShowSearch = !isShowSearch"
          />
        </slot>
      </div>
    </div>
    <!-- 表格主体 -->
    <el-form ref="tableForm" :model="processTableData">
      <el-table
        ref="tableRef"
        v-loading="loading"
        v-bind="$attrs"
        :id="uuid"
        :data="processTableData"
        :border="border"
        :row-key="rowKey"
        :showSummary="showSummary"
        :summary-method="getSummaries"
        :height="height"
        :span-method="spanMethod"
        :highlightCurrentRow="highlightCurrentRow"
        @selection-change="selectionChange"
        @cell-dblclick="handleDoubleClick"
        @cell-click="handleClickOutside"
        @row-click="handleRowClick"
      >
        <!-- 默认插槽 -->
        <slot />
        <template v-for="(item, index) in initColumns" :key="index">
          <!-- selection || radio || index || expand || sort -->
          <el-table-column
            v-if="item.type && columnTypes.includes(item.type)"
            v-bind="item"
            :align="item.align ?? align"
            :reserve-selection="item.type == 'selection'"
          >
            <template #default="scope">
              <!-- expand -->
              <template v-if="item.type == 'expand'">
                <component :is="item.render" v-bind="scope" v-if="item.render" />
                <slot v-else :name="item.type" v-bind="scope" />
              </template>
              <!-- radio -->
              <el-radio
                v-if="item.type == 'radio'"
                v-model="radio"
                :label="scope.row[rowKey]"
                @change="handleRadioChange(scope.row)"
              >
                <i></i>
              </el-radio>
              <!-- sort -->
              <el-tag v-if="item.type == 'sort'" class="move">
                <el-icon><DCaret /></el-icon>
              </el-tag>
            </template>
          </el-table-column>
          <!-- other -->
          <TableColumn
            v-else
            :column="item"
            :currentRowIndex="currentRowIndex"
            :currentColumnIndex="currentColumnIndex"
            :ifDblclick="ifDblclick"
            :isValidate="isValidate"
            :pageable="pageable"
            :align="align"
          >
            <template v-for="slotName in Object.keys($slots)" #[slotName]="scope">
              <slot :name="slotName" v-bind="scope" />
            </template>
          </TableColumn>
        </template>
        <!-- 插入表格最后一行之后的插槽 -->
        <template #append>
          <slot name="append" />
        </template>
      </el-table>
    </el-form>
    <!-- 分页组件 -->
    <slot name="pagination">
      <Pagination
        v-if="pagination"
        :pageable="pageable"
        :layout="layout"
        :handle-size-change="handleSizeChange"
        :handle-current-change="handleCurrentChange"
      />
    </slot>
  </div>
  <!-- 列设置 -->
  <ColSetting v-if="toolButton" ref="colRef" v-model:col-setting="colSetting" />
</template>

<script setup lang="ts" name="SuperProTable">
import {
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  computed,
  reactive,
  useTemplateRef,
  nextTick,
  type VNode,
} from 'vue'
import Sortable from 'sortablejs'
import { useTable } from '../../../hooks/useTable'
import { useSelection } from '../../../hooks/useSelection'
import { getPrefixCls, generateUUID } from '../../../utils'
import { useClipboard } from '@vueuse/core'

import { ElTable, ElMessage } from 'element-plus'
import { Refresh, Operation, Search, DCaret } from '@element-plus/icons-vue'
import Pagination from './components/Pagination.vue'
import ColSetting from './components/ColSetting.vue'
import TableColumn from './components/TableColumn.vue'
import SuperSearchForm from '../../../components/SearchForm/src/index.vue'

import type { FormInstance, TableColumnCtx, TableInstance } from 'element-plus'
import type { ColumnProps, TypeProps } from '../../../types'
import type { ProTableProps, SummaryMethodProps } from './type'
defineOptions({
  name: 'SuperProTable',
})

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  requestAuto: true,
  pagination: true,
  initParam: {},
  border: true,
  toolButton: true,
  rowKey: 'id',
  sumNaNText: 'N/A',
  ifDblclick: false,
  showSearch: false,
  align: 'center',
  ifContinuousMultiple: true,
  autoScroll: true,
  layout: 'total, sizes, prev, pager, next, jumper',
})

// 定义 emit 事件
const emit = defineEmits<{
  (e: 'search'): void
  (e: 'reset'): void
  (e: 'dragSort', value: any): void
  (e: 'radioChange', row: any): void
  (e: 'rowClick', row: any): void
  (e: 'selectionChange', value: any): void
  (e: 'pageableDataChange', value: any): void
}>()

// 获取样式前缀
const prefixCls: string = getPrefixCls('table')

// table 实例
const tableRef = ref<TableInstance>()

// 生成组件唯一id
const uuid = ref<any>('id-' + generateUUID())

// column 列类型
const columnTypes: TypeProps[] = ['selection', 'radio', 'index', 'expand', 'sort']

// 是否显示搜索模块
const isShowSearch = ref<boolean>(props.showSearch)

// 控制 ToolButton 显示
const showToolButton = (key: 'refresh' | 'setting' | 'search') => {
  return Array.isArray(props.toolButton) ? props.toolButton.includes(key) : props.toolButton
}

// 单选值
const radio = ref<any>('')
// 设置单选值
const handleSetRadio = (val: any) => {
  radio.value = val
}
// 单选值改变
const handleRadioChange = (val: any) => {
  emit('radioChange', val)
}

// 表格多选 Hooks
const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(
  props.rowKey,
  emit,
)

// 表格操作 Hooks
const {
  tableData,
  pageable,
  searchParam,
  searchInitParam,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
  loading,
} = useTable(
  props.requestApi,
  props.initParam,
  props.pagination,
  props.dataCallback,
  props.requestError,
  emit,
)

// 清空选中数据列表
const clearSelection: any = () => tableRef.value!.clearSelection()

// 初始化表格数据 && 拖拽排序
onMounted(() => {
  dragSort()
  props.requestAuto && getTableList()
  props.data && (pageable.value.total = props.data.length)

  // 添加全局点击监听器
  document.addEventListener('click', handleDocumentClick)
})

// 卸载前移除监听器，避免内存泄漏
onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})

// 处理表格数据
const processTableData = computed(() => {
  if (!props.data) return tableData.value
  if (!props.pagination) return props.data
  return props.data.slice(
    (pageable.value.pageNum - 1) * pageable.value.pageSize,
    pageable.value.pageSize * pageable.value.pageNum,
  )
})

// 监听页面 initParam 改化，重新获取表格数据
watch(() => props.initParam, getTableList, { deep: true })
// 监听分页参数改变, 清空多选数据
watch(
  () => pageable.value.pageNum,
  () => {
    // 如果没有开启连续多选切换分页时，则清空多选数据
    if (!props.ifContinuousMultiple) clearSelection()
    // 分页自动滚动到首行
    if (props.autoScroll) tableRef.value!.setScrollTop(0)
  },
  { deep: true },
)

// 接收 columns 并设置为响应式
const tableColumns = reactive<ColumnProps[]>(props.columns)

// 初始化 columns 默认数据
const initColumns = computed(() => initColumnsFunc(tableColumns))

// 将列配置项保存成一个Map集合
const columnsMap = ref<Record<string, ColumnProps>>({})

// 初始化 columns 默认数据的方法
const initColumnsFunc = (columns: ColumnProps[]) => {
  columns.forEach(async col => {
    if (col._children?.length) {
      initColumnsFunc(col._children)
    }

    // column 添加默认 isShow && isSetting
    col.isShow = col.isShow ?? true
    col.isSetting = col.isSetting ?? true
    col.edit = col.edit ?? false
    // 将columns 添加到 columnsMap 中，方便我们可以快速获取到每一列的配置
    columnsMap.value[col.prop!] = col
  })
  return columns
}

// 设置 搜索表单项的默认值
Object.keys(props.initParam).forEach(key => {
  // 搜索表单的默认值
  searchParam.value[key] = props.initParam[key]
  // 保存初始值
  searchInitParam.value[key] = props.initParam[key]
})

// 列设置 ==> 需要过滤掉不需要设置的列
const colRef = ref()
const colSetting = initColumns!.value.filter(item => {
  const { type, prop, isSetting } = item
  return !columnTypes.includes(type!) && prop !== 'operation' && isSetting
})
const openColSetting = () => colRef.value.openColSetting()

// 点击搜索表单搜索按钮时触发
const _search = () => {
  search()
  emit('search')
}

// 表格拖拽排序
const dragSort = () => {
  const tbody = document.querySelector(`#${uuid.value} tbody`) as HTMLElement
  Sortable.create(tbody, {
    handle: '.move',
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      const [removedItem] = processTableData.value.splice(oldIndex!, 1)
      processTableData.value.splice(newIndex!, 0, removedItem)
      emit('dragSort', { newIndex, oldIndex })
    },
  })
}

// 获取自定义的合计计算方法
// 表尾合计行（自行根据条件计算）
const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param

  const sums: (string | VNode)[] = []
  columns.forEach((column, index) => {
    const columnConfig = columnsMap.value[column.property]

    // 将操作列设置为空
    if (column.property === 'operation') {
      sums[index] = ''
      return
    }

    // 设置第一列为合计行
    if (index === 0) {
      sums[index] = props.sumText ?? '合计'
      return
    }

    // 获取列的合计行数据
    const values = data.map(item => Number(item[column.property]))
    if (!values.every(value => Number.isNaN(value))) {
      sums[index] = `${columnConfig.sumDataPrefix ?? ''} ${values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)}`
    } else {
      sums[index] = props.sumNaNText
    }

    // 自定义合计行数据
    if (typeof columnConfig.sumFilter === 'function') {
      sums[index] = columnConfig.sumFilter(sums[index], { columns, data })
      return
    }
  })

  return sums
}

/** 编辑表格逻辑开始 */
// 记录当前点击的单元格坐标位置
const currentRowIndex = ref<any>()
const currentColumnIndex = ref<any>()

// 工具函数：获取单元格的行列索引
const getCellIndices = (row: any, cell: HTMLTableCellElement) => {
  const rowIndex = processTableData.value.indexOf(row)
  let columnIndex = -1
  if (cell?.parentNode) {
    // 绝对列序号：拿到当前行里所有 <td>，再找出 cell 的下标
    columnIndex = Array.from(cell.parentNode.children).indexOf(cell)
  }
  return { rowIndex, columnIndex }
}

// 双击单元格触发逻辑
const handleDoubleClick = (row: any, column: TableColumnCtx, cell: HTMLTableCellElement) => {
  if (!props.ifDblclick) return

  const columnConfig = columnsMap.value[column.property]
  const { rowIndex, columnIndex } = getCellIndices(row, cell)

  currentRowIndex.value = rowIndex
  currentColumnIndex.value = columnIndex

  if (columnConfig.isEdit) {
    row._edit = true
  }
}

// 点击其他单元格退出编辑状态
const { copy, isSupported } = useClipboard()
const handleClickOutside = async (
  row: any,
  _column: TableColumnCtx,
  cell: HTMLTableCellElement,
) => {
  // 添加单元复制功能
  const columnConfig = columnsMap.value[_column.property]
  // 列配置项中指定了 copyable 属性，并且当前环境支持 clipboard
  if (columnConfig.copyable && isSupported) {
    copy(row[_column.property])
    ElMessage.success('复制成功')
  }

  // 添加单元格退出编辑功能
  if (!props.ifDblclick) return
  // 当前编辑状态的行通过了所有验证才能被关闭
  await tableFormRef.value?.validate((isValid: boolean) => {
    if (isValid) {
      const { rowIndex, columnIndex } = getCellIndices(row, cell)

      if (!(currentRowIndex.value === rowIndex && currentColumnIndex.value === columnIndex)) {
        processTableData.value.forEach(row => {
          if (row._edit) {
            row._edit = false
          }
        })
        currentRowIndex.value = null
        currentColumnIndex.value = null
      }
    }
  })
}

// 处理点击表格外区域的逻辑
const handleDocumentClick = (event: MouseEvent) => {
  if (!props.ifDblclick || currentRowIndex.value === null) return

  // 获取表格元素
  const tableElement = document.querySelector(`#${uuid.value}`)

  // 如果点击的元素不在表格内，则退出编辑状态
  if (tableElement && !tableElement.contains(event.target as Node)) {
    // 退出所有行的编辑状态
    processTableData.value.forEach(row => {
      if (row._edit && !isValidate.value) {
        row._edit = false
      }
    })
    currentRowIndex.value = null
    currentColumnIndex.value = null
  }
}
/** 编辑表格逻辑结束 */

// 表格内表单验证方法
const tableFormRef = useTemplateRef<FormInstance>('tableForm')
// 调用验证方法时处于true，方法执行完为fals，防止上方的（点击表格外区域的逻辑）方法执行，不然会导致编辑表格内容处于关闭状态
const isValidate = ref<boolean>(false)

const validateTableForm = async (rowIndex?: number) => {
  return new Promise((resolve, reject) => {
    try {
      isValidate.value = true
      // 单行编辑模式
      if (rowIndex !== undefined && rowIndex >= 0) {
        const row = processTableData.value[rowIndex]
        if (!row._edit) {
          row._edit = true
        }
      } else {
        processTableData.value.forEach(row => {
          if (!row._edit) {
            row._edit = true
          }
        })
      }

      // 调用表单验证方法
      nextTick(async () => {
        await tableFormRef.value?.validate((isValid: boolean, invalidFields: any) => {
          // 验证成功，将所有单元格编辑状态关闭
          if (isValid) {
            processTableData.value.forEach(row => {
              row._edit = false
            })
            resolve(isValid)
          } else {
            // 验证失败逻辑
            // 双击单元格编辑：将第一个验证失败的单元格处于编辑状态

            if (props.ifDblclick) {
              // invalidFields 的结构：{ '行索引.列名': [Error] }
              const firstKey = Object.keys(invalidFields)[0]
              if (!firstKey) return

              // 解析出行、列
              const [rowIndex, colKey] = firstKey.split('.')
              // 获取列索引（通过列名prop查找配置中相同prop的列索引）
              const columnIndex = Object.keys(columnsMap.value).findIndex(key => key === colKey)

              // 将当前验证失败的单元格的行索引和列索引保存到下面两个属性中，不然为null时点击验证失败的单元格会关闭编辑状态（因为会进入到点击其他单元格逻辑中）
              setTimeout(() => {
                currentRowIndex.value = Number(rowIndex)
                currentColumnIndex.value = Number(columnIndex)
              })

              // 将验证失败的一整行都处于编辑状态
              processTableData.value.forEach((row, index) => {
                if (index === Number(rowIndex)) {
                  row._edit = true
                } else {
                  row._edit = false
                }
              })

              // 弹出验证失败信息
              ElMessage.error(`验证失败：第 ${+rowIndex + 1} 行，列 ${colKey}`)
            }

            // 整行编辑：将第一整行验证失败的单元格处于编辑状态
            ElMessage.error(`验证失败`)

            // 如需滚动到该单元格
            // const table = tableRef.value
            // table?.scrollToCell({
            //   rowIndex: +rowIndex,
            //   columnIndex: columns.findIndex(c => c.prop === colKey),
            // })

            reject(invalidFields)
          }
        })
      })
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        isValidate.value = false
      })

      setTimeout(() => {
        tableFormRef.value?.validate(() => {})
      }, 500)
    }
  })
}

// 点击行事件
const handleRowClick = (row: any) => {
  if (row[props.rowKey]) radio.value = row[props.rowKey]
  emit('rowClick', row)
}

// 暴露给父组件的参数和方法 (外部需要什么，都可以从这里暴露出去)
defineExpose({
  element: tableRef,
  tableData: processTableData,
  radio,
  pageable,
  searchParam,
  searchInitParam,
  isSelected,
  selectedList,
  selectedListIds,

  // 下面为 function
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
  clearSelection,
  validateTableForm,
  handleSetRadio,
})
</script>
