<template>
  <div>
    <SuperProTable
      ref="proTable"
      :columns="columns"
      :data="data"
      :autoScroll="true"
      height="300px"
    ></SuperProTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { ColumnProps } from '@super-ui-plus/types'

const data = reactive<any[]>([])

Array.from({ length: 50 }).forEach(() => {
  data.push({
    date: Date.now(),
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  })
})

const columns = reactive<ColumnProps<any>[]>([
  { prop: '$index', label: '序号', width: 80 },
  { prop: 'date', label: '日期', width: 200 },
  { prop: 'name', label: '姓名', width: 200 },
  { prop: 'address', label: '居住地址' },
])
</script>
