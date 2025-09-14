<template>
  <div>
    <SuperGrid :gap="[10, 20]">
      <SuperGridItem :span="1">
        <div class="demo-item-content"></div>
      </SuperGridItem>
      <SuperGridItem :span="1" :lg="{ offset: 1 }">
        <div class="demo-item-content"></div>
      </SuperGridItem>
      <SuperGridItem :span="1" :lg="{ offset: 1 }">
        <div class="demo-item-content"></div>
      </SuperGridItem>
      <SuperGridItem :span="1" :lg="{ span: 2, offset: 2 }">
        <div class="demo-item-content"></div>
      </SuperGridItem>
      <SuperGridItem :span="1">
        <div class="demo-item-content"></div>
      </SuperGridItem>
      <SuperGridItem :span="1" :lg="{ offset: 1 }">
        <div class="demo-item-content"></div>
      </SuperGridItem>
    </SuperGrid>
  </div>
</template>

<style lang="scss" scoped>
.demo-item-content {
  padding: 20px;
  background: #d3dce6;
  border-radius: 8px;
}
</style>
