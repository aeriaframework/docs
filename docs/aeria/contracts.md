# Contracts

Contracts are objects that define input and output validation rules for endpoints and restrict the access to the endpoint given an access condition.

## Attributes

Contracts can have the following attributes:

- `roles`
- `payload`
- `query`
- `response`

Example contract:

```aeria
contract AddFriend {
  roles {
    member
  }
  payload {
    properties {
      user_id User
    }
  }
  response {
    properties {
      success const @value(true)
    }
  }
}
```

The `payload`, `query` and `response` attributes can take multiple options separated by a pipe (`|`). They can also take a **modifier**.

```aeria
contract MyContract {
  response
    | Result const @value("success")
    | Error {
      properties {
        message str
        code int
      }
    }
}
```

Accepted modifiers:

- `Error`: wraps the property in a `Result.Error` object
- `Result`: wraps the property in a `Result.Result` object


## Using contracts

Contracts can be used by routes and collection functions.

Route usage:

```ts
import { contracts } from '../../.aeria/out/index.js'

router.POST('/addFriend', addFriend, contracts.AddFriend)
router.POST('/removeFriend', removeFriend, contracts.RemoveFriend)
```

