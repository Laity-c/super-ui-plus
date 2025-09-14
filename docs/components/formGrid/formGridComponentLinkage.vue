<template>
  <div>
    <SuperFormGrid :field="field" :model="form"></SuperFormGrid>
  </div>
</template>

<script lang="ts" setup>
import {  reactive } from 'vue'

const form = reactive({
  type: '',
  text: '',
  readio: "",
  checkbox: [],
  select: "",
  date: '',
})
const field = [
  {
    label: '值类型',
    name: 'type',
    el: 'ElSelect',
    componentProps: {
      placeholder: '请选择值类型',
      clearable: true,
    },
    options: [
      { label: '文本', value: '1' },
      { label: '单选', value: '2' },
      { label: '多选', value: '3' },
      { label: '下拉选择', value: '4' },
      { label: '日期', value: '5' },
    ],
    span: 2,
  },
  {
    label: '文本',
    name: 'text',
    el: 'ElInput',
    show: () => form.type === '1',
    span: 2,
  },
  {
    label: '单选',
    name: 'readio',
    el: 'ElRadioGroup',
    options: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' },
    ],
    show: () => form.type === '2',
    span: 2,
  },
  {
    label: '多选',
    name: 'checkbox',
    el: 'ElCheckboxGroup',
    options: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' },
    ],
    show: () => form.type === '3',
    span: 2,
  },
  {
    label: '下拉选择',
    name: 'select',
    el: 'ElSelect',
    options: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' },
    ],
    show: () => form.type === '4',
    span: 2,
  },
  {
    label: '日期',
    name: 'date',
    el: 'ElDatePicker',
    show: () => form.type === '5',
    span: 2,
  },
]
</script>
