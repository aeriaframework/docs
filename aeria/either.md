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

These functions are used to narrow the value of an `Either<L, R>` to `Left<T>` or `Right<T>`.

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
  const error = unwrapEither(resultEither) // [!code ++]
  console.log('businessLogic() failed with the following error:', error) // [!code ++]
  return
}
```

## `unsafe()`

This function returns the unwraped value of an `Either<L, R>` if it is a `Right<T>` or throws if it is a `Left<T>`. Useful when there's no possible case where a `Left<T>` is returned and you just want to unwrap the value without testing it first.

**Example:**

```typescript
const result = unsafe(businessLogic())
// result will be Right<T>
```

