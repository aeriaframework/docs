# Create a grid or a list of cards

Both grid and list layouts can be made using the `aeria-grid` and `aeria-card` components. To go from one to another we need only to adjust some props.

## How-to

1. Have a list of items with at least one picture amongst the properties. The card has most importantly a picture and a text section, and can have also badges and actions.

```vue
<script setup lang="ts">
const pizzas = [
  {
    title: 'Mozzarella',
    ingredients: 'Dough, mozzarella, herbs',
    picture: '/static/pizza1.jpg',
    available: true,
    premium: true
  },
    title: 'Pepperoni',
    picture: '/static/pizza2.jpg',
    ingredients: 'Dough, pepperoni, herbs',
    available: true
  }
]
</script>
```

2. Put the `aeria-grid` component inside your template. The cards should be rendered inside it's default slot and shouldn't have a parent element. In our example, pizzas may or may not be premium, and may or may not be available.

```vue-html
<w-grid>
  <w-card
    v-for="pizza in pizzas"
    :key="pizza.title"
    :inactive="!pizza.available"
  >
    <template #badge v-if="pizza.premium">
      <w-badge>Premium</w-badge>
    </template>

    <template #footer>
      <div class="tw-text-lg">{{ pizza.title }}</div>
      <div class="
        tw-text-[10pt]
        tw-opacity-80
        tw-mt-1
      ">
      {{ pizza.ingredients }}
      </div>
    </template>

    <template #actions>
      <w-icon
        v-clickable
        reactive
        icon="ellipsis-v"
      ></w-icon>
    </template>
  </w-card>
</w-grid>
```

3. To turn our grid into a list, simply add the `list` property to `aeria-grid`, and the `horizontal` prop to `aeria-card`. The structure may remains as it is above.

