import { regexp, message } from "./regExp";

// 设置组件前缀
export const getPrefixCls = (scope?: string) => {
  if (!scope) return 'super'
  return `super-${scope}`
}

// 手机号验证规则
export function phoneValidator(rule: any, value: string, callback: (error?: Error) => void) {
  if(!value) {
    return callback();
  }
  
  if (regexp.mobile.test(value) || regexp.phone.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的手机号或座机号码"));
  }
}

// 设置校验规则
export function setRules(valueType: keyof typeof regexp, rules: any[] = [], label = "", validator = null) {
  // 如果传入了自定义的 validator 函数，则使用它
  if (validator) {
    return [...rules, { validator }];
  }

  // 根据 valueType 添加不同的校验规则
  if (valueType === "required") {
    return [...rules, { required: true, message: `${label}必填` }];
  }

  if (valueType === "phone") {
    return [...rules, { validator: phoneValidator }];
  }

  // 其他类型的校验规则
  return [...rules, { pattern: regexp[valueType], message: message[valueType] }];
}
