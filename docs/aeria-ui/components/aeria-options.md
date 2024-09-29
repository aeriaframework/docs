<script setup lang="ts">
import { ref } from 'vue'
import { AeriaOptions } from 'aeria-ui'
import ResultBox from '../../src/components/result-box.vue'

const singleChoice = ref('a')
const multipleChoice = ref([])
</script>

# aeria-options

This component renders a group of checkboxes (or radio inputs) depending on the property type.

### Example

<result-box title="Single choice" class="mb-4">
  <aeria-options
    v-model="singleChoice"
    :property="{
      enum: [
        'a',
        'b',
        'c',
      ]
    }"
  ></aeria-options>

  <template #result>
    {{ singleChoice }}
  </template>
</result-box>

<result-box title="Multiple choice">
  <aeria-options
    v-model="multipleChoice"
    :property="{
      type: 'array',
      items: {
        enum: [
          'a',
          'b',
          'c',
        ]
      }
    }"
  ></aeria-options>

  <template #result>
    {{ multipleChoice }}
  </template>
</result-box>


```vue
<script setup lang="ts">
const singleChoice = ref('')
const multipleChoice = ref('')
</script>

<template>
  <aeria-options
    v-model="singleChoice"
    :property="{
      enum: [
        'a',
        'b',
        'c',
      ]
    }"
  ></aeria-options>
  <pre>Single choice: {{ singleChoice }}</pre>

  <aeria-options
    v-model="multipleChoice"
    :property="{
      type: 'array',
      items: {
        enum: [
          'a',
          'b',
          'c',
        ]
      }
    }"
  ></aeria-options>
  <pre>Multiple choice: {{ multipleChoice }}</pre>
</template>
```
