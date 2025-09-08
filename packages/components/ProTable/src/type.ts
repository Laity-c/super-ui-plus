import type { TableColumnCtx } from 'element-plus'
import type { ColumnProps, SuperFormItemProps } from "../../../types";

export interface Pageable {
  pageNum: number
  pageSize: number
  total: number
}

export interface PaginationProps {
  pageable: Pageable
  handleSizeChange: (size: number) => void
  handleCurrentChange: (currentPage: number) => void
}

export interface TableColumnProps {
  column: ColumnProps
  currentRowIndex?: number
  currentColumnIndex?: number
  ifDblclick?: boolean
  isValidate?: boolean // 是否开启数据验证
  pageable?: Pageable // 分页信息
}

export interface ProTableProps {
  columns: ColumnProps[] // 列配置项  ==> 必传
  data?: any[] // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
  requestApi?: (params: any) => Promise<any> // 请求表格数据的 api ==> 非必传
  requestAuto?: boolean // 是否自动执行请求 api ==> 非必传（默认为true）
  requestError?: (params: any) => void // 表格 api 请求错误监听 ==> 非必传
  dataCallback?: (data: any) => any // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
  title?: string // 表格标题 ==> 非必传
  pagination?: boolean // 是否需要分页组件 ==> 非必传（默认为true）
  initParam?: any // 初始化请求参数 ==> 非必传（默认为{}）
  border?: boolean // 是否带有纵向边框 ==> 非必传（默认为true）
  toolButton?: ('refresh' | 'setting' | 'search')[] | boolean // 是否显示表格功能按钮 ==> 非必传（默认为true）
  rowKey?: string // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
  showSummary?: boolean // 是否在表格底部显示合计行
  sumText?: string // 自定义合计行文本
  sumNaNText?: string // 当数据为非数字时，该字段用于代替合计行显示的值
  ifDblclick?: boolean // 是否开启双击单元格编辑
  showSearch?: boolean // 是否显示搜索模块
  field?: SuperFormItemProps[] // 搜索配置列
}

export interface SummaryMethodProps<T = any> {
  columns: TableColumnCtx[]
  data: T[]
}