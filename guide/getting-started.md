# Getting started

## Scaffolding and installation

First off, clone the template repository from Github. It sets up two workspaces, `api` and `web`, that will contain the Aeria backend and the Aeria UI frontend respectivelly. Each workspace has only the bare minimal boilerplate and configuration to start working. You can also skip this step and install the dependencies and scaffold your project manually, but this would take an extra amount of time.

Run `npm install` (or replace `npm` by your package manager of choice) in the root of the project. This is install the dependencies needed for the development environment and for both workspaces. Some TypeScript declaration files will be generated upon install, those shouldn't be deleted and should be committed.

::: tip NOTE
You can also use Aeria as a standalone API, without Aeria UI. In order to do that you can just start a fresh project, add `sonata-api` as a dependency and `sonata-build` as a dev dependency, and setup the `package.json` scripts as you wish.
:::

## Running the project

Before running the `api`, though, make sure you have a listening MongoDB server, then copy the `sample.env` file to `.env` and edit it accordingly. Now you just need to spawn two terminals and run `npm run serve` on each.

Your project should now be accessible through http://localhost:8080/user/signin. You can find the credentials for the first access in the `.env` file.

::: warning WARNING
The `GODMODE_USERNAME` and `GODMODE_PASSWORD` environment variables are meant to be used in the first access only. They must not make into production and should not be used during development.
:::


## Adding a collection

Aeria uses a pretty straightforward folder-by-feature hierarchy, so collections along with all their assets (functions, DTOs, etc) are placed inside a folder inside `collections/`. Adding a "person" collection couldn't be simpler:

1. Create a `collections/person/index.ts` file that will contain a single export containing the structure of the collection.

```typescript
import { defineCollection, get, getAll, insert } from 'sonata-api'

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
    insert
  }
})
```

2. Re-export the collection we've just created in the `collections/index.ts` file:

```typescript
export * from './person'
```

3. You may want to make your newly created collection appear in the frontend navbar. To do that, simple add a `'/dashboard/person'` entry under `menuSchema.start.children` array inside the `web/src/index.ts` file like so:

```typescript
menuSchema: {
  start: {
    meta: {
      title: 'Start',
      icon: 'home'
    },
    children: [
      '/dashboard/person',
      '/dashboard/user'
    ]
  }
```

## Adding a route

1. Inside `api/src/index.ts`, import `makeRouter` and create a router like below. The router object has functions named as default HTTP methods that will register a callback on the desired path. You may also define a route that accepts multiple methods with the `router.route` function.

```typescript
import { init, makeRouter } from 'sonata-api'
export * from './collections'

const router = makeRouter()

router.GET('/hello-world', () => {
  return {
    message: 'Hello, world!'
  }
})
```

Exception handling inside router callbacks isn't needed, the exceptions will be caught automatically. Also, instead of the conventional `(req: HTTPRequest, res: HTTPResponse) => void` callback used by web frameworks such as Express, Aeria uses a `(context: Context) => any`, where `Context` is a top-level object that gives access to all API resources and `any` is an object or primitive value that will be returned also by the endpoint.

2. Register the router by returning it's execution in the second argument callback of `init`.

```typescript
init(null, (context) => {
  return router.install(context)
})
```

## Further reading

This small guide gave you an overview of how Aeria works. With this topics only you should be able to do a lot, but as your application grows you'll likely need some other features, like [file uploading](/aeria/cheatsheet/create-an-upload-field), [validation](/aeria/cheatsheet/validate-an-object-against-a-schema) and [references](/aeria/cheatsheet/reference-another-collection). We've bring together some useful help topics that will assist you with doing these common tasks.

- [Help Topics - Aeria](/aeria/cheatsheet/)
- [Help Topics - Aeria UI](/aeria-ui/cheatsheet/)

API references of both tools are also available below and fixed on the top navigation bar to be accessed at any time.

- [Reference - Aeria](/aeria/)
- [Reference - Aeria UI](/aeria-ui/)

