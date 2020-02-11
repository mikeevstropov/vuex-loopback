![npm version](https://badge.fury.io/js/vuex-loopback.svg)
![license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)

<br/>
<br/>
<div align="center">
  <img alt="logo" src="assets/logo.png"/>
</div>
<br/>

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

##### Scope of default slot

- `items: object[]` - Loaded items.
- `loading: boolean` - Loading state.
- `page: number` - Current page.
- `pages: number` - Total number of pages.
- `hasMore: boolean` - Can we load more?
- `load()` - Load items.
- `loadPage(page: number)` - Load specific page.
- `loadMore()` - Load more items.

\* *Component will load items automatically if prop `noAutoload` has not specified.*  
\* *All properties and methods of slot scope are accessible by component reference (`ref` attribute).*

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
- `extend: object` - Extend an item fields.

##### Scope of default slot

- `item: object` - Selected item.
- `loading: boolean` - Loading state.
- `edit(item: object)` - Select or create item if no argument specified.
- `set(item: object)` - Update selected or created item temporary.
- `save()` - Commit temporary changes applied by method `set`.
- `remove()` - Remove selected item from collection.

\* *All properties and methods of slot scope are accessible by component reference (`ref` attribute).*

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

- `item: object = null` - Loaded item.
- `tempItem: object = null` - Clone of `item`.
- `items: object[] = []` - Loaded items.
- `skip: number = 0` - Items offset.
- `limit: number = 20` - Items limit.
- `total: number = 0` - Total items.
- `orderBy: string = ''` - Sort by field.
- `orderDesc: boolean = ''` - Sort descending.
- `searchBy: string[] = ['name']` - Search by fields.
- `searchQuery: string = ''` - Searching query.
- `where: object = {}` - Fetching condition.
- `loading: boolean = false` - Loading state.
- `include: string[] = []` - Fetching relations.
- `fields: string[] = []` - Fetching fields.

#### Getters

- `page: number` - Number of current page.
- `totalPages: number` - Number of total pages.
- `hasMore: boolean` - Can we load more? (lazy loading)

#### Mutations

- `RESET`
- `SET_ITEM(value: object)`
- `RESET_ITEM`
- `SET_TEMP_ITEM(value: object)`
- `RESET_TEMP_ITEM`
- `SET_ITEMS(value: object[])`
- `RESET_ITEMS`
- `SET_SKIP(value: number)`
- `RESET_SKIP`
- `SET_LIMIT(value: number)`
- `RESET_LIMIT`
- `SET_TOTAL(value: number)`
- `RESET_TOTAL`
- `SET_ORDER_BY(value: string)`
- `RESET_ORDER_BY`
- `SET_ORDER_DESC(value: boolean)`
- `RESET_ORDER_DESC`
- `SET_SEARCH_BY(value: string[])`
- `RESET_SEARCH_BY`
- `SET_SEARCH_QUERY(value: string)`
- `RESET_SEARCH_QUERY`
- `SET_WHERE(value: object)`
- `RESET_WHERE`
- `SET_LOADING(value: boolean)`
- `RESET_LOADING`
- `SET_INCLUDE(value: string[])`
- `RESET_INCLUDE`
- `SET_FIELDS(value: string[])`
- `RESET_FIELDS`
- `UPDATE_ITEM(item: object)`
- `REMOVE_ITEM(id: number|string)`

#### Actions:

- `FETCH_ITEM(payload)`
  - `id: number|string`
  - `filter: object = {}`
  - `noTempItem: boolean = false`

- `FETCH_ITEMS(payload)`  
  - `filter: object = {}`
  - `noGlobals: boolean = false`
  - `append: boolean = false`

- `CREATE_ITEM(payload)`  
  - `data: object`
  - `filter: object = {}`

- `PATCH_ITEM(payload)`  
  - `id: number|string`
  - `data: object`
  - `filter: object = {}`

- `REMOVE_ITEM(id: number|string)`  

- `CREATE_TEMP_ITEM(item: object = null)`

- `PUT_TEMP_ITEM(payload)`  
  - `filter: object = {}`
  - `create: boolean = false`
  - `reset: boolean = false`

- `SEARCH_ITEMS(payload)`  
  - `query: string = ''`
  - `searchBy: string[] = null`

- `FETCH_PAGE(payload)`  
  - `page: number = 1`

- `FETCH_MORE()`  

## Todo

* [x] State factory.
* [x] Mutations factory.
* [x] Actions factory.
* [x] Getters factory.
* [x] Loader component.
* [x] Editor component. 
* [ ] Documentation.
* [ ] Examples.
