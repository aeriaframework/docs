<script setup lang="ts">
import { AeriaIcon } from 'aeria-ui'
import { useRouter, useData } from 'vitepress'
import { computed } from 'vue'

const { page } = useData()
const router = useRouter()
const relativePath = computed(() => {
  return page.value.relativePath
})

const quickSwitch = () => {
  return relativePath.value.startsWith('aeria/')
    ? router.go('/aeria-ui/')
    : router.go('/aeria/')
}
</script>

<template>
  <aeria-icon
    v-if="/^aeria(-ui)?\//.test(relativePath)"
    icon-right
    icon="arrows-clockwise"
    href="#"
    class="button"
    @click="quickSwitch"
  >
    {{
      relativePath.startsWith('aeria/')
        ? 'Aeria UI'
        : 'Aeria'
    }}
  </aeria-icon>
</template>

<style scoped lang="less">
.button {
  padding: 0 1rem;
  font-weight: 600;

  &:hover {
    color: var(--vp-c-brand-1);
  }
}
</style>

