# Aeria Schema

## Introduction

## Properties

### $id

As in JSON Schema, this property is used to name the structure we are defining. It must have the same name as the collection.
Collection names must consist of a camel-cased noun in the singular, like `person`, `fruit` or `car`.

### immutable <Badge type="tip" text="boolean | ReadonlyArray<string>" />

This property may be used to specify properties that should be writable upon creation, but read-only upon update. If set to true, then will enable immutability to all properties, if set to an array of strings, only specified properties will receive that attribute.

### required <Badge type="tip" text="RequiredProperties" />

```typescript
type RequiredProperties<TDescription extends Description> = ReadonlyArray<PropertiesWithId<TDescription>> | Partial<Record<
  PropertiesWithId<TDescription>,
  Condition<TDescription> | boolean
>>
```

This property is used to verify document wholeness upon creation and update. Case set to an array of strings, will consider only specified properties to validate document wholeness, otherwise will check if all properties are not null or undefined.

