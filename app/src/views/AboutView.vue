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
div {
  overflow: auto;
}
body {
  position: fixed;
  z-index: -1;
  top: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)), url('../assets/planet.jpg');
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
input[type='text'] {
  flex: 10;
  padding: 10px;
  border: 1px solid #365f37;
  background: #0a0a0a;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  cursor: pointer;
  transition: 1s;
  color: #f7f7f8;
  width: 100px;
}
input[type='email'] {
  flex: 10;
  padding: 10px;
  border: 1px solid #365f37;
  background: #0a0a0a;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  cursor: pointer;
  transition: 1s;
  color: #f7f7f8;
}
input[type='submit'] {
  cursor: pointer;
  background: #257b26;
  color: rgb(227, 229, 238);
  font-size: 1.1rem;
  flex: 2;
  border: 1px solid #365f37;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 10px;
  transition: 1s;
  margin-right: 50px;
  padding: 10px 40px 10px;
  width: 250px;
}
input[type='submit']:hover {
  background: #0a0a0a;
}
input[type='text']:hover {
  background: #f3f1f1;
  color: black;
}
.log {
  position: relative;
  padding: 10px;
  border: 1px solid #365f37;
  background: #257b26;
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
button {
  position: relative;
  padding: 15px;
  border: 1px solid #365f37;
  background: #257b26;
  border-radius: 5px;
  color: rgb(231, 232, 236);
  cursor: pointer;
  font-weight: bold;
  font-size: 1.3rem;
  transition: 1s;
  margin-top: 20px;
}
button:hover {
  background: #0a0a0a;
}
.log-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-right: 50px;
  margin-top: -40px;
}
</style>
