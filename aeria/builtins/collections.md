# Builtin collections

## Extending or replacing builtin collections

You can choose to either extend or fully replace a builtin collection.

```typescript
import { defineCollection, deepMerge, user as originalUser } from 'sonata-api'

const user = defineCollection(deepMerge(originalUser, {
  description: {
    form: [
      'referral'
    ],
      referral: {
        type: 'string'
      },
    }
  },
}))
```

## `user`

This collection is required to authentication and authorization. It contains by default basic user information, and most importantly, an email, a password, and an array of roles used by Access Control.


### `activate()`

Creates an user account, that is, insert a new user with an optional hashed password, then send account activation link through email.

- **Type**:

```typescript
function activate(
  payload: {
    password: string
  },
): Promise<Either<Error, Response>>
```

### `createAccount()`

Creates an user account, that is, insert a new user with an optional hashed password, then send account activation link through email.

- **Type**:

```typescript
function createAccount(payload: Omit<User, 'roles'>): Promise<Either<Error, User>>
```

### `getInfo()`

Creates an user account, that is, insert a new user with an optional hashed password, then send account activation link through email.

- **Type**:

```typescript
function getInfo(
  payload: {
    userId: string
    token: string
  },
): Promise<Either<Error, {
  name: string
  email: string
}>>
```

## `file`

This collection implements basic file management.

### `download()`

Fetchs a file from the database by its id, then returns a readable stream of its content.
By default, this function also sets `content-type`, `content-length`, `content-range`, and `content-disposition` headers.

- **Type**:

```typescript
function download(
  payload: {
    fileId: string
    noHeaders: boolean
    options: readonly (
      | 'picture'
      | 'download'
    )[]
  },
): Promise<Left<Error> | fs.ReadableStream>
```

## `log`

This collection implements logging. 

## `resourceUsage`

This collection implements tracking of function calls by users. It is needed in order to rate limiting to work.

