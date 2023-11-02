# Reference another collection

## How-to

1. Pass the `$ref` attribute to your property containing the targeted collection, along with the indexes. Indexes are used in the frontend to render your referenced document inside tables and forms, and will throw on runtime if absent.

```typescript
pet: {
  $ref: 'pet',
  s$indexes: [
    'name'
  ]
}
```

2. If you want to define default indexes for a collection, you may do so by passing in the `indexes` property to the Description.

```typescript
const [Pet, description] = defineDescription({
  $id: 'pet',
  indexes: [
    'name'
  ],
  properties: {
    name: {
      type: 'string'
    }
  }
})
```

Your references can now be rewritten without the `s$indexes`:

```typescript
pet: {
  $ref: 'pet'
}
```

3. Like any other data type, an array of references can be built using the `JSON Schema`-native `items` attribute.

```typescript
pet: {
  type: 'array',
  items: {
    $ref: 'pet'
  }
}
```
