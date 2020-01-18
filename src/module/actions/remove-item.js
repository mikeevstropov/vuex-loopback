import {ApiError} from '@src/errors/api-error';

export function removeItem({
  client,
  collection,
  onError,
  onSuccess,
}) {

  /**
   * REMOVE_ITEM
   *
   * @param {object} context
   * @param {string} id
   * @return {Promise<boolean|void>}
   */
  return async function (
    {state, commit},
    id,
  ) {

    commit('SET_LOADING', true);

    let response;

    try {

      response = await client.delete(
        `${collection}/${id}`,
      );

    } catch (error) {

      onError({
        error: ApiError.from(error),
        action: 'REMOVE_ITEM',
      });
    }

    if (
      response &&
      response.data.count !== 0
    ) {

      commit('REMOVE_ITEM', id);
      commit('RESET_LOADING');

      onSuccess({
        action: 'REMOVE_ITEM',
      });

      return true;

    } if (
      response &&
      response.data.count === 0
    ) {

      const error = new ApiError({
        message: `Unable to remove by "${id}" identifier.`,
        code: 'MODEL_NOT_FOUND',
        statusCode: 404,
      });

      onError({
        error,
        action: 'REMOVE_ITEM',
      });
    }

    commit('RESET_LOADING');
  };
}
