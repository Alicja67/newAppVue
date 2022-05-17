<template>
  <div class="wrapper">
    <h2>Register now! :)</h2>
    <form method="post" @submit="onSubmit">
      <label for="firstName"> First name: <input type="text" name="firstName" v-model="firstName" required /> </label>
      <label for="lastName"> Last name: <input type="text" name="lastName" v-model="lastName" required /> </label>
      <label for="email"> E-mail: <input type="email" name="email" v-model="email" required /> </label>
      <label for="login"> Login: <input type="text" name="login" v-model="login" required /> </label>
      <label for="password"> Password: <input type="password" name="password" v-model="password" required /> </label>
      <div class="submit-form">
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'registration-component',
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      login: null,
      password: null,
    };
  },
  methods: {
    ...mapActions(['addUser']),
    onSubmit(e) {
      e.preventDefault();
      console.log('firstName', this.firstName);
      this.addUser({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        login: this.login,
        password: this.password,
      });
      this.clearData();
      // this.handleSnack();
    },
    clearData() {
      this.firstName = null;
      this.lastName = null;
      this.email = null;
      this.login = null;
      this.password = null;
    },
  },
};
</script>
<style lang="scss" scoped>
h2 {
  font-size: 2rem;
  margin: 100px 100px 60px 60px;
}
form {
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: space-between;
  label {
    margin: 10px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    input {
      padding: 10px;
      border: 1px solid #c4c8d3;
      background: #0a0a0a;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      cursor: pointer;
      transition: 1s;
      color: #f7f7f8;
    }
  }
  button {
    margin: 60px 0 0 150px;
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
  button:hover {
    background: #0a0a0a;
  }
}
</style>
