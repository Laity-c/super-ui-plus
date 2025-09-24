<template>
  <div>
    <el-button @click="dynamicValue1 = { name: '张三1', id: '1' }">动态赋值1</el-button>
    <div>普通单选: {{ dynamicValue1 }}</div>
    <SuperSelectTable
      v-model="dynamicValue1"
      :columns="columns"
      :data="data"
      valueKey="id"
      labelKey="name"
      selectWidth="200px"
    ></SuperSelectTable>
        <el-button @click="dynamicValue2 = { name: '张三1', id: '1' }">动态赋值2</el-button>
    <div>带单选框(isRadio): {{ dynamicValue2 }}</div>
    <SuperSelectTable
      v-model="dynamicValue2"
      :columns="columns"
      :data="data"
      valueKey="id"
      labelKey="name"
      isRadio
      selectWidth="200px"
    ></SuperSelectTable>
    <el-button
      @click="
        dynamicValue3 = [
          { name: '张三1', id: '1' },
          { name: '张三2', id: '2' },
          { name: '张三3', id: '3' },
        ]
      "
    >
      动态赋值3
    </el-button>
    <div>多选(multiple): {{ dynamicValue3 }}</div>
    <SuperSelectTable
      v-model="dynamicValue3"
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

const dynamicValue1 = ref()
const dynamicValue2 = ref()
const dynamicValue3 = ref()

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
