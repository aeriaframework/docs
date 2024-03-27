<script setup lang="ts">
import { ref } from 'vue'
import { AeriaInfo, AeriaIcon } from 'aeria-ui'
</script>

# aeria-info

This component will render the content of the `text` slot inside a floating
baloon whenever the hover state is active. It comes handy when you need to
provide more info about something where size doesn't fit.

## Example

<aeria-info where="left">
  <template #text>
    This text will show when you hover
  </template>

  <aeria-icon icon="info">
    Hover to see more info
  </aeria-icon>
</aeria-info>

```vue-html
<aeria-info where="left">
  <template #text>
    This text will show when you hover
  </template>

  <aeria-icon icon="info">
    Hover to see more info
  </aeria-icon>
</aeria-info>
```

## Slots

### default

This slot must contain a single relatively positioned element. It can be anything.

### text

The content of this slot will be shown when user pointer is over the `default` slot.


