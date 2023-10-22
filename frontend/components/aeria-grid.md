# aeria-grid

Used to create a grid with standardized gap and responsiveness breakpoints.

## Slots

- default (required): the contents of the grid.

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
