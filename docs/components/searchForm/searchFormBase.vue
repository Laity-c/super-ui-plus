<template>
  <div>
    <SuperSearchForm :field="field" :model="form" @search="_search" @reset="_reset"></SuperSearchForm>
  </div>
</template>

<script lang="ts" setup>
import {  reactive } from 'vue'
import { ElMessage } from "element-plus"

const form = reactive({
  name: '',
  sex: '',
  phone: '',
  startTime: '',
  endTime: ''
})
const field = [
  {
    label: '姓名',
    name: 'name',
    el: 'ElInput',
    tooltip: '这是一个提示信息',
    span: 2,
  },
  {
    label: '性别',
    name: 'sex',
    el: 'ElSelect',
    options: [
      { label: '男', value: '1' },
      { label: '女', value: '2' },
    ],
    span: 2,
  },
  {
    label: '手机号',
    name: 'phone',
    el: 'ElInput',
    span: 2,
  },
  {
    label: '开始时间',
    name: 'startTime',
    el: 'ElDatePicker',
    span: 2,
  },
  {
    label: '结束时间',
    name: 'endTime',
    el: 'ElDatePicker',
    span: 2,
  },
]

const _search = () => {
  ElMessage.success('查询成功')
}

const _reset = () => {
  ElMessage.success('重置成功')
}
</script>
