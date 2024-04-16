<script setup lang="ts">
import { ref } from 'vue'
import { AeriaIcon } from 'aeria-ui'
import ResultBox from '../../src/components/result-box.vue'

const name = ref('changeme')
</script>

# aeria-icon

## Example

<result-box>
  <aeria-icon
    reactive
    icon="user-circle"
  >
    Users
  </aeria-icon>
</result-box>

```vue-html
<aeria-icon
  reactive
  icon="user-circle"
>
  Users
</aeria-icon>
```

## CSS overrides

- `--icon-color: color;`: the foreground color of the icon (default: `var(--theme-foreground-color)`)

