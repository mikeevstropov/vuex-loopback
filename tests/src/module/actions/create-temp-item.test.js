import customerModel from '@tests/models/customer';
import {createTempItem} from '@src/module/actions/create-temp-item';

describe('Checking action NEW_TEMP_ITEM.', () => {

  const action = createTempItem({
    model: customerModel,
  });

  let commit;

  beforeEach(() => {

    commit = jest.fn(() => {});
  });

  test('Can dispatch without "item".', () => {

    const customer = action({commit});

    // Number of commits.

    expect(commit.mock.calls.length).toBe(1);

    // Update temp item.

    expect(commit.mock.calls[0][0]).toBe('SET_TEMP_ITEM');
    expect(commit.mock.calls[0][1]).toEqual(customerModel);
    expect(commit.mock.calls[0][1]).toEqual(customer);
  });

  test('Can dispatch with "item".', () => {

    const id = 5;

    const expected = {
      ...customerModel,
      id,
    };

    const customer = action(
      {commit},
      {id},
    );

    // Number of commits.

    expect(commit.mock.calls.length).toBe(1);

    // Update temp item.

    expect(commit.mock.calls[0][0]).toBe('SET_TEMP_ITEM');
    expect(commit.mock.calls[0][1]).toEqual(expected);
    expect(commit.mock.calls[0][1]).toEqual(customer);
  });
});
