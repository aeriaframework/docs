# Endpoint Erros

### Returning error responses

::: code-group

```typescript [router.ts]
import { HTTPStatus, ACError } from 'aeria'

router.GET('/example', (context) => {
  if( businessLogic() ) {
    return context.error(HTTPStatus.NotFound, {
      code: ACError.ResourceNotFound,
    })
  }
})
```

```typescript [collection.ts]
import { HTTPStatus, ACError } from 'aeria'

const person = defineCollection({
  description: {
    $id: 'person',
    properties: {}
  },
  functions: {
    example: (payload, context) => {
      if( businessLogic() ) {
        return context.error(HTTPStatus.NotFound, {
          code: ACError.ResourceNotFound,
        })
      }
    }
  }
})
```

```http [sample response]
HTTP/1.1 404 Not Found
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: *
Access-Control-Allow-Headers: Accept,Accept-Version,Authorization,Content-Length,Content-MD5,Content-Type,Date,X-Api-Version,X-Stream-Request
Access-Control-Max-Age: 2592000
content-type: application/json
Date: Sun, 26 May 2024 06:23:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"_tag":"Error","value":{"httpStatus":404,"code":"NOT_FOUND"},"#__ERROR_SYMBOL__":true}```

:::

### Using error responses

::: code-group

```typescript [index.ts]
import { isError, unwrapError } from 'aeria'
import { fn, FnError } from './function.js'

router.GET('/test', (context) => {
  const result = fn()

  if( isError(result) ) {
    // 'result' can be returned directly as following (ideal):
    // return result
    const error = unwrapError(result)
    switch( error.code ) {
      case ACError.ResourceNotFound: return 'resource not found!'
      case FnError.CustomError: return 'custom error!'
    }
  }

  return useComputation(result.computation)
})
```

```typescript [function.ts]
export enum FnError {
  CustomError = 'CUSTOM_ERROR'
}

export const fn = (context: Context) => {
  if( businessLogic2() ) {
    return context.error(HTTPStatus.NotFound, {
      code: ACError.ResourceNotFound,
    })
  }
  if( businessLogic2() ) {
    return context.error(HTTPStatus.Forbidden, {
      code: FnError.CustomError,
    })
  }
  return {
    computation: myComputation(),
  }
}
```

:::
