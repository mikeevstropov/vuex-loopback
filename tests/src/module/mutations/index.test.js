import snakeCase from 'lodash/snakeCase';
import {createState} from '@src/module/state';
import {createMutations} from '@src/module/mutations';

describe('Mutations checking.', () => {

  const getDirtyState = () => ({
    item: {field: 'value'},
    tempItem: {a: 'b'},
    items: [1, 2, 3],
    skip: 10,
    limit: 40,
    total: 80,
    orderBy: 'field',
    orderDesc: true,
    searchBy: [3, 2, 1],
    searchQuery: 'query',
    where: {c: 'd'},
    loading: true,
    include: ['123'],
    fields: ['abc'],
  });

  test('Can set and reset single value.', () => {

    const state = createState();
    const initial = createState();
    const dirty = getDirtyState();

    const mutations = createMutations({
      initialState: initial,
    });

    Object.keys(dirty).forEach(field => {

      const key = snakeCase(field).toUpperCase();
      const set = `SET_${key}`;
      const reset = `RESET_${key}`;

      mutations[set](state, dirty[field]);

      expect(state[field]).toEqual(dirty[field]);
      expect(state[field]).not.toEqual(initial[field]);

      mutations[reset](state);

      expect(state[field]).not.toEqual(dirty[field]);
      expect(state[field]).toEqual(initial[field]);
    });
  });

  test('Can set single and reset all values.', () => {

    const state = createState();
    const initial = createState();
    const dirty = getDirtyState();

    const mutations = createMutations({
      initialState: initial,
    });

    Object.keys(dirty).forEach(field => {

      const key = snakeCase(field).toUpperCase();
      const set = `SET_${key}`;

      mutations[set](state, dirty[field]);

      expect(state[field]).toEqual(dirty[field]);
      expect(state[field]).not.toEqual(initial[field]);
    });

    mutations['RESET'](state);

    Object.keys(dirty).forEach(field => {

      expect(state[field]).not.toEqual(dirty[field]);
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
