import type { Theme } from 'vitepress'
import { registerDirectives } from 'aeria-ui'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.less'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp: ({ app }) => {
    registerDirectives(app)
  }
} satisfies Theme
