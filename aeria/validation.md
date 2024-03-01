# Validation

Runtime validation of data is possible in Aeria using functions exposed in the public API. These same functions are used internally when validating documents before insertion, so validation errors will consistently have the same type throughout your application. [Validators](#validator) are helper functions that will return both the inferred type of the given schema and a validation function.

::: tip INFO
Input data sent to routes is validated differently through [Contracts](/aeria/contracts). If you are looking to validate the query or the payload of a route, you are looking for contracts instead.
:::


## `validate()`

This function validates a object against a schema. It receives an optional third argument containing [`ValidateOptions`](#validateoptions). It will return `Right<TWhat>` case the validation succeeds, and `Left<ValidationError>` case it fails.

**Example:**

```typescript
const personEither = validate(person, {
  properties: {
    name: {
      type: 'string'
    }
  }
})
```

## `validateSilently()`

This function is just like [`validate()`](#validate), except that it will return `null` in case the validation fails instead of a `Left<ValidationError>`.

**Example:**

```typescript
const person = validateSilently(person, {
  properties: {
    name: {
      type: 'string'
    }
  }
})

if( !person ) {
  // validation failed
  return
}
```

## `validator()`

This function receives a schema and a optional second argument containing `ValidateOptions`. It will return a tuple composed by a empty object whose type is inferred from the specified schema, and a function that will receive a object and return the `Either<TWhat, ValidationError>` derived from it's validation.

**Example:**

```typescript
const [Person, personValidator] = validator({
  properties: {
    name: {
     type: 'string'
    }
  }
})

const personEither = personValidator(person)
```

## `silentValidator()`

This function receives the same parameters and returns a tuple just as [`validator()`](#validator), except that it will call `validateSilently()` instead of `validate()`.

**Example:**

```typescript
const [Person, personValidator] = silentValidator({
  properties: {
    name: {
     type: 'string'
    }
  }
})

const person = personValidator(person)
if( !person ) {
  // person validation failed
}
```

## `ValidateOptions`

```typescript
type ValidateOptions = {
  extraneous?: Array<string> | boolean
  throwOnError?: boolean
}
```

## `ValidationError`

```typescript
enum ValidationErrorCodes {
  InvalidProperties = 'INVALID_PROPERTIES',
  MissingProperties = 'MISSING_PROPERTIES',
  EmptyTarget = 'EMPTY_TARGET'
}

type PropertyValidationErrorType =
  | 'missing'
  | 'extraneous'
  | 'unmatching'
  | 'extraneous_element'
  | 'numeric_constraint'

type PropertyValidationError = {
  type: PropertyValidationErrorType
  index?: number
  details: {
    expected: string | ReadonlyArray<any>
    got: string
  }
}

type ValidationError =
  | { code: ValidationErrorCodes.InvalidProperties, errors: Record<string, PropertyValidationError | ValidationError> }
  | { code: ValidationErrorCodes.MissingProperties, errors: Record<string, { type: 'missing'  }> }
  | { code: ValidationErrorCodes.EmptyTarget, errors: {} }
```
