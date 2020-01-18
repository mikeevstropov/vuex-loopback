import cloneDeep from 'lodash/cloneDeep';
import {ApiError} from '@src/errors/api-error';

export function createItem({
  client,
  collection,
  onError,
  onSuccess,
}) {

  /**
   * CREATE_ITEM
   *
   * @param {object} context
   * @param {object} payload
   * @return {Promise<object|void>}
   */
  return async (
    {state, commit},
    {data, filter = {}} = {},
  ) => {

    commit('SET_LOADING', true);

    const item = cloneDeep(data);
    delete item.id;

    const query = JSON.stringify({
      include: state.include,
      fields: state.fields,
      ...filter,
    });

    let response;

    try {

      response = await client.post(
        collection,
        item,
      );

      response = await client.get(
        `${collection}/${response.data.id}?filter=${query}`,
      );

    } catch (error) {

      onError({
        error: ApiError.from(error),
        action: 'CREATE_ITEM',
      });
    }

    if (response) {

      const {data: added} = response;

      commit('SET_ITEMS', [added, ...state.items]);
      commit('RESET_LOADING');

      onSuccess({
        action: 'CREATE_ITEM',
      });

      return added;
    }

    commit('RESET_LOADING');
  };
}
