## Installing

##### 1. Install `axios` and `vuex-loopback`.
```
yarn add axios vuex-loopback
```
or via `npm`
```
npm install axios vuex-loopback
```

##### 2. Import `axios` and module factory.

```javascript
import axios from 'axios';
import {createModule} from 'vuex-loopback';
```

##### 3. Create `axios` instance with `baseURL` option.

```javascript
const client = axios.create({
  baseURL: 'https://my-domain.com/api/',
});
```

## Create Vuex module
Before use built-in components `ItemsLoader` and `ItemEditor` you need to create Vuex modules for each Loopback collections that you want to manage. For example we will create named module `articles` for the `Articles` collection.

##### 1. Define collection model with default fields.

```javascript
const model = {
  id: '',
  name: '',
}
```

##### 2. Use module factory to create Vuex module.
```javascript

new Vuex.Store({
  modules: {
    // ...
    articles: {
      namespaced: true,
      ...createModule({
        client,                 // (required) Axios instance.
        model,                  // (required) Collection model.
        collection: 'Articles', // (required) Plural collection name.
        state: {},              // Extend default state.
        getters: {},            // Extend default getters.
        actions: {},            // Extend default actions.
        mutations: {},          // Extend default mutations.
      }),
    },
    // ...
  }
});
```

## Load items
Built-in component `ItemsLoader` will help you to load collection items right in Vue template. A scope of default slot has some usefull methods and properties to create items list with *lazy-load* or *pagination* behaviours.

##### Props

- `module: string` - Name of Vuex module.
- `noAutoload: boolean` - Do not autoload items after mount.

##### Scope properties

- `items: object[]` - Loaded items.
- `loading: boolean` - Loading state.
- `page: number` - Current page.
- `pages: number` - Total number of pages.
- `hasMore: boolean` - Can we load more?

##### Scope methods

- `load()` - To load items.
- `loadPage(page: number)` - To load specific page.
- `loadMore()` - To load more items.

\* *All properties and methods are accessible by reference of a component (`ref` attribute).*  
\* *Component will load items automatically in `mounted` hook.*

#### Basic example

##### 1. Import `ItemsLoader` from `vuex-loopback`.
```javascript
import {ItemsLoader} from 'vuex-loopback';
```

##### 2. Define local component.
```javascript
export default {
  // ...
  components: {
    ItemsLoader,
  },
  // ...
}
```

##### 3. Use it to load collection items.
```html
<!-- Loader -->
<items-loader
  module="articles">

  <template
    slot-scope="{items, hasMore, loadMore}">
    
    <!-- Item -->
    <div
      :key="item.id"
      v-for="item in items">
      {{ item.name }}
    </div>
    
    <!-- More Button -->
    <button
      v-if="hasMore"
      @click="loadMore">
      More
    </button>
    
  </template>
  
</items-loader>
```

## Manage an item
You are able to create, update or remove collection item by built-in component `ItemEditor`. Same as above `ItemEditor` has a scope of default slot which provides specific methods and properties.

##### Props

- `module: string` - Name of Vuex module.

##### Scope properties

- `item: object` - Selected item.
- `loading: boolean` - Loading state.

##### Scope methods

- `edit(item: object)` - To select or create item if no argument specified.
- `set(item: object)` - To update selected or created item temporary.
- `save()` - To commit temporary changes applied by `set` method.
- `remove()` - To remove selected item from collection.

\* *All properties and methods are accessible by reference of a component (`ref` attribute).*

#### Basic example

##### 1. Import `ItemEditor` from `vuex-loopback`.
```javascript
import {ItemEditor} from 'vuex-loopback'; // new line
import {ItemsLoader} from 'vuex-loopback';
```

##### 2. Define local component.
```javascript
export default {
  // ...
  components: {
    ItemEditor, // new line
    ItemsLoader,
  },
  // ...
}
```

##### 3. Use it to create editor form.

```html
<!-- Editor -->
<item-editor
  ref="editor"
  module="articles">
  
  <template
    slot-scope="{item, set, save, remove}">

    <form
      @submit.prevent="save">
      
      <!-- Name Field -->
      <input
        :value="item.name"
        @input="set({...item, name: $event})"/>

      <!-- Save Button -->
      <button
        type="submit">
        Save
      </button>

      <!-- Remove Button -->
      <button
        v-if="item.id"
        @click="remove">
        Remove
      </button>
  
    </form>
  
  </template>

</item-editor>
```

##### 4. Update items loader template.
```html
<!-- Loader -->
<items-loader
  module="articles">

  <template
    slot-scope="{items, hasMore, loadMore}">
    
    <!-- Item -->
    <div
      :key="item.id"
      v-for="item in items">
      {{ item.name }}
      
      <!-- Edit Button -->
      <button
        @click="() => $refs.editor.show(item)">
        Edit
      </button>
      
    </div>
    
    <!-- More Button -->
    <button
      v-if="hasMore"
      @click="loadMore">
      More
    </button>
    
    <!-- Create Button -->
    <button
      @click="() => $refs.editor.show()">
      Create
    </button>
    
  </template>
  
</items-loader>
```

## Advanced usage

You may want to use Vuex module directly.  
Let's see what it has.

#### State

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

#### Getters

- `page` - Number of current page.
- `totalPages` - Number of total pages.
- `hasMore` - Can we load more? (lazy loading)

#### Mutations

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

#### Actions:

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

## Todo

* [x] State factory.
* [x] Mutations factory.
* [x] Actions factory.
* [x] Getters factory.
* [ ] Documentation.
