<script setup lang="ts">
import { ref } from 'vue'
import { AeriaOptions } from 'aeria-ui'

const singleChoice = ref('')
const multipleChoice = ref('')
</script>

# aeria-options

This component renders a group of checkboxes (or radio inputs) depending on the property type.

## Example

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
