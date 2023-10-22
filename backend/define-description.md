# defineDescription

Provides type-safety for [`Description`](/backend/description.md) definition. This function takes the description structure as an object literal as the first parameter and returns a tuple consisting of a type inferred from this object.

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
pet.name === 'Thor' // okay
pet.specie === 'cat' // produces TS diagnostics; 'cat' type doesn't exist in 'dog' | 'fish' | 'bird'
pet.name === 1 // error! type number doesn't overlap with string
```
