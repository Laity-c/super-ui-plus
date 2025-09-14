<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="双击编辑">
        <SuperProTable
          ref="proTable"
          :columns="columns"
          :data="data"
          :ifDblclick="true"
        ></SuperProTable>
      </el-tab-pane>
      <el-tab-pane label="行编辑">
        <SuperProTable ref="proTable2" :columns="columns2" :data="data2">
          <template #operation="scope">
            <el-button
              v-if="!scope.row._edit"
              type="primary"
              link
              @click="() => (scope.row._edit = true)"
            >
              编辑
            </el-button>
            <el-button v-else type="primary" link @click="handleSuccess(scope)">完成</el-button>
          </template>
        </SuperProTable>
      </el-tab-pane>
      <el-tab-pane label="列编辑">
        <el-button type="primary" @click="() => (colEdit = !colEdit)">
          {{ colEdit ? '保存' : '编辑' }}
        </el-button>
        <SuperProTable ref="proTable" :columns="columns3" :data="data"></SuperProTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, useTemplateRef } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import type { ColumnProps } from '@super-ui-plus/types'

const data = reactive<any[]>([
  {
    date: Date.now(),
    name: '张三',
    number1: 10,
  },
  {
    date: Date.now(),
    name: '张三',
    number1: 10,
  },
  {
    date: Date.now(),
    name: '张三',
    number1: 10,
  },
])

const columns = reactive<ColumnProps<any>[]>([
  { prop: '$index', label: '序号', width: 80 },
  { prop: 'date', label: '日期', width: 200 },
  { prop: 'name', label: '姓名(可编辑)', el: 'ElInput', isEdit: true, required: true },
  {
    prop: 'number1',
    label: '数值(可编辑)',
    el: 'ElInput',
    isEdit: true,
    formItemProps: {
      rules: [
        {
          validator: (_rule, value, callback) => {
            if (Number(value) > 10) {
              callback()
            } else {
              callback('输入值不能小于10')
            }
          },
          trigger: 'change',
        },
      ],
    },
  },
])

const data2 = reactive<any[]>([
  {
    date: Date.now(),
    name: '张三',
    number1: 10,
    _edit: false,
  },
  {
    date: Date.now(),
    name: '张三',
    number1: 10,
    _edit: false,
  },
  {
    date: Date.now(),
    name: '张三',
    number1: 10,
    _edit: false,
  },
])

const columns2 = reactive<ColumnProps<any>[]>([
  { prop: '$index', label: '序号', width: 80 },
  { prop: 'date', label: '日期', width: 200, el: 'ElInput', isEdit: true },
  { prop: 'name', label: '姓名(可编辑)', el: 'ElInput', isEdit: true, required: true },
  {
    prop: 'number1',
    label: '数值(可编辑)',
    el: 'ElInput',
    isEdit: true,
    formItemProps: {
      rules: [
        {
          validator: (_rule, value, callback) => {
            if (Number(value) > 10) {
              callback()
            } else {
              callback('输入值不能小于10')
            }
          },
          trigger: 'change',
        },
      ],
    },
  },
  { prop: 'operation', label: '操作', fixed: 'right' },
])

const proTable2Ref = useTemplateRef('proTable2')
const handleSuccess = async (scope: any) => {
  await proTable2Ref.value.validateTableForm(scope.$index)
  scope.row._edit = false
}

const colEdit = ref<boolean>(false)
const columns3 = reactive<ColumnProps<any>[]>([
  { prop: '$index', label: '序号', width: 80 },
  { prop: 'date', label: '日期', width: 200 },
  {
    prop: 'name',
    label: '姓名(可编辑)',
    el: 'ElInput',
    isEdit: true,
    required: true,
    edit: colEdit
  },
  {
    prop: 'number1',
    label: '数值(可编辑)',
    el: 'ElInput',
    isEdit: true,
    edit: colEdit,
    formItemProps: {
      rules: [
        {
          validator: (_rule, value, callback) => {
            if (Number(value) > 10) {
              callback()
            } else {
              callback('输入值不能小于10')
            }
          },
          trigger: 'change',
        },
      ],
    },
  },
])
</script>
