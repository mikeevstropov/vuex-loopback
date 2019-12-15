### Vuex module factory for Loopback 3
___

### Install
```
yarn add axios vuex-loopback
```
or
```
npm install axios vuex-loopback
```

### Create vuex module
```javascript
// Import axios and factory method.
import axios from 'axios';
import createModule from 'vuex-loopback';

// Create axios instance.
const client = axios.create({
  baseURL: 'https://some-domain.com/api/',
});

// Define collection name (as in loopback).
const articleName = 'Articles';

// Define collection model.
const articleModel = {
  id: '',
  name: '',
  body: '',
  categoryId: '',
};

// Define collection include to
// resolve relations automatically.
const articleInclude = [
  'category',
];

new Vuex.Store({
  modules: {
    // Define module name.
    articles: {
      // Will it be namespaced?
      namespaced: true,
      // Create module.
      ...createModule({
        client: client,
        model: articleModel,
        collection: articleName,
        state: {
          // Extend default state.
          include: articleInclude,
        },
      }),
    },
    // ...
  }
});
```

### Todo

* [x] State factory.
* [x] Mutations factory.
* [x] Actions factory.
* [x] Getters factory.
* [ ] Usage documentation.
