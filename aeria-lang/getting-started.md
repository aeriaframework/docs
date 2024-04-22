# Aeria Lang Reference

Aeria Lang is a domain specific language that contains web and infosec primitives, meant to bring up complex and large projects fast. It outputs `.js` and `.d.ts` files and is meant to interoperate with TypeScript rather than standalone usage.

### Example

```
collection Person {
  name str
  age int
}
```

## Declarations

### collection

```
collection Person {
  name str
  age int
}
```

#### Builtin types

- str: represents a string
- int: represents a integer
- num: represents a number
- bool: represents a boolean

### contract

```
contract TransactionContract {
  payload {
    properties {
      amount number
    }
  }
  response {
    properties {
      success boolean
    }
  }
}
```
