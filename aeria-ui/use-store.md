# useStore()

```typescript
declare const useStore: (storeId: string) => Store
```

This function will look for a store named `storeId` in `./src/stores` exports and return it case it exists, otherwise, case `storeId` is a valid collection name, will return a runtime generated [`CollectionStore`](/aeria-ui/collection-store).
