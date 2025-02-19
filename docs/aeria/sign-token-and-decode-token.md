# Signing and decoding tokens

## `signToken()`

**Type**: `const signToken: async ({ iat, exp, ...payload }: Record<string, unknown>, secret?: string | null, options?: SignOptions) => string` 

Returns a JWT token given a payload. If no secret is specified, the secret configured in `config.secret` is used. If this option isn't set either, an error is thrown.

## `decodeToken()`

**Type**: `const decodeToken: async <TToken>(token: string, secret?: string) => TToken`

Returns a decoded object given a JWT token. If no secret is specified, the secret configured in `config.secret` is used. If this option isn't set either, an error is thrown.

