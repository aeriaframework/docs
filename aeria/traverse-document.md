# traverseDocument

This function iterates all the properties of a document recursively performing the specified set of operations on each step. If any of the steps returns a `Left<T>`, then the function returns it immediately, otherwise returns a `Right<T>` contained the mutated copy of the object.

```typescript
type TraverseOptions = {
  autoCast?: boolean
  getters?: boolean
  validate?: boolean
  validateRequired?: string[]
  fromProperties?: boolean
  allowOperators?: boolean
  recurseReferences?: boolean
}

declare const traverseDocument: <const TWhat extends Record<string, any>>(
  what: TWhat,
  description: Description,
  options: TraverseOptions

) => Promise<Left<ACErrors | ValidationError> | Right<{}>>
```

## Example usage

```typescript
const filtersCandidate = {
  _id: {
    $in: [
      '653c3d448a707ef3d327f624'
    ]
  }
}

const filters = await traverseDocument(filtersCandidate, context.description, {
  autoCast: true,
  allowOperators: true,
})

assert(filters._id.$in[0] instanceof ObjectId)
```

## Options

### autocast

Will automatically cast a value into it's expected type according to it's description property, throwing on error. Strings can be casted into `ObjectId` objects while Javascript date strings and timestamps can be casted into `Date` objects.

### getters

Will fulfill document with its computed properties, applying the `s$getter` callback to each one.

### validate

Will fulfill document with its computed properties, applying the `s$getter` callback to each one.

### validateRequired

When `validate` is set to true, will consider this array of property names when validating document wholeness.

### fromProperties

If set to true, will consider `Description` properties instead of document key and values.

### allowOperators

If set to true, will recurse deeper into object properties believed to contain MongoDB operators (`$in`, `$eq`, etc). Otherwhise will omit these properties from the returned object.

### recurseReferences

This flags commands whether or not `$ref` properties should be recursed into.
