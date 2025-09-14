<template>
  <div>
    <SuperGrid :gap="10">
      <SuperGridItem :span="1">
        <div class="demo-item-content"></div>
      </SuperGridItem>
      <SuperGridItem :span="1">
        <div class="demo-item-content"></div>
      </SuperGridItem>
      <SuperGridItem :span="1">
        <div class="demo-item-content"></div>
      </SuperGridItem>
      <SuperGridItem :span="1">
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
