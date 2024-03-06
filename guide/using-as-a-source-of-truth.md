# Using as a source of truth

## Configuration

Make sure `main` and `types` properties exist in `package.json`. The `main` property must point to the Aeria entrypoint (the file where your `export default init(...)` is located). In order to avoid possible collisions, an alternative `aeriaMain` property can also be used and will be preferred over `main`.

```json
{
  "name": "my-project",
  "main": "dist/index.js",
  "types": "src/index.ts",
  ...
}
```

## Frameworks

### NextJS

```tsx
import { useAeria } from 'aeria'

export async function getStaticProps() {
  const aeria = await useAeria()
  const users = await aeria.collections.user.functions.getAll()

  return {
    props: {
      users: users.map((user) => ({
        name: user.name
      }))
    }
  }
}

export default function Hello(props: Awaited<ReturnType<typeof getStaticProps>>['props']) {
  return <>
    <h1>Users</h1>
    <ul>
      {props.users.map((user) => (
        <li>{ user.name }</li>
      ))}
    </ul>
  </>
}
```

