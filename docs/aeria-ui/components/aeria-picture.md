<script setup lang="ts">
import { ref } from 'vue'
import { AeriaPicture } from 'aeria-ui'
import ResultBox from '../../src/components/result-box.vue'
</script>

# aeria-picture

This component provides a basic wrapper with basic styling and utilities for displaying images.

### Example

<result-box>
  <aeria-picture
    width="12rem"
    height="12rem"
    url="/assets/logo.png"
    alt="Aeria Logo"
  ></aeria-picture>
</result-box>

```vue
<aeria-picture
  width="12rem"
  height="12rem"
  url="/assets/logo.png"
  alt="Aeria Logo"
></aeria-picture>
```

### Props

- `url` <Badge type="tip" text="string?" />: The absolute or relative URL of the image (the same as `modelValue`).
- `alt` <Badge type="tip" text="string" />: Alternative text to display when image can't be displayed.
- `bordered` <Badge type="tip" text="boolean?" />: Put the default border around the picture.
- `objectFit` <Badge type="tip" text="boolean?" />: Sets the CSS `object-fit` property of the image.
- `width` <Badge type="tip" text="boolean?" />: Image width, as in CSS.
- `height` <Badge type="tip" text="boolean?" />: Image height, as in CSS.
- `expandable` <Badge type="tip" text="boolean?" />: This property will make the picture expand upon clicked showing it's metadata when available.
- `meta` <Badge type="tip" text="object?" />: The metadata of the image.


### Slots

- `default`: A fallback to be rendered in case the image is absent.
- `caption`: Put a caption text beneath the image.

