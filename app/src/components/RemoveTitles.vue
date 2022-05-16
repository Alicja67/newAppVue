<template>
  <form>
    <button @click="handleDelete" @click.prevent="handleSnack()" class="remove-button" type>
      Remove all added titles
    </button>
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
  // margin-right: 30px;
}
.remove-button {
  position: relative;
  padding: 10px;
  border: 1px solid #d4d6da;
  background: #27396e;
  border-radius: 5px;
  color: rgb(239, 241, 252);
  cursor: pointer;
  font-size: 1.1rem;
  transition: 1s;
}
.remove-button:hover {
  background: #0a0a0a;
}
</style>
