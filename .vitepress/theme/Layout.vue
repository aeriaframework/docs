<script setup lang="ts">
import { onMounted } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import '@aeria-ui/ui/style.css'
import '../../src/style/main.less'
import '../../src/style/tailwind.css'

const { isDark } = useData()

onMounted(() => {
  if( typeof localStorage !== 'undefined' ) {
    const isDark = localStorage.getItem('vitepress-theme-appearance') === 'dark'
      || (
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      )

    if( isDark ) {
      const el = document.querySelector('#aeria-layout')
      if( el ) {
        el.classList.add('main--dark')
      }
    }
  }
})
</script>

<template>
  <div
    id="aeria-layout"
    :class="
      isDark
        ? 'main--dark tw-dark'
        : 'main'
    "
  >
    <DefaultTheme.Layout />
  </div>
</template>

