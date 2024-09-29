<script setup lang="ts">
import { ref } from 'vue'
import { AeriaPanel, AeriaButton } from 'aeria-ui'
import ResultBox from '../../src/components/result-box.vue'

const panelVisible = ref(false)
</script>

<style scoped>
:deep(.panel) > * {
  z-index: 9999999;
}
</style>

# aeria-panel

Used without any props, this component renders only a blank div. Passing the `float` or `fixed-right` properties, though, you can make modals or side panels.

### Example

<aeria-panel
  fixed-right
  close-hint
  title="Example"
  v-model="panelVisible"
  :overlay-layer="9999999999"
  class="panel"
  @overlay-click="panelVisible = false"
>
  This is an example

  <template #footer>
    <aeria-button large>Ok!</aeria-button>
  </template>
</aeria-panel>

<result-box>
  <aeria-button @click="panelVisible = true">
   Try me
  </aeria-button>
</result-box>

```vue
<script setup lang="ts">
const panelVisible = ref(false)
</script>

<template>
  <aeria-panel
    float
    close-hint
    title="Example"
    v-model="panelVisible"
    @overlay-click="panelVisible = false"
  >
    This is an example

    <template #footer>
      <aeria-button large>Ok!</aeria-button>
    </template>
  </aeria-panel>
</template>
```

### Props

- `modelValue` <Badge type="tip" text="any?" />: The `modelValue` of this component is the state that determines whether or not the panel is showing. If falsy, the panel is hidden, otherwise it's showing.
- `title` <Badge type="tip" text="string?" />: This property sets a text to be shown in the header section of the panel.
- `float` <Badge type="tip" text="boolean?" />: Will make the panel a modal.
- `close-hint` <Badge type="tip" text="boolean?" />: This property determines that the panel will have a clickable icon that will close it.

### Slots

- `header`: This slot is a replacement for the `title` prop.
- `footer`: This slot renders a fixed section below the box content.

