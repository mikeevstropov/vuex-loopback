import {createActions} from '@src/module/actions';

describe('Actions checking.', () => {

  test('Can be extended.', () => {

    const field = 'my-field';
    const value = 'my-value';

    const actions = createActions({
      extension: {[field]: value},
    });

    expect(actions[field]).toBe(value);
  });
});
