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
    <snack-vue></snack-vue>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
// import KcAdminClient from 'keycloak-admin';
import axios from 'axios';
import Keycloak from 'keycloak-js';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import qs from 'qs';
import SnackVue from '../components/SnackVue.vue';

export default {
  name: 'registration-component',
  components: {
    SnackVue,
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      login: null,
      password: null,
      token: null,
      credentials: [{ type: 'password', value: '', temporary: false }],
    };
  },
  mounted() {
    this.getToken();
  },
  methods: {
    ...mapActions(['addUser', 'snack']),
    getToken() {
      const KEYCLOCK_URL = `https://spacer-magic.mac.pl:8080`;
      const KEYCLOCK_REALM_NAME = 'spacer';
      let URL = `${KEYCLOCK_URL}/auth/realms/${KEYCLOCK_REALM_NAME}/protocol/openid-connect/token`;
      const data = {
        client_id: `admin-cli`,
        // client_secret: `${DATA_CLIENT_SECRET}`,
        grant_type: 'password',
        username: `alicja`,
        password: `test`,
      };
      return axios.post(URL, qs.stringify(data)).then((res) => {
        this.token = res.data.access_token;
        // console.log(this.token);
      });
    },
    async onSubmit(e) {
      e.preventDefault();
      const KEYCLOCK_URL = `https://spacer-magic.mac.pl:8080`;
      const KEYCLOCK_REALM_NAME = 'spacer';
      let URL = `${KEYCLOCK_URL}/auth/admin/realms/${KEYCLOCK_REALM_NAME}/users`;
      let config = {
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-Type': 'application/json',
        },
      };
      const newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        username: this.login,
        enabled: true,
        credentials: [{ type: 'password', value: this.password, temporary: false }],
      };
      console.log('new user', newUser);
      await axios.post(URL, JSON.stringify(newUser), config).then((res) => {
        this.token = res.data.access_token;
        // console.log(res);
      });
      await axios
        .get(URL, config)
        .then((res) => {
          const addedUserData = res.data.find((user) => user.username === this.login);
          console.log(addedUserData);
          if (addedUserData.id) {
            this.addUser({
              firstName: addedUserData.firstName,
              lastName: addedUserData.lastName,
              email: addedUserData.email,
              login: addedUserData.username,
              password: this.password,
            });
            this.handleSnack(`Yeah!!! You are the new user now!`);
          } else {
            this.handleSnack(`Oops! Something went wrong! Try again.`);
          }
          this.clearData();
        })
        .catch((err) => console.log(err));
    },
    handleSnack(message) {
      this.snack({
        text: message,
      });
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
