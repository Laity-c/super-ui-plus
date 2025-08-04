<script setup lang="ts">
// import { GmHeader } from '../packages/index'

const handleBack = () => {
  console.log('返回按钮被点击')
  alert('返回按钮被点击')
}
</script>

<template>
  <div class="play-app">
    <h1>Super UI Plus 组件演示</h1>

    <section class="component-demo">
      <h2>Header 组件演示</h2>

      <div class="demo-item">
        <h3>基础用法</h3>
        <GmHeader title="页面标题" />
      </div>

      <div class="demo-item">
        <h3>带返回按钮</h3>
        <GmHeader title="带返回按钮的标题" :show-back="true" back-text="返回" @back="handleBack" />
      </div>

      <div class="demo-item">
        <h3>固定定位</h3>
        <GmHeader title="固定定位的标题" :border="true" :z-index="1000" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.play-app {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 40px;
}

.component-demo {
  margin-bottom: 40px;
}

.demo-item {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
}

.demo-item h3 {
  margin-bottom: 15px;
  color: #666;
  font-size: 16px;
}
</style>
