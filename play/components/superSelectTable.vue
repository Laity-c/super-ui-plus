<template>
  <div>
    <h4>基本使用</h4>
    <SuperSelectTable
      v-model="value"
      :columns="columns"
      :data="data"
      valueKey="id"
      labelKey="name"
      selectWidth="200px"
    ></SuperSelectTable>
    <SuperSelectTable
      v-model="value2"
      :columns="columns"
      :data="data"
      valueKey="id"
      labelKey="name"
      isRadio
      selectWidth="200px"
    ></SuperSelectTable>
    <SuperSelectTable
      v-model="value3"
      :columns="columns"
      :data="data"
      valueKey="id"
      labelKey="name"
      multiple
      selectWidth="200px"
    ></SuperSelectTable>
    <div>单选值value: {{ value }}</div>
    <div>单选值value2: {{ value2 }}</div>
    <div>多选值value3: {{ value3 }}</div>

    <h4>禁用状态</h4>
    <SuperSelectTable
      v-model="values"
      :columns="columns"
      :data="data"
      disabled
      valueKey="id"
      labelKey="name"
      selectWidth="200px"
    ></SuperSelectTable>

    <h4>隐藏分页</h4>
    <SuperSelectTable
      v-model="values"
      :columns="columns"
      :data="data"
      :pagination="false"
      valueKey="id"
      labelKey="name"
      selectWidth="200px"
    ></SuperSelectTable>

    <h4>模拟数据网络请求</h4>
    <SuperSelectTable
      v-model="values"
      :columns="columns"
      :requestApi="getData"
      :dataCallback="dataCallback"
      height="300px"
      valueKey="id"
      labelKey="name"
      selectWidth="200px"
      tableWidth="600px"
    ></SuperSelectTable>

    <h4>默认值</h4>
    <SuperSelectTable
      v-model="staticValue1"
      :columns="columns"
      :data="data3"
      valueKey="id"
      labelKey="name"
      selectWidth="200px"
    ></SuperSelectTable>
    <SuperSelectTable
      v-model="staticValue2"
      :columns="columns"
      :data="data3"
      valueKey="id"
      labelKey="name"
      isRadio
      selectWidth="200px"
    ></SuperSelectTable>
    <SuperSelectTable
      v-model="staticValue3"
      :columns="columns"
      :data="data3"
      valueKey="id"
      labelKey="name"
      multiple
      selectWidth="200px"
    ></SuperSelectTable>
    <div>单选静态值staticValue1: {{ staticValue1 }}</div>
    <div>单选静态值staticValue2: {{ staticValue2 }}</div>
    <div>多选静态值staticValue3: {{ staticValue3 }}</div>

    <h4>动态赋值</h4>
    <el-button @click="dynamicValue1 = { name: '张三1', id: '1' }">动态赋值1</el-button>
    <el-button @click="dynamicValue2 = { name: '张三1', id: '1' }">动态赋值2</el-button>
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
    <SuperSelectTable
      v-model="dynamicValue1"
      :columns="columns"
      :data="data"
      valueKey="id"
      labelKey="name"
      selectWidth="200px"
    ></SuperSelectTable>
    <SuperSelectTable
      v-model="dynamicValue2"
      :columns="columns"
      :data="data"
      valueKey="id"
      labelKey="name"
      isRadio
      selectWidth="200px"
    ></SuperSelectTable>
    <SuperSelectTable
      v-model="dynamicValue3"
      :columns="columns"
      :data="data"
      valueKey="id"
      labelKey="name"
      multiple
      selectWidth="200px"
    ></SuperSelectTable>
    <div>单选动态值staticValue1: {{ dynamicValue1 }}</div>
    <div>单选动态值staticValue2: {{ dynamicValue2 }}</div>
    <div>多选动态值staticValue3: {{ dynamicValue3 }}</div>

    <h4>显示搜索条件</h4>
    <SuperSelectTable
      v-model="valuesSearch"
      :field="field"
      showSearch
      :columns="columns"
      :requestApi="getData"
      :dataCallback="dataCallback"
      height="300px"
      valueKey="id"
      labelKey="name"
      selectWidth="200px"
      tableWidth="600px"
    ></SuperSelectTable>

    <h4>键盘上下键选中数据</h4>
    <SuperSelectTable
      v-model="KeyupValue"
      :columns="columns"
      :data="data"
      valueKey="id"
      labelKey="name"
      isRadio
      isKeyup
      selectWidth="200px"
    ></SuperSelectTable>
    <div>键盘上下键选中数据KeyupValue: {{ KeyupValue }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElButton } from 'element-plus'

const value = ref()
const value2 = ref()
const value3 = ref()
const values = ref()
const staticValue1 = ref({ name: '张三12', id: '12' })
const staticValue2 = ref({ name: '张三12', id: '12' })
const staticValue3 = ref([
  { name: '张三1', id: '1' },
  { name: '张三12', id: '12' },
  { name: '张三23', id: '23' },
])
const dynamicValue1 = ref()
const dynamicValue2 = ref()
const dynamicValue3 = ref()
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

const data2: any[] = []
Array.from({ length: 10 }).forEach((item, index) => {
  data2.push({
    id: String(index + 1),
    name: '张三' + index,
    idCard: '110101199001011234',
    email: '<EMAIL>',
  })
})

const getData = (param: any) => {
  // 第一种：接口返回正确的数据格式
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({ data: { list: data, total: data.length } })
  //   }, 1000)
  // })

  // 第二种：使用回调函数返回正常的数据格式
  if (param.name) {
    const filterData = data2.filter(item => item.name.includes(param.name))
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: { listData: filterData, totalNumber: filterData.length } })
      }, 1000)
    })
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: { listData: data2, totalNumber: 11 } })
    }, 1000)
  })
}

// 修正数据格式
const dataCallback = (data: any) => {
  return { list: data.listData, total: data.totalNumber }
}

const data3: any[] = []
Array.from({ length: 50 }).forEach((item, index) => {
  data3.push({
    id: String(index + 1),
    name: '张三' + index,
    idCard: '110101199001011234',
    email: '<EMAIL>',
  })
})

const valuesSearch = ref()
const field = [
  {
    label: '姓名',
    name: 'name',
    el: 'ElInput',
    componentProps: {
      placeholder: '请输入姓名',
      clearable: true,
    },
    span: 2,
  },
]

const KeyupValue = ref()
</script>

<style scoped></style>
