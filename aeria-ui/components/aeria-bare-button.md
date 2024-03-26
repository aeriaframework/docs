# aeria-bare-button

This component renders an unstyled button that will ultimately be an `<a />` HTML element. Sometimes you may use useful to have controls for disabling click and adaptative cursor change without having a styled button.

## Example

```vue
<script setup lang="ts">
const count = ref(0)
</script>

<template>
  <aeria-bare-button
    disabled
    @click="count += 1"
  >
    {{ count }}
  </aeria-bare-button>
</template>
```

## Props

### disabled <Badge type="tip" text="boolean?" /> 

## Slots

### default

Content to be displayed inside the button.
