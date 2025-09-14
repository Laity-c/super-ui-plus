<template>
  <div>
    <SuperProTable ref="proTable" :columns="columns" :data="data" rowKey="id" @drag-sort="sortTable">
      <template #expand="scope">
        {{ scope.row }}
      </template>
    </SuperProTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive, useTemplateRef, watch } from 'vue'
import { ElMessage } from 'element-plus'
import type { ColumnProps } from '@super-ui-plus/types'

const data = reactive<any[]>([
  {
    id: 1,
    date: Date.now(),
    name: '张三',
    address: '北京',
  },
  {
    id: 2,  
    date: Date.now(),
    name: '张三',
    address: '北京',
  },
  {
    id: 3,
    date: Date.now(),
    name: '张三',
    address: '北京',
  },
])

const columns = reactive<ColumnProps<any>[]>([
  { type: "sort", label: "Sort", width: 60 },
  { type: 'radio', label: '单选', width: 60 },
  { type: 'expand', label: 'Expand', width: 60 },
  { prop: 'date', label: '日期' },
  { prop: 'name', label: '姓名' },
  { prop: 'address', label: '居住地址' },
])

const proTableRef = useTemplateRef('proTable')

watch(
  () => proTableRef.value?.radio,
  () =>
    proTableRef.value?.radio &&
    ElMessage.success(`选中 id 为【${proTableRef.value?.radio}】的数据`),
)

// 表格拖拽排序
const sortTable = ({ newIndex, oldIndex }: { newIndex?: number; oldIndex?: number }) => {
  console.log(newIndex, oldIndex);
  console.log(proTableRef.value?.tableData);
  ElMessage.success("修改列表排序成功");
};
</script>
