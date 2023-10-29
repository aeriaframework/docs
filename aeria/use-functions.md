# useFunctions

This is a shorthand function intended to reduce the boilerplate needed to pass in default functions to `Collection` definitions. Functions will be returned strongely typed with the type passed to the template argument.

## Example usage

```typescript
type Person = {
  name: string
}

const functions = useFunctions<Person>()([
  'get',
  'insert'
])

// insert returns an Either
declare const insertEither: typeof functions['insert']
declare const person: typeof functions['get']

if( isRight(insertResult) ) {
  const result = unwrapEither(insertEither)

  // error! types string and boolean dont overlap
  result.name === false
}

if( person ) {
  // error! types string and boolean dont overlap
  person.name === false
}
```


