# CollectionProperty

## Properties

### default <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

If set to any value, the value of this property will be preferred over null or undefined on document creation.

```typescript
type CollectionProperty = {
  default?: any
  // ...
}
```

### description <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

If set to a string, the value of this property will be preferred when displaying the property name on form labels. Otherwise an internationalized version of the property name will be used.

```typescript
type CollectionProperty = {
  description?: string
  // ...
}
```

### readOnly <Badge type="tip" text="optional" />

If true, will make the property unwritable on document creation and update. Trying to write on it won't return any error, the new value will just be ignored instead.

```typescript
type CollectionProperty = {
  readOnly?: boolean
  // ...
}
```

### s$element <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

When applicable, this property specifies a custom HTML element to handle input.

```typescript
type PropertyElement =
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'textarea'

type CollectionProperty = {
  s$element?: PropertyElement
  // ...
}
```

### s$focus <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

Signals the input of this property should be focused as soon as a form is rendered. Each form may have only one property with this flag enabled.

```typescript
type CollectionProperty = {
  s$focus?: boolean
  // ...
}
```

### s$getter <Badge type="tip" text="optional" />

This property receives a callback that receives the current document being processed and returns a computed value upon it. Getter properties are automatically flagged as read-only.

```typescript
type CollectionProperty = {
  s$getter?: (value: any) => any
  // ...
}
```

### s$hidden <Badge type="tip" text="optional" />

If true, omits the value of this property from backend response.

::: warning WARNING
This attribute will take effect only if the document is returned from one of the collection functions (`get`, `getAll`, `insert`, etc). If you query the document(s) using the MongoDB interface directly then the property value will still be returned and you should omit it manually.
:::

```typescript
type CollectionProperty = {
  s$hidden?: boolean
  // ...
}
```

### s$hint <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

If set to a string, this property will exhibit a small text underneat form inputs, regardless of the input type.

```typescript
type CollectionProperty = {
  s$hint?: string
  // ...
}
```

### s$icon <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

This property assigns an icon from an icon library to the property. It will be shown inside inputs and wherever applicable.

```typescript
type CollectionProperty = {
  s$icon?: string
  // ...
}
```

### s$inputType <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

When applicable, this property specifies a custom input type to be passed to the HTML `<input />` element.

```typescript
type PropertyInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'time'
  | 'month'

type CollectionProperty = {
  s$inputType?: PropertyInputType
  // ...
}
```

### s$mask <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

Specifies a mask or an array of masks to be applied to text inputs. Refer to [Maska Documentation](https://beholdr.github.io/) to learn about mask formats.

```typescript
type CollectionProperty = {
  s$mask?: string | ReadonlyArray<string>
  // ...
}
```

### s$noForm <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

If set to true will prevent the input of this property from being displayed on forms.

::: warning WARNING
Like the Description `form` property, this flag won't make the property read-only. If aside from hiding the property in forms you want to ensure it won't be changed by crafted requests, you should use the Description `writable` property in an exclusive manner.
:::

```typescript
type CollectionProperty = {
  s$noForm?: boolean
  // ...
}
```

### s$noLabel <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

If set to true will prevent a label containing the property name or description from being displayed on forms.

```typescript
type CollectionProperty = {
  s$noLabel?: boolean
  // ...
}
```

### s$placeholder <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

When applicable, this property specifies the `placeholder` attribute of the HTML `<input />` element.

```typescript
type CollectionProperty = {
  s$placeholder?: string
  // ...
}
```

### s$translate <Badge type="tip" text="optional" /> <Badge type="tip" text="frontend" />

This property defines whether or not the value of the input should be internationalized when displayed. Defaults to false.

```typescript
type CollectionProperty = {
  s$translate?: boolean
  // ...
}
```
