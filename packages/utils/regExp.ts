/* eslint-disable no-control-regex */
export const regexp = {
  required: /.+/, // 必填 验证非空字符串或匹配包含任意内容的文本
  /**
   * 数字正则
   */
  positiveNumber: /^[0-9]*$/,
  /**
   * 零和非零开头的数字
   */
  effecNumber: /^(0|[1-9][0-9]*)$/,
  /**
   * 非零开头的最多带两位小数的数字
   */
  decimalsNumber: /^([1-9][0-9]*)+(.[0-9]{1,2})?$/,
  /**
   * 正数、负数、和小数
   */
  number: /^(\-|\+)?\d+(\.\d+)?$/,
  /**
   * 汉字
   */
  chinese: /^[\u4e00-\u9fa5]{0,}$/,
  /**
   * 邮箱
   */
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  /**
   * 网页
   */
  www: /^(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/,
  /**
   * 手机号
   */
  mobile: /^1\d{10}$/,
  /**
   * 电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)
   */
  phone: /^(\(\d{3,4}\)-|\d{3,4}-)?\d{7,8}$/,
  /**
   * 身份证号码
   */
  idCard: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  /**
   * 双字节
   * 包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1)
   */
  doubleByte: /[^\x00-\xff]/,
  /**
   * 中国邮政编码
   */
  zipCode: /[1-9]\d{5}(?!\d)/,
  /**
   * 百分制
   */
  centesimal: /([1-9]?\d|100)$/
};
export const message = {
  /**
   * 数字正则
   */
  positiveNumber: "请输入正整数",
  /**
   * 零和非零开头的数字
   */
  effecNumber: "请输入零和非零开头的数字",
  /**
   * 非零开头的最多带两位小数的数字
   */
  decimalsNumber: "请输入非零开头的最多带两位小数的数字",
  /**
   * 正数、负数、和小数
   */
  number: "请输入正确数字",
  /**
   * 汉字
   */
  chinese: "请输入汉字",
  /**
   * 邮箱
   */
  email: "邮箱不合法，请输入合法邮箱",
  /**
   * 网页
   */
  www: "请输入http://或者https://网址",
  /**
   * 手机号
   */
  mobile: "请输入正确的手机号",
  /**
   * 电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)
   */
  phone: "请输入正确的电话号码",
  /**
   * 身份证号码
   */
  idCard: "请输入正确的身份证号码",
  /**
   * 双字节
   * 包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1)
   */
  doubleByte: "",
  /**
   * 中国邮政编码
   */
  zipCode: "请输入正确的邮政编码",
  /**
   * 百分制
   */
  centesimal: "请输入一百以内的正整数"
};

/**
 * n-m位的数字
 * @param {number} n
 * @param {number} m
 * @returns RegExp
 */
export const number = (n: number, m: number) => {
  return new RegExp(`^[0-9]{${n},${m}}$`);
};

/**
 * n-m位的数字 零和非零开头的数字
 * @param {*} n
 * @param {*} m
 * @returns RegExp
 */
export const effecNumber = (n: number, m: number) => {
  return new RegExp(`^(0|[1-9][0-9]{${n},${m}})$`);
};
/**
 * n-m位的汉字
 * @param {*} n
 * @param {*} m
 * @returns RegExp
 */
export const chinese = (n: number, m: number) => {
  return new RegExp(`^[\u4e00-\u9fa5]{${n},${m}}$`);
};
