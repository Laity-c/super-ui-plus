<template>
  <div>
    <h4>基本使用</h4>
    <SuperRadio v-model="value" :options="options" @change="change"></SuperRadio>
    <h4>添加前缀</h4>
    <SuperRadio v-model="value" :options="options" prefix @change="change"></SuperRadio>
    <div>
      <SuperRadio
        v-model="value"
        :options="options"
        prefix="测试前缀-"
        @change="change"
      ></SuperRadio>
    </div>
    <div>
      <SuperRadio
        v-model="value"
        :options="options"
        :prefix="(item: { label: string; value: string }) => `函数前缀-${item.value}-`"
        @change="change"
      ></SuperRadio>
    </div>
    <h4>禁用状态</h4>
    <SuperRadio v-model="value" :options="options" disabled @change="change"></SuperRadio>
    <div>
      <SuperRadio
        v-model="value"
        :options="options"
        :disabled="isDisabled"
        @change="change"
      ></SuperRadio>
    </div>
    <h4>单选按钮</h4>
    <SuperRadio v-model="value" :options="options" type="button" @change="change"></SuperRadio>
    <h4>包含/排除选项</h4>
    <SuperRadio
      v-model="value"
      :options="options"
      type="button"
      :include="['1', '3']"
      @change="change"
    ></SuperRadio>

    <div>
      <SuperRadio
        v-model="value"
        :options="options"
        type="button"
        :exclude="['1', '3']"
        @change="change"
      ></SuperRadio>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('1')
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
]

const change = (val: string) => {
  console.log('选中值：', val)
}

const isDisabled = (item: { value: string }) => item.value === '2'
</script>

<style scoped></style>
