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
    setTimeout(() => {
      console.log('uepaaa')
      isDark.value = localStorage.getItem('vitepress-theme-appearance') === 'dark'
      console.log(localStorage)
      console.log(isDark.value)
    }, 100)
  }
})
</script>

<template>
  <h1>{{ isDark? 'fsafdsjaifnasj' : 'n' }}</h1>
  <div
    id="aeria-layout"
    :key="`${isDark}`"
    :class="
      isDark
        ? 'main--dark tw-dark'
        : 'main'
    "
  >
    <DefaultTheme.Layout />
  </div>
</template>

