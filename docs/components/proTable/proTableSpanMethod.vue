<template>
  <div>
    <SuperProTable
      ref="proTable"
      :columns="columns"
      :data="data"
      :span-method="objectSpanMethod"
    ></SuperProTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { ColumnProps } from '@super-ui-plus/types'
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
const data = reactive<any[]>([])

Array.from({ length: 50 }).forEach(() => {
  data.push({
    date: Date.now(),
    name: '王小虎',
    address: '上海市普陀区',
    address2: '金沙江路 1518 弄'
  })
})

const columns = reactive<ColumnProps<any>[]>([
  { prop: '$index', label: '序号', width: 80 },
  { prop: 'date', label: '日期', width: 200 },
  { prop: 'name', label: '姓名', width: 200 },
  { prop: 'address', label: '居住地址' },
  { prop: 'address2', label: '具体地址' },
])

// 列合并
interface SpanMethodProps {
  row: any;
  column: TableColumnCtx<any>;
  rowIndex: number;
  columnIndex: number;
}
const objectSpanMethod = ({ rowIndex, columnIndex }: SpanMethodProps) => {
  // 行合并
  if (rowIndex % 2 === 0) {
    if (columnIndex === 3) { // 合并第 3 列和第 4 列
      return [1, 2]
    } else if (columnIndex === 4) { // 被合并的列需要返回0
      return [0, 0]
    }
  }
  
  // 列合并
  if (columnIndex === 2) {
    if (rowIndex % 2 === 0) return { rowspan: 2, colspan: 1 };
    else return { rowspan: 0, colspan: 0 };
  }
};
</script>
