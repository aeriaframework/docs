<script setup lang="ts">
import { ref } from 'vue'
import { AeriaInput } from 'aeria-ui'

const name = ref('changeme')
</script>

# aeria-input

## Example

<aeria-input v-model="name">
  Name
</aeria-input>

<i>Your name is: {{ name }}</i>

```vue
<script setup lang="ts">
const name = ref('')
</script>

<template>
  <aeria-input v-model="name">
    Name
  </aeria-input>

  <i>Your name is: {{ name }}</i>
</template>
```
