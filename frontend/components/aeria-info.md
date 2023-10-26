# aeria-info

This component will render the content of the `text` slot inside a floating baloon when the mouse pointer is hovering the `default` slot.

## Example

```vue
<template>
  <aeria-info>
    <template #text>
      This text will show when you hover
    </template>

    <div>Hover to see more info</div>
  </aeria-info>
</template>
```

## Slots

### default

This slot must contain a single relatively positioned element. It can be anything.

### text

The content of this slot will be shown when user pointer is over the `default` slot.


