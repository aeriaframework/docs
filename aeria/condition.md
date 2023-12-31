# Condition

## Introduction

Conditions are use throughout Aeria to control dynamic behaviors.
They offer equality, existence, and numeric operators, and logical connectives can be built using `not`, `and`, and `or`.

**Example:**

The following example tells the following: the "responsible" property will only be required if either the age of the subject is lesser than 18, or it has a disability.

```typescript
{
  required: {
    responsible: {
      or: [
        {
          operator: 'lt',
          term1: 'age',
          term2: 18
        },
        {
          operator: 'equal',
          term1: 'has_disability',
          term2: true
        }
      ]
    }
  }
}
```

## FinalCondition

### operator <Badge type="tip" text="FinalOperator" />

```typescript
type FinalOperator =
  | 'equal'
  | 'in'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte'
```

### term1 <Badge type="tip" text="PropertiesWithId<TDescription>" />

The name of the property that will be the first term of the condition.

### term2 <Badge type="tip" text="any" />

The second term of the condition.

### else <Badge type="tip" text="any" />

In case the condition is false, specify this value instead.


## ExistsCondition

### operator <Badge type="tip" text="'exists'" />

The operator of a ExistCondition must be `'exists'`.

### term1 <Badge type="tip" text="PropertiesWithId<TDescription>" />

The name of the property that will have it's existence checked.


## AndCondition and OrCondition

Logic concatenation is possible by passing an array of conditions to either `and` or `or`.

```typescript
type OrCondition<TDescription extends Description> = {
  or: Condition<TDescription>[]
}

type AndCondition<TDescription extends Description> = {
  and: Condition<TDescription>[]
}
```

## NotCondition

It's possible to check for falsiness passing a condition to `not`.

```typescript
type NotCondition<TDescription extends Description> = {
  not: Condition<TDescription>
}
```
