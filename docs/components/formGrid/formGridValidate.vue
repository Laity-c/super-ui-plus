<template>
  <div>
    <SuperFormGrid ref="formGrid" :field="field" :model="form">
      <template #append>
        <el-row type="flex" justify="end">
          <el-button size="small" @click="reset">重置</el-button>
          <el-button size="small" type="primary" @click="submit">提交</el-button>
        </el-row>
      </template>
      <div>提交数据: {{ form }}</div>
    </SuperFormGrid>
  </div>
</template>

<script lang="ts" setup>
import { reactive, useTemplateRef } from 'vue'
import { ElMessage } from 'element-plus'

const formGridRef = useTemplateRef('formGrid')
const form = reactive({
  name: '',
  sex: '',
  age: '',
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
    required: true,
    tooltip: '这是一个提示信息',
    span: 2,
  },
  {
    label: '性别',
    name: 'sex',
    el: 'ElSelect',
    required: true,
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
    label: '年龄',
    name: 'age',
    el: 'ElInput',
    required: true,
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
    valueType: 'phone',
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
    required: true,
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
    formItemProps: {
      rules: [{ required: true, message: '请选择结束时间', trigger: 'blur' }],
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
    required: true,
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
    required: true,
    span: 2,
  },
]

const reset = () => {
  formGridRef.value?.formRef?.resetFields()
  ElMessage.success('重置成功')
}
const submit = () => {
  formGridRef.value?.formRef?.validate(valid => {
    if (valid) {
      ElMessage.success('提交成功')
    } else {
      ElMessage.error('请填写必填项')
    }
  })
}
</script>
