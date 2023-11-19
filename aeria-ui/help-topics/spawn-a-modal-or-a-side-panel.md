# Spawn a modal or a side panel

## How-to

1. Create a boolean `Ref` inside the `<script />` block that will bear the panel state.

```vue
<script setup lang="ts">
const panel = ref(false)
</script>
```

2. Pass the desire properties and set the `v-model` directive to the `Ref` we've just created.

```vue
<template>
  <aeria-panel
    v-model="panel"
    float
    close-hint
    title="My panel"
    @overlay-click="panel = false"
  >
    Hey! From inside the modal.
  <aeria-panel>
</template>
```

3. To make a side panel instead, replace the `float` property with `fixed-right`.

```vue
<template>
  <aeria-panel
    v-model="panel"
    fixed-right
    title="My panel"
    @overlay-click="panel = false"
  >
    Hey! From inside the side panel.

    <template #footer>
      <aeria-button @click="panel = false">
        Close
      </aeria-button>
    </template>
  <aeria-panel>
</template>
```

