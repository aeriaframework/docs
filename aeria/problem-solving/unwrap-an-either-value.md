# Unwrap an Either value

Eithers are how Aeria handles business errors by default.

```typescript
import { left, right } from 'sonata-api'

const myFunction = () => {
  if( businessLogic() ) {
    return left(BusinessErrors.MyError)
  }

  return right({
    message: 'way to go!'
  })
}
```

The type signature of the above function will be `Left<BusinessErrors> | Right<{ message: 'way to go!' }>`. It equals to `Either<BusinessErrors, { message: 'way to go!' }>`.

## How-to

1. First off we check if the returned `Either` is a `Left` (altough in rarer situations is valid to check for `Right` first). Then inside the `if` scope we unwrap the Either value using `unwrapEither` and finally return. 

```typescript
import { isLeft, unwrapEither } from 'sonata-api'

const resultEither = myFunction()

if( isLeft(resultEither) ) {
  const error = unwrapEither(resultEither)
  return {
    error
  }
}
```

2. Typescript type system is smart enough to determine that, if `resultEither` is a `Left` the function will return imediatelly, then after the `if` the type is automatically narrowed to a `Right`. We may get our successful result using `unwrapEither` again.

```typescript
const result = unwrapEither(resultEither)
assert(result.message === 'way to go!')
```

3. In some cases this unwrap can be redundant. We may use `unsafe` to skip to the successful value, or throw if the return is a `Left`.

```typescript
import { unsafe } from 'sonata-api'

const resultEither = myFunction()

const result = unsafe(resultEither)
assert(result.message === 'way to go!')
```
