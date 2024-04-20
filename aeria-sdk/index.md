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

### Configuration

**Type:**

```typescript
type StorageStrategy =
  | 'none'
  | 'memo'
  | 'localStorage'

type InstanceConfig = {
  publicUrl: string | {
    production: string
    development: string
  }
  storage?: {
    strategy?: StorageStrategy
    namespace?: string
  }
  integrated?: boolean
}
```

### Creating an instance

Instancing the Aeria SDK should now be pretty easy. No additional runtime configuration is needed, just import `aeria` from `aeria-sdk`. The `aeria` export is a strongely typed top-level object that grants access to every API resource. Example:

```typescript
import { aeria } from 'aeria-sdk'

const main = async () => {
  const people = await aeria.person.getAll.POST({
    filters: {
      job: 'programmer'
    }
  })
}
```

