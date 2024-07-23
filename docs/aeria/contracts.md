# Contracts

Contracts are a way to provide runtime validation and typing to routes. If input data fails to be validated, the `422 Unprocessable Entity` HTTP status is returned alongside with the `ValidationError` object. Once a contract is assigned to a route, its function becomes strongly typed in [Aeria SDK](/aeria-sdk/).

### Type

```typescript
type ContractBase = {
  // used internally to indicate the contract belongs to a builtin function
  builtin?: boolean
}

type ContractRoles = {
  roles?:
    | readonly UserRole[]
    | boolean
    | 'unauthenticated'
    | 'unauthenticated-only'
}

type Contract = ContractBase & (
  | { response: Property | Property[] }
  | { payload: Property }
  | { query: Property }
  | {
    response?: Property | Property[]
    payload?: Property
    query?: Property
  }
)
```

- `payload`: JSON-parsed request body
- `query`: JSON-parsed GET query string
- `response`: the return of the route callback
- `roles`: array of strings representing roles that will be allowed to access the resource

### Example

Below is an example of a contract that ensures:

- the POST body will have only a "key" property of type string (`context.request.payload` will be typed accordingly and validated on runtime)
- the response have the following type (the return of the callback will be typed accordingly, no runtime validation is made):

```typescript
type CallbackReturn =
  | {
    customer: string
    token: string
  }
  | EndpointError<
    EndpointErrorContent<
      ACError.ResourceNotFound,
      unknown,
      HTTPStatus.NotFound
    >
  >
```

Contract definition:

::: code-group

```aeria [contracts.aeria]
contract CheckKey {
  payload {
    properties {
      key str
    }
  }
}
```

```typescript [checkKeyContract.ts]
import { defineContract, HTTPStatus, ACError } from 'aeria'

export const CheckKeyContract = defineContract({
  payload: {
    type: 'object',
    properties: {
      key: {
        type: 'string'
      },
    }
  },
  response: [
    {
      type: 'object',
      properties: {
        customer: {
          type: 'string'
        },
        token: {
          type: 'string'
        }
      }
    },
    endpointErrorSchema({
      code: [
        ACError.ResourceNotFound
      ],
      httpStatus: [
        HTTPStatus.NotFound
      ]
    })
  ]
})
```

:::

Usage with a route:

```typescript
import { createRouter, HTTPStatus, ACError } from 'aeria'

export const router = createRouter()

router.POST('/checkKey', (context) => {
  if( businessLogic() ) {
    return context.error(HTTPStatus.NotFound, {
      code: ACError.ResourceNotFound
    })
  }

  return {
    payload: {
      customer: result.customer,
      token: result.token
    }
  }
}, CheckKeyContract)
```

The following request will **succeed** with status `200 OK`:

```http
POST /checkKey HTTP/1.1
Content-type: application/json
Accept: application/json

{
  "key": "123456"
}
```

While the following request will **fail** with status `422 Unprocessable Entity` (the type of `key` is now `number` and types of POST payloads are not coerced):

```http
POST /checkKey HTTP/1.1
Content-type: application/json
Accept: application/json

{
  "key": 123456
}
```

