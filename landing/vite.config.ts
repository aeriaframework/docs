import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import aeriaIcons from 'aeria-icons'
import { aeriaGrammar as aeriaGrammarPlugin } from './plugins/index.js'

export default defineConfig({
  plugins: [
    vue(),
    aeriaGrammarPlugin(),
    aeriaIcons({
      libraries: [
        '@aeria-ui/ui',
      ]
    }),
  ],
  resolve: {
    alias: {
      'bson': fileURLToPath(new URL('bson.cjs', import.meta.resolve('bson'))),
    },
  },
  optimizeDeps: {
    include: ['bson'],
  //   exclude: [
  //     'aeria',
  //     'aeria-sdk',
  //   ],
  },
})
