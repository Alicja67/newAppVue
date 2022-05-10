<template>
  <div class="about">
    <add-title> </add-title>
    <remove-titles> </remove-titles>
    <titles-component> </titles-component>
  </div>
</template>

<script>
/* eslint-disable */

// import axios from 'axios';
import TitlesComponent from '../components/TitlesComponent.vue';
import AddTitle from '../components/AddTitle.vue';
import RemoveTitles from '../components/RemoveTitles.vue';
import Keycloak from 'keycloak-js';

export default {
  name: 'about-view',
  components: {
    TitlesComponent,
    AddTitle,
    RemoveTitles,
  },
  mounted() {
    this.login();
  },
  methods: {
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
</style>
