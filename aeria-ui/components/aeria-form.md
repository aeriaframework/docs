# aeria-form

## Introduction

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
