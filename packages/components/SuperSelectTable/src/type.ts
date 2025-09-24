import type { ColumnProps, SuperFormItemProps } from "../../../types";

export interface SuperSelectTableProps {
    modelValue: any; // 绑定值 ==> 必传
    labelKey?: string; // 自定义label字段属性名
    valueKey?: string; // 自定义value字段属性名
    multiple?: boolean; // 是否多选
    selectWidth?: string; // 选择框宽度
    filterable?: boolean; // 是否可搜索
    remote?: boolean; // 是否远程搜索
    remoteMethod?: (query: string) => void; // 远程搜索方法
    isRadio?: boolean; // 是否显示单选框
    isKeyup?: boolean; // 是否开启键盘上下键选择(仅在 isRadio 为 true 时生效)
    // valueKeys?: { valueKey: string; labelKey: string }; // 选中项的值类型配置

    // 以下为 pro-table 属性
    tableWidth?: string; // 表格宽度
    height?: string | number // 表格高度
    columns: ColumnProps[] // 列配置项  ==> 必传
    data?: (any[] | undefined | null) // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
    requestApi?: (params: any) => Promise<any> // 请求表格数据的 api ==> 非必传
    dataCallback?: (data: any) => any // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
    pagination?: boolean // 是否需要分页组件 ==> 非必传（默认为true）
    initParam?: any // 初始化请求参数 ==> 非必传（默认为{}）
    showSearch?: boolean // 是否显示搜索模块
    field?: SuperFormItemProps[] // 搜索配置列
    layout?: string // 分页组件布局
}