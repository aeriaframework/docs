import { ViteSSG } from 'vite-ssg/single-page'
import App from './app.vue'
import './less/main.less'

export const createApp = ViteSSG(App)

