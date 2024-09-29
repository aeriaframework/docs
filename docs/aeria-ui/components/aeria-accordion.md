<script setup lang="ts">
import { ref } from 'vue'
import { AeriaAccordion } from 'aeria-ui'
import ResultBox from '../../src/components/result-box.vue'
</script>

# aeria-accordion

This will render a minimally styled accordion.

### Example

<result-box>
<aeria-accordion
  enumerate
  :headers="{
    'question-1': 'Is Aeria a good framework?',
    'question-2': 'Is Aeria easy to learn?',
  }"
>
  <template #question-1>
    Yes. Aeria is a good framework.
  </template>

  <template #question-2>
    Absolutely. Learning Aeria couldn't be easier.
  </template>
</aeria-accordion>
</result-box>

```vue-html
<aeria-accordion
  enumerate
  :headers="{
    'question-1': 'Is Aeria a good framework?',
    'question-2': 'Is Aeria easy to learn?',
  }"
>
  <template #question-1>
    Yes. Aeria is a good framework.
  </template>

  <template #question-2>
    Absolutely. Learning Aeria couldn't be easier.
  </template>
</aeria-accordion>
```

### Props

- `enumerate` <Badge type="tip" text="boolean?" />: Will render the accordion index position along it's title.
- `headers` <Badge type="tip" text="object?" />: The title to be rendered in the accordion clickable sections, or an object containing both the title and an icon.


### Slots

- `<any>`: This slot contains the text of the accordion section. It's name should match one of the keys of the `headers` prop.

