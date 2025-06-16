# `getLookupPipeline()`
>`getLookupPipeline(description: Description, options?: BuildLookupPipelineOptions) => Document[]`

This function builts a MongoDB aggregation pipeline using the internal reference resolution API. It can be used to iterate documents lazily with `.next()` instead of returning paginated arrays.

### Example

```ts
const pipeline = await getLookupPipeline(context.description, {
  memoize: context.description.$id,
  project: payload.populate || project,
})

const it = context.collection.model.aggregate(pipeline)

for await ( const document of it ) {
  // {
  //   name: 'John',
  //   pet: {
  //     _id: ObjectId('...'),
  //     name: 'Thor'
  //   }
  // }
  console.log(document)
}
```

