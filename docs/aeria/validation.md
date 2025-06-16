# Validation

Runtime validation of data is occurs in Aeria when a [contract]() is set to a route, when a document is being inserted from a builtin function, or with the use of functions from the public API.  [Validators](#validator) are helper functions that will return both the inferred type of the given schema and a validation function.

::: tip INFO
Input data sent to routes is validated differently through [Contracts](/aeria/contracts). If you are looking to validate the query or the payload of a route, you are looking for contracts instead.
:::


### `validate()`
>`validate(what: TWhat | undefined, schema: JsonSchema, options?: ValidateOptions) => Result.Either<ValidationError, TWhat>`

This function validates a object against a schema. It receives an optional third argument containing [`ValidateOptions`](#validateoptions). It will return `Result<TWhat>` case the validation succeeds, and `Error<ValidationError>` case it fails.

**Example:**

```ts
const personEither = validate(person, {
  properties: {
    name: {
      type: 'string'
    }
  }
})
```

### `validator()`
>`validator(schema: JsonSchema, options?: ValidateOptions) => [Schema, (what: unknown) => Result.Either<ValidationError, TWhat>]`

This function receives a schema and a optional second argument containing `ValidateOptions`. It will return a tuple composed by a empty object whose type is inferred from the specified schema, and a function that will receive a object and return the `Either<TWhat, ValidationError>` derived from it's validation.

**Example:**

```ts
const [Person, personValidator] = validator({
  properties: {
    name: {
     type: 'string'
    }
  }
})

const personEither = personValidator(person)
```

### `ValidateOptions`

```ts
type ValidateOptions = {
  extraneous?: Array<string> | boolean
  throwOnError?: boolean
}
```

### `ValidationError`

```ts
enum ValidationErrorCode {
  InvalidProperties = 'INVALID_PROPERTIES',
  MissingProperties = 'MISSING_PROPERTIES',
  EmptyTarget = 'EMPTY_TARGET',
}

enum PropertyValidationErrorCode {
  Missing = 'MISSING_PROPERTY',
  Extraneous = 'EXTRANEOUS_PROPERTY',
  Unmatching = 'UNMATCHING_PROPERTIES',
  ExtraneousElement = 'EXTRANEOUS_ELEMENT',
  MoreItemsExpected = 'MORE_ITEMS_EXPECTED',
  LessItemsExpected = 'LESS_ITEMS_EXPECTED',
  NumericConstraint = 'NUMERIC_CONSTRAINT',
  StringConstraint = 'STRING_CONSTRAINT',
}

enum TraverseError {
  InvalidDocumentId = 'INVALID_DOCUMENT_ID',
  InvalidTempfile = 'INVALID_TEMPFILE',
}

type PropertyValidationError = {
  type: PropertyValidationErrorCode
  index?: number
  details?: {
    expected: unknown
    got: unknown
  }
}

type ValidationErrorInvalidProperties = {
  code: ValidationErrorCode.InvalidProperties
  details: Record<string, PropertyValidationError | ValidationError>
}

type ValidationErrorMissingProperties = {
  code: ValidationErrorCode.MissingProperties
  details: Record<string, { type: 'missing' }>
}

type ValidationErrorEmptyTarget = {
  code: ValidationErrorCode.EmptyTarget
  details: {}
}

type ValidationError =
  | ValidationErrorInvalidProperties
  | ValidationErrorMissingProperties
  | ValidationErrorEmptyTarget

```

