import type { Component } from "vue"

import { SuperFormGrid } from "@super-ui-plus/components/FormGrid"
import { SuperGrid } from "@super-ui-plus/components/Grid"
import { SuperGridItem } from "@super-ui-plus/components/GridItem"
import { SuperHeader } from "@super-ui-plus/components/Header"
import { SuperProTable } from "@super-ui-plus/components/ProTable"
import { SuperSearchForm } from "@super-ui-plus/components/SearchForm"
import { SuperRadio } from "@super-ui-plus/components/SuperRadio"
import { SuperCheckbox } from "@super-ui-plus/components/SuperCheckbox"
import { SuperSelect } from "@super-ui-plus/components/SuperSelect"
import { SuperSelectTable } from "@super-ui-plus/components/SuperSelectTable"

const plugins: Component[] = [
  SuperFormGrid,
  SuperGrid,
  SuperGridItem,
  SuperHeader,
  SuperProTable,
  SuperSearchForm,
  SuperRadio,
  SuperCheckbox,
  SuperSelect,
  SuperSelectTable
]

export default plugins
