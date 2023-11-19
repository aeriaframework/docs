# defineDescription()

## Introduction

Provides type-safety for [`Description`](/backend/description.md) definition. This function takes the description structure as an object literal as the first parameter and returns a tuple consisting of a type inferred from this object and the untouched description object.

```typescript
import { defineDescription } from 'aeria'

export const [Pet, description] = defineDescription({
  $id: 'pet',
  properties: {
    name: {
      type: 'string'
    },
    specie: {
      enum: [
        'dog',
        'fish',
        'bird'
      ]
    }
  }
})

declare const pet: typeof Pet

// okay
pet.name === 'Thor'

// produces TS diagnostics; 'cat' type doesn't exist in 'dog' | 'fish' | 'bird'
pet.specie === 'cat'
// error! type number doesn't overlap with string
pet.name === 1
```
