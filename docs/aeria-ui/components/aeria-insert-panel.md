<script setup lang="ts">
import { ref, provide } from 'vue'
import {
  AeriaButton,
  AeriaInsertPanel,
  useStore,
  registerStore,
  createI18n,
  createCollectionStore,
  createGlobalStateManager,
  I18N_KEY,
  GLOBAL_STATE_KEY,
} from 'aeria-ui'
import ResultBox from '../../src/components/result-box.vue'

const open = ref(false)

const manager = createGlobalStateManager()
provide(GLOBAL_STATE_KEY, manager.__globalState)

const registerPizzaStore = registerStore((context) => createCollectionStore({
  $id: 'pizza',
}, context))

const pizzaStore = registerPizzaStore({
  manager,
  i18n: createI18n().__globalI18n,
})

console.log(useStore('pizza', manager))
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
