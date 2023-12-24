# Contracts

## 

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

export const CheckKeyContract = defineContract([
  {
    properties: {
      key: {
        type: 'string'
      },
    }
  },
  [
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
])
```

Route definition:

```typescript
import { makeRouter } from 'aeria'

export const router = makeRouter()

router.POST('/check-key', (context) => {
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
