# aeria-tabs

## Introduction

This component renders either a context menu or horizontal tabs that will change a specified router param.

## Example

```vue
<script setup lang="ts">
type Section = 
  | 'home'
  | 'about'

const router = await useRouter()
const section = computed(() => {
  router.currentRoute.value.query.section as Section || 'home'
})
</script>

<template>
  <aeria-tabs query="section">
    <template #home>Home</template>
    <template #about>About</template>
    <template #contact>Contato</template>
  </aeria-tabs>

  <div v-if="section === 'home'">
    Welcome!
  </div>
  
  <div v-if="section === 'about'">
    About us...
  </div>
</template>
```
