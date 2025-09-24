<template>
  <div>
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
    <div>valuesSearch: {{ valuesSearch }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

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

const data: Array<any> = Array.from({ length: 10 }).map((item, index) => ({
  id: String(index + 1),
  name: '张三' + index,
  idCard: '110101199001011234',
  email: '<EMAIL>',
}))



const columns = [
  { prop: '$index', label: '序号', width: 80 },
  { prop: 'idCard', label: '身份证号', copyable: true },
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '邮箱' },
]

const getData = (param: any) => {
  // 第一种：接口返回正确的数据格式
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({ data: { list: data, total: data.length } })
  //   }, 1000)
  // })

  // 第二种：使用回调函数返回正常的数据格式
  if (param.name) {
    const filterData = data.filter(item => item.name.includes(param.name))
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: { listData: filterData, totalNumber: filterData.length } })
      }, 1000)
    })
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: { listData: data, totalNumber: data.length } })
    }, 1000)
  })
}

// 修正数据格式
const dataCallback = (data: any) => {
  return { list: data.listData, total: data.totalNumber }
}
</script>
