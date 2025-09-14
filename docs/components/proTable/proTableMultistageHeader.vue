<template>
  <div>
    <SuperProTable ref="proTable" :columns="columns" :data="data"></SuperProTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { ColumnProps } from '@super-ui-plus/types'

const data = reactive<any[]>([
  {
    date: Date.now(),
    name: '张三',
    province: "湖北省",
    city: "武汉市",
    area: "汉阳区",
  },
  {
    date: Date.now(),
    name: '张三',
    province: "湖北省",
    city: "武汉市",
    area: "汉阳区",
  },
  {
    date: Date.now(),
    name: '张三',
    province: "湖北省",
    city: "武汉市",
    area: "汉阳区",
  },
])

const columns = reactive<ColumnProps<any>[]>([
  { prop: 'date', label: '日期' },
  {
    prop: 'base',
    label: '配送信息',
    _children: [
      { prop: 'name', label: '姓名' },
      {
        prop: 'address',
        label: '地址',
        _children: [
          { prop: 'province', label: '省份' },
          { prop: 'city', label: '市区' },
          { prop: 'area', label: '具体地址' },
        ],
      },
    ],
  },
])
</script>
