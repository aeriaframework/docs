# registerStore()

## Introduction

This function adds a new store to a internal object to make it acessible later
through `useStore()`. It's only argument is a callback that returns the `Store`
object. This function is often used alongside `createCollectionStore()` to
extend runtime-generated stores.

::: warning WARNING
The stores should follow a naming convention to make type inference work properly.
Collections must be named-exported by `./stores` and have the same name as their collections.
:::

## createCollectionStore()

It's not unusual to have to extend a store that was previously generated from a Description to add more state properties, actions, or getters. The `createCollectionStore()` function does exactly that: it receives a [`Store`](/aeria-ui/store) object and merges it into a new [`CollectionStore`](/aeria-ui/collection-store) object.

## Example

```typescript
export const employees = () => registerStore(() => createCollectionStore()({
  $id: 'employees',
  state: {
    of_the_month: {}
  },
  actions: (state, actions) => ({
    async getEmployeeOfTheWeek() {
      const result = state.of_the_month = await actions.custom('getEmployeeOfTheWeek')
      return result
    }
  })
}))

```
