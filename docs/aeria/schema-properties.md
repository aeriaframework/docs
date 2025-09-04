# Schema properties

## Base attributes

- `@description(string)` - assigns a description to the property for documentation and visualization purposes
- `@hint(string)` - places a hint down below the property field in forms
- `@focus(boolean)` - tells the frontend that the property field should be auto-focused on forms
- `@hidden(boolean)` - informs the property should not be returned from the API
- `@icon(string)` - specifies a icon to be associated with the property on the frontend
- `@readonly(boolean)` - marks the property as being read-only
- `@translate(boolean)` - informs the property value should be translated when i18n is available

## String

Stores a JSON string.

**Example**:

```aeria-properties
name str
```

### `@mask`

A mask or array of masks. Example:

```aeria-properties
phone str @mask(["(##) #####-####"])
```

### `@minLength`

The minimum accepted length.

```aeria-properties
pin str @minLength(8)
```

### `@maxLength`

The maximum accepted length.

```aeria-properties
slug str @maxLength(16)
```

### `@placeholder`

A placeholder to be shown when no value is present.

```aeria-properties
code str @placeholder("Example: 123456")
```


## Number and Integer

Stores a JSON number.

**Example**:

```aeria-properties
age int // integer numbers only
weight num // floating point numbers
```

### `@minimum`

Minimum accepted value.

```aeria-properties
age num @minimum(10)
```

### `@maximum`

Maximum accepted value.

```aeria-properties
percentage num @maximum(100)
```

### `@exclusiveMinimum`

Minimum accepted value (exclusive).

```aeria-properties
age num @exclusiveMinimum(10)
```

### `@exclusiveMaximum`

Maximum accepted value (exclusive).

```aeria-properties
percentage num @exlusiveMaximum(100)
```

## Boolean

Stores a JSON boolean.

**Example**:

```aeria-properties
is_active bool
```

## Const

Stores a constant value.

**Example**:

```aeria-properties
status const @value("active")
```

## Date

Stores an ISO date string.

**Example**:

```aeria-properties
member_since date
```

## Datetime

Stores an ISO date string, exactly like `date`. The difference is that time information will also be shown on frontends.

**Example**:

```aeria-properties
opened_at datetime
```

## Enum

Stores an enumeration of constant values.

**Example**:

```aeria-properties
status enum @values([
  "pending",
  "paid",
  "canceled",
])
```

## Object

Represents a nested object.

**Example**:

```aeria-properties
details {
  properties {
    weight num
  }
}
```

## Reference

Represents a link to a document of another or the same collection. In the database, a `ObjectId` BSON object is stored.

**Example**:

```aeria-properties
created_by User
```

### `@inline`

Marks the reference as being inline. This means:

- the referenced document will be deleted when the parent document is deleted
- all nested references will be automatically populated

Example use case: imagine a `Post` collection which has an array of `Comment` references that can be placed by users. There is no reason why a `Comment` should exist without the post it is vinculated with, so it should be marked as inline so the proper cleanup would be done when the post is removed.

`File` references are always inline.

**Example**:

```aeria-properties
comments []Comment @inline
```

### `@purge`

Indicates the referenced document should be removed when the parent document is removed.

```aeria-properties
comments []Comment @purge
```

### `@indexes`

Used to set which foreign properties should be used as indexes. Setting this property and running `aeria -m` will result in collection indexes being created in the database.

**Example**:

```aeria-properties
customers []Customer @indexes([
  "name",
  "phone",
  "document",
])
```

### `@constraints`

Constrain the reference to match requirements before being inserted.

**Example**:

```aeria-properties
customer User @constraint(roles in "customer")
```

## Array

Properties prefixed with an `[]` are turned into an array. For example, if you wish to have an array of strings, write `[]str`.

**Example**:

```aeria-properties
comments []{
  properties {
    text str
    liked_by []User
  }
}
```

A special syntax is used to add array constraints.

You may specify a range of minimum and maximum allowed array elements like so:

- `[1..3]`: minimum 1 element, maximum 3 elements
- `[1..]`: minimum 1 element, no maximum limit
- `[@uniqueItems]`: elements can not repeat within the array
- `[1.. @uniqueItems]`: minimum 1 element, no maximum limit, elements can not repeat within the array

