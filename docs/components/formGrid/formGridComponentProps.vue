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
  endTime: '',
  year: '',
  month: '',
})
const field = [
  {
    label: '姓名',
    name: 'name',
    el: 'ElInput',
    componentProps: {
      disabled: true
    },
    tooltip: '这是一个提示信息',
    span: 2,
  },
  {
    label: '性别',
    name: 'sex',
    el: 'ElSelect',
    componentProps: {
      placeholder: '请选择性别',
      clearable: true,
    },
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
    componentProps: {
      placeholder: '请输入手机号',
      clearable: true,
    },
    span: 2,
  },
  {
    label: '开始时间',
    name: 'startTime',
    el: 'ElDatePicker',
    componentProps: {
      placeholder: '请选择开始时间',
      clearable: true,
    },
    span: 2,
  },
  {
    label: '结束时间',
    name: 'endTime',
    el: 'ElDatePicker',
    componentProps: {
      placeholder: '请选择结束时间',
      clearable: true,
    },
    span: 2,
  },
  {
    label: '年份选择',
    name: 'year',
    el: 'ElDatePicker',
    componentProps: {
      placeholder: '请选择年份',
      clearable: true,
      type: 'year',
    },
    span: 2,
  },
  {
    label: '月份选择',
    name: 'month',
    el: 'ElDatePicker',
    componentProps: {
      placeholder: '请选择月份',
      clearable: true,
      type: 'month',
    },
    span: 2,
  },
]
</script>
