<script setup lang="tsx">
import type { ColumnProps, HeaderRenderScope } from '../packages/types/proTable'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { reactive, ref, watch, computed, useTemplateRef, h, resolveComponent } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElInput, ElMessage } from 'element-plus'
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

const edit = ref(false)

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

const handleClick = async (scope: any, type?: string) => {
  if (type === 'edit') {
    scope.row._edit = true
  } else if (type === 'success') {
    await proTableRef.value.validateTableForm(scope.$index)
    scope.row._edit = false
  }
}

// 自定义渲染表头（使用tsx语法）
const headerRender = (scope: any) => {
  return (
    <el-button type="primary" onClick={() => ElMessage.success('我是通过 tsx 语法渲染的表头')}>
      {scope.column.label}
    </el-button>
  )
}
const proTableRef = useTemplateRef('proTable')

watch(
  () => proTableRef.value?.radio,
  () =>
    proTableRef.value?.radio &&
    ElMessage.success(`选中 id 为【${proTableRef.value?.radio}】的数据`),
)

// 表格配置项
const columns = reactive<ColumnProps<any>[]>([
  { type: 'selection', fixed: 'left', width: 70 },
  { type: 'sort', label: 'Sort', width: 80 },
  { type: 'expand', label: 'Expand', width: 85 },
  { prop: 'idCard', label: '身份证号', format: value => '身份证号:' + value },
  {
    prop: 'email',
    label: '邮箱',
    render: scope => {
      return <span style={{ color: 'red' }}>{scope.row.email}</span>
    },
  },
  { prop: 'address', label: '居住地址' },
  { prop: 'date', label: '创建时间', format: 'date' },
  {
    prop: 'tag',
    label: '标签',
    tag: ({ row }) => {
      switch (row.tag) {
        case 0:
          return { type: 'success' }
        case 1:
          return { type: 'info' }
        case 2:
          return { type: 'warning' }
        case 3:
          return { type: 'danger' }
        default:
          break
      }
    },
  },
  {
    prop: 'base',
    label: '基本信息',
    headerRender,
    _children: [
      { prop: 'username', label: '用户姓名', width: 110 },
      {
        prop: 'age',
        label: '年龄',
        width: 100,
        isEdit: true,
        required: true,
        // edit: true,
        el: 'ElInput',
        formItemProps: {
          rules: [
            {
              validator: (_rule, value, callback) => {
                if (Number(value) > 10) {
                  callback()
                } else {
                  callback('输入值不能小于10')
                }
              },
              trigger: 'change',
            },
          ],
        },
      },
      {
        prop: 'gender',
        label: '性别',
        // isEdit: true,
        // edit,
        // edit: () => edit.value,
        el: 'ElInput',
        width: 100,
      },
      {
        prop: 'number1',
        label: '数值1',
        isEdit: true,
        el: 'ElInput',
        sumDataPrefix: '￥',
        formItemProps: {
          rules: [
            {
              validator: (_rule, value, callback) => {
                if (Number(value) > 10) {
                  callback()
                } else {
                  callback('输入值不能小于10')
                }
              },
              trigger: 'change',
            },
          ],
        },
        width: 100,
      },
      {
        prop: 'details',
        label: '详细资料',
        _children: [
          { prop: 'idCard', label: '身份证号' },
          { prop: 'email', label: '邮箱' },
          { prop: 'address', label: '居住地址' },
          {
            prop: 'number2',
            label: '自定义数值2',
            sumFilter: (value, row) => {
              return `%${value}`
            },
          },
        ],
      },
    ],
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 330 },
])

const data = reactive<any[]>([
  {
    id: 1,
    idCard: '110101199001011234',
    email: '<EMAIL>',
    address: '北京',
    date: Date.now(),
    tag: 0,
    number1: 1,
    number2: 2,
    _edit: false,
  },
  {
    id: 1,
    idCard: '110101199001011234',
    email: '<EMAIL>',
    address: '北京',
    date: Date.now(),
    tag: 1,
    number1: 1,
    number2: 2,
    _edit: false,
  },
  {
    id: 1,
    idCard: '110101199001011234',
    email: '<EMAIL>',
    address: '北京',
    tag: 2,
    number1: 1,
    number2: 2,
    _edit: false,
  },
])

const data2 = reactive<any[]>([])
const initParam = reactive({
  name: '张三',
  name2: '',
  name3: '',
  name6: '',
  activeStart: '',
  activeEnd: '',
})

Array.from({ length: 100 }).forEach((_, index) => {
  data2.push({
    id: index,
    idCard: '110101199001011234',
    email: '<EMAIL>',
    address: '北京',
    tag: 2,
    number1: 1,
    number2: 2,
    _edit: false,
  })
})

// 表格配置项
const columns2 = reactive<ColumnProps<any>[]>([
  { type: 'radio', label: '单选', width: 80 },
  { prop: '$index', label: '序号', width: 80 },
  { prop: 'idCard', label: '身份证号' },
  { prop: 'email', label: '邮箱' },
  { prop: 'address', label: '居住地址' },
  { prop: 'date', label: '创建时间', format: 'date' },
  {
    prop: 'tag',
    label: '标签',
    tag: ({ row }) => {
      switch (row.tag) {
        case 0:
          return { type: 'success' }
        case 1:
          return { type: 'info' }
        case 2:
          return { type: 'warning' }
        case 3:
          return { type: 'danger' }
        default:
          break
      }
    },
  },
])

