<script setup lang="ts">
import { ref } from 'vue'
import { AeriaCheckbox } from 'aeria-ui'
import ResultBox from '../../src/components/result-box.vue'

const tosAccepted = ref(false)
</script>

# aeria-checkbox

### Example

<result-box title="Terms of Use accepted?">
  <aeria-checkbox
    v-model="tosAccepted"
    :property="{
      type: 'boolean',
    }"
  >
    I have read and accepted the <a href="#">Terms of Use</a>
  </aeria-checkbox>

  <template #result>
    {{ tosAccepted ? 'yes' : 'no' }}
  </template>
</result-box>

```vue
<script setup lang="ts">
const tosAccepted = ref(false)
</script>

<template>
  <aeria-checkbox
    v-model="tosAccepted"
    :property="{
      type: 'boolean',
    }"
  >
    Accept Terms of Use
  </aeria-checkbox>

  <i>Terms of Use accepted? {{ tosAccepted ? 'yes' : 'no' }}</i>
</template>
```

