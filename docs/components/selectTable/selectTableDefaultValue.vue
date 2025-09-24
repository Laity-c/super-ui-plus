<template>
  <div>
    <div>普通单选: {{ staticValue1 }}</div>
    <SuperSelectTable
      v-model="staticValue1"
      :columns="columns"
      :data="data"
      valueKey="id"
      labelKey="name"
      selectWidth="200px"
    ></SuperSelectTable>
    <div>带单选框(isRadio): {{ staticValue2 }}</div>
    <SuperSelectTable
      v-model="staticValue2"
      :columns="columns"
      :data="data"
      valueKey="id"
      labelKey="name"
      isRadio
      selectWidth="200px"
    ></SuperSelectTable>
    <div>多选(multiple): {{ staticValue3 }}</div>
    <SuperSelectTable
      v-model="staticValue3"
      :columns="columns"
      :data="data"
      valueKey="id"
      labelKey="name"
      multiple
      selectWidth="200px"
    ></SuperSelectTable>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const staticValue1 = ref({ name: '张三12', id: '12' })
const staticValue2 = ref({ name: '张三12', id: '12' })
const staticValue3 = ref([
  { name: '张三1', id: '1' },
  { name: '张三12', id: '12' },
  { name: '张三23', id: '23' },
])

const data: Array<any> = []
Array.from({ length: 50 }).forEach((item, index) => {
  data.push({
    id: String(index + 1),
    name: '张三' + index,
    idCard: '110101199001011234',
    email: '<EMAIL>',
  })
})

const columns = [
  { prop: '$index', label: '序号', width: 80 },
  { prop: 'idCard', label: '身份证号', copyable: true },
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '邮箱' },
]
</script>
