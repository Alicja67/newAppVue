<template>
  <div>
    <div class="log-wrapper">
      <button class="log" @click="handleLogOut()">Log out</button>
    </div>
    <h2 class="title">I's nice to meet all space explorers</h2>
    <div class="contacts">
      <div v-for="contact in contacts" :key="contact._id">
        <p class="author">
          <i class="fa-solid fa-heart"></i>
          {{ contact.author }}
          <i class="fa-solid fa-heart"></i>
        </p>
      </div>
    </div>
    <div class="randomMessage">
      <button @click="handleClick">Today's gift for aliens</button>
      <p class="randomMessage">{{ displayMessage ? randomMessage : '' }}</p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Keycloak from 'keycloak-js';

export default {
  name: 'space-visitors',
  data() {
    return {
      randomMessage: 'banana',
      displayMessage: false,
    };
  },
  mounted() {
    this.login();
    // this.loginAdmin();
  },
  methods: {
    ...mapActions(['fetchContact']),
    handleClick() {
      this.displayMessage = true;
    },
    handleLogOut() {
      const KEYCLOAK = 'localhost:8080';
      const MY_REALM = 'spacer';
      const ENCODED_REDIRECT_URI = 'https://spacer-magic.mac.pl:8081';
      window.location.replace(
        `http://${KEYCLOAK}/auth/realms/${MY_REALM}/protocol/openid-connect/logout?redirect_uri=${ENCODED_REDIRECT_URI}`
      );
      this.logText = 'Log out';
    },
    loginAdmin() {
      var keycloak = Keycloak({
        realm: `spacer`,
        // url: `http://localhost:8080/auth`,
        // url: `http://localhost:8080/auth/realms/spacer/protocol/openid-connect/token`,
        clientId: `spacer`,
        username: 'alicja',
        password: 'test',
        grant_type: 'password',
        'ssl-required': 'all',
        resource: `spacer`,
        'public-client': true,
        'confidential-port': 0,
      });
      console.log('keycloak', keycloak);

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
  computed: {
    ...mapGetters(['contacts']),
  },
  created() {
    return this.fetchContact();
  },
};
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
  margin-top: 150px;
  font-size: 2rem;
}
.contacts {
  display: inline-block;
  color: white;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 50px 0 100px 0;
  justify-content: center;
  .author {
    margin: 10px;
  }
}
.randomMessage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
button {
  position: relative;
  padding: 10px;
  border: 1px solid #b0b1b3;
  background: #27396e;
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
.log {
  position: relative;
  padding: 10px;
  border: 1px solid #d4d6da;
  background: #27396e;
  border-radius: 5px;
  color: rgb(239, 241, 252);
  cursor: pointer;
  font-size: 1.1rem;
  transition: 1s;
  margin-right: 50px;
  font-size: 1.5rem;
}
.log:hover {
  background: #0a0a0a;
}
</style>
