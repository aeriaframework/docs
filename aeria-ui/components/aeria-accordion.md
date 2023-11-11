# aeria-accordion

This will render a minimally styled accordion.

## Example

```vue-html
<h2>Frequently Asked Questions</h2>

<aeria-accordion
  enumerate
  :headers="{
    'question-1': 'Is Aeria a good framework?',
    'question-2': 'Is Aeria easy to learn?',
  }"
>
  <template #question-1>
    Yes. Aeria is a good framework.
  </template>

  <template #question-2>
    Absolutely. Learning Aeria couldn't be easier.
  </template>
</aeria-accordion>
```

## Props

**Type:**

```typescript
type Props = {
  enumerate?: boolean
  headers: Record<string, string | {
    title: string
    icon: string
  }>
}
```

### enumerate <Badge type="tip" text="boolean" />

Will render the accordion index position along it's title.
Example: "1. Help topics".

### headers <Badge type="tip" text="object" />

The title to be rendered in the accordion clickable sections, or an object containing both the title and an icon.


## Slots

### \<any\>

This slot contains the text of the accordion section. It's name should match one of the keys of the `headers` prop.
