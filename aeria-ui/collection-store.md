# CollectionStore

Whenever you define a collection in the backend, it will be automatically reflected in a store in Aeria UI. Those are a special kind of store that contains states for inserting and retrieving items, pagination, collection metadata, and more, along with actions and a interface to interact with the collection endpoints.

## $actions <Badge type="tip" text="Record<string, (...args: any[]) => any" />

### get()

Will call `store.$functions.get` and mutate `store.item` with the retrieved document.

### getAll()

Will call `store.$functions.getAll` and mutate `store.items` with the retrieved documents.

### insert()

Will call `store.$functions.insert` and mutate `store.item` and `store.items` with the retrieved document.

### deepInsert()

Will call `store.$functions.insert` recursively on each referenced collection present within the payload, and finally on the parent document, and then mutate `store.item` and `store.items` with the retrieved document.

### remove()

Will call `store.$functions.insert` and mutate `store.item` and `store.items` with the retrieved document.

### removeAll()

Will call `store.$functions.insert` and mutate `store.item` and `store.items` with the retrieved document.

### useProperties() <Badge type="tip" text="(properties: Array<string>) => Record<string, CollectionProperty>" />

A helper function that will retrieved the specified properties from `store.properties`. Example usage:

```vue
<aeria-form
  v-bind="personStore.item"
  :form="personStore.$actions.useProperties([
    'name',
    'age'
  ])"
></aeria-form>
```

### Note about `deepInsert` and `condensedItem`

In most cases using `insert` to create or update a document is fine. If you want to recursively update referenced collections, though, `deepInsert` should be used instead. Suppose we have the following Description:

```typescript
const description = <const>{
  $id: 'person',
  properties: {
    name: {
      type: 'string'
    },
    company: {
      $ref: 'company'
    },
    friends: {
      $ref: 'person'
    }
  }
}
```

Now suppose we have an object that look like following:

```typescript
const payload = {
  name: 'John',
  company: {
    _id: '625eb69b18f01d11078058c6',
    name: 'ACME Co'
  },
  friends: [
    {
      _id: '625eb69b18f01d11078058c7',
      name: 'Terry'
    },
    {
      _id: '625eb69b18f01d11078058c8',
      name: 'Davis'
    }
  ]
}
```

Calling `personStore.$actions.insert` with this payload would derive a backend error, since `$ref` expects a valid `ObjectId`, not an object. Calling `personStore.$actions.deepInsert` would recursively update the company name to "ACME Co", the friends names to "Terry" and "Davis", and ultimately update the parent document.

If, though, you had this same object, but would like only to condense child objects into their ObjectIds, without triggering any recursion, the public API function `condenseItem` could be used. Example:

```typescript
personStore.$actions.insert({
  what: condenseItem(payload)
})
```


## $functions <Badge type="tip" text="Record<string, (...args: any[]) => any" />

This property is similar to `$actions`, but contains a proxy object that maps to any endpoint of the collection, including custom and router-created ones, and won't produce any mutations in the state. Functions will return a Promise that will resolve to the response of the endpoint.
For example:

```typescript
const items = await personStore.$functions.getAll({})
```

## item <Badge type="tip" text="TDocument" />

This property bears a document.

## items <Badge type="tip" text="Array<TDocument>" />

This property bears a list of documents.

## properties <Badge type="tip" text="TDescription['properties']" />

This property is a getter that computes to `store.description.properties`.