<!-- ## `ObjectProperty` -->
<!---->
<!-- This type of property is used to create denormalized subschemas that will be validated on runtime. Unlike `RefProperty`, which is another way of storing data structures, it inserts the actual object instead of it's identifier, and doesn't require a collection. -->
<!---->
<!-- **Example:** -->
<!---->
<!-- ```aeria-properties [main.aeria] -->
<!-- error { -->
<!--   properties { -->
<!--     code str -->
<!--     message str -->
<!--   } -->
<!-- } -->
<!-- ``` -->
<!---->
<!-- ### `type` <Badge type="tip" text="'object'" /> -->
<!---->
<!-- Object properties are distinguished by the `type` property set to `'object'`. It can either specify a fixed data structure with `properties` or make a variable `Map<string, T>` with `additionalProperties`. -->
<!---->
<!-- ### `properties` <Badge type="tip" text="Record<string, Property>" /> -->
<!---->
<!---->
<!-- ## `StringProperty` -->
<!---->
<!-- **Example:** -->
<!---->
<!-- ```aeria-properties [main.aeria] -->
<!-- name str @maxLength(20) -->
<!-- ``` -->
<!---->
<!-- ### `type` <Badge type="tip" text="'string'" /> -->
<!---->
<!-- String properties are distinguished by the `type` property set to `'string'`. **Dates also use the same type**, but they are set apart by the `format` attribute. -->
<!---->
<!-- ### `minLength` <Badge type="tip" text="number?" /> -->
<!---->
<!-- This property sets a minimal string length. -->
<!---->
<!-- ### `maxLength` <Badge type="tip" text="number?" /> -->
<!---->
<!-- This property sets a maximal string length. -->
<!---->
<!-- ### `element` <Badge type="tip" text="string?" /> -->
<!---->
<!-- The element with which the input should be rendered. Whether `"input"` or `"textarea"`. -->
<!---->
<!-- ### `format` <Badge type="tip" text="PropertyFormat?" /> -->
<!---->
<!-- The following text is quoted directly from [json-schema.org](https://json-schema.org/understanding-json-schema/reference/string): "The format keyword allows for basic semantic identification of certain kinds of string values that are commonly used. For example, because JSON doesn't have a "DateTime" type, dates need to be encoded as strings. format allows the schema author to indicate that the string value should be interpreted as a date". -->
<!---->
<!-- ```ts -->
<!-- type PropertyFormat =  -->
<!--   | 'date' -->
<!--   | 'date-time' -->
<!-- ``` -->
<!---->
<!-- ### `inputType` <Badge type="tip" text="PropertyInputType?" /> <Badge type="tip" text="frontend" /> -->
<!---->
<!-- When applicable, this property specifies a custom input type to be passed to the HTML `<input />` element. -->
<!---->
<!-- ```ts -->
<!-- type PropertyInputType = -->
<!--   | 'text' -->
<!--   | 'email' -->
<!--   | 'password' -->
<!--   | 'search' -->
<!--   | 'time' -->
<!--   | 'month' -->
<!-- ``` -->
<!---->
<!-- ### `mask` <Badge type="tip" text="(string | readonly string[])?" /> -->
<!---->
<!-- This property specifies one or more masks to be applied to the input. -->
<!---->
<!-- ### `placeholder` <Badge type="tip" text="string?" />  -->
<!---->
<!-- The placeholder text rendered inside the input. -->
<!---->
<!---->
<!-- ## `NumberProperty` -->
<!---->
<!-- **Example:** -->
<!---->
<!-- ```aeria-properties [main.aeria] -->
<!-- rating num @minimum(5) @maximum(5) -->
<!-- ``` -->
<!---->
<!-- ### `type` <Badge type="tip" text="'number' | 'integer'" /> -->
<!---->
<!-- This property is used to represent JS-native numbers. It can also specify integers only, in which case runtime validators will be used. -->
<!---->
<!-- ### `minimum` <Badge type="tip" text="number?" /> -->
<!---->
<!-- This property ensures number will be greater than specified value, inclusively. -->
<!---->
<!-- ### `maximum` <Badge type="tip" text="number?" /> -->
<!---->
<!-- This property ensures number will be less than specified value, inclusively. -->
<!---->
<!-- ### `exclusiveMinimum` <Badge type="tip" text="number?" /> -->
<!---->
<!-- This property ensures number will be greater than specified value, exclusively. -->
<!---->
<!-- ### `exclusiveMaximum` <Badge type="tip" text="number?" /> -->
<!---->
<!-- This property ensures number will be less than specified value, exclusively. -->
<!---->
<!-- ### `placeholder` <Badge type="tip" text="string?" />  -->
<!---->
<!-- The placeholder text rendered inside the input. -->
<!---->
<!---->
<!-- ## `BooleanProperty` -->
<!---->
<!-- **Example:** -->
<!---->
<!-- ```aeria-properties [main.aeria] -->
<!-- active bool -->
<!-- ``` -->
<!---->
<!-- ### `type` <Badge type="tip" text="'boolean'" /> -->
<!---->
<!-- Boolean properties are distinguished by the `type` property set to `'boolean'` -->
<!---->
<!---->
<!-- ## `RefProperty` -->
<!---->
<!-- **Example:** -->
<!---->
<!-- ```aeria-properties [main.aeria] -->
<!-- company Company @indexes(["name", "headquarters"]) -->
<!-- ``` -->
<!---->
<!-- ### `$ref` <Badge type="tip" text="string" /> -->
<!---->
<!-- A string containing the name of the target collection as in `$id`. -->
<!---->
<!-- ### `indexes` <Badge type="tip" text="readonly string[]?" /> -->
<!---->
<!-- This property specifies indexes to be used when searching documents from the target collection in case default indexes are missing. -->
<!---->
<!-- ### `populate` <Badge type="tip" text="readonly string[]?" /> -->
<!---->
<!-- By default, Aeria populates only properties specified by `indexes`, but there are cases where you need to populate a property that isn't a index. You may pass those properties into `populate` array. -->
<!---->
<!-- ### `inline` <Badge type="tip" text="boolean?" /> -->
<!---->
<!-- This attribute determines the reference is always linked to the parent document, meaning it is updated when the parent document is updated, and deleted when parent document is deleted. Setting it to `true` will make Aeria UI embed the referenced document in forms instead of providing the default search panel. -->
<!---->
<!-- ### `constraints` <Badge type="tip" text="Condition<any>?" /> -->
<!---->
<!-- Sometimes reference properties need to have constraints to make them useful. Constraints are [conditions](/aeria/condition) applied when inserting documents from the referenced collection into the property. Constraints allow you to have  -->
<!---->
<!-- **Example:** -->
<!---->
<!-- ```ts -->
<!-- { -->
<!--   herbivore_animals: { -->
<!--     $ref: 'animals', -->
<!--     constraints: { -->
<!--       operator: 'equal', -->
<!--       term1: 'herbivore', -->
<!--       term2: true, -->
<!--     } -->
<!--   } -->
<!-- } -->
<!-- ``` -->
<!---->
<!---->
<!-- ## `FileProperty` -->
<!---->
<!-- **Example:** -->
<!---->
<!-- ```aeria-properties [main.aeria] -->
<!-- picture File @accept(["image/*"]) -->
<!-- ``` -->
<!---->
<!-- ### `$ref` <Badge type="tip" text="'file'" /> -->
<!---->
<!-- File properties are ultimately reference properties that have `$ref` set to `'file'`. Aeria will be able to tell the property is a file in the runtime and the frontend should render a file component accordingly. -->
<!---->
<!-- ### `accept` <Badge type="tip" text="readonly string[]?" /> -->
<!---->
<!-- This read-only array of strings may contain accepted mime types. Wildcards such as `image/*` are accepted. -->
<!---->
<!---->
<!-- ## `EnumProperty` -->
<!---->
<!-- **Example:** -->
<!---->
<!-- ```aeria-properties [main.aeria] -->
<!-- status enum @options([ -->
<!--   "pending", -->
<!--   "paid", -->
<!--   "refused", -->
<!--   "chargeback" -->
<!-- ]) -->
<!-- ``` -->
<!---->
<!-- ### `enum` <Badge type="tip" text="readonly any[]" /> -->
<!---->
<!-- Enum properties specify an array of valid elements that will be validated upon insert. The elements of the enum must be of a scalar type. Passing objects will fail at runtime because references will be compared instead of actual value. -->
<!---->
<!-- ## `ArrayProperty` -->
<!---->
<!-- **Example:** -->
<!---->
<!-- ```aeria-properties [main.aeria] -->
<!-- items []{ -->
<!--   properties { -->
<!--     product Product -->
<!--     quantity int @minimum(1) -->
<!--   } -->
<!-- } -->
<!-- ``` -->
<!---->
<!-- ### `type` <Badge type="tip" text="'array'" /> -->
<!---->
<!-- Array properties are properties which type is set to `'array'`. Additionally, the `items` property is required to type the elements of the array. -->
<!---->
<!-- ### `items` <Badge type="tip" text="Property?" /> -->
<!---->
<!-- This property defines the schema of array elements. -->
<!---->
<!---->
<!-- ## `ConstProperty` -->
<!---->
<!-- **Example:** -->
<!---->
<!-- ```aeria-properties [main.aeria] -->
<!-- error const @value(true) -->
<!-- message str -->
<!-- ``` -->
<!---->
<!-- ### `const` <Badge type="tip" text="any" /> -->
<!---->
<!-- The literal value the property expects. -->
<!---->
<!---->
<!-- ## `GetterProperty` -->
<!---->
<!-- **Example:** -->
<!---->
<!-- ```ts [description.ts] -->
<!-- { -->
<!--   full_name: { -->
<!--     getter: (doc: any) => { -->
<!--       return `${doc.first_name} ${doc.full_name}` -->
<!--     } -->
<!--   } -->
<!-- } -->
<!-- ``` -->
<!---->
<!-- ### `getter` <Badge type="tip" text="(doc: any) => any" /> -->
<!---->
<!-- The getter function. In TypeScript, the `doc` parameter must be explicitly annotated to `any`. -->
<!---->
<!---->
<!-- ## `PropertyBase` -->
<!---->
<!-- ### `default` <Badge type="tip" text="any?" /> -->
<!---->
<!-- If set to any value, the value of this property will be preferred over null or undefined on document creation. -->
<!---->
<!-- ### `description` <Badge type="tip" text="string?" /> -->
<!---->
<!-- If set to a string, the value of this property will be preferred when displaying the property name on form labels. Otherwise an internationalized version of the property name will be used. -->
<!---->
<!-- ### `readOnly` <Badge type="tip" text="boolean?" /> -->
<!---->
<!-- If true, will make the property unwritable on document creation and update. Trying to write on it won't return any error, the new value will just be ignored instead. -->
<!---->
<!-- ### `focus` <Badge type="tip" text="boolean?" /> -->
<!---->
<!-- Signals the input of this property should be focused as soon as a form is rendered. Each form may have only one property with this flag enabled. -->
<!---->
<!-- ### `hidden` <Badge type="tip" text="boolean?" /> -->
<!---->
<!-- If true, omits the value of this property from backend response. -->
<!---->
<!-- ::: warning WARNING -->
<!-- This attribute will take effect only if the document is returned from one of the collection functions (`get`, `getAll`, `insert`, etc). If you query the document(s) using the MongoDB interface directly then the property value will still be returned and you should omit it manually. -->
<!-- ::: -->
<!---->
<!-- ### `hint` <Badge type="tip" text="string?" /> -->
<!---->
<!-- If set to a string, this property will exhibit a small text underneat form inputs, regardless of the input type. -->
<!---->
<!-- ### `icon` <Badge type="tip" text="string?" />  -->
<!---->
<!-- This property assigns an icon from an icon library to the property. It will be shown inside inputs and wherever applicable. -->
<!---->
<!-- ### `noForm` <Badge type="tip" text="boolean?" /> -->
<!---->
<!-- If set to true will prevent the input of this property from being displayed on forms. -->
<!---->
<!-- ::: warning WARNING -->
<!-- Like the Description `form` property, this flag won't make the property read-only. If aside from hiding the property in forms you want to ensure it won't be changed by crafted requests, you should use the Description `writable` property in an exclusive manner. -->
<!-- ::: -->
<!---->
<!-- ### `noLabel` <Badge type="tip" text="boolean?" />  -->
<!---->
<!-- If set to true will prevent a label containing the property name or description from being displayed on forms. -->
<!---->
<!-- ### `translate` <Badge type="tip" text="boolean?" />  -->
<!---->
<!-- This property defines whether or not the value of the input should be internationalized when displayed. Defaults to false. -->
<!---->
