
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

  const stringCond = [];
  const numberCond = [];

  words.forEach(word => {

    fields.forEach(field => {

      stringCond.push({
        [field]: {
          like: word,
          options: 'i',
        },
      });

      if (/^\d+$/.test(word))
        numberCond.push({
          [field]: parseInt(
            word,
            10,
          ),
        });
    });
  });

  if (
    !stringCond.length &&
    !numberCond.length
  ) return;

  filter.where = filter.where || {};

  if (
    stringCond.length &&
    numberCond.length
  ) {

    filter.where.or = filter.where.or || [];
    filter.where.or.push({and: stringCond});
    filter.where.or.push({and: numberCond});

  } else {

    filter.where.and = [
      ...(filter.where.and || []),
      ...stringCond,
      ...numberCond,
    ];
  }
}
