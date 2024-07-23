# Template functions

## Computed variables

### `currentUser`

An object containg data from the current signed in user. The same as `useStore('user').$currentUser`.

## Functions

### `t()`
>Imported from "aeria-ui"

This is the i18n "t" function used to translate text.

```vue-html
<div>
  <div>{{ t`Hello, world!` }}</div>
  <div>{{ t('user', { plural: true }) }}</div>
</div>
```

### `formatDateTime()`
> Imported from "@aeriajs/common"

Formats a Date object or a JSON-serialized date to current locale string.

```vue-html
<div>
  The current time is:
  <div>{{ formatDateTime(new Date, { hours: true }) }}</div>
</div>
```

### `getRelativeTimeFromNow()`
> Imported from "@aeriajs/common"

Gets a string contaning relative time from `Date.now`. Example output: "20 minutes ago", "2 days ago", "1 month ago", etc.

```vue-html
<div>
  User was created:
  <div>{{ getRelativeTimeFromNow(currentUser.created_at) }}</div>
</div>
```

### `hasRoles()`

Returns whether or not current user has given role.

```vue-html
<div>
  <aeria-button v-if="hasRoles(['admin', 'moderator'])">
    Edit content
  </aeria-button>
  <aeria-button v-if="hasRoles('admin')">
    Remove content
  </aeria-button>
</div>
```

