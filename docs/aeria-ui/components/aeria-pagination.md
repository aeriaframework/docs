<script setup lang="ts">
import { ref } from 'vue'
import { AeriaPagination } from 'aeria-ui'
import ResultBox from '../../src/components/result-box.vue'

const pagination = ref({
  recordsCount: 10,
  recordsTotal: 100,
  offset: 0,
  limit: 10,
})
</script>

# aeria-pagination

This component renders a group of checkboxes (or radio inputs) depending on the property type.

### Example

Click the buttons to see how the page changes.

<result-box>
<aeria-pagination :pagination></aeria-pagination>
</result-box>

<!-- <result-box title="Single choice" class="mb-4"> -->
<!--   <aeria-options -->
<!--     v-model="singleChoice" -->
<!--     :property="{ -->
<!--       enum: [ -->
<!--         'a', -->
<!--         'b', -->
<!--         'c', -->
<!--       ] -->
<!--     }" -->
<!--   ></aeria-options> -->
<!---->
<!--   <template #result> -->
<!--     {{ singleChoice }} -->
<!--   </template> -->
<!-- </result-box> -->
<!---->
<!-- <result-box title="Multiple choice"> -->
<!--   <aeria-options -->
<!--     v-model="multipleChoice" -->
<!--     :property="{ -->
<!--       type: 'array', -->
<!--       items: { -->
<!--         enum: [ -->
<!--           'a', -->
<!--           'b', -->
<!--           'c', -->
<!--         ] -->
<!--       } -->
<!--     }" -->
<!--   ></aeria-options> -->
<!---->
<!--   <template #result> -->
<!--     {{ multipleChoice }} -->
<!--   </template> -->
<!-- </result-box> -->
<!---->

```vue
<script setup lang="ts">
const pagination = ref({
  recordsCount: 10,
  recordsTotal: 100,
  offset: 0,
  limit: 10,
})
</script>

<template>
  <aeria-pagination :pagination></aeria-pagination>
</template>
```

### Props

**Types:**

```ts
type Pagination = {
  recordsCount: number
  recordsTotal: number
  offset: number
  limit: number
}
```

- `pagination` <Badge type="tip" text="Pagination" />: the pagination object. It is the same object returned by `getAll`.
