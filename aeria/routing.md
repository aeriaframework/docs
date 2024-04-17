# Routing

Aeria ships a minimalistic web server with pattern matching, grouping, middlewares, and runtime validation support.

### `createRouter()`

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

### Groups and middlewares

Routes can be grouped under a same path using the `router.group()` function. Route groups can have middlewares specified in the optional third argument. Middlewares are nothing more that a `(context: Context) => any` callback. If the middleware return value is not `undefined`, then route execution will be aborted and the return value of the middleware will be sent as the response instead.

```typescript
const helloRouter = createRouter()
helloRouter.GET('/', () => 'hello, everyone')
helloRouter.GET('/world', () => 'hello, world')

const router = createRouter()
router.group('/hello', helloRouter, (context) => {
  context.log('user hit /hello/*')
})
```

### Runtime validation

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

### Guards

You can make sure a route is only accessible if the user has certain roles. This is done using the `roles` property of [`ContractWithRoles`](/aeria/routing). Setting the `roles` for a specific route ensures type safety and requests with tokens that don't match the criteria will fail with `403 Forbidden` error.

Refer to [Access Control](/aeria/access-control) for more.

```typescript
router.GET('/authenticated', (context) => {
  // TS will produce no errors since the type of `context.token` was narrowed
  context.token.authenticated === true
  context.token.userinfo.email
}, {
  roles: [
    'root',
  ]
})

router.GET('/mixed', (context) => {
  // TS will produce errors because 'guest' is among the roles, so the user may or
  // may not be authenticated
  context.token.authenticated === true // [!code error]
  context.token.userinfo.email // [!code error]
}, {
  roles: [
    'root',
    'guest', // [!code ++]
  ]
})
```
