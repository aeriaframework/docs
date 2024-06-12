# Error Handling

Aeria provides a set of functions and types meant to help with safe handling of errors.

## Using the `Result` namespace

The `Result` namespace consists of the `error()` and `result()` functions, used to write error-safe functions, and of the `Error<T>`, `Result<T>`, and `Either<E, R>` types. Below is an example of how a error-safe function is written:

```typescript
import { Result } from 'aeria'

enum CustomError {
  BusinessLogicError = 'BUSINESS_LOGIC_ERROR',
}

// const fn: () => Result.Either<
//   CustomError.BusinessLogicError,
//   ReturnType<typeof computation>
// >
const fn = () => {
  if( businessLogic() ) {
    return Result.error(CustomError.BusinessLogicError)
  }

  return Result.result({
    computed: computation()
  })
}
```

Later, to access the return type of that function, we destructure `error` and `result` properties that can be narrowed down to the actual result.

```typescript
router.GET('/route', (context) => {
  const { error, result } = fn()
  if( error ) {
    // const error: CustomError.BusinessLogicError
    return context.error(HTTPStatus.InternalServerError, {
      code: error,
    })
  }

  // const result: ReturnType<typeof computation>
  return Result.result(result)
})
```

## Extracting `Result` types

Sometimes you need to isolate the types of a `Result` ahead of time. This can be achieved with the `ExtractResult<T>` and `ExtractError<T>` utility types exported from Aeria.

```typescript
declare const ResultOrError: Result.Either<'my error', 'my result'>

// const result: 'my result'
declare const result: ExtractResult<ReturnType<typeof fn>>

// const error: 'my error'
declare const error: ExtractError<ReturnType<typeof fn>>
```

## Returning endpoint errors

The `EndpointError<Code, Details, HTTPStatus, Message>` is a special type of error meant to be returned from endpoints (routes or collection functions). Morphologically it's still a `Result.Error<T>`, but with a structure that will be understood as an endpoint error across the application.

```typescript
import { createRouter, HTTPStatus, ACError } from 'aeria'

export const router = createRouter()

router.GET('/route', (context) => {
  if( businessLogic() ) {
    return context.error(HTTPStatus.NotFound, {
      code: ACError.ResourceNotFound,
    })
  }
})
```

