import { ViteSSG } from 'vite-ssg/single-page'
import { bootstrapApp } from 'aeria-ui'
import App from './app.vue'
import '@aeria-ui/ui/style.css'
import './style/theme.less'
import './style/landing.less'

export const createApp = ViteSSG(App, ({ app }) => {
  bootstrapApp({
    app,
    instanceVars: {
      base: '/',
    },
  })
})

