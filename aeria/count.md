# count()

## Introduction

This function is used to retrieve the number of existent documents given a filter.

## Type

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

