import api from '@tests/api';
import {createState} from '@src/module/state';
import {ApiError} from '@src/errors/api-error';
import {patchItem} from '@src/module/actions/patch-item';

describe('Checking action PATCH_ITEM.', () => {

  test('Can dispatch with "include" state.', async () => {

    const action = patchItem({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 5;

    const commit = jest.fn(() => {});
    const data = {name: 'Mary Smith'};

    const state = createState({
      extension: {
        include: 'accounts',
      },
    });

    const customer = await action(
      {commit, state},
      {id, data},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(3);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update item.

    expect(commit.mock.calls[1][0]).toBe('UPDATE_ITEM');
    expect(commit.mock.calls[1][1]).toBe(customer);

    // Reset loading state.

    expect(commit.mock.calls[2][0]).toBe('RESET_LOADING');

    // Customer has the requested id.

    expect(customer.id).toBe(id);

    // Customer has related accounts.

    expect(customer.accounts.length).toBe(2);
  });

  test('Can dispatch with "include" filter.', async () => {

    const action = patchItem({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 5;

    const commit = jest.fn(() => {});
    const state = createState();

    const data = {name: 'Mary Smith'};
    const filter = {include: 'accounts'};

    const customer = await action(
      {state, commit},
      {id, data, filter},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(3);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update item.

    expect(commit.mock.calls[1][0]).toBe('UPDATE_ITEM');
    expect(commit.mock.calls[1][1]).toBe(customer);

    // Reset loading state.

    expect(commit.mock.calls[2][0]).toBe('RESET_LOADING');

    // Customer has the requested id.

    expect(customer.id).toBe(id);

    // Customer has related accounts.

    expect(customer.accounts.length).toBe(2);
  });

  test('Can dispatch with "fields" state.', async () => {

    const action = patchItem({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 5;

    const commit = jest.fn(() => {});
    const data = {name: 'Mary Smith'};

    const state = createState({
      extension: {
        fields: ['id', 'name'],
      },
    });

    const customer = await action(
      {commit, state},
      {id, data},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(3);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update item.

    expect(commit.mock.calls[1][0]).toBe('UPDATE_ITEM');
    expect(commit.mock.calls[1][1]).toBe(customer);

    // Reset loading state.

    expect(commit.mock.calls[2][0]).toBe('RESET_LOADING');

    // Checking requested fields.

    expect(customer.id).not.toBeEmpty();
    expect(customer.name).not.toBeEmpty();

    // Checking excluded fields.

    expect(customer.accountIds).toBeUndefined();
    expect(customer.emailList).toBeUndefined();
  });

  test('Can dispatch with "fields" filter.', async () => {

    const action = patchItem({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 5;

    const commit = jest.fn(() => {});
    const state = createState();

    const data = {name: 'Mary Smith'};
    const filter = {fields: ['id', 'name']};

    const customer = await action(
      {state, commit},
      {id, data, filter},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(3);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update item.

    expect(commit.mock.calls[1][0]).toBe('UPDATE_ITEM');
    expect(commit.mock.calls[1][1]).toBe(customer);

    // Reset loading state.

    expect(commit.mock.calls[2][0]).toBe('RESET_LOADING');

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

    const action = patchItem({
      client: api,
      collection: 'Customers',
      onError,
      onSuccess,
    });

    const id = 5;
    const data = {name: 'Mary Smith'};

    const context = {
      commit: () => {},
      state: createState(),
    };

    const customer = await action(
      context,
      {id, data},
    );

    // On error has never called.

    expect(onError.mock.calls.length).toBe(0);

    // On success has called once.

    expect(onSuccess.mock.calls.length).toBe(1);
    expect(onSuccess.mock.calls[0][0].action).toBe('PATCH_ITEM');
  });

  test('Can call "onError" callback.', async () => {

    const onError = jest.fn(() => {});
    const onSuccess = jest.fn(() => {});

    const action = patchItem({
      client: api,
      collection: 'Unknown',
      onError,
      onSuccess,
    });

    const context = {
      commit: () => {},
      state: createState(),
    };

    await action(
      context,
      {id: 0, data: {}},
    );

    // On success has never called.

    expect(onSuccess.mock.calls.length).toBe(0);

    // On error has called once.

    expect(onError.mock.calls.length).toBe(1);
    expect(onError.mock.calls[0][0].action).toBe('PATCH_ITEM');
    expect(onError.mock.calls[0][0].error).toBeInstanceOf(ApiError);
  });
});
