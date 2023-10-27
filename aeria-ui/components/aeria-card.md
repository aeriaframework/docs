# aeria-card

This component renders a picture frame with a text slot below it.

## Example

```vue
<template>
  <aeria-card>
    <aeria-picture
      expandable
      link="/static/dog.svg"
    ></aeria-picture>

    <template #footer>
      This is a dog
    </template>
  </aeria-card>
</template>
```

## Slots

### default

The picture to be fit inside the card.

### footer

The card information that goes below the picture.
