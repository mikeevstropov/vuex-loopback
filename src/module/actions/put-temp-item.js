
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
    {filter = {}, existed = false, reset = false} = {},
  ) {

    if (!state.tempItem)
      throw new Error('No temp item to commit.');

    const action = existed
      ? 'PATCH_ITEM'
      : 'CREATE_ITEM';

    const item = await dispatch(action, {
      id: state.tempItem.id,
      data: state.tempItem,
      filter: filter,
    });

    if (reset)
      commit('RESET_TEMP_ITEM');

    return item;
  };
}
