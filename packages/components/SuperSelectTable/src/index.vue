<template>
  <el-select
    ref="select"
    :model-value="selectTableLabel"
    popper-class="super-select-table"
    :style="{ width: selectWidth ? selectWidth : '100%' }"
    :value-key="valueKey"
    v-bind="{ clearable: true, multiple, ...$attrs }"
    @visible-change="visibleChange"
    @remove-tag="removeTag"
    @clear="selectClear"
    @keyup="selectKeyup"
  >
    <!-- 自定义已选内容显示 -->
    <template #label>
      <span>{{ props.modelValue ? props.modelValue[props.labelKey] : '' }}</span>
    </template>

    <template #tag>
      <template v-if="multiple">
        <el-tag
          v-for="item in props.modelValue"
          :key="item[props.valueKey]"
          closable
          type="info"
          @close="removeTag(item)"
          style="margin-right: 4px"
        >
          {{ item[props.labelKey] }}
        </el-tag>
      </template>
    </template>

    <template #empty>
      <div :style="{ width: tableWidth ? tableWidth : '100%' }">
        <SuperProTable
          v-if="visible"
          ref="superProTable"
          :height="height"
          :highlight-current-row="!isRadio || !multiple"
          :columns="columnsList"
          :data="data ?? undefined"
          :toolButton="['refresh']"
          :pagination="pagination"
          :requestApi="requestApi"
          :dataCallback="dataCallback"
          :initParam="initParam"
          :showSearch="showSearch"
          :field="field"
          :layout="layout"
          @rowClick="handleRowClick"
          @selectionChange="selectionChange"
          @pageableDataChange="pageableDataChange"
        ></SuperProTable>
      </div>
    </template>
  </el-select>
</template>

<script name="SuperSelectTable" lang="tsx" setup>
import { ref, useTemplateRef, watch, computed, nextTick } from 'vue'
import type { SuperSelectTableProps } from './type'

import SuperProTable from '../../../components/ProTable/src/index.vue'

defineOptions({
  name: 'SuperSelectTable',
})

const props = withDefaults(defineProps<SuperSelectTableProps>(), {
  labelKey: 'label',
  valueKey: 'id',
  isRadio: false,
  pagination: true,
  layout: 'total, prev, pager, next',
  selectWidth: '550px',
  tableWidth: '550px',
})

const emits = defineEmits<{
  (event: 'update:modelValue', value: any): void
  (event: 'change', value: any, lable: any, item?: any, valuekeys?: any): void
}>()

interface SelectItem {
  [key: string]: any
}

const selectTableLabel = ref<any>(props.modelValue)

const superProTableRef = useTemplateRef('superProTable')
const selectRef = useTemplateRef('select')

const visible = ref(false)
const isSettingSelection = ref(false)

// 设置表格数据勾选
const setTableDataSelection = () => {
  if (props.modelValue) {
    isSettingSelection.value = true // 开始设置选中
    nextTick(() => {
      const tableData = superProTableRef?.value?.element?.data

      if (props.isRadio) {
        // 单选按钮
        superProTableRef.value?.handleSetRadio(props.modelValue[props.valueKey])
      } else if (props.multiple) {
        // 多选按钮
        props.modelValue.forEach((item: SelectItem) => {
          const row = tableData?.find(row => row[props.valueKey] === item[props.valueKey])
          if (row) superProTableRef?.value?.element?.toggleRowSelection(row, true)
        })
      } else {
        // 选中当前行
        const row = tableData?.find(
          item => item[props.valueKey] === props.modelValue[props.valueKey],
        )
        superProTableRef?.value?.element?.setCurrentRow(row)
      }
      isSettingSelection.value = false
    })
  }
}

// 下拉框显示时触发
const visibleChange = (value: boolean) => {
  visible.value = value

  if (value) {
    setTableDataSelection()
    if (props.isRadio) {
      nextTick(() => {
        currentRowIndex.value = 0
        focusTableRow(0) // 高亮第一条
      })
    }
  }
}

// 移除标签时触发
const removeTag = (tag: any) => {
  selectTableLabel.value.splice(selectTableLabel.value.indexOf(tag), 1)
  const newValue = props.modelValue.filter(
    (item: any) => item[props.valueKey] !== tag[props.valueKey],
  )
  emits('update:modelValue', newValue)
}

// 清空时触发
const selectClear = () => {
  selectTableLabel.value = ''
  emits('update:modelValue', props.multiple ? [] : null)
  emits('change', null, null)
}

// columns 处理
const columnsList = computed(() => {
  const cols = props.columns ? [...props.columns] : []

  if (props.isRadio) {
    if (!cols.find((item: any) => item.type === 'radio')) {
      cols.unshift({ type: 'radio', label: '单选', width: 80 })
    }
  } else if (props.multiple) {
    if (!cols.find((item: any) => item.type === 'selection')) {
      cols.unshift({ type: 'selection', label: '多选', width: 80 })
    }
  }
  return cols
})

// 回显数据处理
watch(
  () => props.modelValue,
  val => {
    if (val) {
      selectTableLabel.value = val
    }
  },
  { immediate: true },
)

watch(
  () => superProTableRef?.value?.element?.data,
  val => {
    if (val?.length) {
      setTableDataSelection()
    }
  },
  { immediate: true },
)

// 多选时触发
const selectionChange = (value: SelectItem[]) => {
  if (isSettingSelection.value) return // 正在设置选中

  const values = value?.map((item: SelectItem) => item[props.valueKey])
  const names = value?.map((item: SelectItem) => item[props.valueKey])

  selectTableLabel.value = value?.map((item: SelectItem) => item[props.labelKey])

  const result = value?.map((item: SelectItem) => {
    return {
      [props.valueKey]: item[props.valueKey],
      [props.labelKey]: item[props.labelKey],
    }
  })

  emits('update:modelValue', result)
  emits('change', values, names, value, result)
}

// 单选时触发
const handleRowClick = (row: any) => {
  if (props.multiple) return

  selectTableLabel.value = row[props.labelKey]

  const result = {
    [props.valueKey]: row[props.valueKey],
    [props.labelKey]: row[props.labelKey],
  }
  emits('update:modelValue', result)
  emits('change', row[props.valueKey], row[props.labelKey], row, result)

  selectRef.value?.blur() // 关闭下拉框
}

// 分页时触发
const pageableDataChange = () => {
  setTableDataSelection()
}

// 单选键盘事件
const currentRowIndex = ref(0)
const focusTableRow = (index: number) => {
  const tableData = superProTableRef.value?.element?.data || []
  if (tableData.length === 0) return
  currentRowIndex.value = (index + tableData.length) % tableData.length
  const row = tableData[currentRowIndex.value]

  superProTableRef.value?.element?.setCurrentRow(row)
}

const selectKeyup = (e: KeyboardEvent) => {
  if (!props.isRadio || !visible.value || !props.isKeyup) return
  const tableData = superProTableRef.value?.element?.data || []
  if (tableData.length === 0) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    focusTableRow(currentRowIndex.value + 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    focusTableRow(currentRowIndex.value - 1)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const row = tableData[currentRowIndex.value]
    if (row) {
      handleRowClick(row)
      superProTableRef.value?.handleSetRadio(row[props.valueKey])
    }
  }
}
</script>
