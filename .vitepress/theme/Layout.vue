<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import '@aeria-ui/ui/style.css'
import '../../src/style/main.less'

const { isDark } = useData()
</script>

<template>
  <div
    id="aeria-layout"
    :class="
      isDark
        ? 'main--dark'
        : 'main'
    "
  >
    <DefaultTheme.Layout />
  </div>
</template>

