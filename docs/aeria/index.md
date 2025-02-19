# Introduction

Aeria is a framework that lets you write applications in a highly structured way using a custom language while keeping the same flexibility of conventional approaches. It's easier for AIs to automate and easier for humans to debug and maintain since the code becomes way smaller.

The framework has built into it a schema definition language that offers a unified syntax to define [database models](/aeria/collections) and [DTOs](/aeria/contracts) (represented respectively by the `collection` and `contract` keywords). So instead of having something like Prisma and Zod coexisting in the same project, now you have a single language that will deal with both data modeling and schema validation.

Some useful defaults are also packed into the language, like user and file entities. They can be imported and extended using a special syntax. Below there is an example of how collections are defined in Aeria:

```aeria
collection File extends aeria.file {}
collection TempFile extends aeria.tempFile {}

functionset Crud {
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

Contracts share the same syntax to validate POST/GET parameters and generate types for the response:

```aeria
contract AddFriend {
  payload {
    properties {
      person_id str
    }
  }
  response
    | Result Person
    | Error {
      properties {
        message str
        code int
      }
    }
}
```

Aeria acts as a frontend to **MongoDB**, similarly to Mongoose, but with some key differences:

1. **Aeria doesn't add up hooks and polyfills**: having no abstraction layer over MongoDB means less complexity and more speed.
2. **References are resolved using the Aggregation Framework**: instead of looking up references on the application level, Aeria integrates with [Aggregation Framework](https://www.mongodb.com/docs/manual/aggregation/) to resolve references faster directly in the MongoDB backend. Benchmarks can be seen at this [GitHub repository](https://github.com/aeria-org/benchmark).

The interface to the MongoDB JS driver can be accessed directly:

```ts
router.GET('/example', (context) => {
  const documents = await context.collections.person.model.aggregate(...)
  for( document of documents ) {
    ...
  }
})
```

<!-- ## Why Aeria? -->
<!---->
<!-- 1. It is faster -->
<!-- 2. It has better TypeScript support (than Mongoose) -->
<!-- 3. It offers a more cohesive approach -->
<!-- 4. It is smaller and has more potential of linear growth -->
<!---->
