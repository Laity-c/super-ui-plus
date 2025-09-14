<template>
  <div>
    <SuperProTable
      ref="proTable"
      :field="field"
      :columns="columns"
      :requestApi="getData"
      showSearch
      :initParam="form"
      :dataCallback="dataCallback"
      @search="handleSearch"
    >
      <template #date>
        <ElInput v-model="form.date" placeholder="使用插槽自定义内容" clearable />
      </template>
      <template #gridSlotComponent>
        <SuperGrid :gap="[10, 20]">
          <SuperGridItem :span="4">
            <el-form-item label="活动时间：">
              <div class="flx-center">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.activeStart"
                  style="width: 100%"
                ></el-date-picker>
                <span class="line">-</span>
                <el-time-picker
                  placeholder="选择时间"
                  v-model="form.activeEnd"
                  style="width: 100%"
                ></el-time-picker>
              </div>
            </el-form-item>
          </SuperGridItem>
        </SuperGrid>
      </template>
    </SuperProTable>
  </div>
</template>

<script lang="tsx" setup>
import { reactive } from 'vue'
import { ElInput, ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import type { ColumnProps } from '@super-ui-plus/types'

const data = reactive<any[]>([
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
    time: Date.now(),
  },
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
  },
  {
    date: Date.now(),
    name: '张三',
    address: '北京',
  },
])

const form = reactive<any>({
  name: '我是默认值',
  phone: '13211111',
  minAge: '',
  maxAge: '',
  date: '',
  activeStart: '',
  activeEnd: '',
})

// 搜索表单配置项
const field = [
  {
    label: '姓名',
    name: 'name',
    el: 'ElInput',
    formItemProps: {
      rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    },
    componentProps: {
      placeholder: '请输入姓名',
      clearable: true,
    },
    scopedSlots: {
      prepend: () => (
        <el-icon>
          <Search />
        </el-icon>
      ),
      append: () => <el-button>按钮</el-button>,
    },
    tooltip: '这是一个提示信息',
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
    required: true,
    valueType: 'phone',
    span: 2,
  },
  {
    label: '年龄',
    name: 'age',
    el: 'ElInput',
    componentProps: {
      placeholder: '请输入',
      clearable: true,
    },
    render: ({ searchParam }: any) => {
      // 普通v-model但无法使用修饰符
      return (
        <div class="flx-center">
          <ElInput v-model={searchParam.minAge} placeholder="最小年龄" />
          <span class="mr10 ml10">-</span>
          <ElInput v-model={searchParam.maxAge} placeholder="最大年龄" />
        </div>
      )
    },
    span: 2,
  },
  {
    label: '使用组件插槽',
    name: 'date',
    slotName: 'date',
    span: 2,
  },
  {
    label: '使用布局插槽',
    name: 'gridSlot',
    slotName: 'gridSlotComponent',
    span: 4,
  },
]

const columns = reactive<ColumnProps<any>[]>([
  { prop: '$index', label: '序号', width: 80 },
  { prop: 'date', label: '日期', width: 200 },
  { prop: 'name', label: '姓名', width: 200 },
  { prop: 'time', label: '秒' },
  { prop: 'address', label: '居住地址' },
])

const handleSearch = () => {
  ElMessage.success('搜索成功')
}

// 模拟网络请求
// 接口返回正常数据格式：
// 分页: { data: { list: [...], total: ... } }
// 不分页: { data: [...] }
const getData = (param: any) => {
  console.log(param, "param");
  
  // 第一种：接口返回正确的数据格式
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({ data: { list: data, total: data.length } })
  //   }, 1000)
  // })

  // 第二种：使用回调函数返回正常的数据格式
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { listData: data, totalNumber: data.length} })
    }, 1000)
  })
}

// 修正数据格式
const dataCallback = (data: any) => {  
  return ({ list: data.listData, total: data.totalNumber })
}
</script>
