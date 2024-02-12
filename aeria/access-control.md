# Access Control

Aeria implements [Role-based access control (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control) out-of-the-box. Access control profiles are set inside each collection definition, and they may grant or forbid a set of functions for specified roles.


## Example

```typescript
import { defineCollection, get, insert, remove } from 'aeria'

const person = defineCollection({
  description: {
    // ...
  },
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

