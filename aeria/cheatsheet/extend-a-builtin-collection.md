# Extend a builtin collection

To extend a builtin collection while keeping the types right, use deepMerge to merge the right object onto the old collection description, then add the `item` property to `defineCollection` with an empty object typed as `SchemaWithId<typeof description>`.

```typescript
import {
  defineCollection,
  user as oldUser,
  deepMerge,
  type SchemaWithId,
  type Description
} from 'sonata-api'

const description = deepMerge(oldUser.description, {
  properties: {
    is_premium: {
      type: 'boolean'
    }
  }
} satisfies Partial<Description>)

export const user = defineCollection({
  description,
  item: {} as SchemaWithId<typeof description>
})
```
