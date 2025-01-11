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

### `host`

**Type**: `string`

The host on which the HTTP server will start listening. Example: `"0.0.0.0"`.

### `port`

**Type**: `port`

The port on which the HTTP server will start listening. Example: `3000`.

### `name`

**Type**: `string`

A string that identifies the application. Example: `"My app"`.

### `noWarmup`

**Type**: `boolean`

If set to `true`, won't print the startup summary.

### `baseUrl`

**Type**: `RouteUri`

A relative URL that delimits the API scope. Example: `"/api"`.

### `publicUrl`

**Type**: `string`

An absolute URL from where the API will be acessible. Example: `"https://mydomain.com/api"`.

### `webPublicUrl`

**Type**: `string`

An absolute URL from where the application frontend will be accessible. Used to generate some links sent to the user, such as account activation and password redefinition. Example: `"https://mydomain.com/"`.

### `defaultPaginationLimit`

**Type**: `number`

The number of records `getAll` returns by default. Defaults to `10`.

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

Time in milliseconds until authorization tokens expire. This is handled directly by [JWT](https://jwt.io/). Defaults to `36000`.

### `security.linkTokenExpiration`

Teste

### `security.logSuccessfulAuthentication`

**Type**: `boolean`

If set to `true`, a log record will be created with the timestamp and information of the signed in user.

### `security.authenticationRateLimiting`

Teste

### `security.allowSignup`

**Type**: `boolean`

If set to `true`, the `/user/createAccount` endpoint will be enabled for unauthenticated users to create accounts.

### `security.mutableUserProperties`

**Type**: `(keyof CollectionItem<'user'>)[]`

A list of properties users are able to edit through the `/user/editProfile` endpoint.

**Default**:

```ts
[
    'email',
    'name',
    'password',
    'phone_number',
    'picture_file',
]
```

### `security.signupDefaults.roles`

**Type**: `readonly UserRole[]`

The roles to be assigned to new users created through the `/user/createAccount` endpoint.

### `security.signupDefaults.active`

**Type**: `boolean`

### `security.paginationLimit`

**Type**: `number`

The maximum number of records a user is allowed to retrieve in a single `getAll` request. Defaults to `100`.

### `security.exposeFunctionsByDefault`

**Type**: `boolean | 'unauthenticated'`

Exposes all collection functions by default. If set to `true`, exposes to authenticated users only. If set to `'unauthenticated'`, exposes to both authenticated and unauthenticated users.

### `security.rolesHierarchy`

```ts
type RolesHierarchy = Record<
  UserRole,
  readonly UserRole[] | boolean
>
```

