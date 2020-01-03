import {createState} from '../../src/state';
import {snakeToCamel} from '../../src/utils';
import {createMutations} from '../../src/mutations';

describe('Mutations checking.', () => {

  test('Can set and reset single value.', () => {

    const state = createState();
    const initial = createState();

    const mutations = createMutations({
      initialState: initial,
    });

    const values = {
      'ITEM': {field: 'value'},
      'TEMP_ITEM': {a: 'b'},
      'ITEMS': [1, 2, 3],
      'SKIP': 10,
      'LIMIT': 40,
      'TOTAL': 80,
      'ORDER_BY': 'field',
      'ORDER_DESC': true,
      'SEARCH_BY': [3, 2, 1],
      'SEARCH_QUERY': 'query',
      'WHERE': {c: 'd'},
      'LOADING': true,
      'INCLUDE': ['123'],
      'FIELDS': ['abc'],
    };

    Object.keys(values).forEach(key => {

      const set = `SET_${key}`;
      const reset = `RESET_${key}`;
      const field = snakeToCamel(key.toLowerCase());

      mutations[set](state, values[key]);

      expect(state[field]).toEqual(values[key]);
      expect(state[field]).not.toEqual(initial[field]);

      mutations[reset](state);

      expect(state[field]).not.toEqual(values[key]);
      expect(state[field]).toEqual(initial[field]);
    });
  });

  test('Can set single and reset all values.', () => {

    const state = createState();
    const initial = createState();

    const mutations = createMutations({
      initialState: initial,
    });

    const values = {
      'ITEM': {field: 'value'},
      'TEMP_ITEM': {a: 'b'},
      'ITEMS': [1, 2, 3],
      'SKIP': 10,
      'LIMIT': 40,
      'TOTAL': 80,
      'ORDER_BY': 'field',
      'ORDER_DESC': true,
      'SEARCH_BY': [3, 2, 1],
      'SEARCH_QUERY': 'query',
      'WHERE': {c: 'd'},
      'LOADING': true,
      'INCLUDE': ['123'],
      'FIELDS': ['abc'],
    };

    Object.keys(values).forEach(key => {

      const set = `SET_${key}`;
      const field = snakeToCamel(key.toLowerCase());

      mutations[set](state, values[key]);

      expect(state[field]).toEqual(values[key]);
      expect(state[field]).not.toEqual(initial[field]);
    });

    mutations['RESET'](state);

    Object.keys(values).forEach(key => {

      const field = snakeToCamel(key.toLowerCase());

      expect(state[field]).not.toEqual(values[key]);
      expect(state[field]).toEqual(initial[field]);
    });
  });

  test('Can update and remove item.', () => {

    const state = createState();
    const initial = createState();

    const mutations = createMutations({
      initialState: initial,
    });

    const item = {id: 'first', key: 'a'};
    const updated = {id: 'first', key: 'b'};

    state.item = {...item};
    state.tempItem = {...item};
    state.items = [{...item}];

    mutations['UPDATE_ITEM'](state, updated);

    expect(state.item.key).toBe(updated.key);
    expect(state.tempItem.key).toBe(updated.key);
    expect(state.items[0].key).toBe(updated.key);

    mutations['REMOVE_ITEM'](state, updated.id);

    expect(state.item).toEqual(initial.item);
    expect(state.tempItem).toEqual(initial.tempItem);
    expect(state.items).toBeEmpty();
  });

  test('Can be extended.', () => {

    const field = 'my-field';
    const value = 'my-value';

    const mutations = createMutations({
      extension: {[field]: value},
    });

    expect(mutations[field]).toBe(value);
  });
});
