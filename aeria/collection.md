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
      gluten_free: {
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
  functions?: Record<string, ((payload: any, context: Context, ...args: any[])=> any) & FunctionAttributes>
  functionContracts?: Record<string, Contract>
  exposedFunctions?: Record<string, readonly string[] | boolean>
}
```

### Functions

Collections can have functions assigned to them. Those functions can either be called somewhere else in the application or be exposed directly as endpoints. They work similarly as route callbacks -- both have a `(context) => any` signature whose return is whatever the endpoint returns.

```typescript
router.GET('/glutenFreePizzas', (context) => {
  return context.collections.pizza.functions.getAll({
    filters: {
      glutenFree: true
    }
  })
})
```

### Access Control

Functions can be turned into endpoints to help with brevity and reusability, but then it is required to specify who can have access to them: authenticated users, unauthenticated users, or users containing specified roles. This is where the `exposedFunctions` property comes in.

The `exposedFuncions` property has the following type, where the keys represents function names and the values are either an array of roles or a boolean. When set to an **array**, access to the endpoint will only be granted to specified roles. When set to a **false**, the function is not exposed at all. When set to **true**, the function is exposed to every authenticated user.


```typescript
type ExposedFunctions = Partial<
  Record<keyof TFunctions, readonly string[] | boolean>
>
```

For some use cases it might be unnecessary to control the access to every endpoint. In such cases the `config.security.exposeFunctionsByDefault` can be set to `true` to exposed functions to authenticated users by default, or to `'unauthenticate'` to include unauthenticated users.

### Interacting directly with MongoDB

In `context` collections are mutated with a `model` property. This property consists of `typeof import('mongodb').Collection` and can be used to access the database directly. Please note that this interface won't populate references automatically -- you'll need to build a custom aggregation pipeline for that. Use `functions` instead of interfacing with MongoDB directly if that's more convenient.

```typescript
router.GET('/glutenFreePizzas', (context) => {
  return context.collections.pizza.model.find({
    glutenFree: true
  }).toArray()
})
```

