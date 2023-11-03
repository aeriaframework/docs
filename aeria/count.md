# count

## Type signature

```typescript
declare const count: <TDocument extends CollectionDocument<any>>() => <TContext>(
  payload: {
    filters?: Filters<TDocument> | undefined;
  },
  context: TContext extends Context<infer Description>
    ? TContext
    : never
) => Promise<number>
```

## Payload

#### filters <Badge type="tip" text="Filters<TDocument>" />

An object containing filters.
