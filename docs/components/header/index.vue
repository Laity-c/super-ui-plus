<template>
  <div>
    <super-header ref="header">标准头部</super-header>
    <super-header size="medium">大号头部</super-header>
    <super-header size="medium" divider>带线 </super-header>
    <super-header size="medium" border>下滑线</super-header>
    <super-header divider>
      右侧按钮
      <template #right>
        <el-button type="primary" link> 添加紧急联系人 </el-button>
      </template>
    </super-header>
    <super-header :divider="false" border>
      右侧按钮
      <template #right>
        <el-button type="primary" link> 添加紧急联系人 </el-button>
      </template>
    </super-header>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const header = ref();
onMounted(() => {
  console.log(header.value);
});
</script>
