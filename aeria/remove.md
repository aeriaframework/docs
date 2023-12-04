# remove()

## Introduction

This function is used to delete a single document from the database given a set of filters.
Remove is automatically bound to the `DELETE` method on the `/collectionName/:id` route.


## Payload

**Type:**

```typescript
type RemovePayload<TDocument extends CollectionDocument<OptionalId<any>>> = {
  filters: Filters<TDocument>
}

```

### filters <Badge type="tip" text="Filters<TDocument>" />

The filters used to search for the target document.

