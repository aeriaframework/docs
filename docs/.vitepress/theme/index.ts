import type { Theme } from 'vitepress'
import { registerDirectives, createGlobalStateManager, createI18n, meta, user, type StoreContext } from 'aeria-ui'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.less'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp: ({ app }) => {
    registerDirectives(app)

    const globalStateManager = createGlobalStateManager()
    app.use(globalStateManager)

    const i18n = createI18n()
    app.use(i18n)

    const context: StoreContext = {
      i18n: i18n.__globalI18n,
      manager: globalStateManager,
    }

    const metaStore = meta(context)
    const userStore = user(context)
  }
} satisfies Theme
