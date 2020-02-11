
export function putTempItem() {

  /**
   * PUT_TEMP_ITEM
   *
   * @param {object} context
   * @param {object} payload
   * @return {Promise<object>}
   */
  return async function (
    {state, commit, dispatch},
    {filter = {}, create = false, reset = false} = {},
  ) {

    if (!state.tempItem)
      throw new Error('No temp item to commit.');

    const action = !create && state.tempItem.id
      ? 'PATCH_ITEM'
      : 'CREATE_ITEM';

    const item = await dispatch(action, {
      id: state.tempItem.id,
      data: state.tempItem,
      filter: filter,
    });

    reset
      ? commit('RESET_TEMP_ITEM')
      : commit('SET_TEMP_ITEM', item);

    return item;
  };
}
