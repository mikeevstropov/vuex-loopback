
export default {
  name: 'item-editor',
  props: {
    module: {
      type: String,
      required: true,
    },
    extend: {
      type: Object,
      default: null,
    },
  },
  computed: {
    item() {

      return this.$store.state[
        this.module
      ].tempItem;
    },
    loading() {

      return this.$store.state[
        this.module
      ].loading;
    },
  },
  methods: {
    edit(item) {

      item = {
        ...this.extend,
        ...item,
      };

      return this.$store.dispatch(
        `${this.module}/CREATE_TEMP_ITEM`,
        item,
      );
    },
    set(item) {

      this.$store.commit(
        `${this.module}/SET_TEMP_ITEM`,
        item,
      );
    },
    async save() {

      if (!this.item)
        return;

      const item = await this.$store.dispatch(
        `${this.module}/PUT_TEMP_ITEM`,
      );

      if (item)
        this.$emit('saved', item);
    },
    async remove() {

      if (
        !this.item ||
        !this.item.id
      ) return;

      const removed = await this.$store.dispatch(
        `${this.module}/REMOVE_ITEM`,
        this.item.id,
      );

      if (removed)
        this.$emit('removed');
    },
  },
  render(createElement) {

    const options = {
      class: 'item-editor',
    };

    const children = [
      this.$scopedSlots.default({
        item: this.item,
        loading: this.loading,
        edit: this.edit,
        set: this.set,
        save: this.save,
        remove: this.remove,
      }),
    ];

    return createElement(
      'div',
      options,
      children,
    );
  },
};
