<template>
  <div>
    <div class="log-wrapper">
      <button class="log" @click="handleLogOut()">Log out</button>
    </div>
    <div class="description">
      <h1>Hello {{ username }}</h1>
      <h3>Your full name: {{ fullName }}</h3>
      <h3>Your keycloak ID: {{ id }}</h3>
      <h3>Your email: {{ email }}</h3>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';
import { mapActions } from 'vuex';
import Keycloak from 'keycloak-js';

export default {
  name: 'profile-user',
  data() {
    return {
      id: '',
      email: '',
      fullName: '',
      username: '',
    };
  },
  mounted() {
    this.login();
  },
  methods: {
    ...mapActions(['fetchLoggedUser']),
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
          console.log(JSON.stringify(keycloak.tokenParsed));
          this.id = keycloak.idTokenParsed.jti;
          this.email = keycloak.idTokenParsed.email || 'not define';
          this.username = keycloak.idTokenParsed.preferred_username;
          this.fullName = keycloak.idTokenParsed.name || 'not define';
          console.log('id', this.id);
          console.log('email', this.email);
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
body {
  background: black;
  color: white;
}
.log-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-right: 50px;
  margin-top: -40px;
}
.description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px);
}
</style>
