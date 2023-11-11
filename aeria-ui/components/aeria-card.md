# aeria-card

This component renders a picture frame with a text slot below it.

## Example

```vue-html
<aeria-card>
  <aeria-picture
    expandable
    link="/static/dog.svg"
  ></aeria-picture>

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

### inactive <Badge type="tip" text="boolean" />

If set to true, the card will become slightly transparent.

### horizontal <Badge type="tip" text="boolean" />

If set to true, the card will have a horizontal layout.

## Slots

### default

The picture to be fit inside the card.

### footer

The card information that goes below the picture.

### badge

Badges to be put on the card.

### actions

Button or clickable icons.
