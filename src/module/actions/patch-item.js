import cloneDeep from 'lodash/cloneDeep';
import {ApiError} from '@src/errors/api-error';

export function patchItem({
  client,
  collection,
  onError,
  onSuccess,
}) {

  /**
   * PATCH_ITEM
   *
   * @param {object} context
   * @param {object} payload
   * @return {Promise<object|void>}
   */
  return async function (
    {state, commit},
    {id, data, filter = {}} = {},
  ) {

    commit('SET_LOADING', true);

    const part = cloneDeep(data);
    delete part.id;

    const query = JSON.stringify({
      include: state.include,
      fields: state.fields,
      ...filter,
    });

    let response;

    try {

      await client.patch(
        `${collection}/${id}`,
        part,
      );

      response = await client.get(
        `${collection}/${id}?filter=${query}`,
      );

    } catch (error) {

      onError({
        error: ApiError.from(error),
        action: 'PATCH_ITEM',
      });
    }

    if (response) {

      const {data: patched} = response;

      commit('UPDATE_ITEM', patched);
      commit('RESET_LOADING');

      onSuccess({
        action: 'PATCH_ITEM',
      });

      return patched;
    }

    commit('RESET_LOADING');
  };
}
