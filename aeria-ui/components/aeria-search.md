# aeria-search

## Introduction

## Example

```vue
<script setup lang="ts">
const panel = ref(false)
const users = ref([])
</script>

<template>
  <aeria-search
    v-model="users"
    v-model:panel="panel"
    select-only
    property-name="users"
    :property="{
      type: 'array',
      items: {
        $ref: 'user',
        indexes: [
          'full_name'
        ]
      }
    }"
  ></aeria-search>
</template>
```

## Props

### modelValue <Badge type="tip" text="any" />

The model value of this component will be an object matching the properties passed in the `form` prop.

### panel <Badge type="tip" text="boolean" />

When `select-only` attribute is set, this property controls the state of the select panel. This property must be used with `v-model`.

### property <Badge type="tip" text="RefProperty | ArrayOfRefs" />

A property that is either a RefProperty or an ArrayProperty whose items is RefProperty.

### propertyName <Badge type="tip" text="string" />

The name of the property that is being searched.

### selectOnly <Badge type="tip" text="boolean" />

By default, a div with the selected items is placed by this component. When this attribute is set, this div will be omitted and only the select panel will be used.


