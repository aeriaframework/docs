# makeRouter

```typescript
import { init, makeRouter } from 'aeria'

const router = makeRouter()

router.GET('/hello-world', () => 'Hello, world!')
router.POST('/hello-world', (context) => {
  return {
    message: `Hello, ${context.request.payload.name}!`
  }
})

router.route(['GET', 'POST'], '/ill-take-anything', (context) => {
  return {
    message: 'Thanks for reaching out!',
    receivedMethod: context.request.method
  }
})

init(null, (context) => {
  return router.install(context)
})
```
