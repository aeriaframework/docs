# aeria-bare-button

## Example

```vue
<script setup lang="ts">
const count = ref(0)
</script>

<template>
  <aeria-bare-button
    disabled
    @click="count += 1"
  >
    {{ count }}
  </aeria-bare-button>
</template>
```
