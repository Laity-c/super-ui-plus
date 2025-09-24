<template>
  <div>
    <SuperSelect
      v-model="value"
      useVirtual
      :options="options"
      width="200px"
    ></SuperSelect>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref()

const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const options = ref(
  Array.from({ length: 1000 }).map((_, idx) => ({
    value: `Option ${idx + 1}`,
    label: `${initials[idx % 10]}${idx}`,
  })),
)
</script>

