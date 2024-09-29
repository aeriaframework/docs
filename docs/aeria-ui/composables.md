# Composables

## `useAction()`
## `useBreakpoints()`
## `useDebounce()`
## `useNavbar()`

This composable function is intended for rendering navbars. It iterates a `MenuSchema` converting each route path to a route object, useful to get route metadata and such.

## `usePasswordPolicy()`

## `useScrollObserver()`

Used to observe scroll events. Accepts a `Ref<HTMLElement | null> | null` as first parameter. If null is passed, will listen to scroll events in `window`.

**Usage**

```typescript
const { reachedEnd, detach: detachScrollListener } = useScrollObserver(null, {
  antecipate: 600,
})

watch(reachedEnd, (value) => {
  console.log('Reached end?', value ? 'yes' : 'no')
})
```

