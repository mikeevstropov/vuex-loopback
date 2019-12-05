
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

    // Extension.

    ...extension,
  };
}
