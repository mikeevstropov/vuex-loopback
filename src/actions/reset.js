
export default function () {

  /**
   * RESET
   *
   * @param {object} context
   * @return {void}
   */
  return function ({commit}) {

    commit('RESET_ITEM');
    commit('RESET_TEMP');
    commit('RESET_ITEMS');
    commit('RESET_SKIP');
    commit('RESET_LIMIT');
    commit('RESET_TOTAL');
    commit('RESET_ORDER_BY');
    commit('RESET_ORDER_DESC');
    commit('RESET_SEARCH_BY');
    commit('RESET_SEARCH_QUERY');
    commit('RESET_WHERE');
    commit('RESET_LOADING');
    commit('RESET_INCLUDE');
    commit('RESET_FIELDS');
  };
}
