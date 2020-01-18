
export function createState({
  extension = {},
} = {}) {

  return {

    item: null,
    tempItem: null,

    items: [],
    skip: 0,
    limit: 20,
    total: 0,
    orderBy: '',
    orderDesc: false,
    searchBy: ['name'],
    searchQuery: '',
    where: {},

    loading: false,
    include: [],
    fields: [],

    // Extensions.

    ...extension,
  };
}
