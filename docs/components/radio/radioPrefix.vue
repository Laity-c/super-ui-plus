<template>
  <div>
    <div>默认前缀: prefix</div>
    <SuperRadio v-model="value" :options="options" prefix></SuperRadio>
    <div>自定义前缀: prefix="测试前缀-"</div>
    <SuperRadio v-model="value" :options="options" prefix="测试前缀-"></SuperRadio>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value = ref()

const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
]
</script>
