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
  exposedFunctions?: Record<string, AccessCondition>
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

Functions can be turned into endpoints to help with brevity and reusability, but then it is required to specify who can have access to them: authenticated users, unauthenticated users, or users containing specified roles. This is where the `exposedFunctions` property comes in. Each exposed function has it's access condition:

```typescript
export type AccessCondition =
  | readonly string[]
  | boolean
  | 'unauthenticated'
  | 'unauthenticated-only'
```

- `UserRole[]`: only specified roles have access
- `true`: only authenticated users have access
- `false`: function isn't exposed
- `'unauthenticated'`: both authenticated and unauthenticated users have access
- `'unauthenticated-only'`: only unauthenticated users have access

Functions that aren't explicitly exposed remain accessible through `context`. Bellow are examples of how to expose functions in Aeria Lang and TypeScript:

::: code-group

``` [collection.aeria]
collection Example {
  exposedFunctions {
    -- function is not exposed
    businessLogic
    -- both authenticated and unauthenticated users have access
    get @expose(unauthenticated)
    getAll @expose(unauthenticated)
    -- only authenticated users have access
    insert @expose(true)
    -- only 'root' users have access
    remove @expose([
      'root'
    ])
  }
}
```

```typescript [collection.ts]
const example = defineCollection({
  exposedFunctions: {
    // both authenticated and unauthenticated users have access
    get: 'unauthenticated',
    getAll: 'unauthenticated',
    // only authenticated users have access
    insert: true,
    // only 'root' users have access
    remove: [
      'root'
    ]
  }
})
```

:::

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

