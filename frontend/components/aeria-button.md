# aeria-button

## Example

```vue
<script setup lang="ts">
const userStore = useStore('user')
</script>

<template>
  <aeria-button
    :loading="userStore.loading.getAll"
    @click="userStore.$actions.getAll"
  >
    Click here
  </aeria-button>
</template>
```
