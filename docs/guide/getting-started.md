# Getting started

## Requirements

- Node v22+
- A running MongoDB server <Badge type="info" text="optional" />
- Git command line utility <Badge type="info" text="optional" />
- A POSIX-like environment <Badge type="info" text="optional" />
    - Some scripts will require commands such as `mv` and `sh` to be available. On Windows, those are commonly packed together with `git`.

## Initial setup

The official and easiest way to start an Aeria project is through the `create-aeria-app` command line utility. It is done the following way (it may vary according to the package manager you use):

```
npm create -y aeria-app@latest project-name
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

## Collections

### Adding collections

Collections are declared in the `schemas/main.aeria` file.
Below there is an example of a "person" collection being declared with Aeria Lang.

::: code-group

```aeria [api/schemas/main.aeria]
collection Person {
  icon "person-simple"
  properties {
    name str
    age num
  }
  presets {
    crud
  }
  functions {
    get @expose
    getAll @expose
    insert @expose
    remove @expose
  }
}
```

:::

The development server will reload upon changes on `schemas/*.aeria` with the changes being automatically applied. No migration is needed after the data structure of a collection is changed. Needed migrations are performed automatically under the hood by diffing the current data structure with the previous one (todo).

### Adding functions to collections

In order to enable file uploading for our example `Person` collection, it is required to add the `upload` function to the functions set. The `@expose` attribute that comes right after the function name can be used without any arguments, meaning the function is exposed to every signed in user, or an array of roles can be passed to mean the function is only exposed to users whose role is contained within the set. To illustrate this, let's make files only uploadable by `root` users.

Available functions can be seen in their [respective section of the documentation](/aeria/builtins/functions).

::: code-group

```aeria [api/schemas/main.aeria]
collection Person {
  properties {
    name str
    age num
    picture File @accept(["image/*"]) // [!code ++]
  }
  presets {
    crud
  }
  functions {
    get @expose
    getAll @expose
    insert @expose
    remove @expose
    upload @expose(["root"]) // [!code ++]
  }
}
```

:::

### Setting user roles

Roles are set by extending the default `user` collection. The default boilerplate already comes with some roles set. You may replace them with the ones your application needs. No matter which roles you set, the `guest` and `root` roles are special roles used internally by the framework and will always be available.

::: code-group

```aeria [api/schemas/main.aeria]
collection User extends aeria.user {
  properties {
    roles []enum @values([
      "root",
      "supervisor", // [!code ++]
      "customer" // [!code ++]
    ])
  }
}
```

:::


## Business logic

### Adding routes

Open the scaffolded `routes/index.ts` file and add a route by calling the chosen method (`GET`, `POST`, `route` for multiple methods, etc). Request and response data and methods, as long as collections and API utilities can be accessed through the `context` parameter made available in the route callback.

To indicate error and successful responses, use `Result.error()` and `Result.result()` respectively. Learn more about how Aeria handlers errors in the [Error Handling](/aeria/error-handling) page.

::: code-group

```typescript [api/src/routes/index.ts]
import { createRouter, Result } from 'aeria'

export const router = createRouter()

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


## Frontend

### Creating pages in the frontend

Aeria UI uses [unplugin-vue-router](https://github.com/posva/unplugin-vue-router) under the hood to provide a Nuxt-like filesystem-based routing. This means that, in order to create a page in the frontend, you must simply place your `.vue` file inside the `pages/` folder. For example, to make `/dashboard/hello-world` view, create the `pages/dashboard/hello-world.vue` file and put something in the template:

::: code-group

```vue [web/src/pages/dashboard/hello-world.vue]
<script setup lang="ts">
definePage({
  meta: {
    title: 'Hello World',
    icon: 'globe-hemisphere-east',
  },
})
</script>

<template>
  <h1>Hello, world!</h1>
</template>
```
:::

### Changing the default menu schema

In order to change the navbar that appears in the dashboard to add or rearrange items you must add the `menuSchema` property inside `defineOptions()`. More information on how the menu can be customized can be seen at [Menu configuration](/aeria-ui/menu-configuration).

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

### Retrieving data from the frontend

There should be a point in the development of the application that it will be needed to request an endpoint and get back the response. You shouldn't use `fetch()` or any other HTTP client for this (except when really needed). Instead, use [Aeria SDK](/aeria-sdk/) to interact with the backend with 1:1 typing and authentication handling.

::: code-group

```vue [web/src/pages/dashboard/hello-world.vue]
<script setup lang="ts">
const metaStore = useStore('meta')
const people = ref([])

onMounted(async () => {
  const { error, result } = await aeria().test.GET()

  if( error ) {
    return metaStore.$actions.spawnToast({
      title: 'Error!',
      message: 'There was an error fetching people from the API'
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

### Adding a custom action in the tabular view

It is possible to change the tabular view presented by default by Aeria when a collection is added. Some details, like table buttons, can be defined directly in the collection schema. It is also possible to alter the DOM directly as will be shown next.

In this example, a "Toggle active" button that toggles the value of the `active` property will be added.

::: code-group

```aeria [main.aeria]
collection Person {
  properties {
    name str
    age num
    active bool // [!code ++]
    picture File @accept(["image/*"])
  }
  presets {
    crud
  }
  functions {
    get @expose
    getAll @expose
    insert @expose
    remove @expose
    upload @expose(["root"])
  }
  individualActions { // [!code ++]
    toggleActive { // [!code ++]
      label "Toggle active" // [!code ++]
    } // [!code ++]
  } // [!code ++]
}
```

:::

### Customizing the DOM of the tabular view

Aeria UI uses NextJS-style filesystem-routing. So the first step to override the runtime-generated `/dashboard/person` route is to create a page named accordingly. Next, simply use the `aeria-crud` component to render the table, actions, forms, etc and structure the page as needed. Last thing, **slots** can be used to customize pieces of DOM inside the `aeria-crud` component.

To see all accepted slots, refer to the [Aeria UI documentation](/aeria-ui/components/aeria-crud#slots).

::: code-group

```vue [pages/dashboard/person.vue]
<script setup lang="ts">
definePage({
  meta: {
    title: 'People',
    icon: 'person-simple',
  },
})
</script>

<template>
  <h1>This is a header!</h1>

  <aeria-crud collection="person">
    <template #row-active="{ row, column }">
      {{ row[column] ? 'Active' : 'Inactive' }}
    </template>
  </aeria-crud>
</template>
```

:::


## Further reading

Details and advanced usage of steps covered in this guide can be found in the documentation of each project (Aeria and Aeria UI).

- [Aeria Documentation](/aeria/)
- [Aeria UI Documentation](/aeria-ui/)

