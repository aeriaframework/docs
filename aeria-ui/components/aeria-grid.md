<script setup lang="ts">
import { ref } from 'vue'
import { AeriaGrid, AeriaCard, AeriaPicture } from 'aeria-ui'
import '@aeria-ui/ui/style.css'
import '../../src/style/main.less'
</script>

# aeria-grid

This components returns a grid with standardized gaps and responsive breakpoints.

## Example

<aeria-grid>
  <aeria-card
    v-for="index in 4"
    :key="`card-${index}`"
  >
    <aeria-picture link="/static/card.svg"></aeria-picture>
    <template #footer>
      Card #{{ index }}
    </template>
  </aeria-card>

</aeria-grid>

```vue-html
<aeria-grid>
  <aeria-card
    v-for="index in 4"
    :key="`card-${index}`"
  >
    <aeria-picture link="/static/card.svg"></aeria-picture>
    <template #footer>
      Card #{{ index }}
    </template>
  </aeria-card>

</aeria-grid>
```

## Props

```typescript
type Props = {
  list?: boolean
}

```

### list <Badge type="tip" text="boolean?" />

Turns the grid into a single column list.


## Slots

### default

The grid elements.

