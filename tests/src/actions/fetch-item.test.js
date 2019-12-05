import api from '../../api';
import {createState} from '../../../src/state';
import {ApiError} from '../../../src/api-error';
import fetchItemAction from '../../../src/actions/fetch-item';

describe('Checking action FETCH_ITEM.', () => {

  test('Can dispatch with "id".', async () => {

    const action = fetchItemAction({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 1;

    const commit = jest.fn(() => {});
    const state = createState();

    const customer = await action(
      {state, commit},
      {id},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(4);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update temp item.

    expect(commit.mock.calls[1][0]).toBe('SET_TEMP_ITEM');
    expect(commit.mock.calls[1][1]).toBe(customer);

    // Set item.

    expect(commit.mock.calls[2][0]).toBe('SET_ITEM');
    expect(commit.mock.calls[2][1]).toEqual(customer);

    // Reset loading state.

    expect(commit.mock.calls[3][0]).toBe('RESET_LOADING');

    // Customer has the requested id.

    expect(customer.id).toBe(id);
  });

  test('Can dispatch with "id" and "noTempItem".', async () => {

    const action = fetchItemAction({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 1;

    const commit = jest.fn(() => {});
    const state = createState();

    const customer = await action(
      {state, commit},
      {id, noTempItem: true},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(3);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Set item.

    expect(commit.mock.calls[1][0]).toBe('SET_ITEM');
    expect(commit.mock.calls[1][1]).toBe(customer);

    // Reset loading state.

    expect(commit.mock.calls[2][0]).toBe('RESET_LOADING');

    // Customer has the requested id.

    expect(customer.id).toBe(id);
  });

  test('Can dispatch with "id" and "include" by "state".', async () => {

    const action = fetchItemAction({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 5;

    const commit = jest.fn(() => {});

    const state = createState({
      extension: {
        include: 'accounts',
      },
    });

    const customer = await action(
      {commit, state},
      {id},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(4);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update temp item.

    expect(commit.mock.calls[1][0]).toBe('SET_TEMP_ITEM');
    expect(commit.mock.calls[1][1]).toBe(customer);

    // Set item.

    expect(commit.mock.calls[2][0]).toBe('SET_ITEM');
    expect(commit.mock.calls[2][1]).toEqual(customer);

    // Reset loading state.

    expect(commit.mock.calls[3][0]).toBe('RESET_LOADING');

    // Customer has the requested id.

    expect(customer.id).toBe(id);

    // Customer has related accounts.

    expect(customer.accounts.length).toBe(2);
  });

  test('Can dispatch with "id" and "include" by "filter".', async () => {

    const action = fetchItemAction({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 5;

    const commit = jest.fn(() => {});
    const state = createState();

    const customer = await action(
      {state, commit},
      {id, filter: {include: 'accounts'}},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(4);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update temp item.

    expect(commit.mock.calls[1][0]).toBe('SET_TEMP_ITEM');
    expect(commit.mock.calls[1][1]).toBe(customer);

    // Set item.

    expect(commit.mock.calls[2][0]).toBe('SET_ITEM');
    expect(commit.mock.calls[2][1]).toEqual(customer);

    // Reset loading state.

    expect(commit.mock.calls[3][0]).toBe('RESET_LOADING');

    // Customer has the requested id.

    expect(customer.id).toBe(id);

    // Customer has related accounts.

    expect(customer.accounts.length).toBe(2);
  });

  test('Can dispatch with "id" and "fields" by "state".', async () => {

    const action = fetchItemAction({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 5;

    const commit = jest.fn(() => {});

    const state = createState({
      extension: {
        fields: ['id', 'name'],
      },
    });

    const customer = await action(
      {commit, state},
      {id},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(4);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update temp item.

    expect(commit.mock.calls[1][0]).toBe('SET_TEMP_ITEM');
    expect(commit.mock.calls[1][1]).toBe(customer);

    // Set item.

    expect(commit.mock.calls[2][0]).toBe('SET_ITEM');
    expect(commit.mock.calls[2][1]).toEqual(customer);

    // Reset loading state.

    expect(commit.mock.calls[3][0]).toBe('RESET_LOADING');

    // Checking requested fields.

    expect(customer.id).not.toBeEmpty();
    expect(customer.name).not.toBeEmpty();

    // Checking excluded fields.

    expect(customer.accountIds).toBeUndefined();
    expect(customer.emailList).toBeUndefined();
  });

  test('Can dispatch with "id" and "fields" by "filter".', async () => {

    const action = fetchItemAction({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 5;

    const commit = jest.fn(() => {});
    const state = createState();
    const filter = {fields: ['id', 'name']};

    const customer = await action(
      {commit, state},
      {id, filter},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(4);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update temp item.

    expect(commit.mock.calls[1][0]).toBe('SET_TEMP_ITEM');
    expect(commit.mock.calls[1][1]).toBe(customer);

    // Set item.

    expect(commit.mock.calls[2][0]).toBe('SET_ITEM');
    expect(commit.mock.calls[2][1]).toEqual(customer);

    // Reset loading state.

    expect(commit.mock.calls[3][0]).toBe('RESET_LOADING');

    // Checking requested fields.

    expect(customer.id).not.toBeEmpty();
    expect(customer.name).not.toBeEmpty();

    // Checking excluded fields.

    expect(customer.accountIds).toBeUndefined();
    expect(customer.emailList).toBeUndefined();
  });

  test('Can call "onSuccess" callback.', async () => {

    const onError = jest.fn(() => {});
    const onSuccess = jest.fn(() => {});

    const action = fetchItemAction({
      client: api,
      collection: 'Customers',
      onError,
      onSuccess,
    });

    const id = 1;

    const context = {
      commit: () => {},
      state: createState(),
    };

    await action(context, {id});

    // On error has never called.

    expect(onError.mock.calls.length).toBe(0);

    // On success has called once.

    expect(onSuccess.mock.calls.length).toBe(1);
    expect(onSuccess.mock.calls[0][0].action).toBe('FETCH_ITEM');
  });

  test('Can call "onError" callback.', async () => {

    const onError = jest.fn(() => {});
    const onSuccess = jest.fn(() => {});

    const action = fetchItemAction({
      client: api,
      collection: 'Customers',
      onError,
      onSuccess,
    });

    const id = 900;

    const context = {
      commit: () => {},
      state: createState(),
    };

    await action(context, {id});

    // On success has never called.

    expect(onSuccess.mock.calls.length).toBe(0);

    // On error has called once.

    expect(onError.mock.calls.length).toBe(1);
    expect(onError.mock.calls[0][0].action).toBe('FETCH_ITEM');
    expect(onError.mock.calls[0][0].error).toBeInstanceOf(ApiError);
  });
});
