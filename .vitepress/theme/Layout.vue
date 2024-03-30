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
    isDark.value = localStorage.getItem('vitepress-theme-appearance') === 'dark'
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

