import isEqual from 'lodash/isEqual';

export function createGetters({
  extension = {},
} = {}) {

  // Return getters.

  return {
    page(state) {

      return Math.floor(state.skip / state.limit) + 1;
    },
    totalPages(state) {

      return Math.ceil(state.total / state.limit);
    },
    hasMore(state) {

      return state.total > state.skip + state.limit;
    },
    itemChanged(state) {

      return !isEqual(state.item, state.tempItem);
    },

    // Extension.

    ...extension,
  };
}
