import _ from 'lodash';

export function createMutations({
  initialState,
  extension = null,
} = {}) {

  // Clone initial state.

  initialState = _.cloneDeep(initialState);

  // Initial state getter.

  const getInitialState = () => _.cloneDeep(initialState);

  // Create extension.

  extension = typeof extension === 'function'
    ? extension(initialState) || {}
    : extension;

  extension = typeof extension === 'object'
    ? extension
    : {};

  // Return mutations.

  return {

    // Reset.

    RESET(state) {

      Object.assign(
        state,
        getInitialState(),
      );
    },

    // Single.

    SET_ITEM(state, value) {

      state.item = value || null;
    },
    RESET_ITEM(state) {

      state.item = getInitialState().item;
    },
    SET_TEMP_ITEM(state, value) {

      state.tempItem = value || null;
    },
    RESET_TEMP_ITEM(state) {

      state.tempItem = getInitialState().tempItem;
    },

    // List.

    SET_ITEMS(state, value) {

      state.items = value || [];
    },
    RESET_ITEMS(state) {

      state.items = getInitialState().items;
    },
    SET_SKIP(state, value) {

      state.skip = value || 0;
    },
    RESET_SKIP(state) {

      state.skip = getInitialState().skip;
    },
    SET_LIMIT(state, value) {

      state.limit = value || 0;
    },
    RESET_LIMIT(state) {

      state.limit = getInitialState().limit;
    },
    SET_TOTAL(state, value) {

      state.total = value || 0;
    },
    RESET_TOTAL(state) {

      state.total = getInitialState().total;
    },
    SET_ORDER_BY(state, value) {

      state.orderBy = value || '';
    },
    RESET_ORDER_BY(state) {

      state.orderBy = getInitialState().orderBy;
    },
    SET_ORDER_DESC(state, value) {

      state.orderDesc = !!value;
    },
    RESET_ORDER_DESC(state) {

      state.orderDesc = getInitialState().orderDesc;
    },
    SET_SEARCH_BY(state, value) {

      state.searchBy = value || [];
    },
    RESET_SEARCH_BY(state) {

      state.searchBy = getInitialState().searchBy;
    },
    SET_SEARCH_QUERY(state, value) {

      state.searchQuery = value || '';
    },
    RESET_SEARCH_QUERY(state) {

      state.searchQuery = getInitialState().searchQuery;
    },
    SET_WHERE(state, value) {

      state.where = value || {};
    },
    RESET_WHERE(state) {

      state.where = getInitialState().where;
    },

    // Common.

    SET_LOADING(state, value) {

      state.loading = !!value;
    },
    RESET_LOADING(state) {

      state.loading = getInitialState().loading;
    },
    SET_INCLUDE(state, value) {

      state.include = value || [];
    },
    RESET_INCLUDE(state) {

      state.include = getInitialState().include;
    },
    SET_FIELDS(state, value) {

      state.fields = value || [];
    },
    RESET_FIELDS(state) {

      state.fields = getInitialState().fields;
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

      // Update temp item.

      if (
        state.tempItem &&
        state.tempItem.id === item.id
      ) state.tempItem = _.cloneDeep(item);

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
      ) state.item = getInitialState().item;

      // Remove temp item.

      if (
        state.tempItem &&
        state.tempItem.id === id
      ) state.tempItem = getInitialState().tempItem;

      // Remove from items.

      state.items = state.items.filter(
        value => value.id !== id,
      );
    },

    // Extension.

    ...extension,
  };
}
