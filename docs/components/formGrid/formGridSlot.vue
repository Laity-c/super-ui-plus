<template>
  <div>
    <SuperFormGrid :field="field" :model="form">
      <template #componentSlot>
        <ElInput v-model="form.message" placeholder="使用插槽自定义内容" clearable />
      </template>
      <template #formGridSlotComponent>
        <SuperGrid :gap="[10, 20]">
          <SuperGridItem :span="4">
            <el-form-item label="活动时间：">
              <div class="flx-center">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.activeStart"
                  style="width: 100%"
                ></el-date-picker>
                <span class="line">-</span>
                <el-time-picker
                  placeholder="选择时间"
                  v-model="form.activeEnd"
                  style="width: 100%"
                ></el-time-picker>
              </div>
            </el-form-item>
          </SuperGridItem>
        </SuperGrid>
      </template>

      表单数据: {{ form }}
    </SuperFormGrid>
  </div>
</template>

<script lang="tsx" setup>
import { reactive } from 'vue'
import { ElInput } from "element-plus"

const form = reactive({
  minAge: '',
  maxAge: '',
  message: '',
  activeStart: '',
  activeEnd: '',
})
const field = [
  {
    label: '年龄使用render渲染',
    name: 'age',
    el: 'ElInput',
    componentProps: {
      placeholder: '请输入姓名',
      clearable: true,
    },
    render: ({ searchParam }: any) => {
      // 普通v-model但无法使用修饰符
      return (
        <div class="flx-center">
          <ElInput v-model={searchParam.minAge} placeholder="最小年龄" />
          <span class="mr10 ml10">-</span>
          <ElInput v-model={searchParam.maxAge} placeholder="最大年龄" />
        </div>
      )
    },
    span: 4,
  },
  {
    label: '使用组件插槽',
    name: 'message',
    slotName: 'componentSlot',
    span: 4,
  },
  {
    label: '使用布局插槽',
    name: 'date',
    slotName: 'formGridSlotComponent',
    span: 4,
  },
]
</script>
