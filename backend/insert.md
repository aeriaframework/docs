# insert

## Type definition

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

An object containing filters.

#### project <Badge type="tip" text="Projection<TDocument>" />

An array of strings representing property names, only the specified properties will be returned from the document.
