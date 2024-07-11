# Condition

Conditions are use throughout Aeria to control dynamic behaviors.
They offer equality, existence, and numeric operators, and logical connectives can be built using `not`, `and`, and `or`.

**Example:**

The following example tells the following: the "responsible" property will only be required if either the age of the subject is lesser than 18, or it has a disability.

::: code-group

```aeria-properties [main.aeria]
required {
  responsible @cond(age < 18 || has_disability == true)
}
```

```typescript [description.ts]
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

:::

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

### term1 <Badge type="tip" text="PropertiesWithId<TSchema>" />

The name of the property that will be the first term of the condition.

### term2 <Badge type="tip" text="any" />

The second term of the condition.

### else <Badge type="tip" text="any?" />

In case the condition is false, specify this value instead.

### fromState <Badge type="tip" text="boolean?" />

Treats `term2` as a path in the state. Example:

```typescript
{
  user: {
    $ref: 'user',
    constraints: {
      operator: 'regex',
      term1: 'active',
      term2: 'role.item.active',
      fromState: true,
    },
  },
}
```


## RegexCondition

### operator <Badge type="tip" text="'regex'" />

The string `'regex'`.

### term1 <Badge type="tip" text="PropertiesWithId<TSchema>" />

The name of the property that will be the first term of the condition.

### term2 <Badge type="tip" text="any" />

A string representing a regex.

### fromState <Badge type="tip" text="boolean?" />

Same as in `FinalCondition`.

### regexOptions <Badge type="tip" text="string?" />

A string containing regexp options as in JavaScript `RegExp` constructor.


## TruthyCondition

### operator <Badge type="tip" text="'truthy'" />

The string `'truthy'`.

### term1 <Badge type="tip" text="PropertiesWithId<TSchema>" />

The name of the property that will have it's existence checked.


## AndCondition and OrCondition

Logic concatenation is possible by passing an array of conditions to either `and` or `or`.

```typescript
type OrCondition<TSchema extends JsonSchema> = {
  or: Condition<TSchema>[]
}

type AndCondition<TSchema extends JsonSchema> = {
  and: Condition<TSchema>[]
}
```

## NotCondition

It's possible to check for falsiness passing a condition to `not`.

```typescript
type NotCondition<TSchema extends JsonSchema> = {
  not: Condition<TSchema>
}
```
