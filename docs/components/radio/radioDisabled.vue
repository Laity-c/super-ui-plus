<template>
  <div>
    <div>全部禁用</div>
    <SuperRadio v-model="value" :options="options" disabled></SuperRadio>
    <div>选项禁用</div>
    <SuperRadio v-model="value" :options="options" :disabled="isDisabled"></SuperRadio>
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

const isDisabled = (item: { value: string }) => item.value === '2'
</script>
