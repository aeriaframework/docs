# Collections

In their most basic form, collections may have only their data structure defined. Since MongoDB is a schemaless database, data will be verified on the application level before being inserted. A collection that stores people may be defined as following:

```aeria
collection Person {
  properties {
    name str
    age int
  }
}
```

We can tell which properties are to be required using the `required` attribute:

```aeria
collection Person {
  required { // [!code focus]
    name // [!code focus]
  } // [!code focus]
  properties {
    name str
    age int
  }
}
```

Collections can have attributes other than their own data structure. You can define an icon from the [Phosphor Icon](https://phosphoricons.com) library to represent your collection on the frontend using the `icon` attribute. You can also define which properties are to be displayed in frontend tables using the `table` attribute.

```aeria
collection Person {
  icon "person" // [!code focus]
  table { // [!code focus]
    name // [!code focus]
  } // [!code focus]
  required {
    name
  }
  properties {
    name str
    age int
  }
}
```

Finally, you can have CRUD-related functions directly bound to your collection by using the `functions` attribute. Each function will be accessible through it's respective REST endpoint.

```aeria
collection Person {
  icon "person"
  table {
    name
  }
  required {
    name
  }
  properties {
    name str
    age int
  }
  functions { // [!code focus]
    get // [!code focus]
    getAll // [!code focus]
    insert // [!code focus]
    remove // [!code focus]
  } // [!code focus]
}
```

## Attributes

### `required`

```aeria 
collection Example {
  required {
    name
    document
    legal_responsible @if(age < 18)
  }
}
```

This property is used to verify document wholeness upon creation and update. Case set to an array of strings, will consider only specified properties to validate document wholeness, otherwise will check if all properties are not null or undefined.

### `properties` 

The properties contained in the collection. Properties are described in a [separate section](/aeria/property).


### `actions` 

Actions that aren't associated with a single database entry.

```aeria 
collection Person {
  actions {
    add {
      label "Add new entry"
    }
  }
}
```

### `filters` 

This property is used to control a filter widget rendered inside the `aeria-crud` component. If set, a filter button will appear, otherwise no filter functionallity will be made available.

The array passed to this property can contain two types of elements, either a string representing a property name, or an object containing both the property name and a default filter.

```aeria 
collection Person {
  filters {
    name
  }
}
```

### `filtersPresets` 

```aeria 
collection Person {
  filtersPresets {
    active {
      label "Active"
      filters {
        active true
      }
    }
  }
}
```

### `form` 

If set, runtime generated forms will render only specified properties. Otherwise all properties are rendered.

::: warning WARNING
This property alone won't keep any of non-specified collection properties to be written. If you need to make properties read-only, use the `writable` property in an exclusive manner.
:::

```aeria 
collection Person {
  form {
    name
    document
  }
}
```

### `formLayout` 

This property controls how inputs should be dynamically rendered inside frontend forms.

```aeria 
collection Person {
  formLayout {
    fields {
      responsible @if(age == 18)
    }
  }
}
```

### `icon` 

This property may be used to specify an icon from an icon library to be associated with the collection in the frontend.
It will be shown on navbars, breadcumbs, etc.

```aeria 
collection Person {
  icon "file"
}
```

### `immutable` 

This property may be used to specify properties that should be writable upon creation, but read-only upon update. If set to true, then will enable immutability to all properties, if set to an array of strings, only specified properties will receive that attribute.

```aeria 
collection Person {
  immutable {
    status
  }
}
```

### `indexes` 

This optional property may be used to specify an icon from an icon library to be associated with the collection in the frontend.
It will be shown on navbars, breadcumbs, etc.

```aeria 
collection Person {
  indexes {
    name
    document
  }
}
```

### `individualActions` 

Actions associated with a single database entry. In a tabular layout, these are displayed inside a dropdown in the last column.

```aeria 
collection Person {
  individualActions {
    remove {
      label "Remove"
    }
  }
}
```

### `middlewares` 

This property receives an array of strings representing middleware names. Each middleware must be a valid export symbol of the `src/middlewares/index.js` import path.

::: code-group

```aeria [main.aeria]
collection Person {
  middlewares {
    myMiddleware
  }
}
```

```ts [src/middlewares/index.ts]
export const myMiddleware = defineCollectionMiddleware({
  beforeRead: (payload, context, next) => {
    // ...
    return next(payload, context)
  },
})
```

:::

### `owned` 

This property is used to control the access of user-owned resources. If set to true or `'always'` in a description, users will only be able to view and edit resources created by themselves.

Accepted values:

- `true`
- `"always"`
- `"on-write"`

```aeria 
collection Person {
  owned true
}
```

### `table` 

This property is used exclusively by the frontend. Case set to an array of strings, will specify properties to be used as columns in `aeria-crud` component. Otherwise all properties will be used.

::: tip NOTE
In the frontend, Aeria will smartly request only required properties in order to make network payloads lighter. This is specialy important in runtime generated views. If you need to use a property that isn't set as a column inside your view, please add the `tableMeta` property.
:::

```aeria 
collection Person {
  table {
    name
    document
  }
}
```

### `tableMeta` 

If set, grid and tabular runtime generated views will request the specified properties alongside the ones specified in `table`.

```aeria 
collection Person {
  tableMeta {
    extra_property
  }
}
```

### `tableLayout`

```aeria
collection Person {
  tableLayout {}
}
```

### `timestamps` 

This property should only be used to disable automatic timestamps in a certain collection (`created_at` and `updated_at`). Timestamps are always enabled by default.

```aeria 
collection Person {
  timestamps false
}
```

### `layout`

Specifies a layout to override the default tabular one.

```aeria 
collection Person {
  layout {
    name "tabular"
    options {
      title title
    }
  }
}
```

### `presets` 

Merges a description preset into the current one.
Available presets are:

- add: adds an "Add item" button to the view
- crud: adds CRUD-related functionalities to the view
- duplicate: adds a "Duplicate item" action to the table menu
- remove: adds a "Remove item" action to the table menu
- owned: adds ownership to the collection (see: [Ownership](/aeria/security#ownership))
- timestamp: adds timestamp properties to the collection
- view: adds a "View item" action to the table menu

```aeria 
collection Person {
  presets {
    crud
    duplicate
  }
}
```

### `writable` 

If set, all properties except the one specified will be made read-only. Trying writing on them will trigger an Access Control error.

```aeria 
collection Person {
  writable {
    name
    document
  }
}
```

### `search` 

Activates a search bar in the frontend that will perform a MongoDB `$text` query.

```aeria 
collection Person {
  search {
    placeholder "Search by name or by document"
    indexes {
      name
      document
    }
  }
}
```

<!-- ### Collection middlewares -->
<!---->
<!-- Collection middlewares are used to add define custom behavior to builtin functions. They can be defined using the `defineCollectionMiddleware()` helper. Each one can have one or multiple middleware functions. -->
<!---->
<!-- - `beforeRead()`: executes before `get()`, `getAll()`, `count()` -->
<!-- - `beforeWrite()`: executes before `insert()` -->
<!---->
<!-- ::: code-group -->
<!---->
<!-- ```typescript [api/src/middlewares/index.ts] -->
<!-- import { defineCollectionMiddleware, deepMerge } from 'aeria' -->
<!---->
<!-- export const businessTenancyMiddleware = defineCollectionMiddleware({ -->
<!--   beforeRead: (payload, context, next) => { -->
<!--     if( !context.token.authenticated ) { -->
<!--       throw new Error -->
<!--     } -->
<!--     return next(deepMerge(payload, { -->
<!--       filters: { -->
<!--         business: context.token.userinfo.business, -->
<!--       }, -->
<!--     }), context) -->
<!--   }, -->
<!--   beforeWrite: (payload, context, next) => { -->
<!--     if( !context.token.authenticated ) { -->
<!--       throw new Error -->
<!--     } -->
<!--     return next(deepMerge(payload, { -->
<!--       what: { -->
<!--         business: context.token.userinfo.business, -->
<!--       }, -->
<!--     }), context) -->
<!--   }, -->
<!-- }) -->
<!-- ``` -->
<!---->
<!-- ::: -->
<!---->
<!-- After defined collection middlewares can be set in the `middlewares` property, which accepts a single middleware or an array of middlewares. -->
<!---->
<!-- ::: code-group -->
<!---->
<!-- ```typescript [api/src/collections.ts] -->
<!-- export const person = extendPersonCollection({ -->
<!--   // will get executed one after another -->
<!--   middlewares: [ -->
<!--     businessTenancyMiddleware, -->
<!--     anotherMiddleware, -->
<!--   ], -->
<!-- }) -->
<!---->
<!-- export const car = extendCarCollection({ -->
<!--   middlewares: businessTenancyMiddleware, -->
<!-- }) -->
<!---->
<!-- export const building = extendBuildingCollection({ -->
<!--   middlewares: { -->
<!--     beforeRead: (payload, context, next) => { -->
<!--       // do something -->
<!--       return next(payload, context) -->
<!--     } -->
<!--   } -->
<!-- }) -->
<!-- ``` -->
<!---->
<!-- ::: -->
<!---->
