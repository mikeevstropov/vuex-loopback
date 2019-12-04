import api from '../../api';
import {createState} from '../../../src/state';
import {ApiError} from '../../../src/api-error';
import customerModel from '../../models/customer';
import removeItemAction from '../../../src/actions/remove-item';

describe('Checking action REMOVE_ITEM.', () => {

  test('Can dispatch with "id".', async () => {

    const collection = 'Customers';

    let item = {...customerModel};

    delete item.id;

    const response = await api.post(collection, item);

    item = response.data;

    const id = item.id;

    const action = removeItemAction({
      client: api,
      collection: collection,
      onError: () => {},
      onSuccess: () => {},
    });

    const commit = jest.fn(() => {});
    const state = createState();

    const hasRemoved = await action(
      {state, commit},
      id,
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(3);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Remove item.

    expect(commit.mock.calls[1][0]).toBe('REMOVE_ITEM');
    expect(commit.mock.calls[1][1]).toBe(id);

    // Reset loading state.

    expect(commit.mock.calls[2][0]).toBe('RESET_LOADING');

    // Customer has the requested id.

    expect(hasRemoved).toBe(true);
  });

  test('Can call "onSuccess" callback.', async () => {

    const collection = 'Customers';

    let item = {...customerModel};

    delete item.id;

    const response = await api.post(collection, item);

    item = response.data;

    const id = item.id;

    const onError = jest.fn(() => {});
    const onSuccess = jest.fn(() => {});

    const action = removeItemAction({
      client: api,
      collection: collection,
      onError,
      onSuccess,
    });

    const context = {
      commit: () => {},
      state: createState(),
    };

    await action(context, id);

    // On error has never called.

    expect(onError.mock.calls.length).toBe(0);

    // On success has called once.

    expect(onSuccess.mock.calls.length).toBe(1);
    expect(onSuccess.mock.calls[0][0].action).toBe('REMOVE_ITEM');
  });

  test('Can call "onError" callback.', async () => {

    const onError = jest.fn(() => {});
    const onSuccess = jest.fn(() => {});

    const action = removeItemAction({
      client: api,
      collection: 'Customers',
      onError,
      onSuccess,
    });

    const context = {
      commit: () => {},
      state: createState(),
    };

    await action(context, 900);

    // On success has never called.

    expect(onSuccess.mock.calls.length).toBe(0);

    // On error has called once.

    expect(onError.mock.calls.length).toBe(1);
    expect(onError.mock.calls[0][0].action).toBe('REMOVE_ITEM');
    expect(onError.mock.calls[0][0].error).toBeInstanceOf(ApiError);
  });
});
