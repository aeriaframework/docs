# buildLookupPipeline()

## Example

```typescript
await buildLookupPipeline(references, {
  memoize: context.description.$id,
  project: payload.populate || project,
  properties: context.description.properties,
})
```
