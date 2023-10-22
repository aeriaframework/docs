# Collection

Aeria has builtin primitives for persistent data storage. The word `collection` reads the same in Aeria as in `MongoDB`, but with a few differences.
In both Aeria and MongoDB, a collection is a noun that represents a serie of documents with consistent structure that are stored in a database.

In addition to MongoDB, Aeria will provide validation, security, access control, and business logic primitives to retrieve and store data.

```typescript
export type CollectionStructure<TCollectionStructure extends CollectionStructure = any> = {
  item: any
  description: Description
  security?: SecurityPolicy
  accessControl?: AccessControl<TCollectionStructure>
  functions?: Record<string, (...args: any[]) => any>
}
```

#### item

The `item` property is never used by the runtime. It serves only the purpose of typing.
The value of this property is the first element of the tuple returned by `defineDescription`.

#### description

The `description` property is where the properties of your collection are
defined, alongside some behavior rules. It should always be strongely typed
using the `defineDescription` function. Descriptions have their own complexity,
you can learn more about them in the `Description` page.

#### security

This property is used to define security policies.
Learn more about security policies in the `SecurityPolicy` page.

If omitted, no Security Policy will be applied.

#### accessControl

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


### Creating collections

Collections are made available in the runtime if they're exported in the
entrypoint file. After you define a collection using the
[defineCollection](/backend/define-collection) function, you should export it
and them re-export it from the entrypoint inside an object named `collections`.
