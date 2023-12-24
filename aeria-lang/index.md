# Aeria Lang Reference

## Introduction

Aeria Lang is a declarative programming language that contains web backend primitives and outputs to TypeScript or JavaScript with optional esbuild bundling. It was greatly inspired by Prisma in its early stages of development but it aims in rapid prototyping rather than model declaration only.

The language itself is made using PureScript, a strongly typed functional language that ensures maximum correctness, and most of its tooling is made using TypeScript.

## Quick example

```
collection Person {
  name str
  age int
}
```

## Declarations

### collection

```
collection Person {
  name str
  age int
}
```

#### Builtin types

- str: represents a string
- int: represents a integer
- num: represents a number
- bool: represents a boolean

### router

There are two kinds of router declarations, named routers and the main router. Named routers are subrouters that will be grouped inside a route while the main router is the router that put all routes together. There can be several named routes but only one main router.

Router columns are made of:

- **verb**: a standard HTTP verb
- **uri**: a URI or regular expression starting with /

```
router {
  GET /hello-world
}
```
