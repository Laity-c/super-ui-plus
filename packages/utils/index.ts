export const getPrefixCls = (scope?: string) => {
  if (!scope) return 'gm'
  return `gm-${scope}`
}
