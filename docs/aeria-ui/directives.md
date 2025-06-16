# Directives

## `v-clickable`

- **Expects:** none
- **Details**
    This directive adds the CSS property `cursor: pointer` according to the screen size. On screens smaller than `600px` this property won't be added because in mobile devices it adds an undesired colored highlight to the element.

- **Example**
    ```vue-html
    <aeria-icon
      v-clickable
      reactive
      icon="home"
      @click="goHome"
    ></aeria-icon>
    ```

## `v-focus`

- **Expects:** `boolean`
- **Details**
    This directive focus (places the cursor inside) the target element as soon as it is mounted, only if the passed state is `true`.

- **Example**
    ```vue-html
    <aeria-input
      v-focus
      v-model="value"
    ></aeria-icon>
    ```

## `v-loading`

- **Expects:** `boolean`
- **Details**
  This directive is used to cast a loading effect on your component whenever the passed state is `true`.

- **Example**
  ```vue-html
  <aeria-table v-loading="petStore.loading.getAll">
    <template #thead>
      <tr>
        <th>Name</th>
        <th>Specie</th>
      </tr>
    </template>
    <template #tbody>
      <tr
        v-for="pet in petStore.items"
        :key="pet._id"
      >
        <td>{{ pet.name }}</td>
        <td>{{ pet.specie }}</td>
      </tr>
    </template>
  </aeria-table>
  ```

## `v-overlay`

- **Expects:** `OverlayOptions`
- **Details**
  This directive places a clickable overlay just behing the target element. The click callback, along with the z-index of the overlay can be passed as parameters to the directive.

- **Type**
  ```ts
    type OverlayOptions = {
    condition: boolean
    layer?: number
    click?: (...args: any[]) => any
  }
  ```

- **Example**
  ```vue-html
  <div
    v-overlay="{
      condition: true,
      click: () => {
        closeModal()
      }
    }"
    class="modal"
  >
  </div>
  ```

