<script setup lang="ts">
import { ref } from 'vue'
import { AeriaInput } from 'aeria-ui'
import ResultBox from '../../src/components/result-box.vue'

const name = ref('changeme')
</script>

# aeria-input

## Example

<result-box>
  <aeria-input v-model="name">
    Name
  </aeria-input>

  <template #result>
    {{ name }}
  </template>
</result-box>

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
