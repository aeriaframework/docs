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

## `ContractToFunction` utility type

Sometimes you need to implement your function outside of the router function, where the contract get's inferred. To avoid having to type the signature of the function twice, Aeria provides the `ContractToFunction<TContract, TContext>` utility type that takes a contract as the first parameter, and returns a function type.

- `TContract` - a contract
- `TContext` - a type that extends `RouteContext`, by default, `Context` is used

```ts
import type { RouteContext } from 'aeria'
import { contracts } from '../../.aeria/out/index.js'

export const editAddress = ContractToFunction<typeof contracts.OrderEditAddress, RouteContext> = (payload, context) => {
  // ...
}
```

