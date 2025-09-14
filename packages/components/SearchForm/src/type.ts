import type { SuperFormItemProps, BreakPoint } from '../../../types'

export interface SearchFormProps {
  field?: SuperFormItemProps[] // 搜索配置列
  model: { [key: string]: any } // 搜索参数
  searchCol?: number | Record<BreakPoint, number>
  ifCollapsed?: boolean // 展开/收起状态
  ifCardStyle?: boolean // 是否使用 card 样式
  autoSearch?: boolean // 是否开启自动搜索
  hideSearch?: boolean; // 是否隐藏搜索按钮
  hideReset?: boolean; // 是否隐藏重置按钮
}