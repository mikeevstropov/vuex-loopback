import {searchStateToFilter} from '@src/utils';

describe('Utils checking.', () => {

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
