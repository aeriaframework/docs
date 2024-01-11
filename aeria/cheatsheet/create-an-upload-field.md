# Create an upload field

File handling is done natively in Aeria. Properties that reference `file` are automatically treated as upload fields.

## How-to

1. Make sure your `upload` and `removeFile` functions are present within your collection functions.

```typescript
functions: useFunctions<typeof MyCollection>()([
  // ...
  'upload',
  'removeFile'
])
```

1. Make sure your `.env` contains a `STORAGE_PATH` environment variable set to an existing and writable path.

```
STORAGE_PATH=/data/storage
```

3. Add a property in your Description like below. Image is an arbitrary name.

```typescript
image: {
  $ref: 'file'
}
```

4. Additionally, you can restrict file types by passing whitelisted mimes into the `s$accepted` attribute. Wildcards are allowed.

```typescript
image: {
  $ref: 'file',
  s$accepted: [
    'image/*'
  ]
}
```
