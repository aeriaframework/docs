# insert()

## Introduction

In Aeria both creation and update operations are made through insert. The only thing that tells an update apart of a document creation is the presence of an `_id` prop within `what`. This function will either return a `Right` with the latest version of the created or updated document, with it's unique ID, or a `Left` with access control or validation errors.

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
