<template>
  <div>
    <SuperFormGrid :field="field" :model="form"></SuperFormGrid>
  </div>
</template>

<script lang="ts" setup>
import {  reactive } from 'vue'

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
</script>
