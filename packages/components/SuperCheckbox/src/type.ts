export interface SuperCheckboxProps {
    modelValue: Array<any>
    type?: 'checkbox' | 'button';
    size?: 'small' | 'default' | 'large';
    border?: boolean;
    options:  Array<any>;
    labelKey?: string; // 自定义label字段属性名
    valueKey?: string; // 自定义value字段属性名
    prefix?: boolean | string | ((item: any) => string); // 是否使用前缀
    disabled?: boolean | ((item: any) => boolean); // 是否禁用
    include?: Array<string | number>; // 包含的选项
    exclude?: Array<string | number>; // 排除的选项
    hasCheckAll?: boolean; // 是否显示全选
    valueKeys?: { valueKey: string; labelKey: string }; // 选中项的值类型配置
    exclusion?: number | string | { value: string; exclusion: string} | Array<{ value: string; exclusion: string}>[]; // 选项互斥
}