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

<result-box>
  <aeria-button @click="open = true">
    Click Me
  </aeria-button>

  <aeria-insert-panel
    collection="pizza"
  />
</result-box>

```vue
<script setup lang="ts">
const name = ref('')
</script>

<template>
  <aeria-input v-model="name">
    Name
  </aeria-input>

  <i>Your name is: {{ name }}</i>
</template>
```

