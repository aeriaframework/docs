# get()

## Type

```typescript
type GetOptions = {
  bypassAccessControl?: boolean
}

declare const get: <TDocument extends CollectionDocument<any>>() => <TContext>(
  payload: {
    filters?: Filters<TDocument>
    project?: Projection<TDocument>
  },
  context: TContext extends Context<infer Description>
    ? TContext
    : never,
  options?: GetOptions

) => Promise<TDocument | null>
```

## Payload

#### filters <Badge type="tip" text="Filters<TDocument>" />

An object containing filters.

#### project <Badge type="tip" text="Projection<TDocument>" />

An array of strings representing property names, only the specified properties will be returned from the document.
