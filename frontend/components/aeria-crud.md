# aeria-crud

This components renders all necessary CRUD widgets (table, action buttons, filter button, search bar) to be used as a standalone view or inside a panel.


The following [`Description`](/backend/description) properties takes effect on how this component is rendered:

- `actions`: will place buttons on top of the content display (table or grid)
- `individualActions`: will place actions inside a dropdown rendered in each table row or grid card

## Example

```vue
<template>
  <aeria-crud collection="user"></aeria-crud>
</template>
```

## Props

### collection <Badge type="tip" text="string" />

A string containg the name of the collection that will have its CRUD rendered.


## Slots
