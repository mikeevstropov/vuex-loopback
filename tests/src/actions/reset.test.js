import resetAction from '../../../src/actions/reset';

describe('Checking action RESET.', () => {

  test('Can dispatch.', () => {

    const mutations = [
      'RESET_ITEM',
      'RESET_TEMP_ITEM',
      'RESET_ITEMS',
      'RESET_SKIP',
      'RESET_LIMIT',
      'RESET_TOTAL',
      'RESET_ORDER_BY',
      'RESET_ORDER_DESC',
      'RESET_SEARCH_BY',
      'RESET_SEARCH_QUERY',
      'RESET_WHERE',
      'RESET_LOADING',
      'RESET_INCLUDE',
      'RESET_FIELDS',
    ];

    const action = resetAction();
    const commit = jest.fn(() => {});

    action({commit});

    // Number of commits.

    expect(commit.mock.calls.length).toBe(mutations.length);

    // Checking each mutation.

    mutations.forEach((name, index) => {

      expect(commit.mock.calls[index][0]).toBe(name);
    });
  });
});
