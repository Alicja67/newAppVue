<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <span>&#160; &#160; &#160; &#160;</span>
      <router-link to="/tag">Your tag</router-link>
      <span>&#160; &#160; &#160; &#160;</span>
      <router-link to="/visitors">Space Members</router-link>
      <span>&#160; &#160; &#160; &#160;</span>
      <router-link to="/contacts">Sign up</router-link>
      <span>&#160; &#160; &#160; &#160;</span>
      <button @click="handleLogOut">LOG OUT</button>
    </nav>
    <footer>
      <p><span>©</span> 2022 Copyrights: Alicja Latała</p>
    </footer>
    <router-view></router-view>
  </div>
</template>
<script>
import Keycloak from 'keycloak-js';
// import { KEYCLOCK_URL, KEYCLOCK_REALM_NAME, KEYCLOCK_CLIENT_ID } from 'dotenv/config';

export default {
  mounted() {
    this.login();
  },
  methods: {
    handleLogOut() {
      const KEYCLOAK = 'localhost:8080';
      const MY_REALM = 'spacer';
      window.location.replace(`http://${KEYCLOAK}/auth/realms/${MY_REALM}/protocol/openid-connect/logout`);
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
          console.log('TOKEN', this.decodeToken(keycloak.token));
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
              this.$store.commit('TOKEN_SET', keycloak.token);
            } else {
              console.log('Token is still valid');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };
    },
  },
};
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Hubballi&family=Montserrat:ital,wght@0,300;0,600;1,300&display=swap');
* {
  box-sizing: border-box;
}
body {
  font-family: 'Hubballi', cursive;
  font-family: 'Montserrat', sans-serif;
  padding: 0;
  margin: 0;
}
nav {
  padding: 15px;
}
nav a {
  color: white;
  text-decoration: none;
}
span {
  white-space: nowrap;
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
</style>
