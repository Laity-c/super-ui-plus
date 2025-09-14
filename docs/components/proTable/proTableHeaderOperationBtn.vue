<template>
  <div>
    <SuperProTable ref="proTable" :columns="columns" :data="data" :toolButton="['setting']">
      <template #tableHeader>
        <el-button type="primary" plain >导出用户数据</el-button>
        <el-button type="primary" plain>To 子集详情页面</el-button>
        <el-button type="danger" plain>批量删除用户</el-button>
      </template>
    </SuperProTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElButton } from 'element-plus'
import type { ColumnProps } from '@super-ui-plus/types'

const data = reactive<any[]>([
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
  },
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
  },
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
  },
])

const columns = reactive<ColumnProps<any>[]>([
  { prop: '$index', label: '序号', width: 80 },
  { prop: 'date', label: '日期', width: 200 },
  { prop: 'name', label: '姓名', width: 200 },
  { prop: 'address', label: '居住地址' },
])
</script>
