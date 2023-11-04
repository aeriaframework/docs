# v-clickable

This directive adds the CSS property `cursor: pointer` according to the screen size. On screens smaller than `600px` this property won't be added because in mobile devices it adds an undesired colored highlight to the element.

## Usage

```vue
<template>
  <aeria-icon
    v-clickable
    reactive
    icon="home"
    @click="goHome"
  ></aeria-icon>
</template>
```
