# Collection

## Defining collections

```typescript
import { defineCollection, get, getAll, remove } from 'aeria'

export const collectionName = defineCollection({
  description: {
    $id: 'collectionName',
    properties: {
      name: {
        type: 'string'
      }
    }
  },
  functions: {
    get,
    getAll,
    remove
  }
})
```

## Properties

### description <Badge type="tip" text="Description" />

The `description` property is where the properties of your collection are
defined, alongside some behavior rules. It should always be strongely typed
using the `defineDescription` function. Descriptions have their own complexity,
you can learn more about them in the `Description` page.

### functions <Badge type="tip" text="Record<string, (...args: any[]) => any>" /> <Badge type="tip" text="optional" />

### security <Badge type="tip" text="SecurityPolicy" /> <Badge type="tip" text="optional" />

This property is used to define security policies.
Learn more about security policies in the `SecurityPolicy` page.

If omitted, no Security Policy will be applied.

### accessControl <Badge type="tip" text="AccessControl" /> <Badge type="tip" text="optional" />

This property is used to restrict access to the endpoints of the collections by role.
Learn more about access control in the `AccessControl` page.

If omitted, the default Access Control profile will be applied:

```typescript
{
  roles: {
    root: {
      grantEverything: true
    }
  }
}
```


## Exposing collections

Collections are made available in the runtime if they're exported in the
entrypoint file. After you define a collection using the
[defineCollection](/backend/define-collection) function, you should export it
and them re-export it from the entrypoint inside an object named `collections`.
