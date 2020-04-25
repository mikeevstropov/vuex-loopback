import {fetchMore} from '@src/module/actions/fetch-more';

describe('Checking action FETCH_MORE.', () => {

  test('Can dispatch.', async () => {

    const action = fetchMore();

    const state = {
      items: [],
      skip: 0,
    };

    const dispatch = jest.fn(
      (name, payload) => {

        if (name === 'FETCH_ITEMS')
          state.items.push(payload);
      },
    );

    const commit = jest.fn(
      (name, payload) => {

        if (name === 'SET_SKIP')
          state.skip = payload;
      },
    );

    const skipIs = value => {

      // Number of commits and dispatches.

      expect(commit.mock.calls.length).toBe(1);
      expect(dispatch.mock.calls.length).toBe(1);

      // Set skip.

      expect(commit.mock.calls[0][0]).toBe('SET_SKIP');
      expect(commit.mock.calls[0][1]).toBe(value);

      // Fetch items.

      expect(dispatch.mock.calls[0][0]).toBe('FETCH_ITEMS');
      expect(dispatch.mock.calls[0][1]).toEqual({append: true});

      // Clean stack.

      commit.mock.calls.pop();
      dispatch.mock.calls.pop();
    };

    await action({state, commit, dispatch});
    skipIs(0);

    await action({state, commit, dispatch});
    skipIs(1);

    await action({state, commit, dispatch});
    skipIs(2);

  });
});
