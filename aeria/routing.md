# Routing

Aeria ships a minimalistic web server with pattern matching, grouping, middlewares, and runtime validation support.

## createRouter()

This function is used to create a router object with an optional `RouterOptions` parameter.

```typescript
type RouterOptions = {
  exhaust?: boolean
  base?: RouteUri
}
```

The router object may be used to bind callback to routes. The route string is actually a regular expression that can be used to catch params using grouping. Routes can be defined either by using the uppercase method name directly or by using the `router.route` function to register multiple methods at once.

```typescript
export const router = createRouter()

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

If none of the patterns of the router are matched, it will by default allow for default routes to be matched. To disable this behavior and make the user-defined router the only one available, set the `exhaust` flag to `true` in `createRouter` options.

```typescript
const router = createRouter({
  exhaust: true
})
```

## Route groups and middlewares

Routes can be grouped under a same path using the `router.group()` function. Route groups can have middlewares specified in the optional third argument. Middlewares are nothing more that a `(context: Context) => any` callback that will interrupt the route execution if they return a non-undefined value.

```typescript
const helloRouter = createRouter()
helloRouter.GET('/', () => 'hello, everyone')
helloRouter.GET('/world', () => 'hello, world')

const router = createRouter()
router.group('/hello', authRouter, (context) => {
  if( !context.token.authenticated ) {
    return {
      message: 'out of here, punk!'
    }
  }
})
```

## Runtime validation

Data passed through `context.request.payload` and `context.request.query` can be validated during the runtime, resulting in a `422 Unprocessable Entity` error in case the validation fails (see: [Contracts](/aeria/contracts)). Simply pass a `Contract` object in the optional third (or fourth, if using `router.route`) parameter of the router registration function:

```typescript
router.POST('/sayMyName', (context) => {
  return context.request.payload.name
}, {
  payload: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      }
    }
  }
})
```



