
export function searchItems() {

  /**
   * SEARCH_ITEMS
   *
   * @param {object} context
   * @param {object} payload
   * @return {Promise<Array|void>}
   */
  return async function (
    {commit, dispatch},
    {query = '', searchBy = null} = {},
  ) {

    commit('SET_SEARCH_QUERY', query);
    commit('RESET_SKIP');

    if (searchBy)
      commit('SET_SEARCH_BY', searchBy);

    return dispatch('FETCH_ITEMS');
  };
}
