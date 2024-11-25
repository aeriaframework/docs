# Routing

Aeria ships a minimalistic web server with pattern matching, grouping, middlewares, and runtime validation support.

### `createRouter()`
>`createRouter(options: Partial<RouterOptions> = {}) => Router`

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

In order to be installed, the router object must either be present in `init()`
options or be exported with the name `router` from the entrypoint file.

```typescript
export default init({
  router,
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

### Streaming

To stream something **through the response** of a route callback, simply return a readable stream from it.

```typescript
router.GET('/download', (context) => {
  return fs.createReadStream('/tmp/my-file.dat')
})
```

To stream something **through the request**, first make sure `X-Stream-Request` header is present with the value `1`. Without this, the stream will never open since it will be previously consumed to generate `context.request.payload`. You should then be able to pipe the `context.request` object, which itself is nothing more than a message `http.IncomingMessage`, a writable stream.

The following example first streams a file from the request to the stdin of the UNIX `tac` command to reverse it's lines order, then streams the stdout containing the result back to the response:

```typescript
router.POST('/getFileBackwards', (context) => {
  const proc = spawn('tac')
  context.request.pipe(proc.stdin)

  return proc.stdout
})
```

If streaming from inside a callback is still needed, then the `stream: true` option must be passed to indicate the response stream shouldn't be ended immediately after the callback returns.

```typescript
router.POST('/convertToMp3', (context) => {
  const tmpFile = fs.createWriteStream('/tmp/temp.mp4')
  context.request.pipe(tmpFile)

  tmpFile.on('finish', () => {
    const proc = spawn('ffmpeg', ['-i', '/tmp/temp.mp4', '-f', 'mp3', '-'])
    proc.stdout.pipe(context.response)
    proc.stderr.pipe(process.stderr)
  })
}, {
  streamed: true,
})
```

