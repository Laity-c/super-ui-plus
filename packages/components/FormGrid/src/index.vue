<template>
  <div v-if="field.length" class="card table-search">
    <el-form ref="formRef" :model="model">
      <Grid ref="gridRef" :collapsed="collapsed" :gap="[20, 0]" :cols="searchCol">
        <GridItem
          v-for="(item, index) in field"
          :key="index"
          v-bind="getResponsive(item)"
          :index="index"
        >
          <template v-if="!item?.slotName || !item?.slotName?.includes('Component')">
            <el-form-item
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
                <SearchFormItem :field="item" :model="model"></SearchFormItem>
              </template>
            </el-form-item>
          </template>

          <template v-else>
            <slot :name="item.slotName"></slot>
          </template>
        </GridItem>
        <GridItem suffix>
          <slot name="append"></slot>
        </GridItem>
      </Grid>
    </el-form>
  </div>
</template>
<script setup lang="ts" name="SuperFormGrid">
import { ref, computed } from 'vue'
import type { SuperFormItemProps } from '../../../types/searchForm'
import type { BreakPoint } from '../../../types/grid'
import { InfoFilled } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { setRules } from '../../../utils'

import SearchFormItem from '../components/SearchFormItem.vue'
import Grid from '../../Grid/src/index.vue'
import GridItem from '../../GridItem/src/index.vue'

defineOptions({
  name: 'SuperFormGrid',
})

export interface SearchFormProps {
  field?: SuperFormItemProps[] // 搜索配置列
  model: { [key: string]: any } // 搜索参数
  searchCol?: number | Record<BreakPoint, number>
  collapsed?: boolean // 展开/收起状态
}

// 默认值
const props = withDefaults(defineProps<SearchFormProps>(), {
  field: () => [],
  searchCol: () => ({ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }),
  collapsed: () => false,
})

// 搜索表单ref
const formRef = ref<FormInstance>()

// 获取表单验证规则
const getRules = (rules: any, item: any) => {
  if (item.valueType && item.required) {
    const requiredRules = { required: true, message: `${item.label}必填` }
    return setRules(item.valueType, rules ? [requiredRules, ...rules] : [requiredRules], item.label)
  } else if (item.required) {
    return setRules('required', rules, item.label)
  } else if (item.valueType) {
    return setRules(item.valueType, rules, item.label)
  }

  return {}
}

// 获取响应式设置
const getResponsive = (item: SuperFormItemProps) => {
  return {
    span: item?.span,
    offset: item?.offset ?? 0,
    xs: item?.xs,
    sm: item?.sm,
    md: item?.md,
    lg: item?.lg,
    xl: item?.xl,
  }
}

// 获取响应式断点
const gridRef = ref()
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
  formRef,
  gridRef,
  showCollapse,
})
</script>

<style lang="scss" scoped>
.operation {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
