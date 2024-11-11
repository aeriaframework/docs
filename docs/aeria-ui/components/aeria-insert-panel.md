<script setup lang="ts">
import { ref, inject } from 'vue'
import {
  AeriaButton,
  AeriaInsertPanel,
  useStore,
  registerStore,
  createI18n,
  createCollectionStore,
  createGlobalStateManager,
  getGlobalStateManager,
  I18N_KEY,
} from 'aeria-ui'
import ResultBox from '../../src/components/result-box.vue'

const open = ref(false)

const manager = getGlobalStateManager()
const i18n = inject(I18N_KEY)

const registerPizzaStore = registerStore((context) => createCollectionStore({
  $id: 'pizza',
  state: {
    rawDescription: {
        $id: 'pizza',
        properties: {
          name: {
              type: 'string',
          },
          size: {
            enum: [
              'S',
              'M',
              'L',
              'XL'
            ],
          },
        },
    },
  },
}, context))

registerPizzaStore({
  manager,
  i18n,
})
</script>

# aeria-insert-panel

## Example

Watch as the `Insert` button only becomes clickable when all the required fields are fulfilled.

<result-box>
  <aeria-insert-panel collection="pizza" />
</result-box>

```vue
<template>
  <aeria-insert-panel collection="pizza" />
</template>
```

### Props

- `collection` <Badge type="tip" text="string" />: the name of the collection
- individualActions? <Badge type="tip" text="IndividualActions?" />
- `form`: <Badge type="tip" text="string[]?" /> display only specified fields
- `visible`: <Badge type="tip" text="any?" /> panel is only visible if this property is undefined or truthy
- `modelValue`: <Badge type="tip" text="unknown?" /> the state of the form
- `readOnly`: <Badge type="tip" text="boolean?" /> renders the form in read-only mode
- `includeId`: <Badge type="tip" text="boolean?" /> includes a `_id` field
- `includeTimestamps`: <Badge type="tip" text="boolean?" /> includes timestamp fields

### Slots

- `header`: This slot is a replacement for the `title` prop.

