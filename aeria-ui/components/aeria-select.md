<script setup lang="ts">
import { ref } from 'vue'
import { AeriaSelect } from 'aeria-ui'

const selected = ref('')
const multipleChoice = ref('')
</script>

# aeria-select

This component renders a group of checkboxes (or radio inputs) depending on the property type.

## Example

<aeria-select
  v-model="selected"
  :multiple="1"
  :property="{
    enum: [
      'a',
      'b',
      'c',
    ]
  }"
></aeria-select>

<pre>Selected: {{ selected }}</pre>


```vue
<script setup lang="ts">
const selected = ref('')
</script>

<template>
  <aeria-select
    v-model="selected"
    :multiple="1"
    :property="{
      enum: [
        'a',
        'b',
        'c',
      ]
    }"
  ></aeria-select>

  <pre>Selected: {{ selected }}</pre>
</template>
```
