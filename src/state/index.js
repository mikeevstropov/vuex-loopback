
export function createState({
  extension = {},
} = {}) {

  return {

    // Single.

    item: null,
    tempItem: null,

    // List.

    items: [],
    skip: 0,
    limit: 20,
    total: 0,
    orderBy: '',
    orderDesc: false,
    searchBy: ['name'],
    searchQuery: '',
    where: {},

    // Common.

    loading: false,
    include: [],
    fields: [],

    // Extensions.

    ...extension,
  };
}
