<template>
  <div>
    <SuperSearchForm :field="field" :model="form" @search="_search" @reset="_reset">
      <template #beforeContent>
        <el-button type="primary">新增</el-button>
      </template>
      <template #afterContent>
        <el-button type="primary">删除</el-button>
      </template>
    </SuperSearchForm>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage, ElButton } from "element-plus"

const form = reactive({
  name: '',
})
const field = [
  {
    label: '姓名',
    name: 'name',
    el: 'ElInput',
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
