# aeria-button

## Introduction

This component renders a styled button that will add style controls on top of [`aeria-bare-button`](/frontend/components/aeria-bare-button) functionalities. Buttons can have different sizes and variants and can also have loading and disabled states.

## Example

```vue
<script setup lang="ts">
const userStore = useStore('user')
</script>

<template>
  <aeria-button
    :loading="userStore.loading.getAll"
    @click="userStore.$actions.getAll"
  >
    Click here
  </aeria-button>
</template>
```

## Props

### disabled <Badge type="tip" text="boolean" /> <Badge type="tip" text="optional" />

Whether or not clicking on the button is disabled.

### loading <Badge type="tip" text="boolean" /> <Badge type="tip" text="optional" />

Whether or not the button has a loading state.

### variant <Badge type="tip" text="Size" /> <Badge type="tip" text="default: 'normal'" />

The variant of button styling.
Accepted variants are:

```typescript
type Variant =
  | 'primary'
  | 'alt'
  | 'transparent'
```

### size <Badge type="tip" text="Size" /> <Badge type="tip" text="default: 'medium'" />

The size the button should have.
Accepted sizes are:

```typescript
type Size = 
  | 'small'
  | 'medium'
  | 'large'
```

### icon <Badge type="tip" text="string" /> <Badge type="tip" text="optional" />

The name of an icon from an icon library to be contained inside the button.

### small <Badge type="tip" text="boolean" /> <Badge type="tip" text="optional" />

Shorthand property for `size: 'small'`.

### large <Badge type="tip" text="boolean" /> <Badge type="tip" text="optional" />

Shorthand property for `size: 'large'`.

## Slots

#### default

Content to be displayed inside the button.
