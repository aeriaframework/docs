<script setup lang="ts">
import { ref } from 'vue'
import { AeriaSwitch } from 'aeria-ui'

const toggle = ref(false)
</script>

# aeria-switch

## Example

<aeria-switch v-model="toggle">
  Toggle me
</aeria-switch>

<i>Active? {{ toggle ? 'yes' : 'no' }}</i>


```vue
<script setup lang="ts">
const toggle = ref(false)
</script>

<template>
  <aeria-switch v-model="toggle">
    Toggle me
  </aeria-switch>

  <i>Active? {{ toggle ? 'yes' : 'no' }}</i>
</template>
```
