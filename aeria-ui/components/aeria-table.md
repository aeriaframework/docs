# aeria-table

## Example

### Normal usage

```vue-html
<aeria-table>
  <template #thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </template>
  <template #tbody>
    <tr
      v-for="index in 10"
      :key="`roaeria-${index}`"
    >
      <th>{{ index }}</th>
      <th>Example</th>
      <th>This is an example row</th>
    </tr>
  </template>
</aeria-table>
```

### Declarative usage

```vue
<script setup lang="ts">
const userStore = useStore('user')
await userStore.getAll()
</script>

<template>
  <aeria-table
    v-bind="{
      columns: userStore.useProperties([
        'first_name',
        'last_name',
        'roles'
      ]),
      rows: userStore.items
    }"
  >
    <!-- You can still customize specified cells -->
    <template #roaeria-name="{ row, column }">
      <strong>{{ row[column] }}</strong>
    </template>
  </aeria-table>
</template>
```
