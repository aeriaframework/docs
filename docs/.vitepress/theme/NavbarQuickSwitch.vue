<script setup lang="ts">
import { AeriaIcon } from 'aeria-ui'
import { useRouter, useData } from 'vitepress'
import { computed } from 'vue'

const { page } = useData()
const router = useRouter()
const isOnAeria = computed(() => {
  return page.value.relativePath.startsWith('aeria/')
})

const quickSwitch = () => {
  return isOnAeria.value
    ? router.go('/aeria-ui/')
    : router.go('/aeria/')
}
</script>

<template>
  <aeria-icon icon="arrows-clockwise" icon-right href="#" class="button" @click="quickSwitch">
    {{
      isOnAeria
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

