<template>
  <div>
    <div>添加全选按钮</div>
    <SuperSelect
      v-model="value"
      :options="options"
      width="200px"
      multiple
      hasCheckAll
      valueIsObject
    ></SuperSelect>
    <div>未添加全选按钮</div>
    <SuperSelect
      v-model="value"
      :options="options"
      width="200px"
      multiple
      valueIsObject
    ></SuperSelect>

    <div>value选中的值: {{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
]
</script>
