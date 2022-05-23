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
    <div v-for="user in users" :key="user.login">
      <p>{{ user.login }}</p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
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
      online: false,
      addedLogin: '',
      errorMessage: '',
    };
  },
  mounted() {
    this.getToken();
    this.isConnectedToDB();
  },
  computed: {
    ...mapGetters(['users']),
  },
  created() {
    return this.fetchUser();
  },
  methods: {
    ...mapActions(['addUser', 'snack', 'fetchUser']),
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
        console.log('Token in generated');
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

      await axios
        .get('http://localhost:3000/check')
        .then((res) => {
          if (res.data === 'Online') {
            this.online = true;
            console.log('Connected to BD in registerButton', this.online);
          }
        })
        .catch((err) => {
          this.online = false;
          console.log('Disconnected to DB!', this.online, err);
        });
      console.log('new user', newUser);

      if (this.online) {
        await axios
          .post(URL, JSON.stringify(newUser), config)
          .then((res) => {
            console.log('Added new user to keycloak');
          })
          .catch((err) => {
            this.errorMessage = err.response.data.errorMessage;
            console.log('err.response.data.errorMessage', err.response.data.errorMessage, err.response);
            console.log('NO USER added to Keycloak!!!', this.errorMessage);
            this.handleSnack(`${this.errorMessage}! Try again.`, 'red');
          });
        await axios
          .get(URL, config)
          .then((res) => {
            console.log('goo');
            console.log('errorMessage', this.errorMessage);
            if (!this.errorMessage) {
              const addedUserData = res.data.find((user) => user.username === this.login);
              this.addedLogin = addedUserData.username;
              console.log('addedUserData', addedUserData, this.addedLogin);
              if (addedUserData.id) {
                this.addUser({
                  firstName: addedUserData.firstName,
                  lastName: addedUserData.lastName,
                  email: addedUserData.email,
                  login: addedUserData.username,
                  password: this.password,
                });
                this.fetchUser();
              }
            }
            this.errorMessage = '';
          })
          .catch((err) => {
            this.handleSnack(`Oops! Something went wrong! Try again.`, 'red');
            console.log(err.response);
          })
          .finally(() => {
            axios.get('http://localhost:3000/users').then((res) => {
              // const ifAddedToDB = res.data.find((user) => {
              //   user.login == this.addedLogin;
              // });
              const addedToDB = res.data[res.data.length - 1].login;
              console.log('data', res.data);
              console.log('addedToDB', addedToDB);
              console.log('addedLogin', this.addedLogin);
              if (addedToDB === this.addedLogin) {
                console.log('Add user to DB');
                this.handleSnack(`Yeah!!! Now you have access to secret NASA data!`, 'green');
              }
            });
            //   } else {
            //     console.log('NO USER added to DB!! Error with getting user from Keycloak');
            //     this.handleSnack(`Oops! Something went wrong! Try again.`, 'red');
            //   }
            this.clearData();
          });
      } else {
        this.handleSnack(`Sorry! Data Base is disconnected :( Try again later.`, 'red');
        console.log('DB disconnected!!! NO USER add to keycloak');
        this.clearData();
      }
    },
    isConnectedToDB() {
      const isConnected = function () {
        axios
          .get('http://localhost:3000/check')
          .then((res) => {
            if (res.data === 'Online') {
              this.online = true;
              // console.log('Connected to BD', this.online);
            } else {
              this.online = false;
              // console.log('online', this.online);
            }
          })
          .catch(() => {
            this.online = false;
            console.log('Disconnected to DB!', this.online);
          });
      };
      setInterval(isConnected, 20000);
    },
    handleSnack(text, color) {
      this.snack({
        text: text,
        color: color,
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
