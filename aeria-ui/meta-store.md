# Meta store

The meta store is invoked as any other. It contains application-wide state such as collections metadata and can be used to spawn modals, prompts, toasts, among other actions.

```typescript
const metaStore = useStore('meta')
```

## `metaStore.$actions.spawnToast()`

Spawns a toast. Toasts are smaller modals that appear on the corner of the screen and disappear when clicked upon.

```typescript
if( error ) {
  return metaStore.$actions.spawnToast({
    text: t(error.message),
    icon: 'warning',
  })
}
```

## `metaStore.$actions.spawnModal()`

Spawns a floating panel on the center of the screen.

```typescript
if( error ) {
  metaStore.$actions.spawnModal({
    title: t('error'),
    body: t(error.message),
  })
}
```

## `metaStore.$actions.spawnPrompt()`

Spawns a modal with clickable options. The return is a promise that resolves as soon as one of the actions is clicked.

```typescript
const metaStore = useStore('meta')
const answer = metaStore.$actions.spawnPrompt({
  options: {
    no: {
      title: t('no'),
    },
    yes: {
      title: t('yes'),
    },
  },
})

if( answer.name === 'yes' ) {
  //
}
```

