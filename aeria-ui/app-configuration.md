# App configuration

Aeria has an all-in-one configuration object that will among other things define the root component, the [menu schema](/aeria-ui/menu-schema), initial routes and i18n settings. This object is passed to `useApp()` that will then render your application.

### `AppOptions`

```typescript
type AppOptions = {
  component: Component
  dashboardComponent?: Component
  i18n?: any
  menuSchema?: MenuSchema
  routes?: RouteRecordRaw[]
  setup?: () => void | Promise<void>
}
```

### `defineOptions()`

This is a helper function that will provide strong typing and callback support for defining app options. It receives the options as a literal object or by a callback that returns it.

**Example:**

```typescript
const options = defineOptions({
  routes,
  component,
  menuSchema: [
    // ...
  ]
})

useApp(options).then((app) => {
  app.mount()
})
```

## `InstanceConfig`

The instance config is defined inside a `instance.json` file in the same level the `package.json` of your frontend project is. The purpose of it being separate from overall configuration is because the configuration contained in it must be made available during build time.

```typescript
type InstanceConfig = {
  site: {
    title?: string
    signinText?: string
    signupForm?: boolean
  }
  icons?: {
    safeList?: string[]
    libraries?: string[]
  }
  vite?: import('vite').InlineConfig
}

```

### site.title <Badge type="tip" text="string?" />

The title of your application.

### site.signinText <Badge type="tip" text="string?" />

A text that will be put above the sign in form.

### site.signupForm <Badge type="tip" text="boolean?" />

This toggles the visibility of the button leading to the sign up form in the
sign in page.

::: warning WARNING
This is a client-side only flag. To make sign up available in your application,
you must also set up the backend properly.
:::

### icons.safeList <Badge type="tip" text="string[]?" />

This property should contain an array of icon names that for some reason can't be matched statically.

### icons.safeList <Badge type="tip" text="string[]?" />

This property specifies libraries to be included in during static search for icons.

### vite <Badge type="tip" text="import('vite').InlineConfig?" />

Vite configuration to be merged into the default one.

