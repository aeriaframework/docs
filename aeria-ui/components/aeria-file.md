<script setup lang="ts">
import { ref } from 'vue'
import { AeriaFile } from 'aeria-ui'
import ResultBox from '../../src/components/result-box.vue'

const file = ref('')
</script>

# aeria-file

## Example

<result-box>
  <aeria-file v-model="file">
    Name
  </aeria-file>

  <template #result>
    Your file is: {{ file }}
  </template>
</result-box>

```vue
<script setup lang="ts">
const file = ref('')
</script>

<template>
  <aeria-file v-model="file">
    Name
  </aeria-file>

  <i>Your file is: {{ file }}</i>
</template>
```
