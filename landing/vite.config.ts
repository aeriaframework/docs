import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { aeriaGrammar as aeriaGrammarPlugin } from './plugins/index.js'

export default defineConfig({
  plugins: [
    vue(),
    aeriaGrammarPlugin(),
  ],
})
