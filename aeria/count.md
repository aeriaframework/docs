# count()

## Introduction

This function is used to retrieve the number of existent documents matching passed filters.

## Payload

**Type:**

```typescript
type CountPayload<TDocument extends CollectionDocument<OptionalId<any>>> = {
  filters?: Filters<TDocument>
}

```

#### filters <Badge type="tip" text="Filters<TDocument>" />

An object containing filters.
