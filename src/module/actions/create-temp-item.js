import cloneDeep from 'lodash/cloneDeep';

export function createTempItem({model}) {

  /**
   * CREATE_TEMP_ITEM
   *
   * @param {object} context
   * @param {object} payload
   * @return {object}
   */
  return function ({commit}, payload = {}) {

    const payloadModel = payload && payload.model;
    const item = cloneDeep(payloadModel || model);

    commit('SET_TEMP_ITEM', item);

    return item;
  };
}
