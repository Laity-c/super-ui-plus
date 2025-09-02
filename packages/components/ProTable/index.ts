import { withInstall } from 'element-plus/es/utils/vue/install'
import ProTable from './src/index.vue'

export const SuperProTable: typeof ProTable = withInstall(ProTable)
export default SuperProTable