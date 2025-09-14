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
    tag: 0,
  },
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
    tag: 0,
  },
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
    tag: 0,
  },
])

const columns = reactive<ColumnProps<any>[]>([
  { prop: '$index', label: '序号', width: 80 },
  { prop: 'date', label: '日期', format: 'year', width: 100 },
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'address', label: '居住地址', format: value => '我家住在：' + value },
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
    width: 100
  },
])
</script>
