# Collections

Collections are storable entities. Each collection has it's [data structure](/aeria/aeria-schema), functions, [contracts](/aeria/contracts), and [security policies](/aeria/security). Collection functions can also be exposed directly as endpoints if they're configured in `exposedFunctions` property, in such cases `functions.test` becomes accessible through `POST /collectionName/test`.

::: code-group

```aeria [main.aeria]
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
  functions?: Record<string, (payload: any, context: Context<any>, ...args: any[])=> any>
  contracts?: Record<string, Contract>
  exposedFunctions?: Record<string, AccessCondition>
  security?: CollectionSecurityPolicy<TCollection>
  middlewares?:
    | CollectionMiddleware<any>
    | CollectionMiddleware<any>[]
}
```

### Functions

Collections can have `(payload: any, context: Context, options?: any) => any` functions that will later be accessible through `context.collections.collectionName.functions` with their second parameter omitted. The third `options` parameter might be used to protect sensitive options from being controlled by the user when the function is exposed as an endpoint.

When exposed as an endpoint, the JSON-unserialized `POST` request body will be passed as the first parameter `payload`.

::: code-group

```aeria [main.aeria]
collection Pizza {
  functions {
    getAll
    customFunction?
  }
}
```

```typescript [pizza.ts]
import { extendCollection } from 'aeria-lang/collections/pizza'

export const pizza = extendCollection({
  functions: {
    customFunction: (payload: { name: string }, context) => {
      return {
        message: `Hello, ${payload.name}!`
      }
    }
  }
})
```

```typescript [router.ts]
router.GET('/example', (context) => {
  return context.collections.pizza.functions.customFunction({
    name: 'Terry'
  })
})
```

:::

#### Exposing functions as endpoints

Functions can be directly exposed as endpoints for the sake of brevity and reusability. This is where the `exposedFunctions` property comes in. A `AccessCondition` is passed at the time of exposing a function to tell which set of users will have access to it based on their roles.

When the `true` value is passed (`@expose` or `@expose(true)` in Aeria Lang), only authenticated users will have access.

::: code-group

```aeria [collection.aeria]
collection Example {
  functions {
    get @expose("unauthenticated")
    getAll @expose("unauthenticated")
    insert @expose
    remove @expose([
      "root"
    ])
    businessLogic?
  }
}
```

```typescript [collection.ts]
import { defineCollection, get, getAll, insert, remove } from 'aeria'

const example = defineCollection({
  description,
  functions: {
    get,
    getAll,
    insert,
    remove,
    businessLogic: (payload, context) => {
      // custom function
      return {
        success: true
      }
    },
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

### Security

Security decisions can be expressed with the `security` property.

::: code-group

```aeria [main.aeria]
collection Example {
  security {
    functions {
      getAll {
        logging {
          strategy "tenant"
        }
        rateLimiting {
          strategy "ip"
          scale 10
        }
      }
    }
  }
}
```

```typescript [collection.ts]
import { defineCollection, get, getAll, insert, remove } from 'aeria'

const example = defineCollection({
  description,
  functions,
  security: {
    functions: {
      getAll: {
        logging: {
          strategy: 'tenant'
        },
        rateLimiting: {
          strategy: 'ip',
          scale: 10,
        },
      },
    },
  },
})
```

:::

### Interacting directly with MongoDB

In `context` collections receive a `model` property. This property consists of `typeof import('mongodb').Collection` and can be used to access the database directly. Please note that this interface won't populate references automatically -- you'll need to build a custom aggregation pipeline for that. Use `functions` instead of the MongoDB interface if autopopulating references is a need.

```typescript
router.GET('/glutenFreePizzas', (context) => {
  return context.collections.pizza.model.find({
    glutenFree: true
  }).toArray()
})
```

### Collection middlewares

Collection middlewares are used to add define custom behavior to builtin functions. They can be defined using the `defineCollectionMiddleware()` helper. Each one can have one or multiple middleware functions.

- `beforeRead()`: executes before `get()`, `getAll()`, `count()`
- `beforeWrite()`: executes before `insert()`

::: code-group

```typescript [api/src/middlewares/index.ts]
import { defineCollectionMiddleware, deepMerge } from 'aeria'

export const businessTenancyMiddleware = defineCollectionMiddleware({
  beforeRead: (payload, context, next) => {
    if( !context.token.authenticated ) {
      throw new Error
    }
    return next(deepMerge(payload, {
      filters: {
        business: context.token.userinfo.business,
      },
    }), context)
  },
  beforeWrite: (payload, context, next) => {
    if( !context.token.authenticated ) {
      throw new Error
    }
    return next(deepMerge(payload, {
      what: {
        business: context.token.userinfo.business,
      },
    }), context)
  },
})
```

:::

After defined collection middlewares can be set in the `middlewares` property, which accepts a single middleware or an array of middlewares.

::: code-group

```typescript [api/src/collections.ts]
export const person = extendPersonCollection({
  // will get executed one after another
  middlewares: [
    businessTenancyMiddleware,
    anotherMiddleware,
  ],
})

export const car = extendCarCollection({
  middlewares: businessTenancyMiddleware,
})

export const building = extendBuildingCollection({
  middlewares: {
    beforeRead: (payload, context, next) => {
      // do something
      return next(payload, context)
    }
  }
})
```

:::

