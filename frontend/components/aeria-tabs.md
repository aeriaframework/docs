# aeria-tabs

## Example

```vue
<script setup lang="ts">
type Section = 
  | 'home'
  | 'about'
  | 'contact'

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

  <div v-if="section === 'contact'">
    Contact us...
  </div>
</template>
```
