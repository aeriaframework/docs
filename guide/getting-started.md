# Getting started

## Initial setup

You can save some time cloning the Aeria Quickstart repository and building your project on top of it. The repository has backend and frontend workspaces, scripts, and dependencies set up.

Each workspace has a purpose:

- `api`: the backend (collections, routes, etc)
- `web`: the Aeria UI frontend (views, components, etc)

After cloning the repository, move to it's directory and install the dependencies from the root (not from each workspace separately).

```sh
$ git clone https://... my-project
$ cd my-project
$ npm install
```

## Running the project and signing in

First, make sure you have a listening MongoDB server. Copy the `sample.env` file to `.env` and adjust it to your needs. Two environment variables are used to grant you first access to the project you just created: `GODMODE_USERNAME` and `GODMODE_PASSWORD`.

Next, open a web browser and navigate to the following address:

```
http://localhost:8080/user/signin
```

Now you may create your own user and sign in with it. You may want to do that instead of using the user defined in `.env` because it doesn't persist between page reloads and it will raise a security error when trying to modify owned documents.

## Adding a collection

Adding a collection to your project is pretty straightforward. In fact, you just need to create one file. Create a `collections/person/index.ts` file and tip the following, just to get a taste of Aeria's functionalities:

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

That isn't all. Now, make sure to re-export the collection object in `collections/index.ts` by adding the following line:

```typescript
export * from './person'
```

Now you can navigate to `http://localhost:8080/dashboard` and interact with the `person` collection through the interface.


## Adding a route

Of course you will need custom endpoints in your API. We have put a lot of effort into making routing the more ergonomic and type safe possible. In fact, routing it's a lot easier in Aeria than it is in Express or Hapi, for example.

To create a route that will make use of data sent through GET parameters, tip the following in `routes/index.ts`:

```typescript
import { createRouter } from 'sonata-api'

export const router = createRouter()

router.GET('/hello-world', (context) => {
  return {
    message: `Hello, ${context.request.query.name}`
  }
})
```

Now, create your API instance using the `init` function. It is important to export the function call as default, so the runtime can access your options. Place the collections inside the options object and install the router returning it from the callback property. Here goes how the entire file should look:

```typescript
import { init } from 'sonata-api'
import { router } from './routes'
import * from './collections'

export default init({
  collections,
  callback: (context) => {
    return router.install(context)
  }
})
```

Navigate to `http://localhost:3000/api/hello-world?name=Terry` to test your freshly created route.


## Further reading

- [Reference - Aeria](/aeria/)
- [Reference - Aeria UI](/aeria-ui/)

