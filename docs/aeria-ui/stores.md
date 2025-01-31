# Stores

Stores are objects that hold state (`.item`, `.items`, `.itemsCount`, etc) and action functions that mutate state (`.setItem()`, `.setItems()`, `.clearItems()`, etc).

Each collection has it store automatically generated in the runtime. It can be accessed with `const personStore = useStore('person')`. Collection stores can also be extended to add state and functionality. To view all properties collection stores have, visit [`CollectionStore`](/aeria-ui/collection-store)

```typescript
const personStore = useStore('person')

// this action mutates the `.items` state
await personStore.$actions.getAll()

for( const people of personStore.items ) {
  // const people: CollectionItemWithId<'person'>
  console.log(people)
}
```

**Types:**

```typescript
type StoreState = Record<string, unknown>

type Store = StoreState & {
  $id: string
  $actions: Record<string, (...args: unknown[])=> unknown>
  $functions: Record<string, (...args: unknown[])=> unknown>
}
```

## `createStore()`
>`createStore(fn: (context: StoreContext, config: unknown) => Store) => (context: StoreContext, config: unknown) => Store`

This function creates a new store from a callback.

**Example:**

```typescript
export myCustomStore = createStore(() => ({
  state: {
    counter: 0
  },
  actions: (state) => ({
    increment() {
      state.counter++
    }
  })
}))
```

## `createCollectionStore()`
>`createCollectionStore(store: Store, context: StoreContext) => StorePrototype`

It's not unusual to have to extend a store that was previously generated from a Description to add more state properties, actions, or getters. The `createCollectionStore()` function does exactly that: it receives a [`Store`](/aeria-ui/store) object and merges it into a new [`CollectionStore`](/aeria-ui/collection-store) object.

::: warning WARNING
The stores should follow a naming convention to make type inference work properly.
Collections must be named-exported by `./stores` and have the same name as their collections.
:::

**Example:**

```typescript
export const employees = createStore((manager) => createCollectionStore({
  $id: 'employees',
  state: {
    week_day: 1,
    of_the_month: {},
  },
  getters: (state) => ({
    weekDayName: () => {
      return [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ].at(state.week_day)
    }
  }),
  actions: (state, actions) => ({
    async getEmployeeOfTheWeek() {
      const result = state.of_the_month = await actions.custom('getEmployeeOfTheWeek')
      return result
    }
  })
}, manager))

```

## `useStore()`
>`useStore(storeId: string) => Store`

```typescript
declare const useStore: (storeId: string, manager?: GlobalStateManager) => Store
```

Get's a store from it's name. Will throw an exception if the store is not found.

::: warning WARNING
`useStore()` is meant to be called in Composition API, where dependency injection is available.
If you want to use a store outside Composition API, consider declaring the store in Composition API then passing it as a parameter to your external function or passing the `GlobalStateManager` parameter.
:::

```vue
<script setup lang="ts">
import { myExternalFunction } from './utils'

// useStore() won't work outside components
const userStore = useStore('user')
const manager = getGlobalStateManager()

// myExternalFunction() hasn't access to provide/inject, so we pass userStore as a parameter
const fn1 = myExternalFunction(userStore)

// We can also pass the return of the function getGlobalStateManager and call useStore() with two
// parameters in our external function, like this: useStore('user', manager)
const fn2 = myExternalFunction(manager)
</script>

<template>
  <aeria-button @click="fn1">fn1</aeria-button>
  <aeria-button @click="fn2">fn2</aeria-button>
</template>
```

## `CollectionStore`

Whenever you define a collection in the backend, it will be automatically reflected in a store in Aeria UI. Those are a special kind of store that contains states for inserting and retrieving items, pagination, collection metadata, and more, along with actions and a interface to interact with the collection endpoints.

### `item` <Badge type="tip" text="TDocument" />

This property bears a document.

### `items` <Badge type="tip" text="Array<TDocument>" />

This property bears a list of documents.

### `properties` <Badge type="tip" text="TDescription['properties']" />

This property is a getter that computes to `store.description.properties`.

### `$actions.get()`

Will call `$actions.store.$functions.get` and mutate `store.item` with the retrieved document.

### `$actions.getAll()`

Will call `$actions.store.$functions.getAll` and mutate `store.items` with the retrieved documents.

### `$actions.insert()`

Will call `$actions.store.$functions.insert` and mutate `store.item` and `store.items` with the retrieved document.

### `$actions.deepInsert()`

Will call `$actions.store.$functions.insert` recursively on each referenced collection present within the payload, and finally on the parent document, and then mutate `store.item` and `store.items` with the retrieved document.

### `$actions.remove()`

Will call `$actions.store.$functions.insert` and mutate `store.item` and `store.items` with the retrieved document.

### `$actions.removeAll()`

Will call `$actions.store.$functions.insert` and mutate `store.item` and `store.items` with the retrieved document.

### `$actions.useProperties()` <Badge type="tip" text="(properties: Array<string>) => Record<string, CollectionProperty>" />

A helper function that will retrieved the specified properties from `$actions.store.properties`. Example usage:

```vue
<aeria-form
  v-bind="personStore.item"
  :form="personStore.$actions.useProperties([
    'name',
    'age'
  ])"
></aeria-form>
```

### `$functions` <Badge type="tip" text="Record<string, (...args: any[]) => any" />

This property is similar to `$actions`, but contains a proxy object that maps to any endpoint of the collection, including custom and router-created ones, and won't produce any mutations in the state. Functions will return a Promise that will resolve to the response of the endpoint.
For example:

```typescript
const items = await personStore.$functions.getAll({})
```

