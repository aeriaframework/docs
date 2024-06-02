---
aside: false
---

<script setup lang="ts">
import * as statics from '../src/aeria/static.js'
import ApiContainer from '../src/components/api-container.vue'
</script>

# Aeria Reference

## Public API

<div class="
  grid
  md:grid-cols-3
  gap-4
">
  <api-container title="General">
    <a
      v-for="([symbolName, symbol]) in Object.entries(statics.general)"
      :key="symbolName"
      :href="symbol"
    >
      {{ symbolName }}
    </a>
  </api-container>

  <api-container title="Error handling">
    <a
      v-for="([symbolName, symbol]) in Object.entries(statics.errorHandling)"
      :key="symbolName"
      :href="symbol"
    >
      {{ symbolName }}
    </a>
  </api-container>
</div>

## Builtins

<div class="
  grid
  md:grid-cols-3
  gap-4
">
  <api-container title="Collections">
    <a
      v-for="([symbolName, symbol]) in Object.entries(statics.builtinCollections)"
      :key="symbolName"
      :href="symbol"
    >
      {{ symbolName }}
    </a>
  </api-container>

  <api-container title="Functions">
    <a
      v-for="([symbolName, symbol]) in Object.entries(statics.builtinFunctions)"
      :key="symbolName"
      :href="symbol"
    >
      {{ symbolName }}
    </a>
  </api-container>
</div>


