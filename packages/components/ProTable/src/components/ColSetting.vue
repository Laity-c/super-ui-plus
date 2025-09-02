<template>
  <!-- 列设置 -->
  <el-drawer v-model="drawerVisible" title="列设置" size="450px">
    <div :class="`${prefixCls}-main`">
      <el-table
        :data="colSetting"
        :border="true"
        row-key="prop"
        default-expand-all
        :tree-props="{ children: '_children' }"
      >
        <el-table-column prop="label" align="center" label="列名" />
        <el-table-column v-slot="scope" prop="isShow" align="center" label="显示">
          <el-switch v-model="scope.row.isShow"></el-switch>
        </el-table-column>
        <el-table-column v-slot="scope" prop="sortable" align="center" label="排序">
          <el-switch v-model="scope.row.sortable"></el-switch>
        </el-table-column>
      </el-table>
    </div>
  </el-drawer>
</template>

<script setup lang="ts" name="ColSetting">
import { ref } from 'vue'
import { getPrefixCls } from '../../../../utils'
import type { ColumnProps } from '../../../../types/proTable'

defineProps<{ colSetting: ColumnProps[] }>()

// 获取样式前缀
const prefixCls = getPrefixCls('table')

// 抽屉显示隐藏
const drawerVisible = ref<boolean>(false)

// 打开列设置
const openColSetting = () => {
  drawerVisible.value = true
}

defineExpose({
  openColSetting,
})
</script>

<style scoped lang="scss">
.cursor-move {
  cursor: move;
}
</style>
