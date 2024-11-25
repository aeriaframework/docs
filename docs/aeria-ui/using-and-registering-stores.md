# Using and registering stores

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

### Example

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

### Example

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
