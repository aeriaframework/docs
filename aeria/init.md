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
  secret?: string
  publicUrl?: string
  baseUrl?: RouteUri
  port?: number
  paginationLimit?: number
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
  allowSignup?: boolean
  signupDefaults?: Partial<{
    roles: string[]
    active: boolean
  }>
  security?: {
    logSuccessfulAuthentications?: boolean
    authenticationRateLimiting?: RateLimitingParams | null
  }
  tokenUserProperties?: string[]
  errorHandler?: <TError extends Error>(
    context: RouteContext,
    error: TError
  )=> any | Promise<any>
}

```
