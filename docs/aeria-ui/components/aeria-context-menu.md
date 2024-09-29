<script setup lang="ts">
import { ref } from 'vue'
import { AeriaContextMenu, AeriaPicture } from 'aeria-ui'
import ResultBox from '../../src/components/result-box.vue'
</script>

# aeria-context-menu

### Example

<result-box>
<aeria-context-menu
  :actions="[
    {
      label: 'Edit',
      icon: 'pencil',
      click: () => null
    },
    {
      label: 'Delete',
      icon: 'trash',
      click: () => null
    },
  ]"
>
  Click me
</aeria-context-menu>
<div class="mt-2">
  <aeria-picture
    bordered
    width="10rem"
  />
</div>
</result-box>


```vue-html
<aeria-context-menu
  :actions="[
    {
      label: 'Edit',
      icon: 'pencil',
      click: () => null
    },
    {
      label: 'Delete',
      icon: 'trash',
      click: () => null
    },
  ]"
>
  Click me
</aeria-context-menu>
```

