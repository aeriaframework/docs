# Getting started

## Requirements

- Node v20+
- A running MongoDB server <Badge type="info" text="optional" />
- Git command line utility <Badge type="info" text="optional" />
- A POSIX-like environment <Badge type="info" text="optional" />
    - Some scripts will require commands such as `mv` and `sh` to be available. On Windows, those are commonly packed together with `git`.

## Initial setup

The official way to start an Aeria project is through the `create-aeria-app` command line utility. It is done the following way (it may vary according to the package manager you use):

```
npm create -y aeria-app project-name
```

The utility will scaffold a new project with some defaults:

- TypeScript
- ESlint installed with the official Aeria style guideline
- Husky and commitlint with conventional commits set up
- Tailwind preconfigured in the frontend with the `tw-` prefix in classes

If you wish for a more vanilla approach instead, simply install the `aeria` package and start your project from a `.js` or a `.mjs` file. The only important thing is to make sure the `main` property inside the `package.json` exists and points to the right file.


## Running the project and signing in

Make sure the MongoDB server is running. Next, navigate into the project root and run the `dev` script:

```
npm run dev
```

This command will serve the backend and frontend at once. If execution is successful, a sign in page will be made available in the following location:

```
http://localhost:8080/user/signin
```

Finally, to grant you access to the application during development, sign in using the default credentials specified in the `.env` file, create another user with the `root` role, change its password, and sign in again with it instead. Do not skip this step as the default user (the one that signs in with the credentials specified in env vars) lacks some important attributes.

## Adding a collection

Create a `collections/person/index.ts` file and place the content below. It will bring up a `person` collection with `name` and `age` properties and a set of CRUD functions that can be interacted with using REST endpoints.

```typescript
import { defineCollection, get, getAll, insert, remove } from 'sonata-api'

export const person = defineCollection({
  description: {
    $id: 'person',
    properties: {
      name: {
        type: 'string'
      },
      age: {
        type: 'number'
      }
    },
    presets: [
      'crud'
    ]
  },
  functions: {
    get,
    getAll,
    insert,
    remove
  }
})
```

Now, to make the runtime acknowledge the existence of the new collection, re-export it by adding the following line in `collections/index.ts`:

```typescript
export * from './person'
```


## Adding a route

A lot of effort was put into making routing safe and ergonomic. Route callbacks have a `context` parameter from where collections, request and response data, and authentication token can be used.

Do as the following to create a `GET /hello-world` route in `routes/index.ts`:

```typescript
import { createRouter } from 'sonata-api'

export const router = createRouter()

router.GET('/hello-world', (context) => {
  return {
    message: `Hello, ${context.request.query.name}`
  }
})
```

## Puting it all together with init()

The Aeria runtime relies on dynamic imports of the entrypoint file to read collections and configuration (that's why the `main` property of `package.json` is important). The entrypoint file must export the return of the `init()` function as default.

By its turn, the `init()` function receives a configuration object, and optionally a custom HTTP server callback that can be used to install a router.


```typescript
import { init } from 'sonata-api'
import { router } from './routes'
import * as collections from './collections'

export default init({
  config: {
    database: {
      mongodbUrl: process.env.MONGODB_URL
    }
  },
  callback: (context) => {
    return router.install(context)
  }
})
```



## Further reading

This guide covered the basics of Aeria. You should consult documentation for more detailed usage and examples of the public APIs.

- [Reference - Aeria](/aeria/)
- [Reference - Aeria UI](/aeria-ui/)

