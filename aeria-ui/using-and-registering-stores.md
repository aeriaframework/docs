# Using and registering stores

Stores are objects that contain global state. In Aeria, they are also what glue the backend and frontend together through item states, metadata, and functions.

When accessed with `useStore()` the stores have the following `Store` type:

```typescript
type StoreState = Record<string, any>

type Store = StoreState & {
  $id: string
  $actions: Record<string, (...args: any[]) => any>
  $functions: Record<string, (...args: any[]) => any>
}
```

## `registerStore()`

This function adds a new store to a internal object to make it acessible later
through `useStore()`. It's only argument is a callback that returns the `Store`
object. 

### Example

```typescript
export myCustomStore = registerStore(() => ({
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

It's not unusual to have to extend a store that was previously generated from a Description to add more state properties, actions, or getters. The `createCollectionStore()` function does exactly that: it receives a [`Store`](/aeria-ui/store) object and merges it into a new [`CollectionStore`](/aeria-ui/collection-store) object.

::: warning WARNING
The stores should follow a naming convention to make type inference work properly.
Collections must be named-exported by `./stores` and have the same name as their collections.
:::

### Example

```typescript
export const employees = registerStore((manager) => createCollectionStore({
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

```typescript
declare const useStore: (storeId: string, manager?: GlobalStateManager) => Store
```

This function will look for a store named `storeId` in `./src/stores` exports and return it case it exists, otherwise, case `storeId` is a valid collection name, will return a runtime generated [`CollectionStore`](/aeria-ui/collection-store).

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
