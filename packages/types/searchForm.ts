import type { VNode, Ref } from "vue";
import type { EnumProps, BreakPoint, Responsive } from "./index.ts";
import type { FormItemProps } from "element-plus";

export type SearchType =
  | "ElInput"
  | "ElInputNumber"
  | "ElSelect"
  | "ElSelectV2"
  | "ElTreeSelect"
  | "ElCascader"
  | "ElDatePicker"
  | "ElTimePicker"
  | "ElTimeSelect"
  | "ElSwitch"
  | "ElSlider";

export type SearchRenderScope = {
  searchParam: { [key: string]: any };
  placeholder: string;
  clearable: boolean;
  options: EnumProps[];
  data: EnumProps[];
};

export type SearchProps = {
  el?: SearchType; // 当前项搜索框的类型
  label?: string; // 当前项搜索框的 label
  props?: any; // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
  key?: string; // 当搜索项 key 不为 prop 属性时，可通过 key 指定
  tooltip?: string; // 搜索提示
  order?: number; // 搜索项排序（从大到小）
  span?: number; // 搜索项所占用的列数，默认为 1 列
  offset?: number; // 搜索字段左侧偏移列数
  defaultValue?: string | number | boolean | any[] | Ref<any>; // 搜索项默认值
  render?: (scope: SearchRenderScope) => VNode; // 自定义搜索内容渲染（tsx语法）
} & Partial<Record<BreakPoint, Responsive>>;

export type FieldNamesProps = {
  label: string;
  value: string;
  children?: string;
};

export type SuperFormItemProps = {
  el?: SearchType; // 当前项搜索框的类型
  label?: string; //标题名称
  name: string; // 绑定字段名
  labelWidth?: number; // 搜索项 label 宽度
  tooltip?: string; // 搜索提示
  required?: boolean; // 是否必填
  valueType?: string; // 内置验证规则类型
  rules?: any; // 搜索项验证规则
  fieldNames?: FieldNamesProps; // 指定 label && value && children 的 key 值 可以指定el-select他们的labelkey或valueKey
  options?: EnumProps[]; // 下拉选项数据	
  span?: number; // 搜索项所占用的列数，默认为 1 列
  offset?: number; // 搜索字段左侧偏移列数
  show?: boolean | (() => boolean); // 是否显示
  render?: (scope: SearchRenderScope) => VNode; // 自定义搜索内容渲染（tsx语法）
  slotName?: string; // 自定义搜索内容插槽名称
  scopedSlots?: any; //组件自身插槽
  formItemProps?: Partial<FormItemProps>; // 透传 el-form-item 属性
  componentProps?: any; // 透传组件属性
} & Partial<Record<BreakPoint, Responsive>>;