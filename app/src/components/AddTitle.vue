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
  methods: {
    ...mapActions(['addTitle']),
    onSubmit(e) {
      e.preventDefault();
      this.addTitle(this.title);
      this.title = '';
    },
  },
  date() {
    return {
      title: '',
    };
  },
};
</script>
<style lang="scss" scoped>
form {
  display: flex;
  margin: 50px 200px;
  border-radius: 5px;
}
input[type='text'] {
  flex: 10;
  padding: 10px;
  border: 1px solid #2e3035;
  cursor: pointer;
}
input[type='submit'] {
  cursor: pointer;
  background: #36383b;
  color: #fff;
  flex: 2;
  border: 1px solid #33394b;
}
</style>
