<script setup lang="ts">
import { ref } from 'vue'
import { AeriaCheckbox } from 'aeria-ui'

const tosAccepted = ref(false)
</script>

# aeria-checkbox

## Example

<aeria-checkbox
  v-model="tosAccepted"
  :property="{
    type: 'boolean',
  }"
>
  I have read and accepted the <a href="#">Terms of Use</a>
</aeria-checkbox>

<i>Terms of Use accepted? {{ tosAccepted ? 'yes' : 'no' }}</i>

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

