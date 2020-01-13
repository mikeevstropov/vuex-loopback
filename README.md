### Vuex module factory for Loopback 3
___

#### 1. Install
```
yarn add axios vuex-loopback
```
or
```
npm install axios vuex-loopback
```

#### 2. Create vuex module
```javascript

new Vuex.Store({
  modules: {
    // ...
    articles: {
      namespaced: true,
      ...createModule({
        client: axios,             // (required) Axios instance.
        model: {id: '', name: ''}, // (required) Collection model.
        collection: 'Articles',    // (required) Collection name.
        state: {},                 // Extend default state.
        getters: {},               // Extend default getters.
        actions: {},               // Extend default actions.
        mutations: {},             // Extend default mutations.
      }),
    },
    // ...
  }
});
```

So now the Vuex Module `articles` has:

### State

- item - `null`
- tempItem - `null`
- items - `[]`
- skip - `0`
- limit - `20`
- total - `0`
- orderBy - `''`
- orderDesc - `false`
- searchBy - `['name']`
- searchQuery - `''`
- where - `{}`
- loading - `false`
- include - `[]`
- fields - `[]`

### Getters

- `page` - Number of current page.
- `totalPages` - Number of total pages.
- `hasMore` - Can I load more? (lazy loading)

### Mutations

- RESET
- SET_ITEM (`value`)
- RESET_ITEM
- SET_TEMP_ITEM (`value`)
- RESET_TEMP_ITEM
- SET_ITEMS (`value`)
- RESET_ITEMS
- SET_SKIP (`value`)
- RESET_SKIP
- SET_LIMIT (`value`)
- RESET_LIMIT
- SET_TOTAL (`value`)
- RESET_TOTAL
- SET_ORDER_BY (`value`)
- RESET_ORDER_BY
- SET_ORDER_DESC (`value`)
- RESET_ORDER_DESC
- SET_SEARCH_BY (`value`)
- RESET_SEARCH_BY
- SET_SEARCH_QUERY (`value`)
- RESET_SEARCH_QUERY
- SET_WHERE (`value`)
- RESET_WHERE
- SET_LOADING (`value`)
- RESET_LOADING
- SET_INCLUDE (`value`)
- RESET_INCLUDE
- SET_FIELDS (`value`)
- RESET_FIELDS
- UPDATE_ITEM (`item`)
- REMOVE_ITEM (`id`)

### Actions:

- FETCH_ITEM (`{id, filter = {}, noTempItem = false}`)  
affect:
  - `loading`
  - `item`
  - `tempItem`

- FETCH_ITEMS (`{filter = {}, noGlobals = false, append = false}`)  
affect:
  - `loading`
  - `items`
  - `total`

- CREATE_ITEM (`{data, filter = {}}`)  
affect:
  - `loading`
  - `items`

- PATCH_ITEM (`{id, data, filter = {}}`)  
affect:
  - `loading`
  - `item`
  - `items`

- REMOVE_ITEM (`id`)  
affect:
  - `loading`
  - `item`
  - `items`

- CREATE_TEMP_ITEM (`{model}`)  
affect:
  - `tempItem`

- PUT_TEMP_ITEM (`{filter = {}, existed = false, reset = false}`)  
affect:
  - `loading`
  - `item`
  - `items`
  - `tempItem`

- SEARCH_ITEMS (`{query = '', searchBy = null}`)  
affect:
  - `loading`
  - `item`
  - `items`
  - `total`

- FETCH_PAGE (`{page = 1}`)  
affect:
  - `loading`
  - `items`
  - `total`
  
- FETCH_MORE  
affect:
  - `loading`
  - `items`

### Todo

* [x] State factory.
* [x] Mutations factory.
* [x] Actions factory.
* [x] Getters factory.
* [ ] Documentation.
