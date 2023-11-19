# aeria-tabs

## Introduction

This component will render a context menu or a horizontal strip containing tabs that will change a route param whenever a tab is clicked. The value of the clicked tab can later be accessed through `$route` or `useRoute()`.

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
