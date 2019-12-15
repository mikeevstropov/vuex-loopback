#### Vuex module factory for Loopback 3
___

#### Install
```
yarn add axios vuex-loopback
```
or
```
npm install axios vuex-loopback
```

#### Create vuex module
```javascript
// Import axios and factory method.
import axios from 'axios';
import createModule from 'vuex-loopback';

// Create axios instance.
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
});

// Define collection name (as in loopback).
const categoryName = 'Categories';

// Define collection model.
const categoryModel = {
  id: '',
  name: '',
  description: '',
};

new Vuex.Store({
  modules: {
    // Define module name.
    categories: {
      // Will it be namespaced?
      namespaced: true,
      // Create module.
      ...createModule({
        client: instance,
        model: categoryModel,
        collection: categoryName,
      }),
    },
    // ...
  }
});
```

### Todo

[ ] Documentation
