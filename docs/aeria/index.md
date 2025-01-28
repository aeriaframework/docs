# Introduction

Blablah...

```aeria
collection File extends aeria.file {}
collection TempFile extends aeria.tempFile {}

functionsset Crud {
  get @expose
  getAll @expose
  insert @expose
  remove @expose
}

collection Person {
  properties {
    name str
    picture File @accept(["image/*"])
  }
  functions {
    include(Crud)
  }
}
```

DTOs share almost the same syntax:

```aeria
contract AddFriend {
  payload {
    person_id str
  }
  response
    | Result Person
    | Error str
}
```

## Why Aeria?

1. It is faster
2. It has better TypeScript support (than Mongoose)
3. It offers a more cohesive approach
4. It is smaller and has more potential of linear growth

