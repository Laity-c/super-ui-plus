<script setup lang="tsx">
import { reactive, h, resolveComponent } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElInput } from 'element-plus'
// const res = ({ searchParam }) => {
//   return <div>1212</div>
// }
const field = [
  {
    label: '姓名',
    name: 'name',
    el: 'ElInput',
    formItemProps: {
      rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    },
    componentProps: {
      placeholder: '请输入姓名',
      clearable: true,
    },
    scopedSlots: {
      prepend: () => (
        <el-icon>
          <Search />
        </el-icon>
      ),
      append: () => <el-button>按钮</el-button>,
    },
    tooltip: '这是一个提示信息',
    span: 1,
  },
  {
    label: '姓名',
    name: 'name2',
    el: 'ElInput',
    componentProps: {
      placeholder: '请输入姓名',
      clearable: true,
    },
    required: true,
    formItemProps: {
      // 这里的验证规则会覆盖上面的必填规则
      rules: [{ required: false, message: '请输入姓名', trigger: 'blur' }],
    },
    span: 1,
  },
  {
    label: '手机号',
    name: 'name3',
    el: 'ElInput',
    componentProps: {
      placeholder: '请输入手机号',
      clearable: true,
    },
    valueType: 'phone',
    span: 1,
  },
  {
    label: '手机号2',
    name: 'name4',
    el: 'ElInput',
    componentProps: {
      placeholder: '请输入姓名',
      clearable: true,
    },
    required: true,
    valueType: 'phone',
    span: 1,
  },
  {
    label: '姓名',
    name: 'name5',
    el: 'ElInput',
    componentProps: {
      placeholder: '请输入姓名',
      clearable: true,
    },
    render: ({ searchParam }: any) => {
      // return (
      //   <div class="flx-center">
      //     <ElInput vModel_trim={form.minAge} placeholder="最小年龄" />
      //     <span class="mr10 ml10">-</span>
      //     <ElInput vModel_trim={form.maxAge} placeholder="最大年龄" />
      //   </div>
      // )

      // 普通v-model但无法使用修饰符
      return (
        <div class="flx-center">
          <ElInput v-model={searchParam.minAge} placeholder="最小年龄" />
          <span class="mr10 ml10">-</span>
          <ElInput v-model={searchParam.maxAge} placeholder="最大年龄" />
        </div>
      )

      // v-model无法使用修饰符，代替trim修饰符写法
      // return (
      //   <div class="flx-center">
      //     {/*
      //     使用 v-model.trim 的正确方式：
      //     1. 绑定 `value` 属性到 `form.minAge`
      //     2. 监听 `onInput` 事件，并在事件回调中手动更新 `form.minAge`
      //     3. 使用 .trim() 方法去除首尾空格
      //   */}
      //     <ElInput
      //       modelValue={searchParam.minAge}
      //       onUpdate:modelValue={(value: string) => {
      //         searchParam.minAge = value.trim()
      //       }}
      //       placeholder="最小年龄"
      //     />
      //     <span class="mr10 ml10">-</span>
      //     <ElInput
      //       modelValue={searchParam.maxAge}
      //       onUpdate:modelValue={(value: string) => {
      //         searchParam.maxAge = value.trim()
      //       }}
      //       placeholder="最大年龄"
      //     />
      //   </div>
      // )
    },
    span: 1,
  },
  // h函数写render写法
  // {
  //   label: '姓名',
  //   name: 'name5',
  //   el: 'ElInput',
  //   componentProps: {
  //     placeholder: '请输入姓名',
  //     clearable: true,
  //   },
  //   render: ({ searchParam }: any) => {
  //     // 使用 resolveComponent 确保类型安全
  //     const ElInputComp = resolveComponent('ElInput')

  //     return h('div', { class: 'flx-center' }, [
  //       h(ElInputComp, {
  //         modelValue: searchParam.minAge,
  //         'onUpdate:modelValue': (value: string) => {
  //           searchParam.minAge = value.trim()
  //         },
  //         placeholder: '最小年龄',
  //       }),
  //       h('span', { class: 'mr10 ml10' }, '-'),
  //       h(ElInputComp, {
  //         modelValue: searchParam.maxAge,
  //         'onUpdate:modelValue': (value: string) => {
  //           searchParam.maxAge = value.trim()
  //         },
  //         placeholder: '最大年龄',
  //       }),
  //     ])
  //   },
  //   span: 1,
  // },
  {
    label: '使用组件插槽',
    name: 'name6',
    slotName: 'name6',
    span: 1,
  },
  {
    label: '使用布局插槽',
    name: 'name7',
    slotName: 'name7Component',
    span: 2,
  },
]
const form = reactive({
  name: '',
  name2: '',
  name3: '',
  name4: '',
  name5: '',
  name6: '',
  name7: '',
  activeStart: '',
  activeEnd: '',
  minAge: '',
  maxAge: '',
})

const handleSearch = () => {
  console.log('返回按钮被点击')
}

const handleReset = () => {
  console.log('返回按钮被点击')
}
</script>

<template>
  <div class="play-app">
    <h1>Super UI Plus 组件演示</h1>

    <section class="component-demo">
      <div class="demo-item">
        <h2>Header 组件演示</h2>
        <SuperHeader title="页面标题" />
      </div>

      <div class="demo-item">
        <h2>Grid GridItem 组件演示</h2>
        <SuperGrid :gap="[10, 20]">
          <SuperGridItem :span="1" :lg="{ span: 2, offset: 2 }">
            <div class="demo-item-content">1</div>
          </SuperGridItem>
          <SuperGridItem :span="4">
            <div class="demo-item-content">1</div>
          </SuperGridItem>
          <SuperGridItem :span="1">
            <div class="demo-item-content">1</div>
          </SuperGridItem>
          <SuperGridItem :span="1">
            <div class="demo-item-content">1</div>
          </SuperGridItem>
        </SuperGrid>
      </div>

      <div class="demo-item">
        <h2>SuperSearchForm 组件演示</h2>
        <SuperSearchForm :field="field" :model="form">
          <template #name6>
            <ElInput v-model="form.name6" placeholder="使用插槽自定义内容" clearable />
          </template>
          <template #name7Component>
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
        </SuperSearchForm>
      </div>

      <div class="demo-item">
        <h2>SuperFormGrid 组件演示</h2>
        <SuperFormGrid :field="field" :model="form">
          <template #name6>
            <ElInput v-model="form.name6" placeholder="使用插槽自定义内容" clearable />
          </template>
          <template #name7Component>
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
        </SuperFormGrid>
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

.demo-item-content {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}
</style>
