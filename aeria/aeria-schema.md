# Aeria Schema

Aeria Schema is an intersection of [JSON Schema](https://json-schema.org/) used to define the properties of a collection for validation alongside with access and UI behaviors. As the purpose of Aeria is to provide cohesion between backend and frontend, some frontend directives, for instance, what properties are meant to be rendered in tables and forms, are defined directly in the backend.


## Properties

### $id

As in JSON Schema, this property is used to name the structure we are defining. It must have the same name as the collection.
Collection names must consist of a camel-cased noun in the singular, like `person`, `fruit` or `car`.

### filters <Badge type="tip" text="DescriptionFilters?" /> <Badge type="tip" text="frontend" />

This property is used to control a filter widget rendered inside the `aeria-crud` component. If set, a filter button will appear, otherwise no filter functionallity will be made available.

The array passed to this property can contain two types of elements, either a string representing a property name, or an object containing both the property name and a default filter.

```typescript
type Description = {
  filters?: ReadonlyArray<PropertiesWithId<TDescription>|{
    property: PropertiesWithId<TDescription>
    default: string
  }>
  // ...
}
```

### filtersPresets <Badge type="tip" text="Record<string, FiltersPreset<TDescription>>?" /> <Badge type="tip" text="frontend" />

```typescript
type FiltersPreset<TDescription extends Description> = {
  name?: string
  icon?: string
  filters: Partial<Record<PropertiesWithId<TDescription> | `$${string}`, any>>
  table?: Array<PropertiesWithId<TDescription>>
  badgeFunction?: string
  default?: boolean
}
```

### form <Badge type="tip" text="ReadonlyArray<PropertiesWithId<TDescription>>?" /> <Badge type="tip" text="frontend" />

If set, runtime generated forms will render only specified properties. Otherwise all properties are rendered.

::: warning WARNING
This property alone won't keep any of non-specified collection properties to be written. If you need to make properties read-only, use the `writable` property in an exclusive manner.
:::

### formLayout <Badge type="tip" text="Partial<FormLayout<TDescription>>?" /> <Badge type="tip" text="frontend" />

This property controls how inputs should be dynamically rendered inside frontend forms.

**Type:**

```typescript
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

**Example:**

```typescript
{
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
  }
}
```

### icon <Badge type="tip" text="string?" /> <Badge type="tip" text="frontend" />

This property may be used to specify an icon from an icon library to be associated with the collection in the frontend.
It will be shown on navbars, breadcumbs, etc.

### immutable <Badge type="tip" text="(boolean | ReadonlyArray<string>)?" />

This property may be used to specify properties that should be writable upon creation, but read-only upon update. If set to true, then will enable immutability to all properties, if set to an array of strings, only specified properties will receive that attribute.

### indexes <Badge type="tip" text="ReadonlyArray<string>?" /> <Badge type="tip" text="frontend" />

This optional property may be used to specify an icon from an icon library to be associated with the collection in the frontend.
It will be shown on navbars, breadcumbs, etc.

### owned <Badge type="tip" text="(boolean | 'always')?" />

This property is used to control the access of user-owned resources. If set to true or `'always'` in a description, users will only be able to view and edit resources created by themselves.

### table <Badge type="tip" text="ReadonlyArray<PropertiesWithId<TDescription>>?" /> <Badge type="tip" text="frontend" />

This property is used exclusively by the frontend. Case set to an array of strings, will specify properties to be used as columns in `aeria-crud` component. Otherwise all properties will be used.

::: tip NOTE
In the frontend, Aeria will smartly request only required properties in order to make network payloads lighter. This is specialy important in runtime generated views. If you need to use a property that isn't set as a column inside your view, please add the `tableMeta` property.
:::

### tableMeta <Badge type="tip" text="ReadonlyArray<PropertiesWithId<TDescription>>?" /> <Badge type="tip" text="frontend" />

If set, grid and tabular runtime generated views will request the specified properties alongside the ones specified in `table`.

### timestamps <Badge type="tip" text="false?" />

This property should only be used to disable automatic timestamps in a certain collection (`created_at` and `updated_at`). Timestamps are always enabled by default.

### required <Badge type="tip" text="RequiredProperties?" />

```typescript
type RequiredProperties<TDescription extends Description> = ReadonlyArray<PropertiesWithId<TDescription>> | Partial<Record<
  PropertiesWithId<TDescription>,
  Condition<TDescription> | boolean
>>
```

This property is used to verify document wholeness upon creation and update. Case set to an array of strings, will consider only specified properties to validate document wholeness, otherwise will check if all properties are not null or undefined.

### writable <Badge type="tip" text="ReadonlyArray<PropertiesWithId<TDescription>>?" />

If set, all properties except the one specified will be made read-only. Trying writing on them will trigger an Access Control error.

### search <Badge type="tip" text="SearchOptions?" />

Activates a search bar in the frontend that will perform a MongoDB `$text` query.

```typescript
type SearchOptions<TDescription extends Description> = {
  placeholder?: string
  indexes: readonly (keyof TDescription['properties'])[]
}
```

### layout <Badge type="tip" text="Layout?" />

Specifies a layout to override the default tabular one.

```typescript
type LayoutName =
  | 'tabular'
  | 'grid'
  | 'list'

type LayoutOptions<TDescription extends Description=any> = {
  picture?: PropertiesWithId<TDescription>
  title?: PropertiesWithId<TDescription>
  badge?: PropertiesWithId<TDescription>
  information?: PropertiesWithId<TDescription>
  active?: PropertiesWithId<TDescription>
  translateBadge?: boolean
}

type Layout<TDescription extends Description=any> = {
  name: LayoutName
  options?: LayoutOptions<TDescription>
}

```
