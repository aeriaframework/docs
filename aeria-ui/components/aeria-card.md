<!-- <script setup lang="ts"> -->
<!-- import { ref } from 'vue' -->
<!-- import { AeriaCard, AeriaPicture, AeriaBadge, AeriaButton } from 'aeria-ui' -->
<!-- </script> -->

# aeria-card

This component renders a frame with a picture and some text near it and it's commonly used along with [grids](/aeria-ui/cheatsheet/create-a-list-or-a-grid-of-cards). Cards can be either vertical or horizontal, and they can have a inactive state. Predefined slots are also available to place badges and buttons.

## Example

<!-- <aeria-card style="max-width: 20rem;"> -->
<!--   <aeria-picture alt="Aeria Logo"></aeria-picture> -->

<!--   <template #badge> -->
<!--     <aeria-badge> -->
<!--       good-boy -->
<!--     </aeria-badge> -->
<!--   </template> -->

<!--   <template #actions> -->
<!--     <aeria-button small> -->
<!--       Adopt -->
<!--     </aeria-button> -->
<!--   </template> -->

<!--   <template #footer> -->
<!--     This is a dog -->
<!--   </template> -->
<!-- </aeria-card> -->

```vue-html
<aeria-card style="max-width: 20rem;">
  <aeria-picture
    url="/assets/logo.png"
    alt="Aeria Logo"
  ></aeria-picture>

  <template #badge>
    <aeria-badge>
      good-boy
    </aeria-badge>
  </template>

  <template #actions>
    <aeria-button small>
      Adopt
    </aeria-button>
  </template>

  <template #footer>
    This is a dog
  </template>
</aeria-card>
```

## Props

**Type:**

```typescript
type Props = {
  inactive?: boolean
  horizontal?: boolean
}
```

### inactive <Badge type="tip" text="boolean?" />

If set to true, the card will become slightly transparent. This can be used to
indicate the content of this card is unavailable.

### horizontal <Badge type="tip" text="boolean?" />

If set to true, the card will switch to a horizontal layout.

## Slots

### default

The picture to be fit inside the card.

### footer

The card information that goes below the picture.

### badge

Badges to be put on the card.

### actions

Button or clickable icons.
