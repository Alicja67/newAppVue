<template>
  <div class="about">
    <div class="log-wrapper">
      <button class="log" @click="handleLogOut()">Log out</button>
    </div>
    <snack-vue></snack-vue>
    <add-title> </add-title>
    <remove-titles> </remove-titles>
    <titles-component> </titles-component>
  </div>
</template>

<script>
import TitlesComponent from '../components/TitlesComponent.vue';
import AddTitle from '../components/AddTitle.vue';
import RemoveTitles from '../components/RemoveTitles.vue';
import Keycloak from 'keycloak-js';
import SnackVue from '../components/SnackVue.vue';
// import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'about-view',
  components: {
    TitlesComponent,
    AddTitle,
    RemoveTitles,
    SnackVue,
  },
  mounted() {
    this.login();
    // this.displaySnack();
  },
  methods: {
    // ...mapActions(['snackTitle']),
    // displaySnack() {
    //   this.snackTitle();
    // },
    handleLogOut() {
      const KEYCLOAK = 'localhost:8080';
      const MY_REALM = 'spacer';
      console.log('clicked');
      const ENCODED_REDIRECT_URI = 'https://spacer-magic.mac.pl:8081';
      window.location.replace(
        `http://${KEYCLOAK}/auth/realms/${MY_REALM}/protocol/openid-connect/logout?redirect_uri=${ENCODED_REDIRECT_URI}`
      );
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
};
</script>
<style lang="scss">
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
</style>
