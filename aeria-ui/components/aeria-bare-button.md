<script setup lang="ts">
import { ref } from 'vue'
import { AeriaBareButton } from 'aeria-ui'
import ResultBox from '../../src/components/result-box.vue'

const count1 = ref(0)
const count2 = ref(0)
</script>

# aeria-bare-button

This component renders an unstyled button that will ultimately be an `<a />` HTML element. Sometimes you may use useful to have controls for disabling click and adaptative cursor change without having a styled button.

## Example

<result-box class="mb-4">
  <aeria-bare-button @click="count1 += 1">
    Enabled (click me): {{ count1 }}
  </aeria-bare-button>
</result-box>

<result-box>
  <aeria-bare-button disabled @click="count2 += 1">
    Disabled (click me): {{ count2 }}
  </aeria-bare-button>
</result-box>

```vue
<script setup lang="ts">
const count = ref(0)
</script>

<template>
  <aeria-bare-button @click="count1 += 1">
    Enabled (click me): {{ count1 }}
  </aeria-bare-button>

  <aeria-bare-button disabled @click="count2 += 1">
    Disabled (click me): {{ count2 }}
  </aeria-bare-button>
</template>
```

## Props

### disabled <Badge type="tip" text="boolean?" /> 

## Slots

### default

Content to be displayed inside the button.
