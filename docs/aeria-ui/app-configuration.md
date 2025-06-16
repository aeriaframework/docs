# App configuration

Aeria has an all-in-one configuration object that will among other things define the root component, the [menu schema](/aeria-ui/menu-schema), initial routes and i18n settings. This object is passed to `useApp()` that will then render your application.

### `AppOptions`

```ts
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

```ts
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


## MenuSchema

The navigation menu in Aeria UI is generated from a `MenuSchema` object that
goes in app options. In it's most basic form, the menu schema is an array of
strings matching route names. For example:

```ts
const menuSchema: MenuSchema = [
  '/dashboard/person',
  '/dashboard/user',
]
```

Menu entries however can become more complex as needed. They can be collapsed,
have children entries, and have a callback to display a custom badge near it.
Below is a menu schema making using of all these features:

```ts
const menuSchema: MenuSchema = [
  {
    collapsed: false,
    meta: {
      title: 'Config',
      icon: 'cog'
    },
    badge: async () => {
      return businessLogic()
    },
    children: [
      '/dashboard/user',
      '/dashboard/log',
    ]
  }
]
```

### `node.name` <Badge type="tip" text="(string | Symbol)?" />

A string or symbol representing a route name.

### `node.roles` <Badge type="tip" text="(Array<string> | ((role: Array<string>) => boolean | Promise<boolean>))?" />

Will make this menu entry visible only to roles specified by an array of
strings, or by a custom callback.

### `node.badge` <Badge type="tip" text="(() => Promise<string | number>)?" />

This property specifies a callback whose result will be rendered inside a badge near the menu entry.

::: tip NOTE
The execution of this callback will be memoized, meaning it won't run more than
once on subsequent re-renderizations.
:::

### `node.collapsed` <Badge type="tip" text="(boolean | 'user')?" />

If set to `node.true`, this property will determine that the collapsible entry
should be initially collapsed on page load. Otherwise it will appear
uncollapsed.

### `node.children` <Badge type="tip" text="Array<string | MenuAdvancedChild>?" />

This property determines the route entries that will go inside the collapsible
entry. Collapsible routes can recurse infinitely inside each other this way.

### `node.meta` <Badge type="tip" text="object?" />

This property determines the `node.title` and `icon` that should be displayed by the
entry on the menu.


## `InstanceConfig`

The instance config is defined inside a `instance.json` file in the same level the `package.json` of your frontend project is. The purpose of it being separate from overall configuration is because the configuration contained in it must be made available during build time.

```ts
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

### `site.title` <Badge type="tip" text="string?" />

The title of your application.

### `site.signinText` <Badge type="tip" text="string?" />

A text that will be put above the sign in form.

### `site.signupForm` <Badge type="tip" text="boolean?" />

This toggles the visibility of the button leading to the sign up form in the
sign in page.

::: warning WARNING
This is a client-side only flag. To make sign up available in your application,
you must also set up the backend properly.
:::

### `icons.safeList` <Badge type="tip" text="string[]?" />

This property should contain an array of icon names that for some reason can't be matched statically.

### `icons.safeList` <Badge type="tip" text="string[]?" />

This property specifies libraries to be included in during static search for icons.

### `vite` <Badge type="tip" text="import('vite').InlineConfig?" />

Vite configuration to be merged into the default one.

