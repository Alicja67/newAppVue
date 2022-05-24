<template>
  <div class="wrapper">
    <i class="fa-solid fa-user-astronaut"></i>
    <i class="fa-solid fa-user-astronaut"></i>
    <i class="fa-solid fa-user-astronaut"></i>
    <h3 class="subtitle-one">What gifts will you take for Marsjans on your first space mission to The Red Planet?</h3>
    <form method="post" @submit="onSubmit">
      <label class="form-label" for="author">
        <p>Your name:</p>
        <input class="form-input" type="text" name="author" v-model="author" required />
      </label>
      <label class="form-label" for="email">
        <p>Your email:</p>
        <input class="form-input" type="email" name="email" v-model="email" required />
      </label>
      <label class="form-label" for="title">
        <p>Title:</p>
        <input class="form-input" type="text" name="title" v-model="title" required />
      </label>
      <label class="form-label" for="message">
        <p>Message:</p>
        <textarea class="form-input" name="message" v-model="message" required> </textarea>
      </label>
      <div class="submit-form">
        <button type="submit">Send message</button>
      </div>
      <snack-vue></snack-vue>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import SnackVue from '../components/SnackVue.vue';

export default {
  name: 'message-component',
  components: {
    SnackVue,
  },
  data() {
    return {
      author: null,
      email: null,
      title: null,
      message: null,
    };
  },
  methods: {
    ...mapActions(['addContact', 'snack']),
    onSubmit(e) {
      e.preventDefault();
      this.addContact({
        author: this.author,
        email: this.email,
        title: this.title,
        message: this.message,
      });
      this.title = '';
      this.handleSnack();
    },
    handleSnack() {
      this.snack({
        text: `Great ${this.author}! We've got your message :)`,
        delay: 0,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Hubballi&family=Montserrat:ital,wght@0,300;0,600;1,300&display=swap');
@import '../assets/scss/text';
@import '../assets/scss/form';

.wrapper {
  color: #fff;
  padding: 30px;
  text-align: center;
  // font-family: 'Hubballi', cursive;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  height: 100vh;
}
a {
  color: #999;
  font-size: 0.8rem;
}
input[type='checkbox'] {
  width: 25px;
  height: 25px;
}
.submit-form {
  display: flex;
  justify-content: right;
}
h3 {
  margin-bottom: 50px;
}
i {
  color: white;
  font-size: 2rem;
  margin: 20px 0 20px 0;
}
</style>
