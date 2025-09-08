import type { BreakPoint } from "../../../types"

export type GridProps = {
  cols?: number | Record<BreakPoint, number>
  collapsed?: boolean
  collapsedRows?: number
  gap?: [number, number] | number
}