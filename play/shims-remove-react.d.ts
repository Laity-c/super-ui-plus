// 让全局 JSX 命名空间失效，强制用 vue/jsx-runtime
export {};
declare global {
  // @ts-ignore
  namespace React {}
}