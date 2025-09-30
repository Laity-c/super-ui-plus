<template>
  <div v-if="field.length" :class="['table-search', { card: ifCardStyle }]">
    <ElForm ref="formRef" :model="model" v-bind="$attrs">
      <Grid ref="gridRef" :collapsed="collapsed" :gap="[20, 0]" :cols="searchCol">
        <GridItem
          v-for="(item, index) in field"
          :key="index"
          v-bind="getResponsive(item)"
          :index="index"
        >
          <template v-if="!item?.slotName || !item?.slotName?.includes('Component')">
            <ElFormItem
              :prop="item.name"
              v-bind="item.formItemProps"
              :rules="getRules(item.formItemProps?.rules, item)"
            >
              <template #label>
                <el-space :size="4">
                  <span>{{ `${item.label ?? item.label}` }}</span>
                  <el-tooltip
                    v-if="item?.tooltip"
                    effect="dark"
                    :content="item?.tooltip"
                    placement="top"
                  >
                    <el-icon><InfoFilled /></el-icon>
                  </el-tooltip>
                </el-space>
                <span>&nbsp;:</span>
              </template>
              <template v-if="item.slotName">
                <slot :name="item.slotName"></slot>
              </template>
              <template v-else>
                <SearchFormItem :field="item" :model="model" :preview="preview"></SearchFormItem>
              </template>
            </ElFormItem>
          </template>

          <template v-else>
            <slot :name="item.slotName"></slot>
          </template>
        </GridItem>
        <GridItem suffix>
          <slot name="append"></slot>
        </GridItem>
      </Grid>
    </ElForm>
    <!-- 默认插槽 -->
    <slot></slot>
  </div>
</template>
<script setup lang="ts" name="SuperFormGrid">
import { ref, computed, type Ref } from 'vue'

import { setRules } from '../../../utils'

import { InfoFilled } from '@element-plus/icons-vue'
import SearchFormItem from '../components/SearchFormItem.vue'
import Grid from '../../Grid/src/index.vue'
import GridItem from '../../GridItem/src/index.vue'

import type { BreakPoint, SuperFormItemProps } from '../../../types'
import type { FormGridProps } from './type'
import { type FormInstance, ElForm, ElFormItem } from 'element-plus'

defineOptions({
  name: 'SuperFormGrid',
})

// 默认值
const props = withDefaults(defineProps<FormGridProps>(), {
  field: () => [],
  searchCol: () => ({ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }),
  collapsed: () => false,
  ifCardStyle: () => true,
  preview: () => false,
})

// 搜索表单ref
const formRef = ref<FormInstance>()

// 获取表单验证规则
const getRules = (rules: any = [], item: any = {}): any[] => {
  if (item.valueType && item.required) {
    const requiredRules = { required: true, message: `${item.label}必填` }
    return setRules(item.valueType, rules ? [requiredRules, ...rules] : [requiredRules], item.label)
  } else if (item.required) {
    return setRules('required', rules, item.label)
  } else if (item.valueType) {
    return setRules(item.valueType, rules, item.label)
  }

  return [...rules]
}

// 获取响应式设置
const getResponsive = (item: SuperFormItemProps): Record<string, any> => {
  return {
    span: item?.span,
    offset: item?.offset ?? 0,
    xs: item?.xs,
    sm: item?.sm,
    md: item?.md,
    lg: item?.lg,
    xl: item?.xl,
    show: typeof item?.show === 'function' ? item.show() : (item?.show ?? true),
  }
}

// 获取响应式断点
const gridRef = ref<any>()
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint)

// 判断是否显示 展开/合并 按钮
const showCollapse = computed(() => {
  let show = false
  props.field.reduce((prev, current) => {
    prev +=
      (current![breakPoint.value]?.span ?? current?.span ?? 1) +
      (current![breakPoint.value]?.offset ?? current?.offset ?? 0)
    if (typeof props.searchCol !== 'number') {
      if (prev >= props.searchCol[breakPoint.value]) show = true
    } else if (prev >= props.searchCol) {
      show = true
    }
    return prev
  }, 0)
  return show
})

defineExpose({
  formRef: formRef as Ref<FormInstance | undefined>,
  gridRef: gridRef as Ref<any>,
  showCollapse: showCollapse as Ref<boolean>,
})
</script>

<style lang="scss" scoped>
.operation {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
