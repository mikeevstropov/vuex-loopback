
export function fetchMore() {

  /**
   * FETCH_MORE
   *
   * @param {object} context
   * @return {Promise<Array|void>}
   */
  return async function (
    {state, commit, dispatch},
  ) {

    const skip = state.skip + state.items.length;
    commit('SET_SKIP', skip);

    return dispatch(
      'FETCH_ITEMS',
      {append: true},
    );
  };
}
