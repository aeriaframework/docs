# Aeria SDK Reference

Aeria has an officially supported SDK that enables third-party interaction with Aeria APIs. The SDK benefits from data reflected from the backend to provide strong typing.


## Getting started

First thing needed is to setup the `package.json` with properties that will be used by the code generation utility. Create a top-level property called `aeriaSdk` that contains a `publicUrl` string property. The `publicUrl` should point to a running Aeria instance.

```json
{
  ...
  "aeriaSdk": {
    "publicUrl": "https://my-application.com/api"
  }
}
```

Next, create a `describe` script that will invoke the `aeria-sdk` CLI utility.

```json
{
  "scripts": {
    "describe": "aeria-sdk"
  }
}
```

Running the `describe` script should generate a `aeria-sdk.d.ts` file inside project root folder and some files under `node-modules/.aeria-sdk` that will be used by the runtime. The `aeria-sdk.d.ts` file shouldn't be excluded from commits.

::: tip IMPORTANT
Make sure to call the `describe` script (`npm run describe` or the equivalent of another package managers) during the deployment pipeline fo your application, otherwise runtime will fail.
:::

## Configuration

### publicUrl.production

**Type**: `string`

The public URL of the Aeria API the SDK will connect to.

### publicUrl.development

**Type**: `string`

The public URL of the Aeria API the SDK will connect to.

### storage.strategy

**Type**:

```ts
type StorageStrategy =
  | 'none'
  | 'memo'
  | 'localStorage'
```

### storage.namespace

**Type**: `string`

The prefix to be used to store keys in `localStorage` or `sessionStorage`. Defaults to `aeria`.

### integrated

**Type**: `boolean`


## Using the global instance

The `aeria-sdk` module exports a global Aeria SDK instance called `aeria`. This instance gets it's types from code generated with the `aeria-sdk` command. Attempting to import from `aeria-sdk` without running the code generation first will result in a runtime error.

```typescript
import { aeria } from 'aeria-sdk'

const main = async () => {
  const { error, result: people } = await aeria.person.getAll.POST({
    filters: {
      job: 'programmer'
    }
  })

  // your code goes here
}
```

## Using interceptors

In some scenarios you may find it useful to modify the request before sending it, or to produce some effect upon a specific HTTP status code, for example, redirecting the user to a signin page. The SDK allows setting up interceptors to handle such cases.

You may change the `interceptors` object exported by `aeria-sdk` directly to add request and response interceptors. The interceptors will be used by all instances across the application.

```typescript
import { interceptors } from 'aeria-sdk'

interceptors.request = async (context, next) => {
  context.params.headers = {
    'x-my-header': 'secret',
  }
  return next(context)
}

interceptors.response = async (context, next) => {
  switch( context.response.status ) {
    case 200: {
      console.log('received successful status', context.response.statusText)
      break
    }
  }
  return next(context)
}
```

## Creating an instance

It is also possible to create a custom Aeria SDK instance instead of using the global one. In this case, the type of the API must be passed manually in the `createInstance()` template parameter.

```typescript
import { createInstance } from 'aeria-sdk/topLevel'

type Api = {
  nested: {
    myEndpoint: {
      POST: (payload: { name: string }) => Promise<`hello, ${string}!`>
    }
  }
}

const aeria = createInstance<Api>({
  publicUrl: 'https://myapi',
  }, {
  interceptors: {
    request: (context, next) => {
      console.log('URL', context.url)
      return next(context)
    }
  }
})

// const result: `hello, ${string}!`
const result = await aeria.nested.myEndpoint.POST({ name: 'john' })
```

