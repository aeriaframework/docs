# Getting started

## Requirements

- Node v20+
- A running MongoDB server <Badge type="info" text="optional" />
- Git command line utility <Badge type="info" text="optional" />
- A POSIX-like environment <Badge type="info" text="optional" />
    - Some scripts will require commands such as `mv` and `sh` to be available. On Windows, those are commonly packed together with `git`.

## Initial setup

The official and easiest way to start an Aeria project is through the `create-aeria-app` command line utility. It is done the following way (it may vary according to the package manager you use):

```
npm create -y aeria-app project-name
```

The utility will scaffold a new project with some defaults:

- TypeScript
- ESlint installed with the official Aeria style guideline
- Husky and commitlint with conventional commits set up
- Tailwind preconfigured in the frontend with the `` prefix in classes

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

## Adding collections

Collections are declared in the `schemas/main.aeria` file.
Below there is an example of a "person" collection being declared with Aeria Lang, and on the side there is the same declaration using a JSON schema.

::: code-group

```aeria [api/schemas/schema.aeria]
collection Person {
  properties {
    name str
    age num
  }
  functions {
    get
    getAll
    insert
    remove
  }
  presets {
    crud
  }
}
```

```typescript [api/src/collections/person/index.ts]
import { defineCollection, get, getAll, insert, remove } from 'aeria'

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

:::

The development server will reload upon changes on `schemas/*.aeria` with the changes being automatically applied. No migration is needed after the data structure of a collection is changed. Needed migrations are performed automatically under the hood by diffing the current data structure with the previous one (todo).

## Adding routes

Open the scaffolded `routes/index.ts` file and add a route by calling the chosen method (`GET`, `POST`, `route` for multiple methods, etc). Request and response data and methods, as long as collections and API utilities can be accessed through the `context` parameter made available in the route callback.

To indicate error and successful responses, use `Result.error()` and `Result.result()` respectively. Learn more about how Aeria handlers errors in the [Error Handling](/aeria/error-handling) page.

::: code-group

```typescript [api/src/routes/index.ts]
router.GET('/test', async (context) => {
  const {
    error,
    result: people
  } = await context.collections.person.functions.getAll()

  if( error ) {
    return Result.error(error)
  }

  return Result.result({
    message: 'Hello, world!',
    people,
  })
})
```

:::

## Creating pages in the frontend

Aeria UI uses [unplugin-vue-router](https://github.com/posva/unplugin-vue-router) under the hood to provide a Nuxt-like filesystem-based routing. This means that, in order to create a page in the frontend, you must simply place your `.vue` file inside the `pages/` folder. For example, to make `/dashboard/hello-world` view, create the `pages/dashboard/hello-world.vue` file and put something in the template:

::: code-group

```vue [web/src/pages/dashboard/hello-world.vue]
<template>
  <h1>Hello, world!</h1>
</template>
```
:::

## Changing the default menu schema

In order to change the navbar that appears in the dashboard to add or rearrange items you must add the `menuSchema` property inside `defineOptions()`. More information on how the menu can be customized can be seen at [/aeria-ui/menu-configuration](Menu configuration).

::: code-group

```typescript [web/src/index.ts]
const options = defineOptions({
  // ...
  menuSchema: [
    '/dashboard/hello-world',
    {
      meta: {
        title: 'Collections',
      },
      children: [
        '/dashboard/person',
        '/dashboard/user',
      ],
    },
  ],
})

```

:::


## Calling endpoints from the frontend

There should be a point in the development of the application that it will be needed to request an endpoint and get back the response. You shouldn't use `fetch()` or any other HTTP client for this (except when really needed). Instead, use [Aeria SDK](/aeria-sdk/) to interact with the backend with 1:1 typing and authentication handling.

::: code-group

```vue [web/src/pages/dashboard/hello-world.vue]
<script setup lang="ts">
const metaStore = useStore('meta')
const people = ref([])

onMounted(() => {
  const { error, result } = await aeria().test.GET()

  if( error ) {
    return metaStore.$actions.spawnToast({
      title: 'Error!',
      message: 'There was a error fetching people from the API'
    })
  }

  people.value = result.people
})
</script>

<template>
  <ul>
    <li
      v-for="person in people"
      :key="person._id"
    >
      {{ person.name }} ({{ person.age }} years old)
    </li>
  </ul>
</template>
```

:::

## Further reading

This guide covered the basics of Aeria. You should consult documentation for more detailed usage and examples of the public APIs.

- [Reference - Aeria](/aeria/)
- [Reference - Aeria UI](/aeria-ui/)

