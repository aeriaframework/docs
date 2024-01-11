# Change collection layout from default tabular layout

1. Add the `layout` property to the description of your collection. You must pass the name of the layout and some options. The `grid` and `list` layouts behave the same and have the same options. This effect will take place everywhere `aeria-crud` is rendered, including runtime generated views.

```typescript
const description: Description = {
  // ...
  layout: {
    name: 'grid',
    options: {
      title: 'full_name',
      badge: 'roles',
      picture: 'picture',
      information: 'email',
      active: 'active',
      translateBadge: true
    }
  },
}
```

