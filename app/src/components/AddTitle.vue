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
      title: null,
    };
  },
  methods: {
    ...mapActions(['addTitle']),
    onSubmit(e) {
      e.preventDefault();
      this.addTitle(this.title);
      this.title = null;
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
  background: #36383b;
  color: rgb(139, 142, 155);
  font-size: 1.1rem;
  flex: 2;
  border: 1px solid #33394b;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 10px;
}
</style>
