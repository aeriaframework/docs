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
    upload @expose
  }
}
```

Contracts share the same syntax to validate POST/GET parameters against a schema and generate types for the response:

```aeria
contract AddFriend {
  payload {
    properties {
      person_id str
    }
  }
  response
    | Error {
      properties {
        message str
        code int
      }
    }
    | Result Person
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

## Get Started

In order to get the Aeria development server running locally, first make sure to attend the prerequisites:

- Get MongoDB server running
- Make sure NodeJS v22 or above is installed
- Install the IDE/code editor extensions to get LSP hints and syntax highlighting ([view the guide](http://localhost:5173/aeria/integration-with-ide-and-text-editors))

Next, bootstrap a new app with the following command:

```sh
npm create -y aeria-app@latest my-app
```

Finally, cd into the directory created by the command and start the development server:

```sh
cd my-app
npm run dev
```

By default, the frontend will listen on the `8080` port and the backend will listen on the `3000` port. Navigate to `http://localhost:8080/user/signin` to be able to access the dashboard. You may sign in with the default username and password contained within the `api/.env` file.

