# Error Responses

::: code-group

```typescript [router.ts]
router.GET('/example', (context) => {
  if( businessLogic() ) {
    return context.error(HTTPStatus.NotFound, {
      code: 'NOT_FOUND'
    })
  }
})
```

```typescript [collection.ts]
const person = defineCollection({
  description: {
    $id: 'person',
    properties: {}
  },
  functions: {
    example: (payload, context) => {
      if( businessLogic() ) {
        return context.error(HTTPStatus.NotFound, {
          code: 'NOT_FOUND'
        })
      }
    }
  }
})
```

```http [sample response]
HTTP/1.1 404 Not Found
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: *
Access-Control-Allow-Headers: Accept,Accept-Version,Authorization,Content-Length,Content-MD5,Content-Type,Date,X-Api-Version,X-Stream-Request
Access-Control-Max-Age: 2592000
content-type: application/json
Date: Sun, 26 May 2024 06:23:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"_tag":"Error","error":{"httpStatus":404,"code":"NOT_FOUND"}}
```

:::
