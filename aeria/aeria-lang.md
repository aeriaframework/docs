# Aeria Lang

Aeria Lang is a schema declaration language.

### Collection

**Declaration syntax:**

```aeria
collection Person {
  properties {
    name str
  }
}
```

**Extends syntax:**

Can be used with a empty block to import the collection without modifying it.

```aeria
collection File extends aeria.file {}
collection TempFile extends aeria.tempFile {}

collection User extends aeria.user {
  properties {
    name str
  }
}
```

Where `aeria` is a module name and `user` is a valid export. This equals to the following JavaScript expression:

```typescript
import('aeria').user
```

### Contract

**Syntax:**

```aeria
contract InsertUserContract {
  payload {
    username str
    password str
  }
  response [
    properties {
      success const @value(true)
    },
    properties {
      success const @value(false)
      error str
    }
  ]
}
```

