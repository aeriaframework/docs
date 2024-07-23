# `successfulAuthentication()`

This function returns the user metadata along with the JWT token used to authenticate. It can be used to implement alternative signing in methods such as OAuth as ilustrated by these examples:

- [Github OAuth using Aeria](https://github.com/SamCaliman/aeria-github-auth/blob/master/api/src/routes/github.ts)
- [Twitch OAuth using Aeria](https://github.com/SamCaliman/aeria-twitch-auth/blob/master/api/src/routes/twitch.ts)

### Example

```typescript
const { error, result: user } = await authenticate(payload)
if( error ) {
  return Result.error(error)
}

return Result.result(successfulAuthentication(user, context))
```
