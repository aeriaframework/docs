# get()

## Introduction

This function is used to retrieve the first document from the database matching specified filters. It is associated with the `GET` method on the `/collectionName/:id` route.

## Payload

**Type:**

```typescript
type GetPayload<TDocument extends CollectionDocument<OptionalId<any>>> = {
  filters?: Filters<TDocument>
  project?: Projection<TDocument>
}
```

### filters <Badge type="tip" text="Filters<TDocument>" />

An object containing filters.

### project <Badge type="tip" text="Projection<TDocument>" />

An array of strings representing property names. Properties not present in this array will be filtered out from the retrieved document.

## Options

**Type:**

```typescript
type GetOptions = {
  bypassAccessControl?: boolean
}
```

### bypassAccessControl <Badge type="tip" text="boolean" />

This property toggles access control.
