<script setup lang="ts">
import { useRouter } from 'vitepress'
import { components } from '../static'
import ItemCard from './item-card.vue'

const router = useRouter()
</script>

<template>
  <div class="
    tw-grid
    tw-gap-3
    md:tw-grid-cols-3
  ">
    <item-card
      v-for="componentName of components"
      :key="componentName"
      @click="router.go(`/aeria-ui/components/${componentName}`)"
    >
      &lt;{{ componentName }} /&gt;
    </item-card>
  </div>
</template>
