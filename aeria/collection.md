# Collection

Collections are storable entities. Each collection has it's [data structure](/aeria/aeria-schema), functions, [contracts](/aeria/contracts), and [security policies](/aeria/security). Collection functions can also be exposed directly as endpoints if they're configured in `exposedFunctions` property, in such cases `functions.test` becomes accessible through `POST /collectionName/test`.

::: code-group

```aeria
collection Pizza {
  properties {
    name str
    gluten_free bool
  }
  functions {
    get
    getAll
    remove
  }
}
```

```typescript [pizza.ts]
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

:::

Statically and during runtime collections are fetched from `import('.').collections`. So in order to expose collections, re-export them inside your `main` file:

::: code-group

```typescript [index.ts]
export * as collections from './collections/index.js'
```

:::


### Type

```typescript
type Collection<TCollection extends Collection = any> = {
  description: Description
  item?: any
  security?: CollectionSecurityPolicy<TCollection>
  functions?: Record<string, (payload: any, context: Context<any>, ...args: any[])=> any>
  contracts?: Record<string, Contract>
  exposedFunctions?: Record<string, AccessCondition>
}
```

### Functions

Collections can have `(payload: any, context: Context, options?: any) => any` functions that will later be accessible through `context.collections.collectionName.functions` with their second parameter omitted. The third `options` parameter might be used to protect sensitive options from being controlled by the user when the function is exposed as an endpoint.

When exposed as an endpoint, the JSON-unserialized `POST` request body will be passed as the first parameter `payload`.

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

Functions can be directly exposed as endpoints for the sake of brevity and reusability. This is where the `exposedFunctions` property comes in. A [`AccessCondition`](/aeria/access-control) is passed at the time of exposing a function to tell which set of users will have access to it based on their roles.

::: code-group

```aeria [collection.aeria]
collection Example {
  functions {
    businessLogic
    get @expose('unauthenticated')
    getAll @expose('unauthenticated')
    insert @expose(true)
    remove @expose([
      'root'
    ])
  }
}
```

```typescript [collection.ts]
const example = defineCollection({
  description,
  functions: {
    businessLogic,
    get,
    getAll,
    insert,
    remove,
  },
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

In `context` collections receive a `model` property. This property consists of `typeof import('mongodb').Collection` and can be used to access the database directly. Please note that this interface won't populate references automatically -- you'll need to build a custom aggregation pipeline for that. Use `functions` instead of interfacing with MongoDB directly if autopopulating references is a need.

```typescript
router.GET('/glutenFreePizzas', (context) => {
  return context.collections.pizza.model.find({
    glutenFree: true
  }).toArray()
})
```

