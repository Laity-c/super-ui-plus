<template>
  <div>
    <SuperProTable ref="proTable" :columns="columns" :data="data">
      <template #usernameHeader="scope">
        <el-button type="primary" @click="ElMessage.success('我是通过作用域插槽渲染的表头')">
          {{ scope.column.label }}
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
    username: '无名的人'
  },
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
    username: '无名的人'
  },
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
    username: '无名的人'
  },
])

// 自定义渲染表头（使用tsx语法）
const headerRender = (scope: any) => {
  return (
    <ElButton type="primary" onClick={() => ElMessage.success('我是通过 tsx 语法渲染的表头')}>
      {scope.column.label}
    </ElButton>
  )
}

const columns = reactive<ColumnProps<any>[]>([
  { prop: 'date', label: '日期', headerRender, width: 200 },
  { prop: 'name', label: '姓名', width: 200 },
  { prop: 'address', label: '居住地址' },
  { prop: 'username', label: '用户名' },
])
</script>
