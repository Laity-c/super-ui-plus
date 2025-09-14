<template>
  <div>
    <div>选中的数据: {{ selectedList }}</div>
    <div>选中的数据id: {{ selectedListIds }}</div>
    <el-checkbox v-model="ifContinuousMultiple">是否开启连续勾选列表数据({{ ifContinuousMultiple }})</el-checkbox>
    <el-button @click="() => treeProTableRef.clearSelection()">清空数据</el-button>
    <SuperProTable
      ref="proTable"
      rowKey="id"
      :columns="columns"
      :data="data"
      :ifContinuousMultiple="ifContinuousMultiple"
    ></SuperProTable>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, useTemplateRef, computed } from 'vue'
import type { ColumnProps } from '@super-ui-plus/types'

const ifContinuousMultiple = ref(true)
const data = reactive<any[]>([])

Array.from({ length: 50 }).forEach((_, index) => {
  data.push({
    id: index,
    date: Date.now(),
    name: '张三' + index,
    address: '北京' + index,
  },)
})

const columns = reactive<ColumnProps<any>[]>([
  { type: 'selection', width: 80 },
  { prop: 'date', label: '日期', width: 200 },
  { prop: 'name', label: '姓名', width: 200 },
  { prop: 'address', label: '居住地址' },
])

const treeProTableRef: any = useTemplateRef('proTable')
const selectedList: any = computed(() => treeProTableRef.value?.selectedList)
const selectedListIds: any = computed(() => treeProTableRef.value?.selectedListIds)

</script>
