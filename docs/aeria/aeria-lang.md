# Aeria Lang

Aeria Lang is a schema declaration language. It is not a Turing-complete language, as it does not contain conditional or repetition keywords. It can only be used to declare collections (models) and contracts (DTOs).

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
    roles []enum @values([
      "root",
      "customer"
    ])
  }
}
```

Where `aeria` is a module name and `user` is a valid export. This equals to the following JavaScript expression:

```typescript
import('aeria').user
```

**Order matters** when declaring collections. If the collection `A` references the collection `B`, the collection `B` must be placed before `A`. If there's the need for a circular reference (`A` references `B` that references `A` again), then an empty declaration can be placed before both declarations to solve the circularity.

```aeria
collection B {}

collection A {
  properties {
    prop B
  }
}

collection B {
  properties {
    prop A
  }
}
```

### Contract

**Syntax:**

```aeria
contract InsertUserContract {
  payload {
    properties {
      username str
      password str
    }
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

