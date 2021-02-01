import {fetchPage} from '@src/module/actions/fetch-page';

describe('Checking action FETCH_PAGE.', () => {

  test('Can dispatch with "page".', async () => {

    const action = fetchPage();

    const page = 5;
    const skip = 40;
    const state = {limit: 10};

    const commit = jest.fn(() => {});
    const dispatch = jest.fn(() => {});

    await action(
      {state, commit, dispatch},
      {page},
    );

    // Number of commits and dispatches.

    expect(commit.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls.length).toBe(1);

    // Set skip.

    expect(commit.mock.calls[0][0]).toBe('SET_SKIP');
    expect(commit.mock.calls[0][1]).toBe(skip);

    // Fetch items.

    expect(dispatch.mock.calls[0][0]).toBe('FETCH_ITEMS');
  });
});
