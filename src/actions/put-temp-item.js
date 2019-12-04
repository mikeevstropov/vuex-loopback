
export default function () {

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

    if (!state.temp)
      throw new Error('No temp item to commit.');

    const action = existed
      ? 'PATCH_ITEM'
      : 'CREATE_ITEM';

    const item = await dispatch(action, {
      id: state.temp.id,
      data: state.temp,
      filter: filter,
    });

    if (reset)
      commit('RESET_TEMP');

    return item;
  };
}
