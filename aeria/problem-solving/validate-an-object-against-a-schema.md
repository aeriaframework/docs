# Validate an object against a schema

## How-to

1. Use `defineDescription` to derive a tuple containing a type and the description of the object we want to validate. You may export this tuple inside a file named `dto.ts`.

```typescript
export const [PetQuery, petQueryDescription] = defineDescription({
  properties: {
    name: {
      type: 'string'
    },
    specie: {
      enum: [
        'dog',
        'bird'
      ]
    }
  }
})
```

2. The `validate` function can now be used to validate an object against the description we just created. This function returns an `Either<ValidationError, Result>` that can be unwraped using `unwrapEither` (see [Unwrap an Either value](/aeria/problem-solving/unwrap-an-either-value) section of this document).

```typescript
import { validate, isLeft, unwrapEither } from 'sonata-api'
import { PetQuery, petQueryDescription } from './dto'

export const myRoute = (payload: PetQuery, context: Context) => {
  const queryEither = validate(payload, petQueryDescription)

  if( isLeft(queryEither) ) {
    const error = unwrapEither(queryEither)
    return {
      error
    }
  }

  const query = unwrapEither(queryEither)
  return context.models.pet.find(query).toArray()
}
```

3. A more succint approach is possible with `validateSilently`. This function will just return `null` in case the validation fails, so there will be no `Either` to unpack, but the validation error is also not retrieved.

```typescript
import { validateSilently, isLeft, unwrapEither } from 'sonata-api'
import { PetQuery, petQueryDescription } from './dto'

export const myRoute = (payload: PetQuery, context: Context) => {
  const query = validateSilently(payload, petQueryDescription)
  if( !query ) {
    return {
      error: true,
      message: 'invalid query'
    }
  }

  return context.models.pet.find(query).toArray()
}
```

