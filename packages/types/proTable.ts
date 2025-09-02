import type { VNode, Ref } from "vue";
import type { DefaultRow } from "element-plus/es/components/table/src/table/defaults";
import type { FormItemProps } from "element-plus";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import type { ProTableProps, SummaryMethodProps } from "../components/ProTable/src/index.vue";
import type { SearchType } from "./searchForm"
import ProTable from "../components/ProTable/index.vue";

export interface EnumProps {
  label?: string; // 选项框显示的文字
  value?: string | number | boolean | any[]; // 选项框值
  disabled?: boolean; // 是否禁用此选项
  tagType?: string; // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[]; // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any;
}

export type TypeProps = "index" | "selection" | "radio" | "expand" | "sort";

export type RenderScope<T> = {
  row: T;
  $index: number;
  column: TableColumnCtx<T extends DefaultRow ? T : DefaultRow>;
  [key: string]: any;
};

export type HeaderRenderScope<T> = {
  $index: number;
  column: TableColumnCtx<T extends DefaultRow ? T : DefaultRow>;
  [key: string]: any;
};

export interface ColumnProps<T extends DefaultRow = DefaultRow>
  extends Partial<Omit<TableColumnCtx<T>, "type" | "children" | "renderCell" | "renderHeader">> {
  type?: TypeProps; // 列类型
  tag?: (scope: RenderScope<T>) => any; // 是否是标签展示
  isShow?: boolean | Ref<boolean>; // 是否显示在表格当中
  isSetting?: boolean | Ref<boolean>; // 是否在 ColSetting 中可配置
  isEdit?: boolean | Ref<boolean>; // 是否可编辑
  edit?: boolean | Ref<boolean>; // 编辑状态
  required?: boolean; // 是否必填
  valueType?: string; // 内置验证规则类型
  formItemProps?: Partial<FormItemProps>; // 透传 el-form-item 属性
  el?: SearchType; // 组件名称
  enum?: EnumProps[] | Ref<EnumProps[]> | ((params?: any) => Promise<any>); // 枚举字典
  headerRender?: (scope: HeaderRenderScope<T>) => VNode; // 自定义表头内容渲染（tsx语法）
  render?: (scope: RenderScope<T>) => VNode | string; // 自定义单元格内容渲染（tsx语法）
  format?: ((value: any) => string) | string; // 内置格式化方式
  sumFilter?: (value: any, param: SummaryMethodProps) => string // 自定义合计内容
  sumDataPrefix?: string // 合计数据前缀
  _children?: ColumnProps<T>[]; // 多级表头
}

export type ProTableInstance = Omit<InstanceType<typeof ProTable>, keyof ProTableProps>;
