# Builtin collections

## `user`

This collection is required to authentication and authorization. It contains by default basic user information, and most importantly, an email, a password, and an array of roles used by Access Control.


### `activate()`
>`activate(payload: { password: string }) => Promise<Either<Error, Response>>`

Creates an user account, that is, insert a new user with an optional hashed password, then send account activation link through email.

### `createAccount()`
>`createAccount(payload: Omit<User, 'roles'>) => Promise<Either<Error, User>>`

Creates an user account, that is, insert a new user with an optional hashed password, then send account activation link through email.

### `getInfo()`
>`getInfo( payload: { userId: string token: string }) => Promise<Either<Error, { name: string email: string }>>`

Creates an user account, that is, insert a new user with an optional hashed password, then send account activation link through email.


## `file`

This collection implements basic file management.

### `download()`
>`download(payload: { fileId: string noHeaders: boolean options: readonly ( | 'picture' | 'download')[] }) => Promise<Result.Error<Error> | fs.ReadableStream>`

Fetchs a file from the database by its id, then returns a readable stream of its content.
By default, this function also sets `content-type`, `content-length`, `content-range`, and `content-disposition` headers.

## `log`

This collection implements logging. 

## `resourceUsage`

This collection implements tracking of function calls by users. It is needed in order to rate limiting to work.

## Extending or replacing builtin collections

You can choose to either extend or fully replace a builtin collection.

```ts
import { extendCollection user as originalUser } from 'aeria'

export const user = extendCollection(originalUser, {
  description: {
    form: [
      'referral'
    ],
    properties: {
      referral: {
        type: 'string'
      },
    }
  },
})
```

