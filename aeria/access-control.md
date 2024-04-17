# Access Control

Access Control is a very important aspect of the Aeria architecture. It is used to restrict the access to endpoints to a specific group of users determined by `roles`. First, it is important to know that Aeria offers two ways of exposing endpoints: explicitly, using routes, and implicitly, using collection functions. There are slight differences when setting the access control for each way.

### Routes

Access to routes can be controlled using contracts. It is simple as passing the `roles` property in the third argument of the route constructor function. The `context` parameter is narrowed to match specified roles.

By default, routes are accessible to every role.

```typescript
router.GET('/resource', (context) => {
  // 
}, {
  roles: [
    'root'
  ]
})
```


### Collection functions

Collection functions can also be exposed as endpoints for the sake of brevity. Instead of writing routes for common CRUD operations, it is possible to simply import `get`, `getAll`, `insert`, etc and put them inside the `functions` property. By default, those functions are exposed as endpoints and can only be accessed by users with the builtin `root` role.

Because this syntax is meant to be shorter, a dedicated API is required to determine which group of roles can have access to each function. This is where the `accessControl` property comes in. This method gives more flexibility to prevent repetition but it doesn't narrow the `context` parameter.

```typescript
const person = defineCollection({
  functions: {
    get,
    insert,
    remove,
  }
  accessControl: {
    roles: {
      guest: {
        grant: [
          'getAll'
        ]
      },
      root: {
        grantEverything: true
      },
    }
  },
  ...
})
```

#### API definition

```typescript
type Role<
  TCollection extends Collection = any,
  TAccessControl extends AccessControl<TCollection> = any,
> = {
  inherit?: readonly (keyof TAccessControl['roles'])[]
  grantEverything?: boolean
  grant?: readonly (keyof TCollection['functions'])[]
  forbid?: readonly (keyof TCollection['functions'])[]
}
```

- `inherit`: merge with specified roles
- `grantEverything`: grant access to all functions
- `grant`: grant access to specified functions
- `forbid`: forbid access to specified functions

## Builtin roles

- `root`: When the `accessControl` property of a collection is omitted, this role is granted access to all functions.
- `guest`: Unauthenticated sessions receive the `guest` role. It is granted nothing by default, except for routes that don't specify roles.

