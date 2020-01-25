
export default {
  name: 'item-editor',
  props: {
    module: {
      type: String,
      required: true,
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

      return this.$store.dispatch(
        `${this.module}/CREATE_TEMP_ITEM`,
        {model: item},
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

      await this.$store.dispatch(
        `${this.module}/PUT_TEMP_ITEM`,
        {existed: this.item.id},
      );

      this.$emit('saved', this.item);
    },
    async remove() {

      if (
        !this.item ||
        !this.item.id
      ) return;

      await this.$store.dispatch(
        `${this.module}/REMOVE_ITEM`,
        this.item.id,
      );

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
