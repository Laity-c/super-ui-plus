<template>
  <div>
    <div>互斥选项: :exclusion="[{ value: '2', exclusion: '3' },{ value: '4', exclusion: ['3', '5'] },]"</div>
    <SuperCheckbox
      v-model="value"
      :options="options"
      hasCheckAll
      :exclusion="[
        { value: '2', exclusion: '3' },
        { value: '4', exclusion: ['3', '5'] },
      ]"
    ></SuperCheckbox>
    <div>互斥选项: 2</div>
    <SuperCheckbox
      v-model="value"
      :options="options"
      hasCheckAll
      :exclusion="'2'"
    ></SuperCheckbox>
    <div>所选中的值：{{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
const options = [
  { value: '1', label: '电视机' },
  { value: '2', label: '冰箱' },
  { value: '3', label: '洗衣机' },
  { value: '4', label: '空调' },
  { value: '5', label: '微波炉' },
  { value: '6', label: '电饭煲' },
  { value: '99', label: '其他' },
]
</script>
