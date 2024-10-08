<script setup lang="ts">
import { ref } from 'vue'
import { AeriaForm } from 'aeria-ui'
import ResultBox from '../../src/components/result-box.vue'

const formData = ref({
  name: '',
  roles: [],
})
</script>

# aeria-form

Forms can either be generated from a schema or composed using slots.

### Example

<result-box title="Result">
  <aeria-form
    v-model="formData"
    :property="{
      type: 'object',
      properties: {
        name: {
          description: 'Name',
          type: 'string',
          icon: 'user',
        },
        roles: {
          description: 'Roles',
          type: 'array',
          items: {
            enum: [
              'customer',
              'manager',
              'supervisor',
            ]
          },
          uniqueItems: true,
        },
      }
    }"
  ></aeria-form>

  <template #result>
    {{ formData }}
  </template>
</result-box>

```vue
<script setup lang="ts">
const formData = reactive({
  name: '',
  roles: [],
})
</script>

<template>
  <aeria-form
    v-model="formData"
    :property="{
      type: 'object',
      properties: {
        name: {
          description: 'Name',
          type: 'string',
          icon: 'user',
        },
        roles: {
          description: 'Roles',
          type: 'array',
          items: {
            enum: [
              'customer',
              'manager',
              'supervisor',
            ]
          },
          uniqueItems: true,
        },
      }
    }"
  ></aeria-form>

  <pre>{{ formData }}</pre>
</template>
```

### Props

- `modelValue` <Badge type="tip" text="Record<string, any>?" />: The model value of this component will be an object matching the properties passed in the `form` prop.

- `form` <Badge type="tip" text="Record<string, CollectionProperty>?" />: This prop expects the form properties to be rendered. The properties of a collection can be constructed with `store.properties` or `store.$actions.useProperties()`. You can also pass the properties like this:

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

- `collection` <Badge type="tip" text="string?" />: The name of the target collection. This property is needed whenever one of the properties passed in the `form` prop is a reference. Omitting this prop while having a reference property will cause a console warning to be shown.
