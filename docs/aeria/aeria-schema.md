# Aeria Schema

Schemas in Aeria are defined using a superset of [JSON Schema](https://json-schema.org/) with framework-specific attributes. Schemas used to define the data structure of collections are referred to as **descriptions**.

## JSON Schema

### `$id`

As in JSON Schema, this property is used to name the structure we are defining. It must have the same name as the collection.
Collection names must consist of a camel-cased noun in the singular, like `person`, `fruit` or `car`. In Aeria Lang this property is implicit.

### `required`

```aeria [main.aeria]
collection Example {
  required {
    name
    document
    // legal responsible is only required if age is lesser than 18 on insertion
    legal_responsible @cond(age < 18)
  }
}
```

This property is used to verify document wholeness upon creation and update. Case set to an array of strings, will consider only specified properties to validate document wholeness, otherwise will check if all properties are not null or undefined.

### `properties` 

**Type**: `Record<string, Property>`

The properties contained in the collection. Properties are described in a [separate section](/aeria/property).

## Description

### `actions` 

**Type**: `CollectionActions<TDescription>?`

Actions that aren't associated with a single database entry.

```aeria [main.aeria]
collection Example {
  actions {
    add {
      label "Add new entry"
    }
  }
}
```

### `filters` 

**Type**: `readonly PropertiesWithId<TDescription>[]`

This property is used to control a filter widget rendered inside the `aeria-crud` component. If set, a filter button will appear, otherwise no filter functionallity will be made available.

The array passed to this property can contain two types of elements, either a string representing a property name, or an object containing both the property name and a default filter.

```aeria [main.aeria]
collection Example {
  filters {
    name
  }
}
```

### `filtersPresets` 

**Type**: `Record<string, FiltersPreset<TDescription>>?`

```aeria [main.aeria]
collection Example {
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

**Type**: `readonly PropertiesWithId<TDescription>[]`

If set, runtime generated forms will render only specified properties. Otherwise all properties are rendered.

::: warning WARNING
This property alone won't keep any of non-specified collection properties to be written. If you need to make properties read-only, use the `writable` property in an exclusive manner.
:::

```aeria [main.aeria]
collection Example {
  form {
    name
    document
  }
}
```

### `formLayout` 

**Type**: `Partial<FormLayout<TDescription>>?`

This property controls how inputs should be dynamically rendered inside frontend forms.

```aeria [main.aeria]
collection Example {
  formLayout {
    fields {
      responsible @if(age == 18)
    }
  }
}
```

### `icon` 

**Type**: `string`

This property may be used to specify an icon from an icon library to be associated with the collection in the frontend.
It will be shown on navbars, breadcumbs, etc.

```aeria [main.aeria]
collection Example {
  icon "file"
}
```

### `immutable` 

**Type**: `boolean | readonly string[]`

This property may be used to specify properties that should be writable upon creation, but read-only upon update. If set to true, then will enable immutability to all properties, if set to an array of strings, only specified properties will receive that attribute.

```aeria [main.aeria]
collection Example {
  immutable {
    status
  }
}
```

### `indexes` 

**Type**: `readonly string`

This optional property may be used to specify an icon from an icon library to be associated with the collection in the frontend.
It will be shown on navbars, breadcumbs, etc.

```aeria [main.aeria]
collection Example {
  indexes {
    name
    document
  }
}
```

### `individualActions` 

**Type**: `CollectionIndividualActions<TDescription>`

Actions associated with a single database entry. In a tabular layout, these are displayed inside a dropdown in the last column.

```aeria [main.aeria]
collection Example {
  individualActions {
    remove {
      label "Remove"
    }
  }
}
```

### `owned` 

**Type**: 

```ts
type OwnershipMode =
  | boolean
  | 'always'
  | 'on-write'
```

This property is used to control the access of user-owned resources. If set to true or `'always'` in a description, users will only be able to view and edit resources created by themselves.


```aeria [main.aeria]
collection Example {
  owned true
}
```

### `table` 

**Type**: `readonly PropertiesWithId<TDescription>[]`

This property is used exclusively by the frontend. Case set to an array of strings, will specify properties to be used as columns in `aeria-crud` component. Otherwise all properties will be used.

::: tip NOTE
In the frontend, Aeria will smartly request only required properties in order to make network payloads lighter. This is specialy important in runtime generated views. If you need to use a property that isn't set as a column inside your view, please add the `tableMeta` property.
:::

```aeria [main.aeria]
collection Example {
  table {
    name
    document
  }
}
```

### `tableMeta` 

**Type**: `readonly PropertiesWithId<TDescription>[]`

If set, grid and tabular runtime generated views will request the specified properties alongside the ones specified in `table`.

```aeria [main.aeria]
collection Example {
  tableMeta {
    extra_property
  }
}
```

### `tableLayout`

**Type**:

```ts
type TableLayoutAction<TDescription extends Description> = {
  button?: boolean | Condition<TDescription>
  if?: Condition<TDescription>
}

```

### `timestamps` 

**Type**: `false`

This property should only be used to disable automatic timestamps in a certain collection (`created_at` and `updated_at`). Timestamps are always enabled by default.

```aeria [main.aeria]
collection Example {
  timestamps false
}
```

### `layout` <Badge type="tip" text="Layout?" />

**Type**:

```ts
type LayoutOptions<TDescription extends Description = Description> = {
  title?: PropertiesWithId<TDescription>
  picture?: PropertiesWithId<TDescription>
  badge?: PropertiesWithId<TDescription>
  information?: PropertiesWithId<TDescription>
  active?: PropertiesWithId<TDescription>
  translateBadge?: boolean
}

type Layout<TDescription extends Description = Description> = {
  name: LayoutName
  options?: LayoutOptions<TDescription>
}

```

Specifies a layout to override the default tabular one.

```aeria [main.aeria]
collection Example {
  layout {
    name "tabular"
    options {
      title title
    }
  }
}
```

### `preset` 

**Type**: `readonly CollectionPresets[]`

Merges a description preset into the current one.
To see what each preset contains please head to the [source code](https://github.com/aeria-org/aeria/tree/master/packages/core/src/presets).

```aeria [main.aeria]
collection Example {
  presets {
    crud
    view
  }
}
```

### `writable` 

**Type**: `readonly PropertiesWithId<TDescription>[]`

If set, all properties except the one specified will be made read-only. Trying writing on them will trigger an Access Control error.

```aeria [main.aeria]
collection Example {
  writable {
    name
    document
  }
}
```

### `search` 

**Type**:

```ts
type SearchOptions<TDescription extends Description = Description> = {
  indexes: readonly (keyof TDescription['properties'])[]
  placeholder?: string
  exactMatches?: boolean
}
```

Activates a search bar in the frontend that will perform a MongoDB `$text` query.

```aeria [main.aeria]
collection Example {
  search {
    placeholder "Something"
    indexes {
      name
      document
    }
  }
}
```

