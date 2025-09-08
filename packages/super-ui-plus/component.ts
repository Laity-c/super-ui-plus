import type { Component } from "vue"

import { SuperFormGrid } from "@super-ui-plus/components/FormGrid"
import { SuperGrid } from "@super-ui-plus/components/Grid"
import { SuperGridItem } from "@super-ui-plus/components/GridItem"
import { SuperHeader } from "@super-ui-plus/components/Header"
import { SuperProTable } from "@super-ui-plus/components/ProTable"
import { SuperSearchForm } from "@super-ui-plus/components/SearchForm"


const plugins: Component[] = [
  SuperFormGrid,
  SuperGrid,
  SuperGridItem,
  SuperHeader,
  SuperProTable,
  SuperSearchForm
]

export default plugins
