import api from '../../api';
import {createState} from '../../../src/state';
import customerModel from '../../models/customer';
import putTempItemAction from '../../../src/actions/put-temp-item';

describe('Checking action PUT_TEMP_ITEM.', () => {

  test('Can dispatch with "include" by "filter".', async () => {

    const action = putTempItemAction({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const data = {
      ...customerModel,
      accountIds: [1],
    };

    const commit = jest.fn(() => {});
    const dispatch = jest.fn((action, payload) => payload);
    const filter = {include: 'accounts'};

    const state = createState({
      extension: {
        temp: data,
      },
    });

    const payload = await action(
      {state, commit, dispatch},
      {filter},
    );

    // Number of commits and dispatches.

    expect(commit.mock.calls.length).toBe(0);
    expect(dispatch.mock.calls.length).toBe(1);

    // Create item.

    expect(dispatch.mock.calls[0][0]).toBe('CREATE_ITEM');
    expect(dispatch.mock.calls[0][1].data).toBe(data);

    // Payload has filter.

    expect(payload.filter.include).toBe('accounts');

    // Payload has data.

    expect(payload.data).toBe(data);
  });

  test('Can dispatch with "existed".', async () => {

    const action = putTempItemAction({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const data = {
      id: 5,
      name: 'Mary Smith',
    };

    const commit = jest.fn(() => {});
    const dispatch = jest.fn(() => {});

    const state = createState({
      extension: {
        temp: data,
      },
    });

    await action(
      {state, commit, dispatch},
      {existed: true},
    );

    // Number of commits and dispatches.

    expect(commit.mock.calls.length).toBe(0);
    expect(dispatch.mock.calls.length).toBe(1);

    // Create item.

    expect(dispatch.mock.calls[0][0]).toBe('PATCH_ITEM');
    expect(dispatch.mock.calls[0][1].id).toBe(data.id);
    expect(dispatch.mock.calls[0][1].data).toBe(data);
  });

  test('Can dispatch with "reset".', async () => {

    const action = putTempItemAction({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const data = {
      ...customerModel,
      accountIds: [1],
    };

    const commit = jest.fn(() => {});
    const dispatch = jest.fn(() => {});

    const state = createState({
      extension: {
        temp: data,
      },
    });

    await action(
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

    expect(commit.mock.calls[0][0]).toBe('RESET_TEMP');
  });
});
