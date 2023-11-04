# Replace the generated CRUD view with a custom one

## How-to

1. Create a Vue file inside the `pages/dashboard/` folder of your project. It should by convention have the same name as the collection, in the singular, camelCased form. Put a `<route />` block inside it containing route metadata, and a `<template />` block containing the `aeria-crud` component with the `collection` property set to the collection name.

```vue
<route lang="yaml">
meta:
  title: My Collection
  icon: apps
</route>

<template>
  <aeria-crud collection="myCollection"></aeria-crud>
</template>
```

2. The `aeria-crud` can be extended and modified using its `slots`. For instance, we can pass custom actions to be rendered alongside actions defined in the Description.

```vue
<route lang="yaml">
meta:
  title: My Collection
  icon: apps
</route>

<script setup lang="ts">
const sidePanel = ref(false)
</script>

<template>
  <teleport to="main">
    <aeria-box
      v-model="sidePanel"
      fixed-right
      title="Custom panel"
      @overlay-click="sidePanel = false"
    >
      Hey!

      <template #footer>
        <aeria-button @click="sidePanel = false">
          Close
        </aeria-button>
      </template>
    </aeria-box>
  </teleport>

  <aeria-crud collection="myCollection">
    <template #actions>
      <aeria-button @click="sidePanel = true">
        Click me
      </aeria-button>
    </template>
  </aeria-crud>
</template>
```

