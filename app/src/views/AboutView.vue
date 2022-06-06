<template>
  <div class="about">
    <div class="log-wrapper">
      <button class="log" @click="handleLogOut()">Log out</button>
    </div>
    <snack-vue></snack-vue>
    <add-title> </add-title>
    <titles-component> </titles-component>
    <remove-titles> </remove-titles>
  </div>
</template>

<script>
import TitlesComponent from '../components/TitlesComponent.vue';
import AddTitle from '../components/AddTitle.vue';
import RemoveTitles from '../components/RemoveTitles.vue';
import SnackVue from '../components/SnackVue.vue';

export default {
  name: 'about-view',
  components: {
    TitlesComponent,
    AddTitle,
    RemoveTitles,
    SnackVue,
  },
  methods: {
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
};
</script>
<style lang="scss">
@import '../assets/scss/variable';
@import '../assets/scss/input';
@import '../assets/scss/main';

div {
  overflow: auto;
}
body {
  position: fixed;
  z-index: -1;
  top: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)), url('../assets/images/planet.jpg');
  // background-image: url('../assets/moon.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 0;
  width: 100%;
  height: 100vh;
  color: white;
  overflow: auto;
}
</style>
