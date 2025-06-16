# Builtin functions

### `insert()`

This function is used to create new documents and update existing ones in the database. Creation will be performed when the `_id` property is absent from the `payload.what`, otherwise insert will update the specified properties in the document with the given `_id`. Insert will either return a `Result` with the latest version of the created or updated document with it's `_id`, or a `Error` with [access control](/aeria/access-control) or [validation errors](/aeria/validation#validationerror).

This function is automatically bound to the `POST` method on the `/collectionName` route.


**Type:**

```ts
type InsertPayload<TDocument extends CollectionDocument<any>> = {
  what: What<TDocument & { _id?: any }>
  project?: Projection<TDocument>
}
```

<!-- ### what <Badge type="tip" text="What<TDocument & { _id?: any }>" /> -->

<!-- This property must contain either the whole new document that will be created, or the `_id` of an existing document and set of properties that will be updated. -->

<!-- ### project <Badge type="tip" text="Projection<TDocument>" /> -->

<!-- An array of strings representing property names, only the specified properties will be returned from the document. -->

### `count()`

This function is used to retrieve the number of existent documents matching passed filters.

**Type:**

```ts
type CountPayload<TDocument extends CollectionDocument<OptionalId<any>>> = {
  filters?: Filters<TDocument>
}
```

<!-- #### filters <Badge type="tip" text="Filters<TDocument>" /> -->

<!-- An object containing filters. -->

### `get()`

This function is used to retrieve the first document from the database matching specified filters. It is associated with the `GET` method on the `/collectionName/:id` route.

**Type:**

```ts
type GetPayload<TDocument extends CollectionDocument<OptionalId<any>>> = {
  filters?: Filters<TDocument>
  project?: Projection<TDocument>
}
```

<!-- ### filters <Badge type="tip" text="Filters<TDocument>" /> -->

<!-- An object containing filters. -->

<!-- ### project <Badge type="tip" text="Projection<TDocument>" /> -->

<!-- An array of strings representing property names. Properties not present in this array will be filtered out from the retrieved document. -->

<!-- ## Options -->

<!-- **Type:** -->

<!-- ```ts -->
<!-- type GetOptions = { -->
<!--   bypassAccessControl?: boolean -->
<!-- } -->
<!-- ``` -->

<!-- ### bypassAccessControl <Badge type="tip" text="boolean" /> -->

<!-- This property toggles access control. -->

### `getAll()`

This function is used to retrieve a array of documents from the database matching specified filters. It is associated with the `GET` method on `/collectionName` route.

**Type:**

```ts
type GetAllPayload<TDocument extends CollectionDocument<OptionalId<any>>> = {
  filters?: Filters<TDocument>
  project?: Projection<TDocument>
  offset?: number
  limit?: number
  sort?: QuerySort<TDocument>
}
```

<!-- ### filters <Badge type="tip" text="Filters<TDocument>" /> -->

<!-- An object containing filters. -->

<!-- ### project <Badge type="tip" text="Projection<TDocument>" /> -->

<!-- An array of strings representing property names. Properties not present in this array will be filtered out from the retrieved document. -->

<!-- ### offset <Badge type="tip" text="number" /> -->

<!-- Will start retrieving documents starting from the specified decimal offset. -->

<!-- ### limit <Badge type="tip" text="number" /> -->

<!-- Specifies the limit of documents retrieved. Queries with larger limits will take longer to execute. For safety reasons, this number can't exceed `100`. -->

<!-- ### sort <Badge type="tip" text="QuerySort<TDocument>" /> -->

<!-- A MongoDB-style sort object. Learn more about MongoDB sorting in the [MongoDB Official Documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/). -->

<!-- The example sort below will sort documents alphabetically by name in descending order, then sort again by age in ascending order: -->

<!-- ```ts -->
<!-- { -->
<!--   name: -1, -->
<!--   age: 1 -->
<!-- } -->
<!-- ``` -->

<!-- ## Options -->

<!-- ```ts -->
<!-- type GetAllOptions = { -->
<!--   bypassAccessControl?: boolean -->
<!-- } -->
<!-- ``` -->

<!-- ### bypassAccessControl <Badge type="tip" text="boolean" /> -->

<!-- This property toggles access control. -->


### `remove()`

This function is used to delete a single document from the database given a set of filters.
Remove is automatically bound to the `DELETE` method on the `/collectionName/:id` route.

**Type:**

```ts
type RemovePayload<TDocument extends CollectionDocument<OptionalId<any>>> = {
  filters: Filters<TDocument>
}

```

<!-- ### filters <Badge type="tip" text="Filters<TDocument>" /> -->

<!-- The filters used to search for the target document. -->

