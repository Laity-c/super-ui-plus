import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@super-ui-plus': resolve(__dirname, 'packages'),
    },
  },
  plugins: [vue(), vueJsx()],
})
