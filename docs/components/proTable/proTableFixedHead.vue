<template>
  <div>
    <SuperProTable
      ref="proTable"
      :columns="columns"
      :data="data"
      height="300px"
    ></SuperProTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { ColumnProps } from '@super-ui-plus/types'

const data = reactive<any[]>([])

Array.from({ length: 50 }).forEach((_, index) => {
  data.push({
    date: Date.now(),
    name: '张三' + index,
    address: '北京' + index,
  },)
})

const columns = reactive<ColumnProps<any>[]>([
  { prop: 'date', label: '日期', width: 200 },
  { prop: 'name', label: '姓名', width: 200 },
  { prop: 'address', label: '居住地址' },
])
</script>
