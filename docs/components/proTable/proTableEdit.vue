<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="双击编辑">
        设置ifDblclick属性开启双击编辑功能
        <SuperProTable
          ref="proTable"
          :columns="columns"
          :data="data"
          :ifDblclick="true"
        ></SuperProTable>
      </el-tab-pane>
      <el-tab-pane label="行编辑">
        需要为每行数据内添加_edit属性，值为true时为可编辑行
        <SuperProTable ref="proTable" :columns="columns2" :data="data2">
          <template #operation="scope">
            <el-button type="primary" link @click="() => scope.row._edit = true">编辑</el-button>
            <el-button type="primary" link @click="() => scope.row._edit = false">完成</el-button>
          </template>
        </SuperProTable>
      </el-tab-pane>
      <el-tab-pane label="列编辑">
        为需要编辑的列添加 edit 属性，并设置为 true，即可开启编辑功能
        <SuperProTable ref="proTable" :columns="columns3" :data="data"></SuperProTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
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
  { prop: 'name', label: '姓名(可编辑)', el: 'ElInput', isEdit: true },
  { prop: 'address', label: '居住地址' },
])

const data2 = reactive<any[]>([
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
    _edit: false,
  },
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
    _edit: false,
  },
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
    _edit: false,
  },
])

const columns2 = reactive<ColumnProps<any>[]>([
  { prop: '$index', label: '序号', width: 80 },
  { prop: 'date', label: '日期', width: 200, el: 'ElInput', isEdit: true },
  { prop: 'name', label: '姓名', el: 'ElInput', isEdit: true },
  { prop: 'address', label: '居住地址', el: 'ElInput', isEdit: true },
  { prop: 'operation', label: '操作', fixed: 'right' },
])

const columns3 = reactive<ColumnProps<any>[]>([
  { prop: '$index', label: '序号', width: 80 },
  { prop: 'date', label: '日期', width: 200 },
  { prop: 'name', label: '姓名', el: 'ElInput', isEdit: true, edit: true },
  { prop: 'address', label: '居住地址' },
])
</script>
