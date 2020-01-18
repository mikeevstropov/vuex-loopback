import {fetchMore} from './fetch-more';
import {fetchPage} from './fetch-page';
import {patchItem} from './patch-item';
import {fetchItem} from './fetch-item';
import {removeItem} from './remove-item';
import {createItem} from './create-item';
import {fetchItems} from './fetch-items';
import {searchItems} from './search-items';
import {putTempItem} from './put-temp-item';
import {createTempItem} from './create-temp-item';

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
    FETCH_ITEM: fetchItem(options),
    FETCH_ITEMS: fetchItems(options),
    CREATE_ITEM: createItem(options),
    PATCH_ITEM: patchItem(options),
    REMOVE_ITEM: removeItem(options),
    CREATE_TEMP_ITEM: createTempItem(options),
    PUT_TEMP_ITEM: putTempItem(options),
    SEARCH_ITEMS: searchItems(options),
    FETCH_PAGE: fetchPage(options),
    FETCH_MORE: fetchMore(options),

    // Extension.

    ...extension,
  };
}
