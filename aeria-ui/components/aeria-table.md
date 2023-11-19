# aeria-table

## Introduction

This component renders a styled table with some extra features. If used with stores, columns and rows can be passed in dynamically, but they can be still customized later with slots. HTML-style usage is also possible using `thead`, `tbody`, and `tfoot` slots.

## Example

### Usage along with stores

```vue-html
<aeria-table
  v-bind="{
    columns: userStore.useProperties([
      'first_name',
      'last_name',
      'roles'
    ]),
    rows: userStore.items
}"></aeria-table>
```

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
      :key="`row-${index}`"
    >
      <th>{{ index }}</th>
      <th>Example</th>
      <th>This is an example row</th>
    </tr>
  </template>
</aeria-table>
```

