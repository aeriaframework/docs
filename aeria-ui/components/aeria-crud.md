# aeria-crud

This components renders all necessary CRUD widgets (table, action buttons, filter button, search bar) to be used as a standalone view or inside a panel.


The following [`Description`](/backend/description) properties takes effect on how this component is rendered:

- `actions`: will place buttons on top of the content display (table or grid)
- `individualActions`: will place actions inside a dropdown rendered in each table row or grid card

## Example

```vue-html
<aeria-crud collection="user"></aeria-crud>
```

## Props

**Type:**

```typescript
type Props = {
  collection: string
  noControls?: boolean
  noActions?: boolean
  noFetch?: boolean
  noRefresh?: boolean
  noLayoutToggle?: boolean
  layout?: Layout
  action?: Ref<ReturnType<typeof useAction>> | ReturnType<typeof useAction>
  componentProps?: Record<string, any>
}

```

### collection <Badge type="tip" text="string" />

A string containg the name of the collection that will have its CRUD rendered.

### noControls <Badge type="tip" text="boolean" />

This property disables the CRUD controls.

### noActions <Badge type="tip" text="boolean" />

This property disables the CRUD actions.

### noFetch <Badge type="tip" text="boolean" />

This property will prevent the component from calling `store.$funcions.getAll` initially.

### noLayoutToggle <Badge type="tip" text="boolean" />

This property will prevent the user from switching back to tabular layout if a custom layout is specified.


## Emits

**Type:**

```typescript
type ActionEvent<T={ _id: string }> = {
  id: number
  name: string
  params?: T|object
}

type Emits = {
  (e: 'uiEvent', event: ActionEvent): void
}
```

### uiEvent

This event will trigger whenever a button derived from `description.individualActions` with the name starting with `ui` is clicked.

For example, suppose the following [`Description`](/aeria/description):

```typescript
const description: Description = {
  individualActions: {
    'ui:openPanel': {
      name: 'Open panel',
      icon: 'plus'
    }
  }
  // ...
}
```

Whenever the `Open panel` button is clicked from within a table row or card, `aeria-crud` will dispatch the following event:

```typescript
{
  name: 'openPanel',
  params: {
    _id: '...'
  }
}
```

## Slots

### actions

Buttons to be rendered aside the ones derived from `description.actions`.

### component

This will replace the default table or grid component.

### row-*

This slot may be used to modify a cell from the table.

### field-*

This slot may be used to modify a single field from the insertion panel.
