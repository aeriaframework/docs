<script setup lang="ts">
import { ref } from 'vue'
import { AeriaButton } from 'aeria-ui'
import '@aeria-ui/ui/style.css'
import '../../src/style/main.less'

const count = ref(0)
</script>

# aeria-button

This component renders a styled button that will add style controls on top of [`aeria-bare-button`](/frontend/components/aeria-bare-button) functionalities. Buttons can have different sizes and variants and can also have loading and disabled states.

## Example

<div style="
  display: flex;
  gap: .6rem;
">
  <aeria-button @click="count++">
    Count: {{ count }}
  </aeria-button>

  <aeria-button variant="alt" @click="count = 0">
    Reset
  </aeria-button>
</div>

```vue-html
<aeria-button @click="count++">
  Count: {{ count }}
</aeria-button>

<aeria-button variant="alt" @click="count = 0">
  Reset
</aeria-button>
```

## Props

### disabled <Badge type="tip" text="boolean?" />

Whether or not clicking on the button is disabled.

### loading <Badge type="tip" text="boolean?" />

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

### icon <Badge type="tip" text="string?" /> 

The name of an icon from an icon library to be contained inside the button.

### small <Badge type="tip" text="boolean?" />

Shorthand property for `size: 'small'`.

### large <Badge type="tip" text="boolean?" /> 

Shorthand property for `size: 'large'`.

## Slots

#### default

Content to be displayed inside the button.

