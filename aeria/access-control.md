# Access Control

Aeria implements [Role-Based Access Control (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control) out-of-the-box to provide a concise, strongely-typed way to control access to endpoints exposed either by Routes API or by Collection Functions.

The Access Control implementation discriminates users by the following ways:

- by their roles
- by whether they're authenticated or not

More dynamic access controlling for special needs must be manually implemented within the endpoint logic itself.

### API

```typescript
type UserRole =
  | Collections['user']['item']['roles'][number]
  | 'root'
  | 'guest'

type AccessCondition =
  | readonly UserRole[]
  | boolean
  | 'unauthenticated'
  | 'unauthenticated-only'
```

- `string[]`: only specified roles have access
- `true`: only authenticated users have access
- `false`: function isn't exposed
- `'unauthenticated'`: both authenticated and unauthenticated users have access
- `'unauthenticated-only'`: only unauthenticated users have access

### Errors

```typescript
enum ACError {
  AuthenticationError = 'AUTHENTICATION_ERROR',
  AuthorizationError = 'AUTHORIZATION_ERROR',
  FunctionNotFound = 'FUNCTION_NOT_FOUND',
  FunctionNotExposed = 'FUNCTION_NOT_EXPOSED',
  TargetImmutable = 'TARGET_IMMUTABLE',
  InvalidLimit = 'INVALID_LIMIT',
  OwnershipError = 'OWNERSHIP_ERROR',
  ResourceNotFound = 'RESOURCE_NOT_FOUND',
  InsecureOperator = 'INSECURE_OPERATOR',
}

```
