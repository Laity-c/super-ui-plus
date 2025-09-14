<template>
  <div>
    <SuperProTable ref="proTable" :columns="columns" :data="data">
      <template #operation="scope">
        <el-button type="primary" link @click="() => ElMessage.success(`row：${JSON.stringify(scope.row)}`)">
          按钮1
        </el-button>
        <el-button type="primary" link @click="() => ElMessage.success('点击按钮2成功')">
          按钮2
        </el-button>
      </template>
    </SuperProTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
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
  { prop: 'date', label: '日期' },
  { prop: 'name', label: '姓名' },
  { prop: 'address', label: '居住地址' },
  { prop: 'operation', label: '操作', fixed: 'right' },
])
</script>
