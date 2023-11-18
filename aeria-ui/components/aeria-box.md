# aeria-box

## Introduction

Standardized floating, fixed, and inline panels.

## Example

```vue
<script setup lang="ts">
const panelVisible = ref(false)
</script>

<template>
  <aeria-box
    float
    close-hint
    title="Example"
    v-model="panelVisible"
  >
    This is an example

    <template #footer>
      <aeria-button>Ok!</aeria-button>
    </template>
  </aeria-box>
</template>
```

## Props

### title <Badge type="tip" text="string" />

This property sets a text to be shown in the header section of the panel.

### float <Badge type="tip" text="boolean" />

Will make the panel a modal.

### close-hint <Badge type="tip" text="boolean" />

This property determines that the panel will have a clickable icon that will close it.

## Slots

### header

This slot is a replacement for the `title` prop.

### footer

This slot renders a fixed section below the box content.
