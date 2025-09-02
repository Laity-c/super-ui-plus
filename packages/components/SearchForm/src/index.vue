<template>
  <div v-if="field.length" class="card table-search">
    <FormGrid
      ref="formGrid"
      :field="field"
      :model="model"
      :collapsed="collapsed"
      :ifCardStyle="false"
    >
      <!-- 透传插槽 最终会传递给子组件 -->
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="{ ...slotData, searchParam: model }" />
      </template>

      <template #append>
        <div class="operation">
          <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
          <el-button :icon="Delete" @click="handleReset">重置</el-button>
          <el-button
            v-if="showCollapse && ifCollapsed"
            type="primary"
            link
            class="search-isOpen"
            @click="collapsed = !collapsed"
          >
            {{ collapsed ? '展开' : '合并' }}
            <el-icon class="el-icon--right">
              <component :is="collapsed ? ArrowDown : ArrowUp"></component>
            </el-icon>
          </el-button>
        </div>
      </template>
    </FormGrid>
  </div>
</template>
<script setup lang="ts" name="SuperSearchForm">
import { ref, computed, watch, useTemplateRef, nextTick } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import type { SuperFormItemProps } from '../../../types/searchForm'
import type { BreakPoint } from '../../../types/grid'
import { Delete, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue'

import FormGrid from '../../FormGrid/src/index.vue'

defineOptions({
  name: 'SuperSearchForm',
})

export interface SearchFormProps {
  field?: SuperFormItemProps[] // 搜索配置列
  model: { [key: string]: any } // 搜索参数
  searchCol?: number | Record<BreakPoint, number>
  ifCollapsed?: boolean // 展开/收起状态
  ifCardStyle?: boolean // 是否使用 card 样式
  autoSearch?: boolean // 是否开启自动搜索
}

// 默认值
const props = withDefaults(defineProps<SearchFormProps>(), {
  field: () => [],
  searchCol: () => ({ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }),
  ifCollapsed: () => true,
  ifCardStyle: () => true,
  autoSearch: () => true,
})

const emit = defineEmits<{
  (e: 'search'): void
  (e: 'reset'): void
}>()

// 搜索表单ref
const formGridRef = useTemplateRef('formGrid')
const showCollapse = computed(() => formGridRef.value?.showCollapse)
const isRefresh = ref(false)

// 搜索按钮点击事件
const handleSearch = async () => {
  if (!formGridRef.value) return
  await nextTick()
  await formGridRef.value?.formRef?.validate(valid => {
    if (valid) {
      emit('search')
    }
  })
}

// 创建一个防抖搜索函数
const onSearch = useDebounceFn(handleSearch, 300)

// 监听页面 initParam 改化，重新获取表格数据
watch(
  () => props.model,
  () => {
    if (props.autoSearch && !isRefresh.value) {
      onSearch()
    }
  },
  { deep: true },
)

// 重置按钮点击事件
const handleReset = () => {
  isRefresh.value = true
  if (!formGridRef.value) return
  formGridRef.value?.formRef?.resetFields()
  handleSearch()
  nextTick(() => {
    emit('reset')
  })
  setTimeout(() => {
    isRefresh.value = false
  })
}

// 是否默认折叠搜索项
const collapsed = ref(props.ifCollapsed)
</script>

<style lang="scss" scoped>
.operation {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
