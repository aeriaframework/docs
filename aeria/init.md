# init()

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

## Example

Inline collections (collections are declared *inside* the `init` function, more suitable to smaller and more portable projects):

```typescript
import { init } from 'sonata-api'

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
import { init } from 'sonata-api'
export * as collections from './collections'

export default init({
  config: {
    database: {
      mongodbUrl: 'mongodb://localhost:27107/db'
    }
  }
})
```


## ApiConfig

**Type:**

```typescript
export type ApiConfig = {
  secret?: string
  apiUrl?: string
  port?: number
  paginationLimit?: number
  database?: {
    mongodbUrl?: string
    noDatabase?: boolean
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
  logSuccessfulAuthentications?: boolean
  tokenUserProperties?: string[]
  errorHandler?: <TError extends Error>(
    context: Context,
    error: TError
  )=> any | Promise<any>
}
```
