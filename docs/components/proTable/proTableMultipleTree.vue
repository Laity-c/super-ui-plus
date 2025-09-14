<template>
  <div>
    <div>选中的数据: {{ selectedList }}</div>
    <div>选中的数据id: {{ selectedListIds }}</div>
    <el-button @click="() => treeProTableRef.clearSelection()">清空数据</el-button>
    <SuperProTable ref="treeProTable" :columns="treeColumns" :data="treeData"></SuperProTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive, useTemplateRef, computed } from 'vue'
import type { ColumnProps } from '@super-ui-plus/types'

// 生成树形结构数据
// 定义树节点类型
interface TreeNode {
  id: string
  date: number
  name: string
  address: string
  children?: TreeNode[]
}
const generateTreeData = (level = 0, count = 10, parentId: string | null = null) => {
  const data: TreeNode[] = []
  for (let i = 0; i < count; i++) {
    const id = parentId ? `${parentId}-${i}` : `${i}`
    const item: TreeNode = {
      id,
      date: Date.now(),
      name: `张三${level}-${i}`,
      address: `北京${level}-${i}`,
    }

    // 添加子节点（最多3层）
    if (level < 2 && Math.random() > 0.3) {
      item.children = generateTreeData(level + 1, Math.floor(Math.random() * 3) + 1, id)
    }

    data.push(item)
  }
  return data
}
const treeData = reactive<any[]>(generateTreeData())

const treeColumns = reactive<ColumnProps<any>[]>([
  { type: 'selection', width: 80 },
  { type: 'index', width: 80 },
  { prop: 'date', label: '日期' },
  { prop: 'name', label: '姓名' },
  { prop: 'address', label: '地址' },
])
const treeProTableRef: any = useTemplateRef('treeProTable')
const selectedList: any = computed(() => treeProTableRef.value?.selectedList)
const selectedListIds: any = computed(() => treeProTableRef.value?.selectedListIds)
</script>
