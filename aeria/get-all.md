# getAll()

## Introduction

This function is used to retrieve a array of documents from the database matching specified filters. It is associated with the `GET` method on `/collectionName` route.

## Payload

**Type:**

```typescript
type GetAllPayload<TDocument extends CollectionDocument<OptionalId<any>>> = {
  filters?: Filters<TDocument>
  project?: Projection<TDocument>
  offset?: number
  limit?: number
  sort?: QuerySort<TDocument>
}
```

### filters <Badge type="tip" text="Filters<TDocument>" />

An object containing filters.

### project <Badge type="tip" text="Projection<TDocument>" />

An array of strings representing property names. Properties not present in this array will be filtered out from the retrieved document.

### offset <Badge type="tip" text="number" />

Will start retrieving documents starting from the specified decimal offset.

### limit <Badge type="tip" text="number" />

Specifies the limit of documents retrieved. Queries with larger limits will take longer to execute. For safety reasons, this number can't exceed `100`.

### sort <Badge type="tip" text="QuerySort<TDocument>" />

A MongoDB-style sort object. Learn more about MongoDB sorting in the [MongoDB Official Documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/).

The example sort below will sort documents alphabetically by name in descending order, then sort again by age in ascending order:

```typescript
{
  name: -1,
  age: 1
}
```

## Options

```typescript
type GetAllOptions = {
  bypassAccessControl?: boolean
}
```

### bypassAccessControl <Badge type="tip" text="boolean" />

This property toggles access control.
