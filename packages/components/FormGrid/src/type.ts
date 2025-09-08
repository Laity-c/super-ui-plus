import type { BreakPoint, SuperFormItemProps } from '../../../types/index'

export type FormGridProps = {
  field?: SuperFormItemProps[] // 搜索配置列
  model: { [key: string]: any } // 搜索参数
  searchCol?: number | Record<BreakPoint, number>
  collapsed?: boolean // 展开/收起状态
  ifCardStyle?: boolean // 是否使用 card 样式
}

export type SearchFormItemProps = {
  field: SuperFormItemProps
  model: { [key: string]: any }
}