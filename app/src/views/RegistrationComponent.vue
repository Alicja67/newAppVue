<template>
  <div class="wrapper">
    <h2 class="main-title">Become a part of NASA project!</h2>
    <form method="post" @submit="onSubmit">
      <label class="form-label" for="firstName">
        <p>First name:</p>
        <input class="form-input" type="text" name="firstName" v-model="firstName" required />
      </label>
      <label class="form-label" for="lastName">
        <p>Last name:</p>
        <input class="form-input" type="text" name="lastName" v-model="lastName" required />
      </label>
      <label class="form-label" for="email">
        <p>E-mail:</p>
        <input class="form-input" type="email" name="email" v-model="email" required />
      </label>
      <label class="form-label" for="login">
        <p>Login:</p>
        <input class="form-input" type="text" name="login" v-model="login" required />
      </label>
      <label class="form-label" for="password">
        <p>Password:</p>
        <input class="form-input" type="password" name="password" v-model="password" required />
      </label>
      <!-- <label class="form-label" for="password">
        <p class="google-label">Add Google Authorisation?</p>
        <input class="google-checkbox" type="checkbox" id="myCheckBox" v-model="checked" />
      </label> -->
      <div class="submit-form">
        <button type="submit">Register</button>
      </div>
    </form>
    <snack-vue></snack-vue>
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
      id: '',
      online: false,
      addedLogin: '',
      addedId: '',
      errorMessage: '',
      checked: false,
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
        console.log('Token is generated');
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
        // federatedIdentities: [
        //   {
        //     identityProvider: 'google',
        //     userId: '104657905513285607426',
        //     userName: 'latala.mateusz@gmail.com',
        //   },
        // ],
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
            console.log('errorMessage', this.errorMessage);
            if (!this.errorMessage) {
              const addedUserData = res.data.find((user) => user.username === this.login);
              this.addedLogin = addedUserData.username;
              this.addedId = addedUserData.id;
              console.log('addedUserData', addedUserData, this.addedLogin, this.addedId);
              if (addedUserData.id) {
                this.addUser({
                  firstName: addedUserData.firstName,
                  lastName: addedUserData.lastName,
                  email: addedUserData.email,
                  login: addedUserData.username,
                  password: this.password,
                  id: addedUserData.id,
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
              } else {
                axios.delete(`https://spacer-magic.mac.pl:8080/auth/admin/realms/spacer/users/${this.addedId}`, {
                  headers: { Authorization: `Bearer ${this.token}` },
                });
                this.handleSnack(`Oops! Something went wrong!`, 'red');
                console.log('User were deleted from Keycloak due to error with DB.');
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
@import '../assets/scss/form';
@import '../assets/scss/text';

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main-title {
  font-size: 4rem;
  margin: 100px 0 60px 0;
}
.form-label-provider {
  display: flex;
  justify-content: center;
  width: 600px;
}
.google-label {
  width: 300px;
}
.google-checkbox {
  height: 30px;
  width: 30px;
  position: relative;
  right: 150px;
}
</style>
