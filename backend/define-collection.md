# defineCollection

Provides type-safety for [`Collection`](/backend/collection.md) definition.
The function accepts only one argument, which is the structure of the collection enclosed in a lambda function. The return of the function is this lambda function as it is, without any mutations.

## Usage

```typescript
export const myCollection = defineCollection(() => ({
  item: MyCollection,
  description,
}))
```

Alternatively, you can define multiple collections at once, like the following:

```typescript
export const collections = defineCollections({
  person: () => ({
    // ...
  }),
  pet: () => ({
    // ...
  })
})
```
