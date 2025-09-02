import { regexp, message } from "./regExp";
import dayjs from "dayjs";

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
    return [...rules, { required: true, message: `${label}必填`, index: 1 }];
  }

  if (valueType === "phone") {
    return [...rules, { validator: phoneValidator, index: 1 }];
  }

  // 其他类型的校验规则
  return [...rules, { pattern: regexp[valueType], message: message[valueType] }];
}

/**
 * @description 生成唯一 uuid
 * @returns {String}
 */
export function generateUUID() {
  let uuid = "";
  for (let i = 0; i < 32; i++) {
    let random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) uuid += "-";

    let digit: number;
    if (i === 12) {
      digit = 4;
    } else if (i === 16) {
      digit = (random & 3) | 8;
    } else {
      digit = random;
    }

    uuid += digit.toString(16);
  }
  return uuid;
}

/**
 * @description 处理 ProTable 值为数组 || 无数据
 * @param {*} callValue 需要处理的值
 * @returns {String}
 * */
export function formatValue(callValue: any, format?: ((value: any) => string) | string) {
  // 如果当前值为数组，使用 / 拼接（根据需求自定义）
  if (Array.isArray(callValue)) return callValue.length ? callValue.join(" / ") : "--";

  // 内置格式化方式
  if(format && callValue) {
    if (typeof format === "function") {
      return format(callValue);
    }

    if (format === "date") {
      return dayjs(callValue).format("YYYY-MM-DD");
    }

    if (format === "dateTime") {
      return dayjs(callValue).format("YYYY-MM-DD HH:mm:ss");
    }

    if (format === "dateTHM") {
      return dayjs(callValue).format("YYYY-MM-DD HH:mm");
    }
    
    if (format === "time") {
      return dayjs(callValue).format("HH:mm:ss");
    }
  }


  return callValue ?? "--";
}

/**
 * @description 判断是否是函数
 * @param {*} fn 判断对象
 * @returns {Boolean}
 * */

export const isFunction = (fn: any) => {
  return typeof fn === "function";
};