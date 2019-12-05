import {ApiError} from '../api-error';

export default function ({
  client,
  collection,
  onError,
  onSuccess,
}) {

  /**
   * FETCH_ITEM
   *
   * @param {object} context
   * @param {object} payload
   * @return {Promise<object|void>}
   */
  return async function (
    {state, commit},
    {id, filter = {}, noTempItem = false} = {},
  ) {

    commit('SET_LOADING', true);

    const query = JSON.stringify({
      include: state.include,
      fields: state.fields,
      ...filter,
    });

    let response;

    try {

      response = await client.get(
        `${collection}/${id}?filter=${query}`,
      );

    } catch (error) {

      onError({
        error: ApiError.from(error),
        action: 'FETCH_ITEM',
      });
    }

    if (response) {

      const {data} = response;

      if (!noTempItem)
        commit('SET_TEMP_ITEM', data);

      commit('SET_ITEM', data);
      commit('RESET_LOADING');

      onSuccess({
        action: 'FETCH_ITEM',
      });

      return data;
    }

    commit('RESET_LOADING');
  };
}
