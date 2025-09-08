// 基础
const excludes = [
  'node_modules',
  '__tests__',
  'dist',
  'packages/eslint-config',
  'packages/utils',
  'packages/theme-chalk',
  'packages/resolver',
  'tableColumn函数式组件写法(因为打包会报错，所以用了上面的文件).vue',
]

export const excludeFiles = (files: string[]) => {
  return files.filter(path => ![...excludes].some(exclude => path.includes(exclude)))
}
