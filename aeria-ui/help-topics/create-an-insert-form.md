# Create an insert form

## How-to

1. Have the target collection store defined inside the `<script />` block.

```vue
<script setup lang="ts">
const personStore = useStore('person')
</script>
```

2. Render the [`aeria-form`](/aeria-ui/components/aeria-form) component inside the `<template />` block. The `form` prop takes a `Record<string, CollectionProperty>` object we can get using the `store.$actions.useProperties` helper. Whenever the user inputs something, the model value `personStore.item` will change.

```vue-html
<aeria-form
  v-model="personStore.item"
  :form="personStore.$actions.useProperties([
    'name',
    'age',
    'job'
  ])"
></aeria-form>
```

::: tip NOTE
If one of the properties passed to the `form` prop is a reference, then `aeria-form` must know what is the parent collection name to deal with it. You should then pass the collection name to the `collection` prop of the component.
:::

3. Create a function inside the `<script />` block that will dispatch the `store.$actions.deepInsert` action. This action will perform the insert on `store.item` when parameter is passed. You can use this same function to change a state after the insert is done (like closing a panel or going to another route), or parse validation errors.

```typescript
const insert = async () => {
  const resultEither = await personStore.$actions.deepInsert()
  if( isLeft(resultEither) ) {
    // ...
    return
  }

  insertPanel.value = false
}
```

4. Render a button that will dispatch the insert function we just created. We can set up props to show a loading state and to enable clicking on it only after all required properties are set.

```vue-html
<aeria-button
  :disabled="!personStore.insertReady"
  :loading="personStore.loading.insert"
  @click="insert"
>
  Save
</aeria-button>
```
