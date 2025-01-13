# Composables

## `useAction()`
## `useBreakpoints()`
## `useDebounce()`
>`useDebounce(config: DebounceConfig) => <T>(fn: (...args: T[])=> unknown) => [call: (...args: T[]), cancel: () => void]`

Used to create delayed function calls with the ability the execution midway.

**Options**:

```ts
type DebounceConfig = {
  delay: number
  immediate?: boolean
}
```

**Example**:

```ts
const debounce = useDebounce({
  delay: 600,
})

const [performLazySearch, cancelLazySearch] = debounce(search)
watch(search, () => performLazySearch)
```

## `useNavbar()`

This composable function is intended for rendering navbars. It iterates a `MenuSchema` converting each route path to a route object, useful to get route metadata and such.

## `usePasswordPolicy()`

## `useScrollObserver()`
>`(element?: Ref<HTMLElement | null> | null, options?: ScrollObserverOptions) => { reachedEnd: Ref<boolean>, detach: () => void }`

Used to observe scroll events. Accepts a `Ref<HTMLElement | null> | null` as first parameter. If null is passed, will listen to scroll events in `window`.

**Example**:

```typescript
const { reachedEnd, detach: detachScrollListener } = useScrollObserver(null, {
  antecipate: 600,
})

watch(reachedEnd, (value) => {
  console.log('Reached end?', value ? 'yes' : 'no')
})
```

