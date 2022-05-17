<template>
  <div class="app">
    <div v-if="logged">
      <button class="log" @click="handleLog">{{ logText }}</button>
      <div class="description">
        <h1>One slep to become a space member</h1>
        <h2>Don't forget to log in!!!</h2>
      </div>
    </div>
    <!-- <button class="log" @click="handleLogIn()" v-else>{{ logIn }}</button> -->
    <app-component v-else></app-component>
    <footer>
      <p><span>©</span> 2022 Copyrights: Alicja Latała</p>
    </footer>
    <router-view></router-view>
  </div>
</template>
<script>
import Keycloak from 'keycloak-js';
import AppComponent from './AppComponent.vue';
// import { KEYCLOCK_URL, KEYCLOCK_REALM_NAME, KEYCLOCK_CLIENT_ID } from 'dotenv/config';

export default {
  name: 'main-vue',
  components: {
    AppComponent,
  },
  data() {
    return {
      logged: true,
      logText: 'Log in',
    };
  },
  mounted() {
    // this.login();
  },
  methods: {
    handleLogOut() {
      const KEYCLOAK = 'localhost:8080';
      const MY_REALM = 'spacer';
      const ENCODED_REDIRECT_URI = 'http://localhost:8081';
      window.location.replace(
        `http://${KEYCLOAK}/auth/realms/${MY_REALM}/protocol/openid-connect/logout?redirect_uri=${ENCODED_REDIRECT_URI}`
      );
      this.logText = 'Log out';
    },
    handleLog() {
      this.login();
      this.logText = 'Log out';
      this.logged = !this.logged;
    },
    login() {
      var keycloak = Keycloak({
        realm: `spacer`,
        url: `http://localhost:8080/auth`,
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
          // console.log('TOKEN', this.decodeToken(keycloak.token));
          return authenticated;
        })
        .catch((error) => {
          console.error(error);
        });

      // keycloak.onTokenExpired = () => {
      //   keycloak
      //     .updateToken(30)
      //     .then((refreshed) => {
      //       if (refreshed) {
      //         this.$store.commit('TOKEN_SET', keycloak.token);
      //       } else {
      //         console.log('Token is still valid');
      //       }
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // };
    },
  },
};
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Hubballi&family=Montserrat:ital,wght@0,300;0,600;1,300&display=swap');
* {
  box-sizing: border-box;
}
.app {
  position: fixed;
  z-index: -1;
  top: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1)), url('./assets/moon.jpg');
  // background-image: url('../assets/moon.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 0;
  width: 100%;
  height: 100vh;
}
footer {
  // background: black;
  width: 100vw;
  margin: 0;
  position: fixed;
  bottom: 10px;
  left: 50px;
  span {
    font-size: 1.3rem;
  }
}
.log:hover {
  background: #0a0a0a;
}
.log {
  cursor: pointer;
  height: 100%;
  background: #27396e;
  color: rgb(217, 220, 230);
  font-size: 1.5rem;
  border-bottom: 1px solid rgb(14, 13, 13);
  border-right: 1px solid rgb(8, 8, 8);
  border-left: 1px solid rgb(27, 26, 26);
  border-radius: 5px;
  padding: 10px;
  margin-left: 20px;
  -webkit-box-shadow: 4px 4px 15px -1px #fffcf2;
  box-shadow: 3px 3px 70px -1px #fffcf2;
  position: relative;
  top: 50px;
  right: -50px;
}
.description {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  text-align: center;
  h1 {
    font-size: 4rem;
  }
}
</style>
