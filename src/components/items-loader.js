import snakeCase from 'lodash/snakeCase';

export default {
  name: 'items-loader',
  props: {
    module: {
      type: String,
      required: true,
    },
    resetFields: {
      type: Array,
      default: () => [
        'skip',
      ],
    },
    noAutoload: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    items() {

      return this.$store.state[
        this.module
      ].items;
    },
    loading() {

      return this.$store.state[
        this.module
      ].loading;
    },
    page() {

      return this.$store.state[
        this.module
      ].page;
    },
    pages() {

      return this.$store.state[
        this.module
      ].pages;
    },
    hasMore() {

      return this.$store.state[
        this.module
      ].hasMore;
    },
  },
  methods: {
    load() {

      return this.$store.dispatch(
        `${this.module}/FETCH_ITEMS`,
      );
    },
    reload() {

      this.resetFields.forEach(field => {

        const mutation = snakeCase(
          field,
        ).toUpperCase();

        this.$store.commit(
          `${this.module}/RESET_${mutation}`,
        );
      });

      return this.$store.dispatch(
        `${this.module}/FETCH_ITEMS`,
      );
    },
    loadPage(page) {

      return this.$store.dispatch(
        `${this.module}/FETCH_PAGE`,
        {page},
      );
    },
    loadMore() {

      return this.$store.dispatch(
        `${this.module}/FETCH_MORE`,
      );
    },
  },
  mounted() {

    if (!this.noAutoload)
      this.load();
  },
  render(createElement) {

    const options = {
      class: 'item-loader',
    };

    const children = [
      this.$scopedSlots.default({
        items: this.items,
        loading: this.loading,
        page: this.page,
        pages: this.pages,
        hasMore: this.hasMore,
        load: this.load,
        loadPage: this.loadPage,
        loadMore: this.loadMore,
      }),
    ];

    return createElement(
      'div',
      options,
      children,
    );
  },
};
