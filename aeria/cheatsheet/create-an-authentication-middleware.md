# Create an authentication middleware

Collections have an intrisic `accessControl` property you can use to control whether or not an unauthenticated user can access a resource. On routes, however, this is done using middlewares.

## How-to

1. Create a folder named `middlewares` inside your project's `api/src` folder, then place two files inside it, one named `auth.ts` and another named `index.ts`.

2. Inside the `auth.ts` export an `RouterOptions` object like the one below. You can extend the `middleware` function to also check for specific roles in `context.token.user.roles`.

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

3. Re-export the `auth.ts` file from `index.ts`, like the following:

```typescript
export * from './auth'
```

4. Use the middleware you just create the following way:

```typescript
import * as middlewares from './middlewares'

router.GET('/authenticated-only', () => {
  return {
    message: 'You may not see this unless you are logged in.'
  }
}, middlewares.auth)
```
