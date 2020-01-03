import fetchPageAction from './fetch-page';
import patchItemAction from './patch-item';
import fetchItemAction from './fetch-item';
import removeItemAction from './remove-item';
import createItemAction from './create-item';
import fetchItemsAction from './fetch-items';
import searchItemsAction from './search-items';
import putTempItemAction from './put-temp-item';
import createTempItemAction from './create-temp-item';

/**
 *
 * @param model
 * @param client
 * @param collection
 * @param extension
 * @param onError
 * @param onSuccess
 * @return {object}
 */
export function createActions({
  model,
  client,
  collection,
  extension = {},
  onError,
  onSuccess,
} = {}) {

  // Create extension.

  extension = typeof extension === 'function'
    ? extension(...arguments)
    : extension;

  extension = typeof extension === 'object'
    ? extension
    : {};

  // Event mocking.

  onError = typeof onError === 'function'
    ? onError
    : () => {};

  onSuccess = typeof onSuccess === 'function'
    ? onSuccess
    : () => {};

  // Options.

  const options = {
    model,
    client,
    collection,
    onError,
    onSuccess,
  };

  // Return actions.

  return {
    FETCH_ITEM: fetchItemAction(options),
    FETCH_ITEMS: fetchItemsAction(options),
    CREATE_ITEM: createItemAction(options),
    PATCH_ITEM: patchItemAction(options),
    REMOVE_ITEM: removeItemAction(options),
    CREATE_TEMP_ITEM: createTempItemAction(options),
    PUT_TEMP_ITEM: putTempItemAction(options),
    SEARCH_ITEMS: searchItemsAction(options),
    FETCH_PAGE: fetchPageAction(options),

    // Extension.

    ...extension,
  };
}
