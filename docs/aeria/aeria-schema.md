# Aeria Schema

Schemas in Aeria are defined using a superset of [JSON Schema](https://json-schema.org/) with framework-specific attributes. Schemas used to define the data structure of collections are referred to as **descriptions**.

[[toc]]

## JSON Schema

### `$id`

As in JSON Schema, this property is used to name the structure we are defining. It must have the same name as the collection.
Collection names must consist of a camel-cased noun in the singular, like `person`, `fruit` or `car`. In Aeria Lang this property is implicit.

### `required`

::: code-group

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

```typescript [collection.ts]
defineCollection({
  description: {
    required: {
      name: true
      document: true,
      document: {
        if: {
          operator: 'lt',
          term1: 'age',
          term2: 18,
        },
      },
    },
  },
})
```

```typescript [types.ts]
type RequiredProperties<TDescription extends Description> = readonly PropertiesWithId<TDescription>[] | Partial<Record<
  PropertiesWithId<TDescription>,
  Condition<TDescription> | boolean
>>
```

:::

This property is used to verify document wholeness upon creation and update. Case set to an array of strings, will consider only specified properties to validate document wholeness, otherwise will check if all properties are not null or undefined.

### `properties` <Badge type="tip" text="Record<string, Property>" />

The properties contained in the collection. Properties are described in a [separate section](/aeria/property).

## Description

### `filters` <Badge type="tip" text="frontend" />

This property is used to control a filter widget rendered inside the `aeria-crud` component. If set, a filter button will appear, otherwise no filter functionallity will be made available.

The array passed to this property can contain two types of elements, either a string representing a property name, or an object containing both the property name and a default filter.

::: code-group

```aeria [main.aeria]
collection Example {
  filters {
    name
  }
}
```

```typescript [collection.ts]
defineCollection({
  description: {
    filters: [
      'name',
    ],
  },
})
```

```typescript [type.ts]
type DescriptionFilters = readonly (PropertiesWithId<TDescription> | {
  property: PropertiesWithId<TDescription>
  default: string
})[]
```

:::

### `filtersPresets` <Badge type="tip" text="Record<string, FiltersPreset<TDescription>>?" /> <Badge type="tip" text="frontend" />

::: code-group

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

```typescript [collection.ts]
defineCollection({
  description: {
    filtersPresets: {
      active: {
        label: 'Active',
        filters: {
          active: true,
        },
      },
    },
  },
})
```

```typescript [type.ts]
type FiltersPreset<TDescription extends Description> = {
  label?: string
  icon?: string
  filters: Partial<Record<PropertiesWithId<TDescription> | `$${string}`, any>>
  table?: Array<PropertiesWithId<TDescription>>
  badgeFunction?: string
  default?: boolean
}

type FiltersPresets<TDescription extends Description> = Record<string, FiltersPreset<TDescription>
```

:::

### `form` <Badge type="tip" text="frontend" />

If set, runtime generated forms will render only specified properties. Otherwise all properties are rendered.

::: warning WARNING
This property alone won't keep any of non-specified collection properties to be written. If you need to make properties read-only, use the `writable` property in an exclusive manner.
:::

::: code-group

```aeria [main.aeria]
collection Example {
  form {
    name
    document
  }
}
```

```typescript [collection.ts]
defineCollection({
  description: {
    form: [
      'name',
      'document',
    ],
  },
})
```

```typescript [types.ts]
type Form = readonly PropertiesWithId<TDescription>[] | Record<PropertiesWithId<TDescription>, string[]>
```

:::

### `formLayout` <Badge type="tip" text="Partial<FormLayout<TDescription>>?" /> <Badge type="tip" text="frontend" />

This property controls how inputs should be dynamically rendered inside frontend forms.

::: code-group

```aeria [main.aeria]
collection Example {
  formLayout {
    fields {
      responsible @if(age == 18)
    }
  }
}
```

```typescript [collection.ts]
defineCollection({
  description: {
    formLayout: {
      fields: {
        responsible: {
          if: {
            operator: 'lt',
            term1: 'age',
            term2: 18,
          }
        }
      }
    },
  },
})
```

```typescript [types.ts]
type FormLayout<TDescription extends Description> = {
  fields?: Partial<Record<PropertiesWithId<TDescription>, FormLayoutField<TDescription>>>
}

type FormLayoutField<TDescription extends Description> = {
  span?: number
  verticalSpacing?: number
  separator?:
    | true
    | 'top'
    | 'bottom'
  if?: Condition<TDescription>
  component?: {
    name: string
    props?: Record<string, any>
  }
}
```

:::

### `icon` <Badge type="tip" text="string?" /> <Badge type="tip" text="frontend" />

This property may be used to specify an icon from an icon library to be associated with the collection in the frontend.
It will be shown on navbars, breadcumbs, etc.

::: code-group

```aeria [main.aeria]
collection Example {
  icon "file"
}
```

```typescript [collection.ts]
defineCollection({
  description: {
    icon: 'file',
  },
})
```

```typescript [types.ts]
type SearchOptions<TDescription extends Description> = {
  placeholder?: string
  indexes: readonly (keyof TDescription['properties'])[]
}
```

:::

### `immutable` <Badge type="tip" text="(boolean | readonly string[])?" />

This property may be used to specify properties that should be writable upon creation, but read-only upon update. If set to true, then will enable immutability to all properties, if set to an array of strings, only specified properties will receive that attribute.

::: code-group

```aeria [main.aeria]
collection Example {
  immutable {
    status
  }
}
```

```typescript [collection.ts]
defineCollection({
  description: {
    immutable: [
      'status',
    ],
  },
})
```

```typescript [types.ts]
type DescriptionImmutable<TDescription extends Description> =
  | boolean
  | readonly (keyof TDescription['properties'])[]
  | ((doc: WithId<any>)=> boolean | Promise<boolean>)
```

:::

### `indexes` <Badge type="tip" text="readonly string?" /> <Badge type="tip" text="frontend" />

This optional property may be used to specify an icon from an icon library to be associated with the collection in the frontend.
It will be shown on navbars, breadcumbs, etc.

::: code-group

```aeria [main.aeria]
collection Example {
  indexes {
    name
    document
  }
}
```

```typescript [collection.ts]
defineCollection({
  description: {
    indexes: [
      'name',
      'document',
    ],
  },
})
```

```typescript [types.ts]
type DescriptionIndexes = readonly PropertiesWithId<TDescription>[]
```

:::

### `owned` <Badge type="tip" text="(boolean | 'always')?" />

This property is used to control the access of user-owned resources. If set to true or `'always'` in a description, users will only be able to view and edit resources created by themselves.

::: code-group

```aeria [main.aeria]
collection Example {
  owned true
}
```

```typescript [collection.ts]
defineCollection({
  description: {
    owned: true,
  },
})
```

```typescript [types.ts]
type OwnershipMode =
  | boolean
  | 'always'
  | 'on-write'

type DescriptionOwned = OwnershipMode
```

:::

### `table` <Badge type="tip" text="readonly PropertiesWithId<TDescription>?" /> <Badge type="tip" text="frontend" />

This property is used exclusively by the frontend. Case set to an array of strings, will specify properties to be used as columns in `aeria-crud` component. Otherwise all properties will be used.

::: tip NOTE
In the frontend, Aeria will smartly request only required properties in order to make network payloads lighter. This is specialy important in runtime generated views. If you need to use a property that isn't set as a column inside your view, please add the `tableMeta` property.
:::

::: code-group

```aeria [main.aeria]
collection Example {
  table {
    name
    document
  }
}
```

```typescript [collection.ts]
defineCollection({
  description: {
    table: [
      'name',
      'document',
    ],
  },
})
```

```typescript [types.ts]
type DescriptionTable = readonly PropertiesWithId<TDescription>[]
```

:::

### `tableMeta` <Badge type="tip" text="readonly PropertiesWithId<TDescription>[]?" /> <Badge type="tip" text="frontend" />

If set, grid and tabular runtime generated views will request the specified properties alongside the ones specified in `table`.

::: code-group

```aeria [main.aeria]
collection Example {
  tableMeta {
    extra_property
  }
}
```

```typescript [collection.ts]
defineCollection({
  description: {
    tableMeta: [
      'extra_property',
    ],
  },
})
```

```typescript [types.ts]
type DescriptionTableMeta = readonly PropertiesWithId<TDescription>[]
```

:::

### `timestamps` <Badge type="tip" text="false?" />

This property should only be used to disable automatic timestamps in a certain collection (`created_at` and `updated_at`). Timestamps are always enabled by default.

::: code-group

```aeria [main.aeria]
collection Example {
  timestamps false
}
```

```typescript [collection.ts]
defineCollection({
  description: {
    timestamps: false,
  },
})
```

```typescript [types.ts]
type DescriptionTimestamps = false
```

:::

### `layout` <Badge type="tip" text="Layout?" />

Specifies a layout to override the default tabular one.

::: code-group

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

```typescript [collection.ts]
defineCollection({
  description: {
    layout: {
      name: 'tabular',
      options: {
        title: 'title,'
      },
    },
  },
})
```

```typescript [types.ts]
type LayoutName =
  | 'tabular'
  | 'grid'
  | 'list'

type LayoutOptions<TDescription extends Description = any> = {
  picture?: PropertiesWithId<TDescription>
  title?: PropertiesWithId<TDescription>
  badge?: PropertiesWithId<TDescription>
  information?: PropertiesWithId<TDescription>
  active?: PropertiesWithId<TDescription>
  translateBadge?: boolean
}

type Layout<TDescription extends Description = any> = {
  name: LayoutName
  options?: LayoutOptions<TDescription>
}
```

:::

### `preset` <Badge type="tip" text="readonly CollectionPresets[]?" />

Merges a description preset into the current one.
To see what each preset contains please head to the [source code](https://github.com/aeria-org/aeria/tree/master/packages/core/src/presets).

::: code-group

```aeria [main.aeria]
collection Example {
  presets {
    crud
    view
  }
}
```

```typescript [types.ts]
type DescriptionPreset =
  | 'crud'
  | 'duplicate'
  | 'remove'
  | 'removeAll'
  | 'owned'
  | 'timestamped'
  | 'view'
```

:::

### `writable` <Badge type="tip" text="readonly PropertiesWithId<TDescription>[]?" />

If set, all properties except the one specified will be made read-only. Trying writing on them will trigger an Access Control error.

::: code-group

```aeria [main.aeria]
collection Example {
  writable {
    name
    document
  }
}
```

```typescript [collection.ts]
defineCollection({
  description: {
    writable: [
      'name',
      'document',
    ],
  },
})
```

```typescript [types.ts]
type DescriptionWritable = readonly PropertiesWithId<TDescription>[]
```

:::

### `search` <Badge type="tip" text="SearchOptions?" />

Activates a search bar in the frontend that will perform a MongoDB `$text` query.

::: code-group

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

```typescript [collection.ts]
defineCollection({
  description: {
    search: {
      placeholder: 'Something',
      indexes: [
        'name',
        'document',
      ],
    },
  },
})
```

```typescript [types.ts]
type DescriptionSearch<TDescription extends Description> = {
  placeholder?: string
  indexes: readonly (keyof TDescription['properties'])[]
}
```

:::

