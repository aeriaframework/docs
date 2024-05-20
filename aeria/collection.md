# Collection

Collections are storable entities, like the "Model" in MVC, but featuring some important extra attributes. Collections can have functions that can be turned into endpoints and security policies are declared all in the same place, pretty much like if the "Model" and the "Controller" in MVC were merged together.

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

### Exposing functions as endpoints

Collection functions can be directly exposed as endpoints for the sake of brevity and reusability. This is where the `exposedFunctions` property comes in. A [`AccessCondition`](/aeria/access-control) is passed at the time of exposing a function to tell which set of users will have access to it based on their roles.

Functions that aren't explicitly exposed remain accessible through `context`. Bellow are examples of how to expose functions in Aeria Lang and TypeScript:

::: code-group

``` [collection.aeria]
collection Example {
  exposedFunctions {
    businessLogic
    get @expose(unauthenticated)
    getAll @expose(unauthenticated)
    insert @expose(true)
    remove @expose([
      'root'
    ])
  }
}
```

```typescript [collection.ts]
const example = defineCollection({
  exposedFunctions: {
    get: 'unauthenticated',
    getAll: 'unauthenticated',
    insert: true,
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

