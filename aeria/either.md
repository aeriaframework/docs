# Either

**Type:**

```typescript
type Either<L, R> = Left<L> | Right<R>
```

## `left()` and `right()`

Functions used to build `Left<T>` and `Right<T>` values.
In the example below, the return type of the function is inferred as `Either<BusinessErrors, boolean>`.

**Example:**

```typescript
enum BusinessErrors {
  InvalidNumber = 'INVALID_NUMBER'
}

const isEven = (num: number) => {
  if( num < 0 || num > 10 ) {
    return left(BusinessErrors.InvalidNumber)
  }

  return right(!!(num % 2))
}
```

## `isLeft()` and `isRight()`

These functions are used to narrow the value of an Either to Left or Right.

**Example:**

```typescript
const resultEither = businessLogic()
if( isLeft(resultEither) ) {
  console.log('resultEither is a Left<T>')
  return
}

console.log('resultEither is a Right<T>')
```

## `unwrapEither()`

This function safely returns the value beared by the Either.

**Example:**

```typescript
const resultEither = businessLogic()
if( isLeft(resultEither) ) {
  const error = unwrapEither(resultEither)
  console.log('businessLogic() failed with the following error:', error)
  return
}
```

## `unsafe()`

This function returns the unwraped value of an Either or throws if the Either is actually a Left.

**Example:**

```typescript
const result = unsafe(businessLogic())
// result will be Right<T>
```

