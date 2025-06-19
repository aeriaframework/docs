# Contracts

In Aeria, a contract is a type of declaration responsible for modeling the behavior of endpoints. So, before moving to the TypeScript implementation itself, the endpoint is already modeled and documented in a separate layer. This offers a big advantage in terms of project organization as less code is produced and all the business logic can be viewed separately from the implementation.

For example, the following contract would ensure only users with the "member" role would have access to the endpoint it was assigned to, and would also provide types and runtime validation for the payload.

```aeria
contract UserAddFriend {
  roles {
    member
  }
  payload {
    properties {
      user_id User
    }
  }
  response
    | Error {
      properties {
        httpStatus int
        code str
      }
    }
    | Result User
}
```

Contracts also ensure **e2e typing**, so when properly configured, [Aeria SDK](/aeria-sdk/) would provide the right types for the endpoint:

```ts
const { error, result } = await aeria.user.addFriend({
  user_id,
})

if( error ) {
  return
}

// error! 'nxame' property does not exist on type 'User'
result.nxame
```

## Attributes

Contracts can have the following attributes:

- `roles`
- `payload`
- `query`
- `response`

The `payload`, `query` and `response` attributes can take multiple options separated by a pipe (`|`). They can also take a **modifier**.

```aeria
contract MyContract {
  response
    | Error {
      properties {
        message str
        code int
      }
    }
    | Result const @value("success")
}
```

Accepted modifiers:

- `Error`: wraps the property in a `Result.Error` object
- `Result`: wraps the property in a `Result.Result` object


## Using contracts

Contracts can be used by routes and collection functions.

**Route usage**:

To assign a contract to a route, pass it as the parameter after the route callback.

```ts
import { contracts } from '../../.aeria/out/index.js'

router.POST('/addFriend', addFriend, contracts.UserAddFriend)
router.POST('/removeFriend', removeFriend, contracts.UserRemoveFriend)
```

**Collection usage**:

To assign a contract to a collection function, you pass it in the `contracts` property named the same way as the function.

::: code-group

```ts [addFriend.ts]
import type { ContractToFunction } from 'aeria'
import { contracts } from '../../.aeria/out/index.js'

export const addFriend = ContractToFunction<typeof contracts.UserAddFriend> = (payload, context) => {
  // ...
}
```

```ts [collections.ts]
import { addFriend } from './addFriend.js'

export const user = extendUserCollection({
  functions: {
    addFriend,
  },
  contracts: {
    addFriend: contracts.UserAddFriend,
  },
})
```

:::

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

