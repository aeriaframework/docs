# CollectionStore

Whenever you define a collection in the backend, it will be automatically reflected in a store in Aeria UI. Those are a special kind of store with a preset state and interfaces to interact with endpoints (`$actions` and `$functions`).

## $actions <Badge type="tip" text="Record<string, (...args: any[]) => any" />

This property is a object that contains default CRUD operations (`get`, `getAll`, `remove`, `removeAll`, `insert`, `deepInsert`). Whenever you cast them, the state of the store will be mutated. Note how, in the example below, we can access the `petStore.items` property right away after `petStore.$actions.getAll` is called, even though we haven't assigned it.

```vue
<script setup lang="ts">
const petStore = useStore('pet')
onMounted(() => petStore.$actions.getAll())
</script>

<template>
  <ul>
    <li
      v-for="pet in petStore.items"
      :key="pet._id"
    >
      {{ pet.name }}
    </li>
  </ul>
</template>
```

On the other hand, `get`, `insert`, and `deepInsert` will mutate the `petStore.item` property instead. We may use the `v-if` Vue directive to determine whether or not the item was fetched already.

```vue
<script setup lang="ts">
const petStore = useStore('pet')
onMounted(() => petStore.$actions.get({
  filters: {
    name: 'Thor'
  }
}))
</script>

<template>
  <section v-if="petStore.item._id">
    <h1>{{ petStore.item.name }}</h1>
  </section>
</template>
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

This property is similar to `$actions`, but contains a proxy object that will map to any endpoint of the collection, including custom ones, and won't produce any mutations in the state. Functions will return a Promise that will resolve to the response of the endpoint.
For example:

```typescript
const items = await personStore.$functions.getAll({})
```

## item <Badge type="tip" text="TDocument" />

This property bears a document.

## items <Badge type="tip" text="Array<TDocument>" />

This property bears a list of documents.
