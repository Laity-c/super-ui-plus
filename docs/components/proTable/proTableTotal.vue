<template>
  <div>
    <SuperProTable
      ref="proTable"
      :columns="columns"
      :data="data"
      :show-summary="true"
      sumText="自定义合计行文本"
      sumNaNText="自定义非数字数据"
    ></SuperProTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { ColumnProps } from '@super-ui-plus/types'

const data = reactive<any[]>([
  {
    name: '张三',
    chineseZodiac: '🐎',
    n1: '1',
    n2: '2',
    n3: '3',
    n4: '4',
    n5: '5',
  },
  {
    name: '张三',
    chineseZodiac: '🐎',
    n1: '1',
    n2: '2',
    n3: '3',
    n4: '4',
    n5: '5',
  },
  {
    name: '张三',
    chineseZodiac: '🐎',
    n1: '1',
    n2: '2',
    n3: '3',
    n4: '4',
    n5: '5',
  },
])

const columns = reactive<ColumnProps<any>[]>([
  { prop: '$index', label: '序号', width: 80 },
  { prop: 'name', label: '姓名' },
  { prop: 'chineseZodiac', label: '生肖', sumFilter:  () => '🐎' },
  { prop: 'n1', label: '数值1', sumDataPrefix: '$' },
  { prop: 'n2', label: '数值2', sumDataPrefix: '￥' },
  { prop: 'n3', label: '数值3', sumFilter: (val) => '$' + val },
  { prop: 'n4', label: '数值4', sumDataPrefix: '￥' },
  { prop: 'n5', label: '数值5' },
])
</script>
