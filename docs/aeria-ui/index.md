---
aside: false
---

<script setup lang="ts">
import { useRouter } from 'vitepress'
import * as statics from '../src/aeria-ui/static.js'
import ApiContainer from '../src/components/api-container.vue'
import ItemCard from '../src/components/item-card.vue'

const router = useRouter()
</script>

# Aeria UI Reference

## Components

<div class="
  grid
  gap-3
  md:grid-cols-4
">
<item-card
  v-for="componentName of statics.components"
  :key="componentName"
  @click="router.go(`/aeria-ui/components/${componentName}`)"
>
  &lt;{{ componentName }} /&gt;

</item-card>
</div>

## Runtime APIs

<div class="
  grid
  md:grid-cols-3
  gap-4
">
  <api-container title="Composables">
    <a
      v-for="([symbolName, symbol]) in Object.entries(statics.composables)"
      :key="symbolName"
      :href="symbol"
    >
      {{ symbolName }}
    </a>
  </api-container>

  <api-container title="Directives">
    <a
      v-for="([symbolName, symbol]) in Object.entries(statics.directives)"
      :key="symbolName"
      :href="symbol"
    >
      {{ symbolName }}
    </a>
  </api-container>
</div>

