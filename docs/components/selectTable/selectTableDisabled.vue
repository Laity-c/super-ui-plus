<template>
  <div>
    <SuperSelectTable
      v-model="value"
      :columns="columns"
      :data="data"
      disabled
      valueKey="id"
      labelKey="name"
      selectWidth="200px"
    ></SuperSelectTable>
    <div>value: {{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value = ref();

const data = [
  { id: '1', name: '张三1', idCard: '110101199001011234', email: '<EMAIL>' },
  { id: '2', name: '张三2', idCard: '110101199001011234', email: '<EMAIL>' },
  { id: '3', name: '张三3', idCard: '110101199001011234', email: '<EMAIL>' },
  { id: '4', name: '张三4', idCard: '110101199001011234', email: '<EMAIL>' },
  { id: '5', name: '张三5', idCard: '110101199001011234', email: '<EMAIL>' },
]

const columns = [
  { prop: '$index', label: '序号', width: 80 },
  { prop: 'idCard', label: '身份证号', copyable: true },
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '邮箱' },
]
</script>
