# init()

## Example

```typescript
import { init } from 'sonata-api'
import * as collections from './collections'

export default init({
  collections,
  config: {
    database: {
      mongodbUrl: 'mongodb://localhost:27107/panzer'
    }
  }
})
```
