<template>
  <div>
    <div class="log-wrapper">
      <button class="log" @click="handleLogOut()">Log out</button>
    </div>
    <div class="description">
      <h1 class="main-title">Hello {{ username }}</h1>
      <h3>Your keycloak ID: {{ id }}</h3>
      <div class="edit-wrapper">
        <div class="data-wrapper">
          <h3 v-if="!editing">Your full name: {{ fullName }}</h3>
          <input class="input-edit" v-else v-model="newFullname" type="text" placeholder="new full name..." />
          <h3 v-if="!editing">Your email: {{ email }}</h3>
          <input class="input-edit" v-else v-model="newEmail" placeholder="new email..." type="email" />
        </div>
        <button @click="handleEdit">{{ !editing ? 'EDIT' : 'UPDATE' }}</button>
      </div>
      <button class="provider" @click="handleProvider">Add Google/GitHub account to your aplication</button>
      <snack-vue></snack-vue>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';
import { mapGetters, mapActions } from 'vuex';
import Keycloak from 'keycloak-js';
import SnackVue from '../components/SnackVue.vue';

export default {
  name: 'profile-user',
  components: {
    SnackVue,
  },
  data() {
    return {
      editing: false,
      id: '',
      email: '',
      newEmail: '',
      fullName: '',
      newFullname: '',
      username: '',
      token: '',
      online: false,
    };
  },
  mounted() {
    this.login();
    this.getToken();
  },
  computed: {
    ...mapGetters(['loggedUsers']),
  },
  methods: {
    ...mapActions(['fetchLoggedUser', 'updateUser', 'snack']),
    handleProvider() {
      const KEYCLOAK = 'spacer-magic.mac.pl:8080';
      const MY_REALM = 'spacer';
      window.location.replace(`https://${KEYCLOAK}/auth/realms/${MY_REALM}/account/#/security/linked-accounts`);
      //   window.location.replace(
      //     'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?scope=openid%20profile%20email&state=ETsQyPGmoh4eN0cj4M8zykOoeiUVSvx9018yUJcLvaY.osMlTVcOwnk.account-console&response_type=code&client_id=456288635239-gn52u3h9jahcqtpq6tt0fhh691kimsts.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fspacer-magic.mac.pl%3A8080%2Fauth%2Frealms%2Fspacer%2Fbroker%2Fgoogle%2Fendpoint&nonce=e6JWgFnuKb2dcgeG5TIJ6g&flowName=GeneralOAuthFlow'
      //   );
    },
    getToken() {
      const KEYCLOCK_URL = `https://spacer-magic.mac.pl:8080`;
      const KEYCLOCK_REALM_NAME = 'spacer';
      let URL = `${KEYCLOCK_URL}/auth/realms/${KEYCLOCK_REALM_NAME}/protocol/openid-connect/token`;
      const data = {
        client_id: `admin-cli`,
        grant_type: 'password',
        username: `alicja`,
        password: `test`,
      };
      return axios.post(URL, qs.stringify(data)).then((res) => {
        this.token = res.data.access_token;
        console.log('Token is generated');
      });
    },
    async handleEdit() {
      let url = `https://spacer-magic.mac.pl:8080/auth/admin/realms/spacer/users/${this.id}`;
      let config = {
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-Type': 'application/json',
        },
      };
      const newData = {
        firstName: this.newFullname.split(' ')[0] || this.fullName.split(' ')[0],
        lastName: this.newFullname.split(' ')[1] || this.fullName.split(' ')[0],
        email: this.newEmail || this.email,
        username: this.username,
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

      if (this.online) {
        this.editing = !this.editing;
        this.email = this.newEmail;
        this.fullName = this.newFullname;
        await axios
          .put(url, JSON.stringify(newData), config)
          .then((res) => {
            console.log('editing, newEmail', this.editing, newData);
            console.log('res.data', res.data);
            this.updateUser({
              id: this.id,
              firstName: this.newFullname.split(' ')[0] || 'No',
              lastName: this.newFullname.split(' ')[1] || 'Name',
              email: this.newEmail || this.email,
              login: this.username,
            });
            this.fetchLoggedUser({
              id: this.id,
              email: this.email,
              username: this.username,
              fullname: this.fullName,
            });
            // this.handleSnack(`Great! You update your data.`, 'green');
          })
          .catch((err) => {
            this.errorMessage = err.response.data.error;
            console.log('err.response', err.response);
            this.handleSnack(`${this.errorMessage}! Try again.`, 'red');
          });
      } else {
        this.handleSnack(`Sorry! Data Base is disconnected :( Try again later.`, 'red');
        console.log('Error');
      }
    },
    handleSnack(text, color) {
      this.snack({
        text: text,
        color: color,
      });
    },
    login() {
      var keycloak = Keycloak({
        realm: `spacer`,
        url: `https://spacer-magic.mac.pl:8080/auth`,
        clientId: `spacer`,
        'ssl-required': 'all',
        resource: `spacer`,
        'public-client': true,
        'confidential-port': 0,
      });

      keycloak
        .init({
          // flow: 'implicit',
          promiseType: 'native',
          onLoad: 'login-required',
        })
        .then((authenticated) => {
          // console.log(JSON.stringify(keycloak.tokenParsed));
          this.id = keycloak.idTokenParsed.sub;
          this.email = keycloak.idTokenParsed.email || 'not define';
          this.username = keycloak.idTokenParsed.preferred_username;
          this.fullName = keycloak.idTokenParsed.name || 'not define';
          // console.log('id', this.id);
          // console.log('email', this.email);
          console.log('You are log in!');
          this.fetchLoggedUser({
            id: this.id,
            email: this.email,
            username: this.username,
            fullname: this.fullName,
          });
          return authenticated;
        })
        .catch((error) => {
          console.error(error);
        });
      keycloak.onTokenExpired = () => {
        keycloak
          .updateToken(30)
          .then((refreshed) => {
            if (refreshed) {
              // this.$store.commit("TOKEN_SET", keycloak.token);
            } else {
              console.log('Token is still valid');
            }
          })
          .catch((error) => {
            console.log('CATCH?! ');
            console.error(error);
          });
      };
    },
    handleLogOut() {
      const URL =
        'https://spacer-magic.mac.pl:8080/auth/realms/spacer/protocol/openid-connect/logout?redirect_uri=https://spacer-magic.mac.pl:8081';
      const KEYCLOAK = 'spacer-magic.mac.pl:8080';
      const MY_REALM = 'spacer';
      const REDIRECT_URI = 'https://spacer-magic.mac.pl:8081';
      console.log('You are logged out');
      // window.location.replace(
      //   `https://${KEYCLOAK}/auth/realms/${MY_REALM}/protocol/openid-connect/logout?redirect_uri=${REDIRECT_URI}`
      // );
      window.location.replace(URL);
    },
  },
  getUserData() {
    let config = {
      headers: {
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json',
      },
    };
    axios
      .get(
        'https://spacer-magic.mac.pl:8080/auth/admin/realms/spacer/users/4bbb90e8-d359-4403-b45c-9bc9464cb358',
        config
      )
      .then((res) => {
        console.log(res.data);
        this.userName = res.data.username;
        this.federatedIdentities = res.data.federatedIdentities[0].identityProvider;
        this.id = res.data.id;
      });
  },
  getToken() {
    const KEYCLOCK_URL = `https://spacer-magic.mac.pl:8080`;
    const KEYCLOCK_REALM_NAME = 'spacer';
    let URL = `${KEYCLOCK_URL}/auth/realms/${KEYCLOCK_REALM_NAME}/protocol/openid-connect/token`;
    const data = {
      client_id: `admin-cli`,
      grant_type: 'password',
      username: `alicja`,
      password: `test`,
    };
    return axios.post(URL, qs.stringify(data)).then((res) => {
      this.token = res.data.access_token;
      console.log('Token is generated');
    });
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/variable';

body {
  background: black;
  color: white;
}
.log-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-right: 50px;
}
.description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 300px);
}
.edit-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 700px;
  margin-top: 60px;
  button {
    height: 100%;
    margin: 0;
    padding: 30px 47px 30px 30px;
    text-align: center;
  }
}
.data-wrapper {
  display: flex;
  flex-direction: column;
  width: 900px;
  height: 100%;
  h3 {
    margin: 0;
    padding: 15px;
    background: rgba(7, 3, 3, 0.3);
    text-align: right;
    width: 100%;
  }
}
.input-edit {
  background: $dark-font-color;
  width: 100%;
  color: rgb(255, 251, 251);
}
.provider {
  // background: blue;
  margin-top: 100px;
}
</style>
