import {createState} from '@src/module/state';
import {putTempItem} from '@src/module/actions/put-temp-item';

describe('Checking action PUT_TEMP_ITEM.', () => {

  const action = putTempItem();

  const getState = tempItem => createState({
    extension: {tempItem},
  });

  let commit;
  let dispatch;

  beforeEach(() => {

    commit = jest.fn(() => {});
    dispatch = jest.fn((action, payload) => payload);
  });

  test('Can dispatch with "include" filter.', async () => {

    const data = {accountIds: [1]};
    const state = getState(data);
    const filter = {include: 'accounts'};

    const payload = await action(
      {state, commit, dispatch},
      {filter},
    );

    // Number of commits and dispatches.

    expect(commit.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls.length).toBe(1);

    // Create item.

    expect(dispatch.mock.calls[0][0]).toBe('CREATE_ITEM');
    expect(dispatch.mock.calls[0][1].data).toBe(data);

    // Set temp item.

    expect(commit.mock.calls[0][0]).toBe('SET_TEMP_ITEM');

    // Payload has data and filter.

    expect(payload.data).toBe(data);
    expect(payload.filter).toBe(filter);
  });

  test('Dispatch with empty "id" field will create an item.', async () => {

    const data = {};
    const state = getState(data);

    const payload = await action(
      {state, commit, dispatch},
    );

    // Number of commits and dispatches.

    expect(commit.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls.length).toBe(1);

    // Create item.

    expect(dispatch.mock.calls[0][0]).toBe('CREATE_ITEM');
    expect(dispatch.mock.calls[0][1].data).toBe(data);

    // Set temp item.

    expect(commit.mock.calls[0][0]).toBe('SET_TEMP_ITEM');

    // Payload has data.

    expect(payload.data).toBe(data);
  });

  test('Dispatch with non-empty "id" field will patch an item.', async () => {

    const data = {id: 5};
    const state = getState(data);

    const payload = await action(
      {state, commit, dispatch},
    );

    // Number of commits and dispatches.

    expect(commit.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls.length).toBe(1);

    // Patch item.

    expect(dispatch.mock.calls[0][0]).toBe('PATCH_ITEM');
    expect(dispatch.mock.calls[0][1].id).toBe(data.id);
    expect(dispatch.mock.calls[0][1].data).toBe(data);

    // Set temp item.

    expect(commit.mock.calls[0][0]).toBe('SET_TEMP_ITEM');

    // Payload has id and data.

    expect(payload.id).toBe(data.id);
    expect(payload.data).toBe(data);
  });

  test('Dispatch with "noPatch" option and non-empty "id" field will create an item.', async () => {

    const data = {id: 5};
    const state = getState(data);

    const payload = await action(
      {state, commit, dispatch},
      {noPatch: true},
    );

    // Number of commits and dispatches.

    expect(commit.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls.length).toBe(1);

    // Create item.

    expect(dispatch.mock.calls[0][0]).toBe('CREATE_ITEM');
    expect(dispatch.mock.calls[0][1].data).toBe(data);

    // Set temp item.

    expect(commit.mock.calls[0][0]).toBe('SET_TEMP_ITEM');

    // Payload has data and create option.

    expect(payload.data).toBe(data);
  });

  test('Can dispatch with "reset".', async () => {

    const data = {};
    const state = getState(data);

    const payload = await action(
      {state, commit, dispatch},
      {reset: true},
    );

    // Number of commits and dispatches.

    expect(commit.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls.length).toBe(1);

    // Create item.

    expect(dispatch.mock.calls[0][0]).toBe('CREATE_ITEM');
    expect(dispatch.mock.calls[0][1].data).toBe(data);

    // Reset temp item.

    expect(commit.mock.calls[0][0]).toBe('RESET_TEMP_ITEM');

    // Payload has data and reset option.

    expect(payload.data).toBe(data);
  });
});
