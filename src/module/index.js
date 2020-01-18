import {createState} from './state';
import {createGetters} from './getters';
import {createActions} from './actions';
import {createMutations} from './mutations';

/**
 * Module factory.
 *
 * @param {object} model Entity model.
 * @param {string} collection Name of loopback collection.
 * @param {object} client Axios instance.
 * @param {object} state State extensions.
 * @param {object} getters Getters factory or an object.
 * @param {function|object} actions Actions factory or an object.
 * @param {function|object} mutations Mutations factory or an object.
 * @param {function} onError Error handler.
 * @param {function} onSuccess Success handler.
 * @return {{mutations: {}, state: {}, actions: {}}}
 */
export function createModule({
  model,
  client,
  collection,
  state,
  getters,
  actions,
  mutations,
  onError,
  onSuccess,
} = {}) {

  const mergedState = createState({
    extension: state,
  });

  const mergedGetters = createGetters({
    extension: getters,
  });

  const mergedMutations = createMutations({
    initialState: mergedState,
    extension: mutations,
  });

  const mergedActions = createActions({
    model,
    client,
    collection,
    extension: actions,
    onError,
    onSuccess,
  });

  return {
    state: mergedState,
    getters: mergedGetters,
    actions: mergedActions,
    mutations: mergedMutations,
  };
}
