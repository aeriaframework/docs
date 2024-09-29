<script setup lang="ts">
import { ref } from 'vue'
import { AeriaSwitch } from 'aeria-ui'
import ResultBox from '../../src/components/result-box.vue'

const toggle = ref(false)
</script>

# aeria-switch

### Example

<result-box title="Active?">
  <aeria-switch v-model="toggle">
    Toggle me
  </aeria-switch>

  <template #result>
    {{ toggle ? 'yes' : 'no' }}
  </template>
</result-box>


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
