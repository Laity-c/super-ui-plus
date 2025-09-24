export interface SuperSelectProps{
    modelValue: string | number | Array<any> | Record<string, any> | undefined
    useVirtual?: boolean; // 是否使用虚拟列表
    options?: Array<any>;
    labelKey?: string; // 自定义label字段属性名
    valueKey?: string; // 自定义value字段属性名
    disabled?: boolean | ((item: any) => boolean); // 是否禁用
    filterable?: boolean, // 是否可搜索
    width?: string // 组件宽度
    multiple?: boolean; // 是否多选
    hasCheckAll?: boolean; // 是否显示全选
    prefix?: boolean | string | ((item: any) => string); // 是否使用前缀
    valueIsObject?: boolean; // 值是否为对象
}