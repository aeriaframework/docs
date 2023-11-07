# Composables

## useAction()
## useBreakpoints()
## useClipboard()
## useCondition()
## useDebounce()
## useNavbar()

This composable function is intended for rendering navbars. It iterates a `MenuSchema` converting each route path to a route object, useful to get route metadata and such.

## usePasswordPolicy()
## useRouter()

## useStore()

```typescript
declare const useStore: (storeId: string) => Store
```

This function will look for a store named `storeId` in `./src/stores` and return it if present, otherwise, if `storeId` is a valid collection name, will return a runtime generated store of that collection.

The documentation for collection-specific stores can be found at [`CollectionStore`](/aeria-ui/collection-store).
