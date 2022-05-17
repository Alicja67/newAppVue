<template>
  <div class="wrapper">
    <i class="fa-solid fa-user-astronaut"></i>
    <i class="fa-solid fa-user-astronaut"></i>
    <i class="fa-solid fa-user-astronaut"></i>
    <h3>What gifts will you take for Marsjans on your first space mission to The Red Planet?</h3>
    <form method="post" @submit="onSubmit">
      <label for="author"> Your name: <input type="text" name="author" v-model="author" required /> </label>
      <label for="email"> Your email: <input type="email" name="email" v-model="email" required /> </label>
      <label for="title"> Title: <input type="text" name="title" v-model="title" required /> </label>
      <label for="message"> Message: <textarea name="message" v-model="message" required> </textarea></label>
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
  name: 'contact-form',
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

.wrapper {
  background: #343a46;
  color: #fff;
  padding: 30px;
  text-align: center;
  // font-family: 'Hubballi', cursive;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  height: 100vh;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h1 {
  font-weight: lighter;
}
p {
  color: #999;
  font-size: 0.8rem;
}
a {
  color: #999;
  font-size: 0.8rem;
}
label {
  display: block;
  margin: 1rem;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: right;
}
input,
textarea {
  background: rgba(7, 3, 3, 0.2);
  padding: 0.6rem 1rem;
  border: none;
  margin: 0 1rem;
  border-radius: 0.5rem;
  outline: none;
  color: #fff;
  font-size: inherit;
}
textarea {
  margin: 1rem auto;
  width: 400px;
  height: 200px;
  display: block;
}
button {
  position: relative;
  padding: 10px;
  border: 1px solid #b0b1b3;
  background: #2770dd;
  border-radius: 5px;
  color: rgb(231, 232, 236);
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  transition: 1s;
}
button:hover {
  background: #0a0a0a;
}
input[type='checkbox'] {
  width: 25px;
  height: 25px;
}
.submit-form {
  display: flex;
  justify-content: right;
}
h2 {
  font-size: 3rem;
  margin: 50px 0 50px 0;
}
h3 {
  margin-bottom: 50px;
}
i {
  color: white;
  font-size: 2rem;
  margin: 70px 0 50px 0;
}
</style>
