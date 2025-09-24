<template>
  <div>
    <div>collapse-tags</div>
    <SuperSelect
      v-model="value"
      :options="options"
      multiple
      collapse-tags
      hasCheckAll
      width="200px"
    ></SuperSelect>
    <div>collapse-tags + collapse-tags-tooltip</div>
    <SuperSelect
      v-model="value"
      :options="options"
      multiple
      collapse-tags
      collapse-tags-tooltip
      hasCheckAll
      width="200px"
    ></SuperSelect>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref()
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
  { label: '选项4', value: '4' },
  { label: '选项5', value: '5' },
  { label: '选项6', value: '6' },
]
</script>
