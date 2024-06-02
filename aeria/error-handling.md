# Error Handling

Aeria provides two types used for error handling: `EndpointError` and `Either`. The `EndpointError` type is a more general one and should be preferred over `Either` when possible due to it's standardized structure and capacity of setting HTTP status codes.

When the successful return type of the function is `any` or any type that overlaps with `EndpointError`, `Either` should be preferred instead because of the following:

::: code-group

```typescript [badExample.ts]
declare const errorOrAny: () =>
  | EndpointError<EndpointErrorContent<'EXPECTED_ERROR'>>
  | any

const fn = () => {
  const value = errorOrAny()
  if( isError(value) ) {
    const error = unwrapError(value)
    // "error.code" isn't inferred correctly because
    // "EndpointError<EndpointErrorContent<'RANDOM_STRING'>>" overlaps with "any"
    // as a result, error loses it's type safety
    'RANDOM_STRING' satisfies typeof error.code
  }
}
```

```typescript [goodExample.ts]
declare const errorOrAny: () => Either<any, 'EXPECTED_ERROR'>

const fn = () => {
  const valueEither = errorOrAny()
  if( isLeft(value) ) {
    const error = unwrapEither(valueEither)
    // Error: Type '"RANDOM_STRING"' does not satisfy the expected type '"EXPECTED_ERROR".'
    // left is inferred correctly
    'RANDOM_STRING' satisfies typeof error
  }
}
```

:::


## EndpointError

The `EndpointError` type represents a standardized error that is returned by a endpoint, such a route or a collection function. It contains a `httpStatus` property that is set in the response when the error is returned from a callback.

```typescript
type EndpointErrorContent<
  TCode extends string = string,
  TDetails = unknown,
  THTTPStatus extends HTTPStatus = HTTPStatus,
  TMessage extends string = string,
> = {
  code: TCode
  details?: TDetails
  httpStatus?: THTTPStatus
  message?: TMessage
}
```

You can build a custom error type as following:

```typescript
import type { EndpointError, EndpointErrorContent, ACError } from 'aeria'

enum CustomError {
  UserNotFound = 'USER_NOT_FOUND',
}

type MyError = EndpointError<
  EndpointErrorContent<
    | ACError.ResourceNotFound
    | CustomError.UserNotFound,
    unknown,
    | HTTPStatus.NotFound
  >
>
```

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

{"_tag":"Error","value":{"httpStatus":404,"code":"NOT_FOUND"},"#__ERROR_SYMBOL__":true}
```

:::

### Using error responses

::: code-group

```typescript [index.ts]
import { isError, unwrapError, throwIfError } from 'aeria'
import { fn, FnError } from './function.js'

router.GET('/test', (context) => {
  const result = fn()

  // const result: { computation: ReturnType<typeof myComputation }
  // this avoids narrowing and unwrapping 'result', but will result in an
  // exception being throw case the return is an EndpointError
  const value = throwIfError(result)

  if( isError(result) ) {
    // 'result' can be returned directly as following (ideal):
    // return result

    // const error: ACError.ResourceNotFound | FnError 
    const error = unwrapError(result)
    switch( error.code ) {
      case ACError.ResourceNotFound: return 'resource not found!'
      case FnError.CustomError: return 'custom error!'
    }
  }

  // const result: { computation: ReturnType<typeof myComputation }
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

## Either

The `Either` type, defined as `type Either<L, R> = Left<L> | Right<R>`, is built into Aeria and can be used in more specific scenarios, like when interacting with advanced APIs such as `traverseDocument()` and `validate()`.

A function that returns an `Either` is defined like the following:

```typescript
import { left, right } from 'aeria'

enum CustomError {
  BusinessLogicError = 'BUSINESS_LOGIC_ERROR',
}

// const mightEitherSucceedOrFail = () => `Either<
//  CustomError,
//  ReturnType<typeof computation>
// >`
const mightEitherSucceedOrFail = () => {
  if( businessLogic() ) {
    left(CustomError.BusinessLogicError)
  }

  return right(computation())
}
```

To narrow and then unwrap the content of an `Either`, `isLeft()`, `isRight()`, `unwrapEither()` and `throwIfLeft()` functions are available in Aeria's public API.

```typescript
import { isLeft, unwrapEither, throwIfLeft } from 'aeria'

// const resultEither: Either<CustomError, ReturnType<typeof computation>>
const resultEither = mightEitherSucceedOrFail()

if( isLeft(resultEither) ) {
  // const error: CustomError
  const error = unwrapEither(resultEither)
  return
}

// const computation: ReturnType<typeof computation>
const computation = unwrapEither(resultEither)

// const result: ReturnType<typeof computation>
// this method avoids unwrapping completely but will throw case the function
// return is a Left
const result = throwIfLeft(mightEitherSucceedOrFail())
```

## Extracting the type of a Left, Right, or a successful computation

Sometimes you need to access the type of the content of an `Either` or an `EndpointError` ahead of time. There are utility types that allow you to do so.

```typescript
import type { ExtractLeft, ExtractRight, ExtractError, ExtractError } from 'aeria'

type MyEither = Either<'left', 'right'>
type MyError = 'success' | EndpointError<
  EndpointErrorContent<'MY_CODE'>
>

// const myLeft: 'left'
declare const myLeft: ExtractLeft<MyEither>
// const myRight: 'right'
declare const myRight: ExtractRight<MyEither>

// const successful: 'successful'
declare const successful: ExtractSuccessful<MyError>
// const error: EndpointError<EndpointErrorContent<'MY_CODE'>>
declare const error: ExtractError<MyError>
```


