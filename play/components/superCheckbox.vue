<template>
  <div>
    <h4>基本使用</h4>
    <SuperCheckbox v-model="value" :options="options" @change="change"></SuperCheckbox>
    <h4>添加前缀</h4>
    <SuperCheckbox v-model="value" :options="options" prefix @change="change"></SuperCheckbox>
    <div>
      <SuperCheckbox
        v-model="value"
        :options="options"
        prefix="测试前缀-"
        @change="change"
      ></SuperCheckbox>
    </div>
    <div>
      <SuperCheckbox
        v-model="value"
        :options="options"
        :prefix="(item: { label: string; value: string }) => `函数前缀-${item.value}-`"
        @change="change"
      ></SuperCheckbox>
    </div>
    <h4>禁用状态</h4>
    <SuperCheckbox v-model="value" :options="options" disabled @change="change"></SuperCheckbox>
    <div>
      <SuperCheckbox
        v-model="value"
        :options="options"
        :disabled="isDisabled"
        @change="change"
      ></SuperCheckbox>
    </div>
    <h4>单选按钮</h4>
    <SuperCheckbox
      v-model="value"
      :options="options"
      type="button"
      @change="change"
    ></SuperCheckbox>
    <h4>包含/排除选项</h4>
    <SuperCheckbox
      v-model="value"
      :options="options"
      type="button"
      :include="['1', '3']"
      @change="change"
    ></SuperCheckbox>

    <div>
      <SuperCheckbox
        v-model="value"
        :options="options"
        type="button"
        :exclude="['1', '3']"
        @change="change"
      ></SuperCheckbox>
    </div>

    <h4>全选功能</h4>
    <SuperCheckbox v-model="value" :options="options" hasCheckAll @change="change"></SuperCheckbox>

    <h4>值类型处理</h4>
    <SuperCheckbox
      v-model="value2"
      :options="options"
      hasCheckAll
      :valueKeys="{ valueKey: 'value', labelKey: 'label' }"
      @change="change2"
    ></SuperCheckbox>
    <SuperCheckbox v-model="value" :options="options" hasCheckAll @change="change"></SuperCheckbox>
    <div>所选中的值：{{ value }}</div>
    <div>所选中的值：{{ value2 }}</div>

    <h4>选项互斥</h4>
    <SuperCheckbox
      v-model="value"
      :options="options3"
      label-key="itemName"
      value-key="itemCode"
      hasCheckAll
      :exclusion="[
        { value: '2', exclusion: '3' },
        { value: '4', exclusion: ['3', '5'] },
      ]"
      @change="change"
    ></SuperCheckbox>
    <SuperCheckbox
      v-model="value"
      :options="options3"
      label-key="itemName"
      value-key="itemCode"
      hasCheckAll
      :exclusion="'2'"
      @change="change"
    ></SuperCheckbox>
    <div>所选中的值：{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const value2 = ref([{ value: '2', label: '选项2' }])
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
]

const options3 = [
  { itemCode: '1', itemName: '一般人群' },
  { itemCode: '2', itemName: '0-6岁儿童' },
  { itemCode: '3', itemName: '65岁及以上老年人' },
  { itemCode: '4', itemName: '孕产妇' },
  { itemCode: '5', itemName: '高血压患者' },
  { itemCode: '6', itemName: '糖尿病患者' },
  { itemCode: '99', itemName: '其他' },
]

const change = (val: string, item: any) => {
  console.log('选中值：', val, item)
}

const change2 = (val: string, item: any) => {
  console.log('选中值2：', val, item)
}

const isDisabled = (item: { value: string }) => item.value === '2'
</script>

<style scoped></style>
