<template>
  <div>
    <div class="log-wrapper">
      <button class="log" @click="handleLogOut()">Log out</button>
    </div>
    <h2 class="main-title">Check random message</h2>
    <div class="contacts">
      <h3>All authors:</h3>
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

export default {
  name: 'space-visitors',
  data() {
    return {
      randomMessage: 'banana',
      displayMessage: false,
    };
  },
  computed: {
    ...mapGetters({
      contacts: 'contacts',
    }),
  },
  methods: {
    ...mapActions(['fetchContact']),
    handleClick() {
      this.displayMessage = true;
      const randomIndex = Math.floor(Math.random() * this.contacts.length);
      const randomText = this.contacts[randomIndex].message;
      this.randomMessage = randomText;
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
  computed: {
    ...mapGetters(['contacts']),
  },
  created() {
    return this.fetchContact();
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/text';

.main-title {
  text-align: center;
  margin-top: 150px;
  font-size: 4.5rem;
}
.contacts {
  display: inline-block;
  color: white;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 80px 0 60px 0;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .author {
    margin: 10px;
  }
}
.randomMessage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: $subtitle-font-family;
  font-size: $subtitle-one-font-size;
}
</style>
