import {createGetters} from '../../src/getters';

describe('Getters checking.', () => {

  test('Can get "page".', () => {

    const state = {
      skip: 20,
      limit: 10,
    };

    const getters = createGetters();
    const value = getters.page(state);

    expect(value).toBe(3);
  });

  test('Can get "totalPages".', () => {

    const state = {
      limit: 10,
      total: 100,
    };

    const getters = createGetters();
    const value = getters.totalPages(state);

    expect(value).toBe(10);
  });

  test('Can get "hasMore".', () => {

    const getters = createGetters();

    const positive = getters.hasMore({
      skip: 10,
      limit: 10,
      total: 100,
    });

    expect(positive).toBeTrue();

    const negative = getters.hasMore({
      skip: 90,
      limit: 10,
      total: 100,
    });

    expect(negative).toBeFalse();
  });

  test('Can be extended.', () => {

    const field = 'my-field';
    const value = 'my-value';

    const getters = createGetters({
      extension: {[field]: value},
    });

    expect(getters[field]).toBe(value);
  });
});
