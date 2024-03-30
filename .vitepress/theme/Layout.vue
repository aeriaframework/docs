<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import '@aeria-ui/ui/style.css'
import '../../src/style/main.less'
import '../../src/style/tailwind.css'

const data = useData()
const isDark = ref(data.isDark)

nextTick(() => {
  isDark.value = data.isDark.value
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

