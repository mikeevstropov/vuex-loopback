import customerModel from '../../models/customer';
import createTempItemAction from '../../../src/actions/create-temp-item';

describe('Checking action NEW_TEMP_ITEM.', () => {

  test('Can dispatch with model from "options".', () => {

    const action = createTempItemAction({
      model: customerModel,
    });

    const commit = jest.fn(() => {});

    const customer = action({commit});

    // Number of commits.

    expect(commit.mock.calls.length).toBe(1);

    // Update temp item.

    expect(commit.mock.calls[0][0]).toBe('SET_TEMP_ITEM');
    expect(commit.mock.calls[0][1]).toEqual(customerModel);
    expect(commit.mock.calls[0][1]).toBe(customer);
  });

  test('Can dispatch with model from "payload".', () => {

    const dummyModel = {};

    const action = createTempItemAction({
      model: dummyModel,
    });

    const commit = jest.fn(() => {});

    const customer = action(
      {commit},
      {model: customerModel},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(1);

    // Update temp item.

    expect(commit.mock.calls[0][0]).toBe('SET_TEMP_ITEM');
    expect(commit.mock.calls[0][1]).not.toEqual(dummyModel);
    expect(commit.mock.calls[0][1]).toEqual(customerModel);
    expect(commit.mock.calls[0][1]).toBe(customer);
  });
});
