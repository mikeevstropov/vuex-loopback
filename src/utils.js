
/**
 * Order from state.
 *
 * @param state
 * @return {string}
 */
export function orderFromState(state) {

  if (!state.orderBy)
    return '';

  const direction = state.orderDesc
    ? 'DESC'
    : 'ASC';

  return `${state.orderBy} ${direction}`;
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

  const fields = state.searchBy;

  const words = state
    .searchQuery
    .split(' ')
    .filter(v => v);

  const condition = [];

  words.forEach(word => {

    fields.forEach(field => {

      condition.push({
        [field]: {
          like: word,
          options: 'i',
        },
      });
    });
  });

  if (condition.length)
    return;

  filter.where = filter.where || {};
  filter.where.and = filter.where.and || [];

  filter.where.and = [
    ...filter.where.and,
    ...condition,
  ];
}

export function snakeToCamel(string) {

  return string.replace(
    /([-_][a-z])/g,
    (group) => group.toUpperCase()
      .replace('-', '')
      .replace('_', ''),
  );
}
