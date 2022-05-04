<template>
  <div>
    <!-- <h3>Add new title</h3> -->
    <div class="add">
      <form @submit="onSubmit">
        <input type="text" v-model="title" placeholder="Add new title..." />
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'add-title',
  date() {
    return {
      title: '',
    };
  },
  methods: {
    ...mapActions(['addTitle']),
    onSubmit(e) {
      e.preventDefault();
      this.addTitle(this.title);
      this.title = '';
    },
  },
};
</script>
<style lang="scss" scoped>
form {
  display: flex;
  margin: 50px 200px;
}
input[type='text'] {
  flex: 10;
  padding: 10px;
  border: 1px solid #2e3035;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  cursor: pointer;
}
input[type='submit'] {
  cursor: pointer;
  background: #2770dd;
  color: rgb(227, 229, 238);
  font-size: 1.1rem;
  flex: 2;
  border: 1px solid #33394b;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 10px;
  border: 1px solid #dddfe2;
}
</style>
