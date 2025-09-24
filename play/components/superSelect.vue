<template>
  <div>
    <h4>基本使用</h4>
    <SuperSelect v-model="value" :options="options" width="200px" @change="change"></SuperSelect>

    <h4>添加前缀</h4>
    <SuperSelect
      v-model="value"
      :options="options"
      prefix
      width="200px"
      @change="change"
    ></SuperSelect>
    <div>value选中的值：{{ value }}</div>

    <h4>值类型</h4>
    <SuperSelect
      v-model="value2"
      vable-keys="value"
      :options="options"
      valueIsObject
      width="200px"
      @change="change"
    ></SuperSelect>
    <div>value选中的值：{{ value2 }}</div>

    <h4>禁用状态</h4>
    <SuperSelect
      v-model="value"
      :options="options"
      disabled
      width="200px"
      @change="change"
    ></SuperSelect>

    <SuperSelect
      v-model="value"
      :options="options"
      :disabled="isDisabled"
      width="200px"
      @change="change"
    ></SuperSelect>

    <h4>多选添加全选/不添加全选</h4>
    <SuperSelect
      v-model="value3"
      :options="options"
      multiple
      hasCheckAll
      width="200px"
      @change="change"
    ></SuperSelect>

    <SuperSelect
      v-model="value4"
      :options="options"
      multiple
      valueIsObject
      width="200px"
      @change="change"
    ></SuperSelect>

    <h4>collapse-tags 和 collapse-tags-tooltip 多选功能</h4>
    <SuperSelect
      v-model="value3"
      :options="options"
      multiple
      collapse-tags
      collapse-tags-tooltip
      hasCheckAll
      width="200px"
      @change="change"
    ></SuperSelect>
    <div>value3选中的值：{{ value3 }}</div>
    <div>value4选中的值：{{ value4 }}</div>

    <h4>虚拟列表</h4>
    <SuperSelect
      v-model="value"
      useVirtual
      :options="options2"
      width="200px"
      @change="change"
    ></SuperSelect>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('1')
const value2 = ref({ label: '选项1', value: '1' })
const value3 = ref(['1'])
const value4 = ref([{ label: '选项1', value: '1' }])
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
]
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

const options2 = ref(
  Array.from({ length: 1000 }).map((_, idx) => ({
    value: `Option ${idx + 1}`,
    label: `${initials[idx % 10]}${idx}`,
  })),
)

const change = (val: string) => {
  console.log('选中值：', val)
}

const isDisabled = (item: { value: string }) => {
  return item.value === '2'
}
</script>

<style scoped></style>
