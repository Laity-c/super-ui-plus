<template>
  <div>
    <SuperProTable
      ref="proTable"
      :columns="columns"
      :data="data"
    ></SuperProTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { ColumnProps } from '@super-ui-plus/types'

const data = reactive<any[]>([
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
    tag: 0
  },
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
    tag: 1
  },
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
    tag: 2
  },
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
    tag: 3
  },
])

const columns = reactive<ColumnProps<any>[]>([
  { prop: 'date', label: '日期', width: 200 },
  { prop: 'name', label: '姓名', width: 200 },
  { prop: 'address', label: '居住地址' },
  {
    prop: 'tag',
    label: '标签',
    tag: ({ row }) => {
      switch (row.tag) {
        case 0:
          return { type: 'success' }
        case 1:
          return { type: 'info' }
        case 2:
          return { type: 'warning' }
        case 3:
          return { type: 'danger' }
        default:
          break
      }
    },
  },
])
</script>