// 搜索表单配置项
const field2 = [
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
      // 普通v-model但无法使用修饰符
      return (
        <div class="flx-center">
          <ElInput v-model={searchParam.minAge} placeholder="最小年龄" />
          <span class="mr10 ml10">-</span>
          <ElInput v-model={searchParam.maxAge} placeholder="最大年龄" />
        </div>
      )
    },
    span: 1,
  },
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

const treeProTableRef: any = useTemplateRef('treeProTable')
const selectedList: any = computed(() => treeProTableRef.value?.selectedList)
const selectedListIds: any = computed(() => treeProTableRef.value?.selectedListIds)

const treeColumns = reactive<ColumnProps<any>[]>([
  { type: 'selection', width: 80 },
  { type: 'index', width: 80 },
  { prop: 'date', label: '日期' },
  { prop: 'name', label: '姓名' },
  { prop: 'address', label: '地址' },
])
// 生成树形结构数据
// 定义树节点类型
interface TreeNode {
  id: string
  date: number
  name: string
  address: string
  children?: TreeNode[]
}
const generateTreeData = (level = 0, count = 100, parentId: string | null = null) => {
  const data: TreeNode[] = []
  for (let i = 0; i < count; i++) {
    const id = parentId ? `${parentId}-${i}` : `${i}`
    const item: TreeNode = {
      id,
      date: Date.now(),
      name: `张三${level}-${i}`,
      address: `北京${level}-${i}`,
    }

    // 添加子节点（最多3层）
    if (level < 2 && Math.random() > 0.3) {
      item.children = generateTreeData(level + 1, Math.floor(Math.random() * 3) + 1, id)
    }

    data.push(item)
  }
  return data
}
const treeData = reactive<any[]>(generateTreeData())
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

      <div class="demo-item">
        <h2>SuperProTable 组件演示</h2>
        <SuperProTable
          ref="proTable"
          :columns="columns"
          :data="data"
          :show-summary="true"
          ifDblclick
        >
          <!-- 表格 header 按钮 -->
          <template #tableHeader="scope">
            <el-switch v-model="edit"></el-switch>
            <el-button type="primary" @click="edit = !edit">
              {{ `${edit ? '完成' : '编辑'}` }} {{ edit }}
            </el-button>
            <el-button type="primary" plain @click="proTableRef.validateTableForm()">
              表单校验
            </el-button>
            <el-button type="primary" plain @click="handleClick(scope)">导出用户数据</el-button>
            <el-button type="primary" plain @click="handleClick(scope)">To 子集详情页面</el-button>
            <el-button type="danger" plain @click="handleClick(scope)">批量删除用户</el-button>
          </template>

          <!-- 表格操作 -->
          <template #operation="scope">
            <el-button type="primary" link @click="handleClick(scope)">查看</el-button>
            <el-button type="primary" link @click="handleClick(scope, 'edit')">编辑</el-button>
            <el-button type="primary" link @click="handleClick(scope, 'success')">完成</el-button>
            <el-button type="primary" link @click="handleClick(scope)">重置密码</el-button>
            <el-button type="primary" link @click="handleClick(scope)">删除</el-button>
          </template>
        </SuperProTable>

        {{ form }}
      </div>

      <div class="demo-item">
        <h2>SuperProTable 组件树形表格演示</h2>
        <div>选中的数据：{{ selectedList }}</div>
        <div>选中的数据id: {{ selectedListIds }}</div>
        <SuperProTable ref="treeProTable" :columns="treeColumns" :data="treeData">
          <template #tableHeader="scope">
            <el-button type="primary" plain @click="handleClick(scope)">导出用户数据</el-button>
            <el-button type="primary" plain @click="handleClick(scope)">To 子集详情页面</el-button>
            <el-button type="danger" plain @click="handleClick(scope)">批量删除用户</el-button>
          </template>
        </SuperProTable>
      </div>

      <div class="demo-item">
        <h2>SuperProTable 组件带搜索条件演示</h2>
        <SuperProTable
          ref="proTable"
          :field="field2"
          :columns="columns2"
          :data="data2"
          :initParam="initParam"
          showSearch
        >
          <template #name6="{ searchParam }">
            <ElInput v-model="searchParam.name6" placeholder="使用插槽自定义内容" clearable />
          </template>
          <template #name7Component="{ searchParam }">
            <SuperGrid :gap="[10, 20]">
              <SuperGridItem :span="4">
                <el-form-item label="活动时间：">
                  <div class="flx-center">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="searchParam.activeStart"
                      style="width: 100%"
                    ></el-date-picker>
                    <span class="line">-</span>
                    <el-time-picker
                      placeholder="选择时间"
                      v-model="searchParam.activeEnd"
                      style="width: 100%"
                    ></el-time-picker>
                  </div>
                </el-form-item>
              </SuperGridItem>
            </SuperGrid>
          </template>
          <!-- 表格 header 按钮 -->
          <template #tableHeader="scope">
            <el-button type="primary" plain @click="handleClick(scope)">导出用户数据</el-button>
            <el-button type="primary" plain @click="handleClick(scope)">To 子集详情页面</el-button>
            <el-button type="danger" plain @click="handleClick(scope)">批量删除用户</el-button>
          </template>
        </SuperProTable>
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
