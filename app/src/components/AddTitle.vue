<template>
  <div>
    <!-- <h3>Add new title</h3> -->
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
form {
  display: flex;
  margin: 100px 0 100px 30px;
}
input[type='text'] {
  flex: 10;
  padding: 10px;
  border: 1px solid #102e20;
  background: #0a0a0a;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  cursor: pointer;
  transition: 1s;
  color: #f7f7f8;
}
input[type='submit'] {
  cursor: pointer;
  background: #257b26;
  color: rgb(227, 229, 238);
  font-size: 1.1rem;
  flex: 2;
  border: 1px solid #257b26;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 10px;
  transition: 1s;
  margin-right: 50px;
  padding: 10px 40px 10px;
  width: 250px;
}
input[type='submit']:hover {
  background: #0a0a0a;
}
input[type='text']:hover {
  background: #f3f1f1;
  color: black;
}
p {
  color: white;
}
</style>
