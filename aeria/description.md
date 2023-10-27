# Description

Description is an intersection of [JSON Schema](https://json-schema.org/) used to define the properties of a collection for validation alongside with access and UI behaviors. As the purpose of Aeria is to provide cohesion between backend and frontend, some frontend directives, for instance, what properties are meant to be rendered in tables and forms, are defined directly in the backend.
<!-- For declaring properties, JSON Schema is fully supported, with a few key differences. The `required` property will be actually used to verify the wholeness of your document on insertion. -->

<!-- ```typescript -->
<!-- export type Description<TDescription extends Description=any> = { -->
<!--   $id: CollectionId -->
<!--   title?: string -->

<!--   // unused -->
<!--   categories?: Array<string> -->

<!--   system?: boolean -->
<!--   inline?: boolean -->

<!--   preferred?: Record<string, Partial<TDescription | Description>> -->

<!--   alias?: string -->
<!--   icon?: string -->
<!--   options?: CollectionOptions<TDescription> -->

<!--   indexes?: ReadonlyArray<string> -->
<!--   defaults?: Record<string, any> -->

<!--   // modifiers -->
<!--   owned?: boolean | 'always' -->
<!--   timestamps?: false -->
<!--   immutable?: boolean|ReadonlyArray<string> -->

<!--   // takes an array of something -->
<!--   route?: ReadonlyArray<string> -->
<!--   presets?: ReadonlyArray<CollectionPresets> -->
<!--   required?: ReadonlyArray<PropertiesWithId<TDescription>> -->
<!--   table?: ReadonlyArray<PropertiesWithId<TDescription>> -->
<!--   tableMeta?: ReadonlyArray<PropertiesWithId<TDescription>> -->

<!--   filtersPresets?: Record<string, FiltersPreset<TDescription>> -->
<!--   freshItem?: Partial<Record<PropertiesWithId<TDescription>, any>> -->

<!--   form?: ReadonlyArray<PropertiesWithId<TDescription>>|Record<PropertiesWithId<TDescription>, Array<string>> -->
<!--   writable?: ReadonlyArray<PropertiesWithId<TDescription>> -->
<!--   filters?: ReadonlyArray<PropertiesWithId<TDescription>|{ -->
<!--     property: PropertiesWithId<TDescription> -->
<!--     default: string -->
<!--   }> -->

<!--   layout?: Layout -->
<!--   formLayout?: Partial<FormLayout<TDescription>> -->
<!--   tableLayout?: Partial<TableLayout<TDescription>> -->

<!--   // actions -->
<!--   actions?: CollectionActions<TDescription> -->
<!--   individualActions?: CollectionActions<TDescription> -->

<!--   search?: { -->
<!--     active: boolean -->
<!--     placeholder?: string -->
<!--   } -->

<!--   properties: Record<Lowercase<string>, CollectionProperty> -->
<!-- } -->
<!-- ``` -->

## $id

As in JSON Schema, this property is used to name the structure we are defining. It must have the same name as the collection.
Collection names must consist of a camel-cased noun in the singular, like `person`, `fruit` or `car`.

## filters <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

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

## filtersPresets <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

<!-- This property is used to control a filter widget rendered inside the `aeria-crud` component. If set, a filter button will appear, otherwise no filter functionallity will be made available. -->

<!-- The array passed to this property can contain two types of elements, either a string representing a property name, or an object containing both the property name and a default filter. -->

```typescript
type FiltersPreset<TDescription extends Description> = {
  name?: string
  icon?: string
  filters: Partial<Record<PropertiesWithId<TDescription> | `$${string}`, any>>
  table?: Array<PropertiesWithId<TDescription>>
  badgeFunction?: string
  default?: boolean
}

type Description = {
  filtersPresets?: Record<string, FiltersPreset<TDescription>>
  // ...
}
```

## form <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

If set, runtime generated forms will render only specified properties. Otherwise all properties are rendered.

::: warning WARNING
This property alone won't keep any of non-specified collection properties to be written. If you need to make properties read-only, use the `writable` property in an exclusive manner.
:::

```typescript
type Description = {
  form?: ReadonlyArray<PropertiesWithId<TDescription>>
  // ...
}
```

## icon <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

This property may be used to specify an icon from an icon library to be associated with the collection in the frontend.
It will be shown on navbars, breadcumbs, etc.

```typescript
type Description = {
  icon?: string
  // ...
}
```

## immutable <Badge type="tip" text="optional" />

This property may be used to specify properties that should be writable upon creation, but read-only upon update. If set to true, then will enable immutability to all properties, if set to an array of strings, only specified properties will receive that attribute.

```typescript
type Description = {
  immutable?: boolean|ReadonlyArray<string>
  // ...
}
```

## indexes <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

This optional property may be used to specify an icon from an icon library to be associated with the collection in the frontend.
It will be shown on navbars, breadcumbs, etc.

```typescript
type Description = {
  indexes?: ReadonlyArray<string>
  // ...
}
```

## owned <Badge type="tip" text="optional" />

This property is used to control the access of user-owned resources. If set to true or `'always'` in a description, users will only be able to view and edit resources created by themselves.

```typescript
type Description = {
  owned?: boolean | 'always'
  // ...
}
```

## table <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

This property is used exclusively by the frontend. Case set to an array of strings, will specify properties to be used as columns in `aeria-crud` component. Otherwise all properties will be used.

::: tip NOTE
In the frontend, Aeria will smartly request only required properties in order to make network payloads lighter. This is specialy important in runtime generated views. If you need to use a property that isn't set as a column inside your view, please add the `tableMeta` property.
:::

```typescript
type Description = {
  table?: ReadonlyArray<PropertiesWithId<TDescription>>
  // ...
}
```

## tableMeta <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

If set, grid and tabular runtime generated views will request the specified properties alongside the ones specified in `table`.

```typescript
type Description = {
  tableMeta?: ReadonlyArray<PropertiesWithId<TDescription>>
  // ...
}
```

## timestamps <Badge type="tip" text="optional" />

This property should only be used to disable automatic timestamps in a certain collection (`created_at` and `updated_at`). Timestamps are always enabled by default.

```typescript
type Description = {
  timestamps?: false
  // ...
}
```

## required <Badge type="tip" text="optional" />

This property is used to verify document wholeness upon creation and update. Case set to an array of strings, will consider only specified properties to validate document wholeness, otherwise will check if all properties are not null or undefined.

```typescript
type Description = {
  required?: ReadonlyArray<PropertiesWithId<TDescription>>
  // ...
}
```

## writable <Badge type="tip" text="optional" />

If set, all properties except the one specified will be made read-only. Trying writing on them will trigger an Access Control error.

```typescript
type Description = {
  form?: ReadonlyArray<PropertiesWithId<TDescription>>
  // ...
}
```


<!--   search?: { -->
<!--     active: boolean -->
<!--     placeholder?: string -->
<!--   } -->
