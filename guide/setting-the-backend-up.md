# Setting the Backend up

### Listening

We'll start with this minimost working example:

```typescript
import { init } from 'aeria'

init()
```

It'll output a small initialization summary in the terminal and start listening in the default `3000` port. As we haven't defined any collections or routes, this code alone is useless. Let's define a small collection to make the example useful.

```typescript
import {
  init,
  defineCollection,
  defineDescription,
  useFunctions
} from 'aeria'

const [Person, description] = defineDescription({
  $id: 'person',
  properties: {
    name: {
      type: 'string'
    },
    age: {
      type: 'number'
    }
  }
})

export const collections = {
  person: defineCollection(() => ({
    item: Person,
    description,
    functions: useFunctions<typeof Person>()([
      'getAll',
      'insert'
    ]),
    accessControl: {
      roles: {
        guest: {
          grantEverything: true
        }
      }
    }
  }))
}

init()
```

Booyah! With only this few lines of code we have created a collection and made it's REST endpoints accessible. Note the `accessControl` property. Although it's optional, it's pretty useful to declaratively restrict the access of your application's resource to certain roles.

The `getAll` and `insert` strings passed to the `functions` property through the `useFunctions` helper are the names of builtin functions to deal with CRUD operations. You can also overwrite these default functions or write your own at any time.

### Routing

Creating custom routes is also simple.

```typescript
import { init, makeRouter } from 'aeria'

const router = makeRouter()

router.GET('/hello/(\\w+)', (context) => {
  return {
    message: `Hello, ${context.request.fragments[0]}!`
  }
})

init(null, (context) => {
  return router.install(context)
})
```

Every backend resource, like request/response data and collection functions is available in the `context` object passed as parameter to the route callback. The `Context` is covered in details in the Backend Reference.

Middlewares are made possible with the third parameter of the route registration function. Just like the second parameter, they receive a `Context` object and may or may not return a value. If the returned value is any but `undefined`, then the endpoint will return it and halt the second callback execution. Refer to the `Routing` section in Backend Reference to learn more.

### Organizing


