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
    // ...mapActions(['snackTitle']),
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
