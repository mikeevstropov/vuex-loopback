import searchItemsAction from '../../../src/actions/search-items';

describe('Checking action SEARCH_ITEMS.', () => {

  test('Can dispatch with "query".', async () => {

    const action = searchItemsAction();

    const query = 'query';
    const commit = jest.fn(() => {});
    const dispatch = jest.fn(() => {});

    await action(
      {commit, dispatch},
      {query},
    );

    // Number of commits and dispatches.

    expect(commit.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls.length).toBe(1);

    // Set search query.

    expect(commit.mock.calls[0][0]).toBe('SET_SEARCH_QUERY');
    expect(commit.mock.calls[0][1]).toBe(query);

    // Reset skip.

    expect(commit.mock.calls[1][0]).toBe('RESET_SKIP');

    // Fetch items.

    expect(dispatch.mock.calls[0][0]).toBe('FETCH_ITEMS');
  });

  test('Can dispatch with "query" and "searchBy".', async () => {

    const action = searchItemsAction();

    const query = 'query';
    const searchBy = ['name'];
    const commit = jest.fn(() => {});
    const dispatch = jest.fn(() => {});

    await action(
      {commit, dispatch},
      {query, searchBy},
    );

    // Number of commits and dispatches.

    expect(commit.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls.length).toBe(1);

    // Set search query.

    expect(commit.mock.calls[0][0]).toBe('SET_SEARCH_QUERY');
    expect(commit.mock.calls[0][1]).toBe(query);

    // Reset skip.

    expect(commit.mock.calls[1][0]).toBe('RESET_SKIP');

    // Set search query.

    expect(commit.mock.calls[2][0]).toBe('SET_SEARCH_BY');
    expect(commit.mock.calls[2][1]).toBe(searchBy);

    // Fetch items.

    expect(dispatch.mock.calls[0][0]).toBe('FETCH_ITEMS');
  });
});
