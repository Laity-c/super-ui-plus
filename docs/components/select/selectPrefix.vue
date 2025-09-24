<template>
  <div>
    <SuperSelect v-model="value" :options="options" width="200px" prefix></SuperSelect>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref()
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
]
</script>
