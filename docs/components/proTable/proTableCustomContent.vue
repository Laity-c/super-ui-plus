<template>
  <div>
    <SuperProTable ref="proTable" :columns="columns" :data="data">
      <template #name="scope">
        <el-button type="primary" link @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
          {{ scope.row.name }}
        </el-button>
      </template>
    </SuperProTable>
  </div>
</template>

<script lang="tsx" setup>
import { reactive } from 'vue'
import { ElButton, ElMessage } from 'element-plus'
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
  {
    prop: 'address',
    label: '居住地址',
    render: scope => {
      return (
        <ElButton
          type="primary"
          link
          onClick={() => ElMessage.success('我是通过 tsx 语法渲染的内容')}
        >
          {scope.row.address}
        </ElButton>
      )
    },
  },
])
</script>
