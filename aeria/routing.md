# Routing

## Introduction

Aeria ships a minimalistic web server with routing and pattern matching support.

## makeRouter()

This function is used to create a router object with an optional `RouterOptions` parameter.

```typescript
type RouterOptions = {
  exhaust?: boolean
  base?: RouteUri
}
```

The router object may be used to bind callback to routes. The route string is actually a regular expression that can be used to catch params using grouping. Routes can be defined either by using the uppercase method name directly or by using the `router.route` function to register multiple methods at once.

```typescript
export const router = makeRouter()

router.GET('/age/([0-9]+)', (context) => {
  const age = Number(context.request.fragments)
  return {
    personType: age >= 18
      ? 'adult'
      : 'minor'
  }
})
```

The router object must be installed in the `init` function callback.
It's also important to return the result of the expression from the callback.

```typescript
init(null, (context) => {
  return router.install(context)
})
```

If none of the patterns of the router are matched, it will by default allow for default routes to be matched. To disable this behavior and make the user-defined router the only one available, set the `exhaust` flag to `true` in `makeRouter` options.

```typescript
const router = makeRouter({
  exhaust: true
})
```

## Route callbacks and middlewares

Middlewares can be passed as the third (or fourth) parameter of router registration in `RouterOptions.middleware`. They work the same as route callbacks, except that, if they return anything but `undefined` then the execution of the route callback will be suspended and the return value will be treated as being the response of the endpoint.

We could think of a simple middleware that ensures the user is authenticated the following way:

```typescript
import { error, ACErrors, type RouterOptions } from 'sonata-api'

export const auth: RouterOptions = {
  base: '/api',
  middleware(context) {
    if( !context.token.user._id ) {
      return error(ACErrors.AuthorizationError)
    }
  }
}

```

To use it:

```typescript
router.GET('/stats', stats, auth)
```
