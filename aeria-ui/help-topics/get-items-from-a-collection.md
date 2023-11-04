# Get items from a collection

## How-to

1. Invoke the collection store using `useStore`, then use the `onMounted` lifecycle hook to cast the `getAll` action passing a object with no properties. The `getAll` action will both return an array containing the items and mutate the `items` state.

```vue
<script setup lang="ts">
const petStore = useStore('pet')

onMounted(async () => {
  await petStore.$actions.getAll({})
  console.log(petStore.items)
})
</script>
```

2. The items may now be used inside the template:

```vue
<template>
  <ul>
    <li
      v-for="pet in petStore.items"
      :key="pet._id"
    >
      {{ pet.name }} - <i>{{ pet.specie }}</i>
    </li>
  </ul>
</template>
```
