# Security

## Rate Limiting

There are two strategies for limiting the rate with which the user can request a resource, `'tenant'` and `'ip'`. The `'tenant'` strategy will account requests made by the signed in user, while `'ip'` will use the user's IP address for this purpose.

**Types:**

```typescript
enum RateLimitingErrors {
  Unauthenticated = 'UNAUTHENTICATED',
  LimitReached = 'LIMIT_REACHED',
}

type RateLimitingParams = {
  strategy:
    | 'tenant'
    | 'ip'
  limit?: number
  scale?: number
  increment?: number
}
```

### Limiting the rate for a route

The `context` object has a `limitRate` function (also exported by `aeria`) that returns an Either with `RateLimitingErrors` on the left or the resource stats for the user on the right.

**Function signature:**

```typescript
function limitRate(params: RateLimitingParams): Promise<Either<RateLimitingErrors, {
  hits: number
  points: number
  last_reach: Date
  last_maximum_reach: Date
}>>
```

**Example:**

```typescript
router.GET('/resource', (context) => {
  const rate = context.limitRate({
    strategy: 'tenant',
    scale: 5,
  })

  if( isLeft(rate) ) {
    // rate limit exceeded
    context.response.writeHead(429, {
      'content-type': 'application/json'
    })
    return rate
  }
})
```

### Limiting the rate for a collection function

The rate limit of collection functions can be set declaratively in the `security` property when using `defineCollection()`. Case the users reachs the limit, the request fails with `429 Too Many Request` HTTP status.

```typescript
const collection = defineCollection({
  description,
  functions: {
    get,
    getAll,
    insert,
    remove,
  },
  security: {
    rateLimiting: {
      get: {
        strategy: 'tenant',
        scale: 5
      }
    }
  }
})
```
