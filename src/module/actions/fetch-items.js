import _ from 'lodash';
import {ApiError} from '@src/errors/api-error';
import {orderFromState, searchStateToFilter} from '@src/utils';

export function fetchItems({
  client,
  collection,
  onError,
  onSuccess,
}) {

  /**
   * FETCH_ITEMS
   *
   * @param {object} context
   * @param {object} payload
   * @return {Promise<Array|void>}
   */
  return async function (
    {state, commit},
    {filter = {}, noGlobals = false, append = false} = {},
  ) {

    commit('SET_LOADING', true);

    let mergedFilter = _.cloneDeep(filter);

    if (!noGlobals) {

      mergedFilter = {
        skip: state.skip,
        limit: state.limit,
        where: state.where,
        include: state.include,
        fields: state.fields,
        order: orderFromState(state),
        ...mergedFilter,
      };

      searchStateToFilter(state, mergedFilter);
    }

    const queryFilter = JSON.stringify(mergedFilter);
    const queryWhere = JSON.stringify(mergedFilter.where || {});

    let countResponse;
    let itemsResponse;

    try {

      itemsResponse = await client.get(
        `${collection}?filter=${queryFilter}`,
      );

      countResponse = await client.get(
        `${collection}/count?where=${queryWhere}`,
      );

    } catch (error) {

      onError({
        error: ApiError.from(error),
        action: 'FETCH_ITEMS',
      });
    }

    if (itemsResponse && countResponse) {

      const itemsData = append
        ? state.items.concat(itemsResponse.data)
        : itemsResponse.data;

      const countData = countResponse.data.count;

      commit('SET_ITEMS', itemsData);
      commit('SET_TOTAL', countData);
      commit('RESET_LOADING');

      onSuccess({
        action: 'FETCH_ITEMS',
      });

      return itemsData;
    }

    commit('RESET_LOADING');
  };
}
