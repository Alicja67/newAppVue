<template>
  <form>
    <button @click="handleDelete" @click.prevent="handleSnack()">Remove all added titles</button>
    <snack-vue></snack-vue>
  </form>
</template>
<script>
import { mapActions } from 'vuex';
import SnackVue from './SnackVue.vue';

export default {
  name: 'remove-titles',
  components: {
    SnackVue,
  },
  methods: {
    ...mapActions(['deleteAllTitles', 'snack']),
    handleDelete(e) {
      e.preventDefault();
      console.log(e);
      this.deleteAllTitles();
    },
    handleSnack() {
      this.snack({
        text: `oops! You removed all titles`,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
form {
  display: flex;
  justify-content: center;
}
</style>
