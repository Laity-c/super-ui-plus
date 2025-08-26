import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@super-ui': resolve(__dirname, 'packages'),
    },
  },
  plugins: [vue(), vueJsx()],
})
