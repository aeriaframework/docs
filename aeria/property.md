# Property

## Summary

- [ObjectProperty](#objectproperty)
- [StringProperty](#stringproperty)
- [NumberProperty](#numberproperty)
- [BooleanProperty](#booleanproperty)
- [RefProperty](#refproperty)
- [FileProperty](#fileproperty)
- [EnumProperty](#enumproperty)
- [ArrayProperty](#arrayproperty)
- [GetterProperty](#getterproperty)

## ObjectProperty

This type of property is used to create denormalized subschemas that will be validated on runtime. Unlike `RefProperty`, which is another way of storing data structures, it inserts the actual object instead of it's identifier, and doesn't require a collection.

**Example:**

```typescript
{
  error: {
    type: 'object',
    properties: {
      code: {
        type: 'string'
      },
      message: {
        type: 'string'
      }
    }
  }
}
```

### type <Badge type="tip" text="'object'" />

Object properties are distinguished by the `type` property set to `'object'`. It can either specify a fixed data structure with `properties` or make a variable `Map<string, T>` with `additionalProperties`.

### properties <Badge type="tip" text="Record<string, Property>" />


## StringProperty

### type <Badge type="tip" text="'string'" />

String properties are distinguished by the `type` property set to `'string'`. **Dates also use the same type**, but they are set apart by the `format` attribute.

### minLength <Badge type="tip" text="number?" />

This property sets a minimal string length.

### maxLength <Badge type="tip" text="number?" />

This property sets a maximal string length.

### format <Badge type="tip" text="PropertyFormat?" />

The following text is quoted directly from [json-schema.org](https://json-schema.org/understanding-json-schema/reference/string): "The format keyword allows for basic semantic identification of certain kinds of string values that are commonly used. For example, because JSON doesn't have a "DateTime" type, dates need to be encoded as strings. format allows the schema author to indicate that the string value should be interpreted as a date".

```typescript
type PropertyFormat = 
  | 'date'
  | 'date-time'
```

### inputType <Badge type="tip" text="PropertyInputType?" /> <Badge type="tip" text="frontend" />

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

### mask <Badge type="tip" text="(string | ReadonlyArray<string>)?" />

This property specifies one or more masks to be applied to the input.


## NumberProperty

### type <Badge type="tip" text="'number' | 'integer'" />

This property is used to represent JS-native numbers. It can also specify integers only, in which case runtime validators will be used.

### minimum <Badge type="tip" text="number?" />

This property ensures number will be greater than specified value, inclusively.

### maximum <Badge type="tip" text="number?" />

This property ensures number will be less than specified value, inclusively.

### exclusiveMinimum <Badge type="tip" text="number?" />

This property ensures number will be greater than specified value, exclusively.

### exclusiveMaximum <Badge type="tip" text="number?" />

This property ensures number will be less than specified value, exclusively.


## BooleanProperty

### type <Badge type="tip" text="'boolean'?" />

Boolean properties are distinguished by the `type` property set to `'boolean'`


## RefProperty

**Example:**

```typescript
{
  company: {
    $ref: 'company',
    indexes: [
      'name',
      'headquarters'
    ]
  }
}
```

### $ref <Badge type="tip" text="string" />

A string containing the name of the target collection as in `$id`.

### indexes <Badge type="tip" text="ReadonlyArray<string>?" />

This property specifies indexes to be used when searching documents from the target collection in case default indexes are missing.

### populate <Badge type="tip" text="ReadonlyArray<string>?" />

By default, Aeria populates only properties specified by `indexes`, but there are cases where you need to populate a property that isn't a index. You may pass those properties into `populate` array.

### inline <Badge type="tip" text="boolean?" />

This attribute determines the reference is always linked to the parent document, meaning it is updated when the parent document is updated, and deleted when parent document is deleted. Setting it to `true` will make Aeria UI embed the referenced document in forms instead of providing the default search panel.

### constraints <Badge type="tip" text="Condition<any>?" />

Sometimes reference properties need to have constraints to make them useful. Constraints are [conditions](/aeria/condition) applied when inserting documents from the referenced collection into the property. Constraints allow you to have 

**Example:**

```typescript
{
  herbivore_animals: {
    $ref: 'animals',
    constraints: {
      operator: 'equal',
      term1: 'herbivore',
      term2: true,
    }
  }
}
```


## FileProperty

**Example:**

```typescript
{
  picture: {
    $ref: 'file',
    accept: [
      'image/*'
    ]
  }
}
```

### $ref <Badge type="tip" text="'file'" />

File properties are ultimately reference properties that have `$ref` set to `'file'`. Aeria will be able to tell the property is a file in the runtime and the frontend should render a file component accordingly.

### accept <Badge type="tip" text="ReadonlyArray<string>?" />

This read-only array of strings may contain accepted mime types. Wildcards such as `image/*` are accepted.


## EnumProperty

**Example:**

```typescript
{
  status: {
    enum: [
      'pending',
      'paid',
      'refused',
      'chargeback'
    ]
  }
}

```

### enum <Badge type="tip" text="ReadonlyArray<any>?" />

Enum properties specify an array of valid elements that will be validated upon insert. The elements of the enum must be of a scalar type. Passing objects will fail at runtime because references will be compared instead of actual value.

## ArrayProperty

**Example:**

```typescript
{
  items: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        product: {
          $ref: 'product'
        },
        quantity: {
          type: 'integer',
          min: 1
        }
      }
    }
  }
}
```

### type <Badge type="tip" text="'array'" />

Array properties are properties which type is set to `'array'`. Additionally, the `items` property is required to type the elements of the array.

### items <Badge type="tip" text="Property?" />

This property defines the schema of array elements.


## GetterProperty

**Example:**

```typescript
{
  full_name: {
    getter: (doc: any) => {
      return `${doc.first_name} ${doc.full_name}`
    }
  }
}
```

### getter <Badge type="tip" text="(doc: any) => any" />

The getter function. In TypeScript, the `doc` parameter must be explicitly annotated to `any`.


## PropertyBase

### default <Badge type="tip" text="any?" />

If set to any value, the value of this property will be preferred over null or undefined on document creation.

### description <Badge type="tip" text="string?" />

If set to a string, the value of this property will be preferred when displaying the property name on form labels. Otherwise an internationalized version of the property name will be used.

### readOnly <Badge type="tip" text="boolean?" />

If true, will make the property unwritable on document creation and update. Trying to write on it won't return any error, the new value will just be ignored instead.

### focus <Badge type="tip" text="boolean?" />

Signals the input of this property should be focused as soon as a form is rendered. Each form may have only one property with this flag enabled.

### hidden <Badge type="tip" text="boolean?" />

If true, omits the value of this property from backend response.

::: warning WARNING
This attribute will take effect only if the document is returned from one of the collection functions (`get`, `getAll`, `insert`, etc). If you query the document(s) using the MongoDB interface directly then the property value will still be returned and you should omit it manually.
:::

### hint <Badge type="tip" text="string?" />

If set to a string, this property will exhibit a small text underneat form inputs, regardless of the input type.

### icon <Badge type="tip" text="string?" /> 

This property assigns an icon from an icon library to the property. It will be shown inside inputs and wherever applicable.

### noForm <Badge type="tip" text="boolean?" />

If set to true will prevent the input of this property from being displayed on forms.

::: warning WARNING
Like the Description `form` property, this flag won't make the property read-only. If aside from hiding the property in forms you want to ensure it won't be changed by crafted requests, you should use the Description `writable` property in an exclusive manner.
:::

### noLabel <Badge type="tip" text="boolean?" /> 

If set to true will prevent a label containing the property name or description from being displayed on forms.

### placeholder <Badge type="tip" text="string?" /> 

When applicable, this property specifies the `placeholder` attribute of the HTML `<input />` element.

### translate <Badge type="tip" text="boolean?" /> 

This property defines whether or not the value of the input should be internationalized when displayed. Defaults to false.

