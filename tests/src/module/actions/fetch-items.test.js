import api from '@tests/api';
import map from 'lodash/map';
import min from 'lodash/min';
import max from 'lodash/max';
import {createState} from '@src/module/state';
import {ApiError} from '@src/errors/api-error';
import {fetchItems} from '@src/module/actions/fetch-items';

describe('Checking action FETCH_ITEMS.', () => {

  test('Can dispatch with "where" state.', async () => {

    const action = fetchItems({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 1;
    const commit = jest.fn(() => {});

    const state = createState({
      extension: {
        where: {id},
      },
    });

    const customers = await action(
      {state, commit},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(4);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update items.

    expect(commit.mock.calls[1][0]).toBe('SET_ITEMS');
    expect(commit.mock.calls[1][1]).toBe(customers);

    // Update total.

    expect(commit.mock.calls[2][0]).toBe('SET_TOTAL');
    expect(commit.mock.calls[2][1]).toBeNumber();

    // Reset loading state.

    expect(commit.mock.calls[3][0]).toBe('RESET_LOADING');

    // Customer has the requested id.

    expect(customers.length).toBe(1);
    expect(customers[0].id).toBe(id);
  });

  test('Can dispatch with "where" filter.', async () => {

    const action = fetchItems({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 1;

    const commit = jest.fn(() => {});
    const state = createState();

    const customers = await action(
      {state, commit},
      {filter: {where: {id}}},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(4);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update items.

    expect(commit.mock.calls[1][0]).toBe('SET_ITEMS');
    expect(commit.mock.calls[1][1]).toBe(customers);

    // Update total.

    expect(commit.mock.calls[2][0]).toBe('SET_TOTAL');
    expect(commit.mock.calls[2][1]).toBeNumber();

    // Reset loading state.

    expect(commit.mock.calls[3][0]).toBe('RESET_LOADING');

    // Customer has the requested id.

    expect(customers.length).toBe(1);
    expect(customers[0].id).toBe(id);
  });

  test('Can dispatch with "include" state.', async () => {

    const action = fetchItems({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 5;
    const commit = jest.fn(() => {});

    const state = createState({
      extension: {
        where: {id},
        include: 'accounts',
      },
    });

    const customers = await action(
      {state, commit},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(4);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update items.

    expect(commit.mock.calls[1][0]).toBe('SET_ITEMS');
    expect(commit.mock.calls[1][1]).toBe(customers);

    // Update total.

    expect(commit.mock.calls[2][0]).toBe('SET_TOTAL');
    expect(commit.mock.calls[2][1]).toBeNumber();

    // Reset loading state.

    expect(commit.mock.calls[3][0]).toBe('RESET_LOADING');

    // Customer has the requested id.

    expect(customers.length).toBe(1);
    expect(customers[0].id).toBe(id);

    // Customer has related accounts.

    expect(customers[0].accounts.length).toBe(2);
  });

  test('Can dispatch with "include" filter.', async () => {

    const action = fetchItems({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 5;

    const commit = jest.fn(() => {});
    const state = createState();

    const filter = {
      where: {id},
      include: 'accounts',
    };

    const customers = await action(
      {state, commit},
      {filter},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(4);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update items.

    expect(commit.mock.calls[1][0]).toBe('SET_ITEMS');
    expect(commit.mock.calls[1][1]).toBe(customers);

    // Update total.

    expect(commit.mock.calls[2][0]).toBe('SET_TOTAL');
    expect(commit.mock.calls[2][1]).toBeNumber();

    // Reset loading state.

    expect(commit.mock.calls[3][0]).toBe('RESET_LOADING');

    // Customer has the requested id.

    expect(customers.length).toBe(1);
    expect(customers[0].id).toBe(id);

    // Customer has related accounts.

    expect(customers[0].accounts.length).toBe(2);
  });

  test('Can dispatch with "fields" state.', async () => {

    const action = fetchItems({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 5;
    const commit = jest.fn(() => {});

    const state = createState({
      extension: {
        where: {id},
        fields: ['id', 'name'],
      },
    });

    const customers = await action(
      {state, commit},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(4);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update items.

    expect(commit.mock.calls[1][0]).toBe('SET_ITEMS');
    expect(commit.mock.calls[1][1]).toBe(customers);

    // Update total.

    expect(commit.mock.calls[2][0]).toBe('SET_TOTAL');
    expect(commit.mock.calls[2][1]).toBeNumber();

    // Reset loading state.

    expect(commit.mock.calls[3][0]).toBe('RESET_LOADING');

    // Checking items length.

    expect(customers.length).toBe(1);

    // Checking requested fields.

    expect(customers[0].id).not.toBeEmpty();
    expect(customers[0].name).not.toBeEmpty();

    // Checking excluded fields.

    expect(customers[0].accountIds).toBeUndefined();
    expect(customers[0].emailList).toBeUndefined();
  });

  test('Can dispatch with "fields" filter.', async () => {

    const action = fetchItems({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 5;

    const commit = jest.fn(() => {});
    const state = createState();

    const filter = {
      where: {id},
      fields: ['id', 'name'],
    };

    const customers = await action(
      {state, commit},
      {filter},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(4);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update items.

    expect(commit.mock.calls[1][0]).toBe('SET_ITEMS');
    expect(commit.mock.calls[1][1]).toBe(customers);

    // Update total.

    expect(commit.mock.calls[2][0]).toBe('SET_TOTAL');
    expect(commit.mock.calls[2][1]).toBeNumber();

    // Reset loading state.

    expect(commit.mock.calls[3][0]).toBe('RESET_LOADING');

    // Checking items length.

    expect(customers.length).toBe(1);

    // Checking requested fields.

    expect(customers[0].id).not.toBeEmpty();
    expect(customers[0].name).not.toBeEmpty();

    // Checking excluded fields.

    expect(customers[0].accountIds).toBeUndefined();
    expect(customers[0].emailList).toBeUndefined();
  });

  test('Can dispatch with "noGlobals".', async () => {

    const action = fetchItems({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const id = 1;

    const commit = jest.fn(() => {});

    const state = createState({
      extension: {
        where: {id},
      },
    });

    const customers = await action(
      {commit, state},
      {noGlobals: true},
    );

    // Customer has the requested id.

    expect(customers.length > 1).toBeTrue();
  });

  test('Can dispatch with "append".', async () => {

    const action = fetchItems({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const existed = 'item';
    const commit = jest.fn(() => {});

    const state = createState({
      extension: {
        items: [existed],
      },
    });

    const customers = await action(
      {commit, state},
      {append: true},
    );

    // Customer has the existed item.

    expect(customers.length > 1).toBeTrue();
    expect(customers[0]).toBe(existed);
  });

  test('Can dispatch with "orderBy" and "orderDesc" state.', async () => {

    const action = fetchItems({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const commit = jest.fn(() => {});

    const state = createState({
      extension: {
        orderBy: 'id',
      },
    });

    // Fetching.

    const customers = await action(
      {state, commit},
    );

    state.orderDesc = true;

    const descCustomers = await action(
      {state, commit: () => {}},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(4);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update items.

    expect(commit.mock.calls[1][0]).toBe('SET_ITEMS');
    expect(commit.mock.calls[1][1]).toBe(customers);

    // Update total.

    expect(commit.mock.calls[2][0]).toBe('SET_TOTAL');
    expect(commit.mock.calls[2][1]).toBeNumber();

    // Reset loading state.

    expect(commit.mock.calls[3][0]).toBe('RESET_LOADING');

    // Customer has ascending order.

    let ids = map(customers, 'id');
    let minId = min(ids);
    let maxId = max(ids);

    expect(customers.length).toBe(ids.length);
    expect(customers[0].id).toBe(minId);
    expect(customers[ids.length - 1].id).toBe(maxId);

    // Customer has descending order.

    ids = map(descCustomers, 'id');
    minId = min(ids);
    maxId = max(ids);

    expect(descCustomers.length).toBe(ids.length);
    expect(descCustomers[0].id).toBe(maxId);
    expect(descCustomers[ids.length - 1].id).toBe(minId);
  });

  test('Can dispatch with "orderBy" state as an array.', async () => {

    const action = fetchItems({
      client: api,
      collection: 'Customers',
      onError: () => {},
      onSuccess: () => {},
    });

    const commit = jest.fn(() => {});

    const state = createState({
      extension: {
        orderBy: ['id ASC'],
      },
    });

    // Fetching.

    const customers = await action(
      {state, commit},
    );

    state.orderBy = ['id DESC'];

    const descCustomers = await action(
      {state, commit: () => {}},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(4);

    // Loading state.

    expect(commit.mock.calls[0][0]).toBe('SET_LOADING');
    expect(commit.mock.calls[0][1]).toBe(true);

    // Update items.

    expect(commit.mock.calls[1][0]).toBe('SET_ITEMS');
    expect(commit.mock.calls[1][1]).toBe(customers);

    // Update total.

    expect(commit.mock.calls[2][0]).toBe('SET_TOTAL');
    expect(commit.mock.calls[2][1]).toBeNumber();

    // Reset loading state.

    expect(commit.mock.calls[3][0]).toBe('RESET_LOADING');

    // Customer has ascending order.

    let ids = map(customers, 'id');
    let minId = min(ids);
    let maxId = max(ids);

    expect(customers.length).toBe(ids.length);
    expect(customers[0].id).toBe(minId);
    expect(customers[ids.length - 1].id).toBe(maxId);

    // Customer has descending order.

    ids = map(descCustomers, 'id');
    minId = min(ids);
    maxId = max(ids);

    expect(descCustomers.length).toBe(ids.length);
    expect(descCustomers[0].id).toBe(maxId);
    expect(descCustomers[ids.length - 1].id).toBe(minId);
  });

  test('Can call "onSuccess" callback.', async () => {

    const onError = jest.fn(() => {});
    const onSuccess = jest.fn(() => {});

    const action = fetchItems({
      client: api,
      collection: 'Customers',
      onError,
      onSuccess,
    });

    const commit = jest.fn(() => {});
    const state = createState();

    await action({state, commit});

    // On error has never called.

    expect(onError.mock.calls.length).toBe(0);

    // On success has called once.

    expect(onSuccess.mock.calls.length).toBe(1);
    expect(onSuccess.mock.calls[0][0].action).toBe('FETCH_ITEMS');
  });

  test('Can call "onError" callback.', async () => {

    const onError = jest.fn(() => {});
    const onSuccess = jest.fn(() => {});

    const action = fetchItems({
      client: api,
      collection: 'Unknown',
      onError,
      onSuccess,
    });

    const commit = jest.fn(() => {});
    const state = createState();

    await action({state, commit});

    // On success has never called.

    expect(onSuccess.mock.calls.length).toBe(0);

    // On error has called once.

    expect(onError.mock.calls.length).toBe(1);
    expect(onError.mock.calls[0][0].action).toBe('FETCH_ITEMS');
    expect(onError.mock.calls[0][0].error).toBeInstanceOf(ApiError);
  });
});
