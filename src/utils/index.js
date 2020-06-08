
/**
 * Order from state.
 *
 * @param state
 * @return {string}
 */
export function orderFromState(state) {

  if (!state.orderBy)
    return '';

  if (typeof state.orderBy === 'string') {

    const direction = state.orderDesc
      ? 'DESC'
      : 'ASC';

    return `${state.orderBy} ${direction}`;
  }

  return state.orderBy;
}

/**
 * Search state to filter.
 *
 * @param state
 * @param filter
 */
export function searchStateToFilter(state, filter) {

  if (
    !state.searchQuery ||
    !state.searchBy.length
  ) return;

  const fields = state
    .searchBy;

  const words = state
    .searchQuery
    .split(' ')
    .filter(v => v);

  filter.where = filter.where || {};
  filter.where.and = filter.where.and || [];

  const and = filter
    .where
    .and;

  words.forEach(word => {

    const or = [];

    fields.forEach(field => {

      or.push({
        [field]: {
          like: word,
          options: 'i',
        },
      });
    });

    const number = parseInt(word, 10);

    if (!Number.isNaN(number))
      fields.forEach(
        field => or.push({
          [field]: number,
        }),
      );

    and.push({or});
  });
}
