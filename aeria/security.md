# Security

Aeria provides native mechanisms to prevent common security flaws. It also allows developers to set up detailed logging in critical endpoints to track business logic misuse.

## Discrimination strategies

There are two strategies for limiting the rate with which the user can request a resource, `'tenant'` and `'ip'`. The `'tenant'` strategy will account requests made by the signed in user, while `'ip'` will use the user's IP address for this purpose.

**Type:**

```typescript
type DiscriminationStrategy =
  | 'tenant'
  | 'ip'
```

## Rate Limiting

**Type:**

```typescript
enum RateLimitingErrors {
  Unauthenticated = 'UNAUTHENTICATED',
  LimitReached = 'LIMIT_REACHED',
}

type RateLimitingWithScale = {
  scale: number
}

type RateLimitingWithLimit = {
  limit: number
}

type RateLimitingParams = {
  strategy: DiscriminationStrategy
  increment?: number
} & (
  | RateLimitingWithLimit
  | RateLimitingWithScale
  | (RateLimitingWithLimit & RateLimitingWithScale)
)

```

### Limiting the rate for a route

The `context` object has a `limitRate` function (also exported by `aeria`) that returns an `Result.Either<E, R>` with `RateLimitingErrors` on the left or the resource stats for the user on the right.

**Function signature:**

```typescript
function limitRate(params: RateLimitingParams): Promise<
  | EndpointError<
    EndpointErrorContent<
      RateLimitingError,
      HTTPStatus.TooManyRequests
    >
  >
  | {
    hits: number
    points: number
    last_reach: Date
    last_maximum_reach: Date
  }
>
```

**Example:**

::: code-group

```typescript [router.ts]
router.GET('/resource', async (context) => {
  const { error } = await context.limitRate({
    strategy: 'tenant',
    scale: 5,
  })

  if( error ) {
    return Result.error(error)
  }

  return Result.result({
    success: true
  })
})
```

```http [sample response]
HTTP/1.1 429 Too Many Requests
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: *
Access-Control-Allow-Headers: Accept,Accept-Version,Authorization,Content-Length,Content-MD5,Content-Type,Date,X-Api-Version,X-Stream-Request
Access-Control-Max-Age: 2592000
content-type: application/json
Date: Sun, 26 May 2024 06:23:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"_tag":"Error","value":{"httpStatus":429,"code":"LIMIT_REACHED"},"#__ERROR_SYMBOL__":true}
```

:::

### Limiting the rate for a collection function

The rate limit of collection functions can also be set at time of defining the collection. In `aeria-lang` this can be achieved using function attributes, whereas in TypeScript this can be achieved by setting the `security` property.

When the limit is reached, subsequent requests will fail with `429 Too Many Request` HTTP status until it refreshes.

:::code-group

```aeria [main.aeria]
collection Person {
  properties {
    // ...
  }
  functions {
    get @expose @limitRate(strategy: "tenant", scale: 5)
    getAll @expose
    insert @expose
    remove @expose
  }
}
```

```typescript [person.ts]
const person = defineCollection({
  description,
  functions: {
    get,
    getAll,
    insert,
    remove,
  },
  exposedFunctions: {
    get: true,
    getAll: true,
    insert: true,
    remove: true,
  },
  security: {
    functions: {
      get: {
        rateLimiting: {
          strategy: 'tenant',
          scale: 5
        }
      }
    }
  }
})
```

:::


## Logging

**Type:**

```typescript
type LoggingParams = {
  strategy: DiscriminationStrategy
}

```

