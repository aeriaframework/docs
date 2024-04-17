# Collection

Collections are storable entities, like the "Model" in MVC, but featuring some important extra attributes. Collections can have atomic functions that can also be turned into endpoints, and the Access Control and security policies are declared all in the same place, pretty much like if the "Model" and the "Controller" in MVC were merged together.

The schema of the collection is defined in a special [JSON Schema](https://json-schema.org) dialect refered to as [Aeria Schema](/aeria/aeria-schema). Only when defining collections this dialect is wrapped in another type called [Description](/aeria/description) that adds collection-specific attributes.

```typescript
import { defineCollection, get, getAll, remove } from 'aeria'

export const pizza = defineCollection({
  description: {
    $id: 'pizza',
    properties: {
      name: {
        type: 'string'
      }
      glutenFree: {
        type: 'boolean'
      }
    }
  },
  functions: {
    get,
    getAll,
    remove
  }
})
```

Collections are not visible to the application until you export them in the entrypoint file.

### Type

```typescript
type Collection<TCollection extends Collection = any> = {
  description: Description
  item?: any
  security?: CollectionSecurityPolicy<TCollection>
  accessControl?: AccessControl<TCollection>
  functions?: Record<string, (payload: any, context: Context, ...args: any[])=> any>
  functionContracts?: Record<string, Contract>
}
```

### Functions

Collections can have functions assigned to them. Those functions can either be called somewhere else in the application or be exposed directly as endpoints. They work similarly as route callbacks -- both have a `(context) => any` signature whose return is whatever the endpoint returns.

[Access Control](/aeria/access-control) is used to restrict the access to functions to specific roles.

```typescript
router.GET('/glutenFreePizzas', (context) => {
  return context.collections.pizza.functions.getAll({
    filters: {
      glutenFree: true
    }
  })
})
```

### Interacting directly with MongoDB

In `context` collections are mutated with a `model` property. This property consists of `typeof import('mongodb').Collection` and can be used to access the database directly. Please note that this interface won't populate references automatically -- you'll need to build a custom aggregation pipeline for that. Use `functions` instead of interfacing with MongoDB directly if that's more convenient.

```typescript
router.GET('/glutenFreePizzas', (context) => {
  return context.collections.pizza.model.find({
    glutenFree: true
  }).toArray()
})
```



