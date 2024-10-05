# `init()`

This function bootstraps an Aeria instance. Inside it goes the API configuration object, user collections, and a callback for controlling HTTP requests.

**Type:**

```typescript
type InitOptions = {
  config?: ApiConfig
  callback?: (context: Context)=> any
  collections?: Record<string, {
    description: NonCircularJsonSchema
  }>
}
```

### Example

Inline collections (collections are declared *inside* the `init` function, more suitable to smaller and more portable projects):

```typescript
import { init } from 'aeria'

export default init({
  collections: {
    pizza: {
      description: {
        $id: 'pizza',
        properties: {
          name: {
            type: 'string'
          }
        }
      }
    }
  },
  config: {
    database: {
      mongodbUrl: 'mongodb://localhost:27107/db'
    }
  }
})
```

Re-exported collections (collections are *re-exported* from another module, more suitable to bigger projects with a lot of collections):

```typescript
import { init } from 'aeria'
export * as collections from './collections'

export default init({
  config: {
    database: {
      mongodbUrl: 'mongodb://localhost:27107/db'
    }
  }
})
```


### `ApiConfig`

**Type:**

```typescript
type ApiConfig = {
  name?: string
  secret?: string
  baseUrl?: RouteUri
  publicUrl?: string
  port?: number
  defaultPaginationLimit?: number
  database?: {
    mongodbUrl?: string
    noDatabase?: boolean
    logQueries?: boolean
  }
  storage?: {
    fs?: string
    tempFs?: string
  }
  defaultUser?: {
    username: string
    password: string
  }
  security: {
    tokenExpiration?: number
    logSuccessfulAuthentications?: boolean
    authenticationRateLimiting?: RateLimitingParams | null
    allowSignup?: boolean
    signupDefaults?: {
      roles?: string[]
      active?: boolean
    }
    paginationLimit?: number
    exposeFunctionsByDefault?:
      | boolean
      | 'unauthenticated'
  }
  tokenUserProperties?: (keyof CollectionItem<'user'>)[]
  errorHandler?: <TError>(
    context: RouteContext,
    error: TError
  )=> unknown | Promise<unknown>
}
```
