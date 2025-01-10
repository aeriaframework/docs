# `init()`

```ts
import { init } from 'aeria'
import { router } from './router.js'
export * as collections from './collections.js'

export default init({
  router,
  config: {
    // ...
  },
})
```

## `init()` options

### `config`

**Type**: `ApiConfig`

See below.

### `router`

**Type**: `ReturnType<typeof createRouter>`

The main application router.

### `setup`

**Type**: `(context: RouteContext)=> unknown`

A callback that is triggered when the application loads.

## `ApiConfig`

### `name`

**Type**: `string`

A string that identifies the application. Example: `"My app"`.

### `baseUrl`

**Type**: `RouteUri`

A relative URL that delimits the API scope. Example: `"/api"`.

### `publicUrl`

**Type**: `string`

An absolute URL from where the API will be acessible. Example: `"https://mydomain.com/api"`.

### `publicUrl`

**Type**: `string`

An absolute URL from where the application frontend will be accessible. Used to generate some links sent to the user, such as account activation and password redefinition. Example: `"https://mydomain.com/"`.

### `errorHandler`
  
**Type**:

```ts
errorHandler<TError>(
  context: RouteContext,
  error: TError
)=> unknown | Promise<unknown>
```

### `tokenUserProperties`

**Type**: `(keyof CollectionItem<'user'>)[]`

Top-level properties of the `user` collection that should be present in the token retrieved by the authentication. Those properties will be present in the `Context` object in the path `context.token.userinfo`. Example: `context.token.userinfo.phone`.

By default, **reference properties** aren't populated, and only the ID is retrieved.

### `database.mongodbUrl`

**Type**: `string`

A valid MongoDB URL starting with the `mongodb://` scheme.

### `database.noDatabase`

**Type**: `boolean`

When set to `true`, a MongoDB client won't be intitialized during startup.

### `database.logQueries`

**Type**: `boolean`

When set to `true`, MongoDB queries will be logged to the standard output.

### `storage.fs`

**Type**: `string`

An writable absolute path where temporary files created during uploads are moved to after successful document insertions.

### `storage.tempFs`

**Type**: `string`

An writable absolute path where temporary files should be stored. When this property is absent, Aeria will pick the `storage.fs` path to be used instead. Optimally, this option must be set to an OS-level temporary filesystem so temporary files won't be stacked indefinitely.

### `defaultUser.username`

**Type**: `string`

An username that will grant first-time access to the application, before real users can be inserted in the DB.

### `defaultUser.password`

**Type**: `string`

A plain-text password to the first-time access user.

### `security.tokenExpiration`

**Type**: `number`

Time in milliseconds until authorization tokens expire. This is handled directly by [JWT](https://jwt.io/).

### `security.linkTokenExpiration`

Teste

### `security.logSuccessfulAuthentication`

Teste

### `security.authenticationRateLimiting`

Teste

### `security.allowSignup`

Teste

### `security.mutableUserProperties`

Teste

### `security.signupDefaults.roles`

Teste

### `security.signupDefaults.active`

Teste

### `security.paginationLimit`

Teste

### `security.exposeFunctionsByDefault`

Teste

### `security.rolesHierarchy`

```ts
type RolesHierarchy = Record<
  UserRole,
  readonly UserRole[] | boolean
>
```
