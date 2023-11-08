# CollectionProperty

## Properties

### default <Badge type="tip" text="any" /> <Badge type="tip" text="frontend" />

If set to any value, the value of this property will be preferred over null or undefined on document creation.

### description <Badge type="tip" text="string" /> <Badge type="tip" text="frontend" />

If set to a string, the value of this property will be preferred when displaying the property name on form labels. Otherwise an internationalized version of the property name will be used.

### readOnly <Badge type="tip" text="boolean" />

If true, will make the property unwritable on document creation and update. Trying to write on it won't return any error, the new value will just be ignored instead.

### s$element <Badge type="tip" text="PropertyElement" /> <Badge type="tip" text="frontend" />

When applicable, this property specifies a custom HTML element to handle input.

```typescript
type PropertyElement =
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'textarea'
```

### s$focus <Badge type="tip" text="boolea" /> <Badge type="tip" text="frontend" />

Signals the input of this property should be focused as soon as a form is rendered. Each form may have only one property with this flag enabled.

### s$getter <Badge type="tip" text="(value: any) => any" />

This property receives a callback that receives the current document being processed and returns a computed value upon it. Getter properties are automatically flagged as read-only.

**Example:**

```typescript
const description: Description = {
  $id: 'person',
  properties: {
    first_name: {
      type: 'string'
    },
    last_name: {
      type: 'string'
    },
    full_name: {
      type: 'string',
      s$getter: (value: any) => {
        return `${value.first_name} ${value.last_name}`
      }
    }
  }
}
```

### s$hidden <Badge type="tip" text="boolean" />

If true, omits the value of this property from backend response.

::: warning WARNING
This attribute will take effect only if the document is returned from one of the collection functions (`get`, `getAll`, `insert`, etc). If you query the document(s) using the MongoDB interface directly then the property value will still be returned and you should omit it manually.
:::

### s$hint <Badge type="tip" text="string" /> <Badge type="tip" text="frontend" />

If set to a string, this property will exhibit a small text underneat form inputs, regardless of the input type.

### s$icon <Badge type="tip" text="string" /> <Badge type="tip" text="frontend" />

This property assigns an icon from an icon library to the property. It will be shown inside inputs and wherever applicable.

### s$inputType <Badge type="tip" text="PropertyInputType" /> <Badge type="tip" text="frontend" />

When applicable, this property specifies a custom input type to be passed to the HTML `<input />` element.

```typescript
type PropertyInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'time'
  | 'month'
```

### s$mask <Badge type="tip" text="string | ReadonlyArray<string>" /> <Badge type="tip" text="frontend" />

Specifies a mask or an array of masks to be applied to text inputs. Refer to [Maska Documentation](https://beholdr.github.io/) to learn about mask formats.

### s$noForm <Badge type="tip" text="boolean" /> <Badge type="tip" text="frontend" />

If set to true will prevent the input of this property from being displayed on forms.

::: warning WARNING
Like the Description `form` property, this flag won't make the property read-only. If aside from hiding the property in forms you want to ensure it won't be changed by crafted requests, you should use the Description `writable` property in an exclusive manner.
:::

### s$noLabel <Badge type="tip" text="boolean" /> <Badge type="tip" text="frontend" />

If set to true will prevent a label containing the property name or description from being displayed on forms.

### s$placeholder <Badge type="tip" text="string" /> <Badge type="tip" text="frontend" />

When applicable, this property specifies the `placeholder` attribute of the HTML `<input />` element.

### s$translate <Badge type="tip" text="boolean" /> <Badge type="tip" text="frontend" />

This property defines whether or not the value of the input should be internationalized when displayed. Defaults to false.

