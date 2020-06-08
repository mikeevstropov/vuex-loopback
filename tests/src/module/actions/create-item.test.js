import api from '@tests/api';
import {createState} from '@src/module/state';
import {ApiError} from '@src/errors/api-error';
import customerModel from '@tests/models/customer';
import {createItem} from '@src/module/actions/create-item';

describe('Checking action CREATE_ITEM.', () => {

  test('Can dispatch with "include" state.', async () => {

    const action = createItem({
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

    const state = createState({
      extension: {
        include: 'accounts',
      },
    });

    const customer = await action(
      {commit, state},
      {data},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(3);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Set items.

    expect(commit.mock.calls[1][0]).toBe('SET_ITEMS');
    expect(commit.mock.calls[1][1]).toEqual([customer]);

    // Reset loading state.

    expect(commit.mock.calls[2][0]).toBe('RESET_LOADING');

    // Customer has id.

    expect(customer.id).not.toBeEmpty();

    // Customer has related accounts.

    expect(customer.accounts.length).toBe(1);
  });

  test('Can dispatch with "include" filter.', async () => {

    const action = createItem({
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
    const state = createState();

    const customer = await action(
      {commit, state},
      {data, filter: {include: 'accounts'}},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(3);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Set items.

    expect(commit.mock.calls[1][0]).toBe('SET_ITEMS');
    expect(commit.mock.calls[1][1]).toEqual([customer]);

    // Reset loading state.

    expect(commit.mock.calls[2][0]).toBe('RESET_LOADING');

    // Customer has id.

    expect(customer.id).not.toBeEmpty();

    // Customer has related accounts.

    expect(customer.accounts.length).toBe(1);
  });

  test('Can dispatch with "fields" state.', async () => {

    const action = createItem({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const data = {
      ...customerModel,
      name: 'Tony Smith',
      accountIds: [1],
    };

    const commit = jest.fn(() => {});

    const state = createState({
      extension: {
        fields: ['id', 'name'],
      },
    });

    const customer = await action(
      {commit, state},
      {data},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(3);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Set items.

    expect(commit.mock.calls[1][0]).toBe('SET_ITEMS');
    expect(commit.mock.calls[1][1]).toEqual([customer]);

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

    const action = createItem({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const data = {
      ...customerModel,
      name: 'Tony Smith',
      accountIds: [1],
    };

    const commit = jest.fn(() => {});
    const state = createState();
    const filter = {fields: ['id', 'name']};

    const customer = await action(
      {commit, state},
      {data, filter},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(3);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Set items.

    expect(commit.mock.calls[1][0]).toBe('SET_ITEMS');
    expect(commit.mock.calls[1][1]).toEqual([customer]);

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

    const action = createItem({
      client: api,
      collection: 'Customers',
      onError,
      onSuccess,
    });

    const data = {...customerModel};

    const context = {
      commit: () => {},
      state: createState(),
    };

    await action(context, {data});

    // On error has never called.

    expect(onError.mock.calls.length).toBe(0);

    // On success has called once.

    expect(onSuccess.mock.calls.length).toBe(1);
    expect(onSuccess.mock.calls[0][0].action).toBe('CREATE_ITEM');
  });

  test('Can call "onError" callback.', async () => {

    const onError = jest.fn(() => {});
    const onSuccess = jest.fn(() => {});

    const action = createItem({
      client: api,
      collection: 'Unknown',
      onError,
      onSuccess,
    });

    const context = {
      commit: () => {},
      state: createState(),
    };

    await action(context, {data: {}});

    // On success has never called.

    expect(onSuccess.mock.calls.length).toBe(0);

    // On error has called once.

    expect(onError.mock.calls.length).toBe(1);
    expect(onError.mock.calls[0][0].action).toBe('CREATE_ITEM');
    expect(onError.mock.calls[0][0].error).toBeInstanceOf(ApiError);
  });
});
