<template>
  <div>
    <div>默认样式: type: radion</div>
    <SuperRadio v-model="value" type="radio" :options="options"></SuperRadio>
    <div>按钮样式: type: button</div>
    <SuperRadio v-model="value" type="button" :options="options"></SuperRadio>
    <div>边框样式: border</div>
    <SuperRadio v-model="value" border :options="options"></SuperRadio>
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
