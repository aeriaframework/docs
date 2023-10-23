# getAll

## Type Signature

```typescript
type GetAllOptions = {
  bypassAccessControl?: boolean
}

declare const getAll: <TDocument extends CollectionDocument<any>>() => <TContext>(
  payload: {
    filters?: Filters<TDocument>
    project?: Projection<TDocument>
    offset?: number
    limit?: number
    sort?: QuerySort<TDocument>
  } | null,
  context: TContext extends Context<infer Description>
    ? TContext
    : never,
  options?: GetAllOptions

) => Promise<TDocument[]>
```

## Payload

#### filters <Badge type="tip" text="Filters<TDocument>" />

An object containing filters.

#### project <Badge type="tip" text="Projection<TDocument>" />

An array of strings representing property names, only the specified properties will be returned from the document.

#### offset <Badge type="tip" text="number" />

Will start retrieving documents starting from the specified decimal offset.

#### limit <Badge type="tip" text="number" />

Specifies the limit of documents retrieved. Queries with larger limits will take longer to execute. For safety reasons, this number can't exceed `100`.

#### sort <Badge type="tip" text="QuerySort<TDocument>" />

A MongoDB-style sort object. Learn more about MongoDB sorting in the [MongoDB Official Documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/).

The example sort below will sort names alphabetically in descending order:

```typescript
{
  name: -1
}
```
