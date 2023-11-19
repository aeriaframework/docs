# Store

## Introduction

Aeria implements its own state management instead of using Pinia or Vuex, in part to provide a more coherent development experience. Native stores however resembles Pinia stores a lot.

The final `Store` object is typed like below:

```typescript
type StoreState<TContent extends object = Record<string, Exclude<any, Function>>> = TContent

type Store = StoreState & {
  $id: string
  $actions: Record<string, (...args: any[]) => any>
  $functions: Record<string, (...args: any[]) => any>
}
```

When registering stores with `registerStore()` however, an object following the below schema must be passed in (actions and getters are optional):

```typescript
const myStore = registerStore(() => {
  $id: 'myStore',
  state: {
    name: ''
  },
  actions: (state) => ({
    sayHi() {
      console.log(`Hi, ${state.name}!`)
    }
  }),
  getters: (state) => ({
    formal_name() {
      return `Sr ${state.name}`
    }
  })
})
```
