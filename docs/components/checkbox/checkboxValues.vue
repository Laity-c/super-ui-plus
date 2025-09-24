<template>
  <div>
    <SuperCheckbox v-model="value" :options="options"></SuperCheckbox>
    <SuperCheckbox v-model="values" :options="options" :valueKeys="{ valueKey: 'value', labelKey: 'label' }"></SuperCheckbox>
    <div>选中值value: {{ value }}</div>
    <div>选中值values: {{ values }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value = ref([])
const values = ref([])
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
]

</script>
