import {fetchMore} from '@src/module/actions/fetch-more';

describe('Checking action FETCH_MORE.', () => {

  test('Can dispatch.', async () => {

    const action = fetchMore();

    const state = {
      items: [],
      skip: 0,
    };

    const commit = jest.fn(() => {});
    const dispatch = jest.fn(() => {});

    await action({
      state,
      commit,
      dispatch,
    });

    state.items.push({});

    // Number of commits and dispatches.

    expect(commit.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls.length).toBe(1);

    // Set skip.

    expect(commit.mock.calls[0][0]).toBe('SET_SKIP');
    expect(commit.mock.calls[0][1]).toBe(0);

    // Fetch items.

    expect(dispatch.mock.calls[0][0]).toBe('FETCH_ITEMS');
    expect(dispatch.mock.calls[0][1]).toEqual({append: true});

    await action({
      state,
      commit,
      dispatch,
    });

    state.items.push({});

    // Number of commits and dispatches.

    expect(commit.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls.length).toBe(2);

    // Set skip.

    expect(commit.mock.calls[1][0]).toBe('SET_SKIP');
    expect(commit.mock.calls[1][1]).toBe(1);

    // Fetch items.

    expect(dispatch.mock.calls[1][0]).toBe('FETCH_ITEMS');
    expect(dispatch.mock.calls[1][1]).toEqual({append: true});
  });
});
