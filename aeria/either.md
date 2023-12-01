# Either

```typescript
type Either<L, R> = Left<L> | Right<R>
```

## left() and right()

These functions are used to check

**Example:**

```typescript
enum BusinessErrors {
  
}

const fn = () => {
  const result = businessLogic()
  if( !result ) {
    return left(BusinessErrors.)
  }

  return right(result)
}
```

## isLeft() and isRight()

These functions are used to check

**Example:**

```typescript
const resultEither = businessLogic()
if( isLeft(resultEither) ) {
  // resultEither is a Left<T>
}
```

## unwrapEither()

These functions are used to check
