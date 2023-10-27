# aeria-bare-button

This component renders an unstyled button that will ultimately be an `<a />` HTML element. It provides controls for disabling click with adaptative cursor change.

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

### disabled <Badge type="tip" text="boolean" /> <Badge type="tip" text="optional" />

## Slots

### default

Content to be displayed inside the button.
