import type { Theme } from 'vitepress'
import { bootstrapApp } from 'aeria-ui'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import NavbarQuickSwitch from './NavbarQuickSwitch.vue'
import './custom.less'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp: ({ app }) => {
    bootstrapApp({
      app,
      instanceVars: {},
    })

    app.component('NavbarQuickSwitch', NavbarQuickSwitch)
  }
} satisfies Theme
