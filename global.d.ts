// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SuperHeader: typeof import('@super-ui-plus') ['SuperHeader']
    SuperGrid: typeof import('@super-ui-plus') ['SuperGrid']
    SuperGridItem: typeof import('@super-ui-plus') ['SuperGridItem']
    SuperFormGrid: typeof import('@super-ui-plus') ['SuperFormGrid']
    SuperSearchForm: typeof import('@super-ui-plus') ['SuperSearchForm']
    SuperProTable: typeof import('@super-ui-plus') ['SuperProTable']
  }
}

export { }
