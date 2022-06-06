<template>
  <div>
    <h3 class="main-title">Add tag related to space</h3>
    <div class="add">
      <form @submit="onSubmit">
        <input type="text" v-model="title" placeholder="Write new title..." />
        <input type="submit" value="Add title" />
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'add-title',
  data() {
    return {
      title: '',
    };
  },
  methods: {
    ...mapActions(['addTitle']),
    onSubmit(e) {
      e.preventDefault();
      this.addTitle(this.title);
      console.log('titlefirst', this.title);
      this.title = '';
      console.log('title', this.title);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/input';
@import '../assets/scss/text';

form {
  display: flex;
  margin: 10px 0 50px 30px;
}
input[type='text'] {
  text-align: center;
}
.main-title {
  margin-top: 70px;
  z-index: 1;
  text-align: center;
  font-size: 3.5rem;
}
</style>
