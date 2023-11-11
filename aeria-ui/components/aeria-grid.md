# aeria-grid

This components returns a grid with standardized gaps and responsiveness breakpoints.

## Example

```vue-html
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
```

## Props

```typescript
type Props = {
  list?: boolean
}

```

### list <Badge type="tip" text="boolean" />

Turns the grid into a single column list.


## Slots

### default

The grid elements.

