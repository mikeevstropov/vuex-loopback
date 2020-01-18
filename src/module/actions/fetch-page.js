
export function fetchPage() {

  /**
   * FETCH_PAGE
   *
   * @param {object} context
   * @param {object} payload
   * @return {Promise<Array|void>}
   */
  return async function (
    {state, commit, dispatch},
    {page = 1} = {},
  ) {

    const skip = (page - 1) * state.limit;
    commit('SET_SKIP', skip);

    return dispatch('FETCH_ITEMS');
  };
}
