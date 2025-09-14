<template>
  <div>
    <SuperGrid :gap="[10, 20]">
      <SuperGridItem :span="1">
        <div class="demo-item-content"></div>
      </SuperGridItem>
      <SuperGridItem :span="2">
        <div class="demo-item-content"></div>
      </SuperGridItem>
      <SuperGridItem :span="3">
        <div class="demo-item-content"></div>
      </SuperGridItem>
      <SuperGridItem :span="4">
        <div class="demo-item-content"></div>
      </SuperGridItem>
      <SuperGridItem>
        <div class="demo-item-content"></div>
      </SuperGridItem>
    </SuperGrid>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const header = ref()
onMounted(() => {
  console.log(header.value)
})
</script>

<style lang="scss" scoped>
.demo-item-content {
  padding: 20px;
  background: #d3dce6;
  border-radius: 8px;
}
</style>
