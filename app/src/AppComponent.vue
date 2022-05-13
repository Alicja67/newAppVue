<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <span>&#160; &#160; &#160; &#160;</span>
      <router-link to="/tag">Your tag</router-link>
      <span>&#160; &#160; &#160; &#160;</span>
      <router-link to="/visitors">Space Members</router-link>
      <span>&#160; &#160; &#160; &#160;</span>
      <router-link to="/message">Send Message</router-link>
      <span>&#160; &#160; &#160; &#160;</span>
    </nav>
    <router-view></router-view>
    <footer-vue></footer-vue>
  </div>
</template>
<script>
import Keycloak from 'keycloak-js';
import FooterVue from './components/FooterVue.vue';
// import 'dotenv/config';

export default {
  name: 'app-component',
  components: {
    FooterVue,
  },
  data() {
    return {
      logged: true,
      logOut: 'Log out',
      logIn: 'Log in',
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
      const ENCODED_REDIRECT_URI = 'https://spacer-magic.mac.pl:8081/';
      window.location.replace(
        `http://${process.env.KEYCLOAK}/auth/realms/${process.env.MY_REALM}/protocol/openid-connect/logout?redirect_uri=${process.env.ENCODED_REDIRECT_URI}`
      );
      this.logText = 'Log out';
    },
    handleLogIn() {
      this.login();
      this.logged = !this.logged;
    },
    login() {
      var keycloak = Keycloak({
        realm: `spacer`,
        url: `http://localhost:8080/auth`,
        clientId: `spacer`,
        // 'ssl-required': 'all',
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
  font-size: 1.3rem;
  .log {
    font-size: 1rem;
  }
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
.log {
  position: relative;
  padding: 10px;
  border: 1px solid #b0b1b3;
  background: #2770dd;
  border-radius: 5px;
  color: rgb(231, 232, 236);
  cursor: pointer;
  font-weight: bold;
  transition: 1s;
}
.log:hover {
  background: #0a0a0a;
}
.log {
  cursor: pointer;
  height: 100%;
  background: #27396e;
  color: rgb(234, 237, 247);
  font-size: 1.5rem;
  border-bottom: 1px solid rgb(245, 241, 241);
  border-right: 1px solid rgb(245, 241, 241);
  border-left: 1px solid rgb(245, 241, 241);
  border-radius: 5px;
  padding: 10px;
  margin-left: 20px;
  -webkit-box-shadow: 4px 4px 15px -1px #fffcf2;
  box-shadow: 3px 3px 70px -1px #fffcf2;
}
</style>
