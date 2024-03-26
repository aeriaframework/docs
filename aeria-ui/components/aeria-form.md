# aeria-form

Aeria leverage [Descriptions](/aeria/description) to dynamically render forms, saving a lot of work and allowing useful perks like dealing with references and recursion. The `modelValue` is updated whenever the user inputs something.

In rarer cases, forms can also be rendered in a more procedural way using the default slot and input components. This can also be used to modify how a single field is rendered inside the form when using the dynamic approach.

## Example

```vue-html
<template>
  <pre>{{ personStore.item }}</pre>

  <aeria-form
    v-model="personStore.item"
    :form="personStore.$actions.useProperties([
      'name',
      'age'
    ])"
  ></aeria-form>
</template>
```

## Props

### modelValue <Badge type="tip" text="Record<string, any>?" />

The model value of this component will be an object matching the properties passed in the `form` prop.

### form <Badge type="tip" text="Record<string, CollectionProperty>?" />

This prop expects the form properties to be rendered. The properties of a collection can be constructed with `store.properties` or `store.$actions.useProperties()`. You can also pass the properties like this:

```vue-html
<aeria-form
  v-model="person"
  :form="{
    name: {
      type: 'string'
    },
    age: {
      type: 'number',
      minimum: 0,
      maximum: 100
    }
  }"
></aeria-form>
```

### collection <Badge type="tip" text="string?" />

The name of the target collection. This property is needed whenever one of the properties passed in the `form` prop is a reference. Omitting this prop while having a reference property will cause a console warning to be shown.
