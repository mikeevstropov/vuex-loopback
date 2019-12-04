import _ from 'lodash';

export function createMutations({
  initialState,
  extension = null,
} = {}) {

  // Clone initial state.

  initialState = _.cloneDeep(initialState);

  // Create extension.

  extension = typeof extension === 'function'
    ? extension(initialState) || {}
    : extension;

  extension = typeof extension === 'object'
    ? extension
    : {};

  // Return mutations.

  return {

    // Single.

    SET_ITEM(state, value) {

      state.item = value || null;
    },
    RESET_ITEM(state) {

      state.item = initialState.item;
    },
    SET_TEMP(state, value) {

      state.temp = value || null;
    },
    RESET_TEMP(state) {

      state.temp = initialState.temp;
    },

    // List.

    SET_ITEMS(state, value) {

      state.items = value || [];
    },
    RESET_ITEMS(state) {

      state.items = initialState.items;
    },
    SET_SKIP(state, value) {

      state.skip = value || 0;
    },
    RESET_SKIP(state) {

      state.skip = initialState.skip;
    },
    SET_LIMIT(state, value) {

      state.limit = value || 0;
    },
    RESET_LIMIT(state) {

      state.limit = initialState.limit;
    },
    SET_TOTAL(state, value) {

      state.total = value || 0;
    },
    RESET_TOTAL(state) {

      state.total = initialState.total;
    },
    SET_ORDER_BY(state, value) {

      state.orderBy = value || '';
    },
    RESET_ORDER_BY(state) {

      state.orderBy = initialState.orderBy;
    },
    SET_ORDER_DESC(state, value) {

      state.orderDesc = !!value;
    },
    RESET_ORDER_DESC(state) {

      state.orderDesc = initialState.orderDesc;
    },
    SET_SEARCH_BY(state, value) {

      state.searchBy = value || [];
    },
    RESET_SEARCH_BY(state) {

      state.searchBy = initialState.searchBy;
    },
    SET_SEARCH_QUERY(state, value) {

      state.searchQuery = value || '';
    },
    RESET_SEARCH_QUERY(state) {

      state.searchQuery = initialState.searchQuery;
    },
    SET_WHERE(state, value) {

      state.where = value || {};
    },
    RESET_WHERE(state) {

      state.where = initialState.where;
    },

    // Common.

    SET_LOADING(state, value) {

      state.loading = !!value;
    },
    RESET_LOADING(state) {

      state.loading = initialState.loading;
    },
    SET_INCLUDE(state, value) {

      state.include = value || [];
    },
    RESET_INCLUDE(state) {

      state.include = initialState.include;
    },
    SET_FIELDS(state, value) {

      state.fields = value || [];
    },
    RESET_FIELDS(state) {

      state.fields = initialState.fields;
    },

    // Sync.

    UPDATE_ITEM(state, item) {

      if (!item || !item.id)
        return;

      // Update item.

      if (
        state.item &&
        state.item.id === item.id
      ) state.item = _.cloneDeep(item);

      // Update temp.

      if (
        state.temp &&
        state.temp.id === item.id
      ) state.temp = _.cloneDeep(item);

      // Update items.

      const index = _.findIndex(
        state.items,
        {id: item.id},
      );

      if (index > -1)
        state.items.splice(
          index, 1, item,
        );
    },
    REMOVE_ITEM(state, id) {

      // Remove item.

      if (
        state.item &&
        state.item.id === id
      ) state.item = initialState.item;

      // Remove temp.

      if (
        state.temp &&
        state.temp.id === id
      ) state.temp = initialState.temp;

      // Remove from items.

      const index = _.findIndex(
        state.items,
        {id},
      );

      if (index > -1)
        state.items.splice(
          index, 1,
        );
    },

    // Extension.

    ...extension,
  };
}
