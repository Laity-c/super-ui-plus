<template>
  <div>
    <div>默认样式: type="checkbox"</div>
    <SuperCheckbox v-model="value" :options="options" type="checkbox"></SuperCheckbox>
    <div>按钮样式: type="button"</div>
    <SuperCheckbox v-model="value" :options="options" type="button"></SuperCheckbox>
    <div>边框样式: border</div>
    <SuperCheckbox v-model="value" :options="options" border></SuperCheckbox>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value = ref([])
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
]

</script>
