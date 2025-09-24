<template>
  <div>
    <div>默认前缀: prefix</div>
    <SuperCheckbox v-model="value" :options="options" prefix></SuperCheckbox>
    <div>自定义前缀: prefix="测试前缀-"</div>
    <SuperCheckbox v-model="value" :options="options" prefix="测试前缀-"></SuperCheckbox>
    <div>函数前缀: :prefix="(item: { label: string; value: string }) => `函数前缀-${item.value}-`"</div>
    <SuperCheckbox v-model="value" :options="options" :prefix="(item: { label: string; value: string }) => `函数前缀-${item.value}-`"
></SuperCheckbox>
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
