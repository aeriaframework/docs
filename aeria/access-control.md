# Access Control

Aeria comes with an already implemented [Role-based access control (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control). Each Collection may have it's own access control profile set, and Aeria will handle it on each endpoint call and internal function.

The access control profile is defined with strong typing as an object literal inside `defineCollection`. An access control profile has many roles, and each role may be allowed or forbidden to access specific functions. They can also inherit each other using `inherit`.

## Example

```typescript
import { defineCollection, get, insert, remove } from 'aeria'

const person = defineCollection({
  description,
  functions: {
    get,
    insert,
    remove
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
      moderator: {
        inherit: [
          'root'
        ],
        grant: [
          'remove'
        ]
      }
    }
  }
})
```

## Role

### inherit <Badge type="tip" text="string[]" />

Will merge the specified roles into a new one.

```typescript
{
  roles: {
    customer_service: {
      inherit: [
        'support'
      ],
      grant: {
        'closeTicket'
      }
    }
  }
}
```

### grant <Badge type="tip" text="string[]" />

Will deny access to all functions, except the ones contained within the array.

```typescript
{
  roles: {
    support: {
      grant: [
        'getAll'
      ]
    }
  }
}
```

### forbid <Badge type="tip" text="string[]" />

Will allow access to all functions, except the ones contained within the array.

```typescript
{
  roles: {
    support: {
      forbid: [
        'insert',
        'remove'
      ]
    }
  }
}
```

### grantEverything <Badge type="tip" text="boolean" />

If set to true, grants access to every function to the role.

```typescript
{
  roles: {
    manager: {
      grantEverything: true
    }
  }
}
```

## Default roles

### root

When the `accessControl` property of a collection is omitted, the access to all of its functions is granted to the `root` role. Every builtin collection has this role set by default.

### guest

When no authentication token is present and there's no authenticated user, the session will have the `guest` role. This role is granted nothing by default.

