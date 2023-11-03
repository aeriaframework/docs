# Collection

Aeria has builtin primitives for persistent data storage. Each collection equals to a table in a relational database, or to a document database collection, but aside from the data access itself, an Aeria collection may have access control, security, and functions set.

Direct access to MongoDB collection is possible through `context.model`, but validation, autocasting and autopopulation of references won't be available. The CRUD functions available through `context.collection.functions` are the standard and should be preferred.


```typescript
export type CollectionStructure<TCollectionStructure extends CollectionStructure = any> = {
  item: any
  description: Description
  security?: SecurityPolicy
  accessControl?: AccessControl<TCollectionStructure>
  functions?: Record<string, (...args: any[]) => any>
}
```

## item <Badge type="tip" text="any" />

The `item` property is never used by the runtime. It serves only the purpose of typing.
The value of this property is the first element of the tuple returned by `defineDescription`.

## description <Badge type="tip" text="Description" />

The `description` property is where the properties of your collection are
defined, alongside some behavior rules. It should always be strongely typed
using the `defineDescription` function. Descriptions have their own complexity,
you can learn more about them in the `Description` page.

## security <Badge type="tip" text="SecurityPolicy" /> <Badge type="tip" text="optional" />

This property is used to define security policies.
Learn more about security policies in the `SecurityPolicy` page.

If omitted, no Security Policy will be applied.

## accessControl <Badge type="tip" text="AccessControl" /> <Badge type="tip" text="optional" />

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


### Exposing collections

Collections are made available in the runtime if they're exported in the
entrypoint file. After you define a collection using the
[defineCollection](/backend/define-collection) function, you should export it
and them re-export it from the entrypoint inside an object named `collections`.