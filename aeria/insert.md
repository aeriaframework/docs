# insert()

In Aeria there's no terminological distinction between creating and updating a document. The `insert()` function will either create a new document or update an existing one based on the presence or absence of a `_id` property in the payload.

## Type

```typescript
declare const insert: <TDocument extends CollectionDocument<any>>() => <TContext>(
  payload: {
    what: What<TDocument & {
        _id?: any
    }>
    project?: Projection<TDocument>
  },
  context: TContext extends Context<infer Description>
    ? TContext
    : never

) => Promise<Left<ACErrors | ValidationError> | Right<TDocument>>
```

## Payload

#### what <Badge type="tip" text="What<TDocument & { _id?: any }>" />

The object to be inserted.

#### project <Badge type="tip" text="Projection<TDocument>" />

An array of strings representing property names, only the specified properties will be returned from the document.
