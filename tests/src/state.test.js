import {createState} from '../../src/state';

describe('State checking.', () => {

  test('Has specific fields.', () => {

    const state = createState();

    expect(state.item).toBeNull();
    expect(state.tempItem).toBeNull();
    expect(state.items).toBeArray();
    expect(state.skip).toBeNumber();
    expect(state.limit).toBeNumber();
    expect(state.total).toBeNumber();
    expect(state.orderBy).toBeString();
    expect(state.orderDesc).toBeBoolean();
    expect(state.searchBy).toBeArray();
    expect(state.searchQuery).toBeString();
    expect(state.where).toBeObject();
    expect(state.loading).toBeBoolean();
    expect(state.include).toBeArray();
    expect(state.fields).toBeArray();
  });

  test('Can be extended.', () => {

    const field = 'my-field';
    const value = 'my-value';

    const state = createState({
      extension: {[field]: value},
    });

    expect(state[field]).toBe(value);
  });
});
