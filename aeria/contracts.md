# Contracts

## Introduction

Contracts are a way to provide runtime validation and typing to routes. If input data fails to be validated, the `422 Unprocessable Entity` HTTP status is returned alongside with the `ValidationError` object. Once a contract is assigned to a route, its function becomes strongly typed in [Aeria SDK](/aeria-sdk/).

## Type

```typescript
type Contract =
  | { response: Property | Property[] }
  | { payload: Property }
  | { query: Property }
  | {
    response?: Property | Property[]
    payload?: Property
    query?: Property
  }
```

- `payload`: JSON-parsed request body
- `query`: JSON-parsed GET query string
- `response`: the return of the route callback

## Example

Below is an example of a contract that ensures:

- the POST body will have only a "key" property of type string (`context.request.payload` will be typed accordingly and validated on runtime)
- the response have the following type (the return of the callback will be typed accordingly, no runtime validation is made):

```typescript
{
  error: false,
  payload: {
    customer: string
    token: string
  }
  } | {
  error: true
}
```

Contract definition:

```typescript
import { defineContract } from 'aeria'

export const CheckKeyContract = defineContract({
  payload: {
    properties: {
      key: {
        type: 'string'
      },
    }
  },
  response: [
    {
      properties: {
        error: {
          literal: false
        },
        payload: {
          type: 'object',
          properties: {
            customer: {
              type: 'string'
            },
            token: {
              type: 'string'
            }
          }
        }
      }
    },
    {
      properties: {
        error: {
          literal: true
        }
      }
    },
  ]
})
```

Usage with a route:

```typescript
import { createRouter } from 'aeria'

export const router = createRouter()

router.POST('/checkKey', (context) => {
  const result = businessLogic()

  if( result ) {
    return { 
      error: true
    }
  }

  return {
    error: false,
    payload: {
      customer: result.customer,
      token: result.token
    }
  }
}, {
  contract: CheckKeyContract
})
```

