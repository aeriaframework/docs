# Validate an object against a schema

## How-to

1. Use the [`validator`](/aeria/validation#validator) function to derive a tuple containing the type inferred from the passed schema and a function that will validate the target object. You may export this tuple inside a file named `dto.ts`.

```typescript
import { validator } from 'sonata-api'

export const [PetQuery, validatePet] = validator({
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

2. The derived function can now be used to validate an object against the description we just created. This function returns an `Either<ValidationError, Result>` that can be unwraped using `unwrapEither` (see [Unwrap an Either value](/aeria/help-topics/unwrap-an-either-value) section of this document).

```typescript
import { validate, isLeft, unwrapEither } from 'sonata-api'
import { PetQuery, validatePet } from './dto'

export const myRoute = (payload: PetQuery, context: Context) => {
  const queryEither = validatePet(payload)

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

