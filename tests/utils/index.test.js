import {orderFromState} from '@src/utils';
import {searchStateToFilter} from '@src/utils';

describe('Utils checking.', () => {

  test('Can convert order state to order query.', () => {

    const state = {
      orderBy: 'field',
      orderDesc: true,
    };

    const expected = 'field DESC';

    const result = orderFromState(state);

    expect(result).toBe(expected);
  });

  test('Can convert array order state to order query.', () => {

    const state = {
      orderBy: [
        'first ASC',
        'second DESC',
        'third ASC',
      ],
    };

    const expected = [
      'first ASC',
      'second DESC',
      'third ASC',
    ];

    const result = orderFromState(state);

    expect(result).toEqual(expected);
  });

  test('Can extend filter by search state.', () => {

    const filter = {};

    const state = {
      searchBy: ['first', 'second'],
      searchQuery: '3 words query',
    };

    const like = word => ({
      like: word,
      options: 'i',
    });

    const expected = {
      where: {
        and: [
          {
            or: [
              {first: like('3')},
              {second: like('3')},
              {first: 3},
              {second: 3},
            ],
          },
          {
            or: [
              {first: like('words')},
              {second: like('words')},
            ],
          },
          {
            or: [
              {first: like('query')},
              {second: like('query')},
            ],
          },
        ],
      },
    };

    searchStateToFilter(
      state,
      filter,
    );

    expect(filter).toEqual(expected);
  });
});
