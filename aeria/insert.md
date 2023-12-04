# insert()

## Introduction

This function is used to create new documents and update existing ones in the database. Creation will be performed when the `_id` property is absent from the `payload.what`, otherwise insert will update the specified properties in the document with the given ID. Insert will either return a `Right` with the latest version of the created or updated document, with it's unique ID, or a `Left` with [access control](/aeria/access-control) or [validation errors](/aeria/validation#validationerror).

This function is automatically bound to the `POST` method on the `/collectionName` route.


## Payload

**Type:**

```typescript
type InsertPayload<TDocument extends CollectionDocument<any>> = {
  what: What<TDocument & { _id?: any }>
  project?: Projection<TDocument>
}
```

### what <Badge type="tip" text="What<TDocument & { _id?: any }>" />

This property must contain either the whole new document that will be created, or the `_id` of an existing document and set of properties that will be updated.

### project <Badge type="tip" text="Projection<TDocument>" />

An array of strings representing property names, only the specified properties will be returned from the document.
