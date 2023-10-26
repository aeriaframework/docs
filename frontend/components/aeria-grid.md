# aeria-grid

This components returns a grid with standardized gaps and responsiveness breakpoints.

## Example

```vue
<template>
  <aeria-grid>
    <aeria-card
      v-for="index in 12"
      :key="`card-${index}`"
    >
      <aeria-picture link="/static/card.svg"></aeria-picture>
      <template #footer>
        Card #{{ index }}
      </template>
    </aeria-card>

  </aeria-grid>
</template>
```

## Slots

### default

Elements to be put inside the grid.

