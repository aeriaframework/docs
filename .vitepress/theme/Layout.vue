<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { watch, provide } from 'vue'
import {
  useStore,
  meta,
  createGlobalStateManager,
  createI18n,
  GLOBAL_STATE_KEY,
  I18N_KEY,
  type StoreContext,

} from 'aeria-ui'

import '@aeria-ui/ui/style.css'
import '../../src/style/main.less'


const globalStateManager = createGlobalStateManager()
const i18n = createI18n()

provide(GLOBAL_STATE_KEY, globalStateManager.__globalState)
provide(I18N_KEY, i18n.__globalI18n)

const context: StoreContext = {
  i18n: i18n.__globalI18n,
  manager: globalStateManager,
}


const { isDark } = useData()

const metaStore = meta(context)

watch(isDark, (value) => {
  console.log('fisaifdas', value)
  metaStore.theme = value
    ? 'dark'
    : 'default'
})
</script>

<template>
  <div
    id="aeria-layout"
    :class="
      metaStore.theme === 'dark'
        ? 'main--dark'
        : 'main'
    "
  >
    <DefaultTheme.Layout />
  </div>
</template>

