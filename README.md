![npm version](https://badge.fury.io/js/vuex-loopback.svg)
![license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)

<br/>
<br/>
<div align="center">
  <img alt="logo" src="assets/logo.png"/>
</div>
<br/>

## Installing

Install `axios` and `vuex-loopback`.
```
yarn add axios vuex-loopback
```
or via `npm`
```
npm install axios vuex-loopback
```

## Create Vuex module

#### 1. Import `axios` and module factory.

```javascript
import axios from 'axios';
import {createModule} from 'vuex-loopback';
```

#### 2. Create `axios` instance with `baseURL` option.

```javascript
const client = axios.create({
  baseURL: 'https://my-domain.com/api/',
});
```

#### 3. Define collection model with default fields.

```javascript
const model = {
  id: '',
  title: '',
  body: '',
}
```

#### 4. Create Vuex module by the module factory.

Before use built-in components `ItemsLoader` and `ItemEditor` you need to create the Vuex module of Loopback collection which you want to manage. For example we will create a named module `vlArticles` of `Articles` collection.

```javascript

new Vuex.Store({
  modules: {
    // ...
    vlArticles: {
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

*It's recommended to prefer `vl` prefix of a module name to mark module is created by `vuex-loopback`.*

## Vuex module usage

The following fields will contain data when you *get*, *create* or *update* a **single item**.

- `item: object = null` - Persisted item.
- `tempItem: object = null` - New or modified item.

And a state of a **multiple items**:

- `items: object[] = []` - Fetched items.

It's a general part of [module state](#state).

### Create item

In the [previous step](#4-create-vuex-module-by-the-module-factory) we provided the model with default fields to the module factory. An action `CREATE_TEMP_ITEM` will create a new item by this model automatically (only `tempItem` state, not in database).

```javascript
store.dispatch(
  'vlArticles/CREATE_TEMP_ITEM',
  {title: 'My Article'},
);
```

*The second argument is not required but you can patch data of new item.*

State of `tempItem` now is:

```json
{
  "id": "",
  "title": "My Article",
  "body": ""
}
```

By an action `PUT_TEMP_ITEM` the data of `tempItem` will be *created* or *updated* (if exists) in database.

```javascript
await store.dispatch(
  'vlArticles/PUT_TEMP_ITEM',
);
```

*During request a state of `loading` is `true`.*

State of `item` and `tempItem` now is:

```json
{
  "id": "5fd491fceea2be937cb838fc",
  "title": "My Article",
  "body": ""
}
```

After that, we have a new state of `item` which contains persisted data, but the `tempItem` has updated also (by a new `id` value). So if you will change the state of `tempItem` then you can check differences between persisted data `item` and modified `tempItem`, and discard changes by `SET_TEMP_ITEM` [mutation](#mutations) to a previous value from `item` state.

*Type of generated ID is depends to your database.*

### Fetch items

Create another one article.

```javascript
store.dispatch(
  'vlArticles/CREATE_TEMP_ITEM',
  {title: 'Second Article'}
);

await store.dispatch(
  'vlArticles/PUT_TEMP_ITEM'
);
```

Dispatch an action `FETCH_ITEMS` to get an array in `items` state.

```javascript
await store.dispatch(
  'vlArticles/FETCH_ITEMS',
);
```

*Use a second argument to provide fetching [options](#actions).*

State of `items` is:

```json
[
  {
    "id": "5fd491fceea2be937cb838fc",
    "title": "My Article",
    "body": ""
  },
  {
    "id": "5fd491fceea2be937cb838fb",
    "title": "Second Article",
    "body": ""
  }
]
```

The `FETCH_ITEMS` action will request an items by conditions defined in [the state](#state) which you can set by [mutations](#mutations).

### Fetch item by ID

An action `FETCH_ITEM` will update `item` and `tempItem` state by fetched data.

```javascript
await store.dispatch(
  'vlArticles/FETCH_ITEM',
  {id: '5fd491fceea2be937cb838fc'},
);
```

State of `item` and `tempItem` now is:

```json
{
  "id": "5fd491fceea2be937cb838fc",
  "title": "My Article",
  "body": ""
}
```

### Update item

Before update a database, we need to modify the data of `tempItem` which was fetched in the previous step.

```javascript
const {tempItem} = store
  .state
  .vlArticles;

store.commit('vlArticles/SET_TEMP_ITEM', {
  ...tempItem,
  body: 'Article body',
});
```

State of `tempItem` now has a new `body` value:

```json
{
  "id": "5fd491fceea2be937cb838fc",
  "title": "My Article",
  "body": "Article body"
}
```

Commit changes by `PUT_TEMP_ITEM` action.

```javascript
await store.dispatch(
  'vlArticles/PUT_TEMP_ITEM',
);
```

Now your database and `item` state has updated by modified `tempItem`.

### Remove item

An action `REMOVE_ITEM` will remove an item from database.

```javascript
await store.dispatch(
  'vlArticles/REMOVE_ITEM',
  '5fd491fceea2be937cb838fc',
);
```

*The item will be removed from the state automatically.*

## Load items by Vue Component
Built-in component `ItemsLoader` will help you to load collection items right in Vue template. A scope of default slot has some usefull methods and properties to create items list with *lazy-load* or *pagination* behaviours.

#### Props

- `module: string` - Name of Vuex module.
- `noAutoload: boolean` - Do not autoload items after mount.

#### Scope of default slot

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

### Basic example

#### 1. Import `ItemsLoader` from `vuex-loopback`.
```javascript
import {ItemsLoader} from 'vuex-loopback';
```

#### 2. Define local component.
```javascript
export default {
  // ...
  components: {
    ItemsLoader,
  },
  // ...
}
```

#### 3. Use it to load collection items.
```html
<!-- Loader -->
<items-loader
  module="vlArticles">

  <template
    slot-scope="{items, hasMore, loadMore}">
    
    <!-- Item -->
    <div
      :key="item.id"
      v-for="item in items">
      {{ item.title }}
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

## Manage an item by Vue Component
You are able to create, update or remove collection item by built-in component `ItemEditor`. Same as above `ItemEditor` has a scope of default slot which provides specific methods and properties.

#### Props

- `module: string` - Name of Vuex module.
- `extend: object` - Extend an item fields.

#### Scope of default slot

- `item: object` - Selected item.
- `loading: boolean` - Loading state.
- `edit(item: object)` - Select or create item if no argument specified.
- `set(item: object)` - Update selected or created item temporary.
- `save()` - Commit temporary changes applied by method `set`.
- `remove()` - Remove selected item from collection.

\* *All properties and methods of slot scope are accessible by component reference (`ref` attribute).*

### Basic example

#### 1. Import `ItemEditor` from `vuex-loopback`.
```javascript
import {ItemEditor} from 'vuex-loopback'; // new line
import {ItemsLoader} from 'vuex-loopback';
```

#### 2. Define local component.
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

#### 3. Use it to create editor form.

```html
<!-- Editor -->
<item-editor
  ref="editor"
  module="vlArticles">
  
  <template
    slot-scope="{item, set, save, remove}">

    <form
      @submit.prevent="save">
      
      <!-- Title Field -->
      <input
        :value="item.title"
        @input="set({...item, title: $event})"/>

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

#### 4. Update items loader template.
```html
<!-- Loader -->
<items-loader
  module="vlArticles">

  <template
    slot-scope="{items, hasMore, loadMore}">
    
    <!-- Item -->
    <div
      :key="item.id"
      v-for="item in items">
      {{ item.title }}
      
      <!-- Edit Button -->
      <button
        @click="() => $refs.editor.edit(item)">
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
      @click="() => $refs.editor.edit()">
      Create
    </button>
    
  </template>
  
</items-loader>
```

## Module structure

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
- `itemChanged: boolean` - State of `item` and `tempItem` is not the same.

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
  - `noPatch: boolean = false`
  - `reset: boolean = false`

- `SEARCH_ITEMS(payload)`  
  - `query: string = ''`
  - `searchBy: string[] = null`

- `FETCH_PAGE(payload)`  
  - `page: number = 1`

- `FETCH_MORE()`  

## Tests

#### 1. Clone `loopback-example-relations` and start web-server.
```
git clone https://github.com/strongloop/loopback-example-relations.git
cd loopback-example-relations
yarn
yarn start
```

#### 2. Clone `vuex-loopback` in a new terminal session and run the tests.
```
git clone https://github.com/mikeevstropov/vuex-loopback.git
cd vuex-loopback
yarn
yarn test
```

## Examples

Vue CLI project [vuex-loopback-example](https://github.com/mikeevstropov/vuex-loopback-example)

## Todo

* [x] State factory.
* [x] Mutations factory.
* [x] Actions factory.
* [x] Getters factory.
* [x] Loader component.
* [x] Editor component.
* [ ] Documentation.
* [x] Examples.
