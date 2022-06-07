<template>
  <div>
    <div class="log-wrapper">
      <button class="log" @click="logOut">Log out</button>
    </div>
    <div v-if="!joined" class="parent-container">
      <h1 class="join-title">Write your login and join CHAT</h1>
      <div class="name-container">
        <input type="text" class="user-name" v-model="currentUser" />
        <button class="join-button" @click="join">Join</button>
      </div>
    </div>
    <div class="text-input-container" v-else>
      <div class="list-container" v-for="message in messages" :key="message.id">
        <b>{{ message.user }}</b>
        : {{ message.text }}
      </div>
      <form>
        <textarea
          @keyup.enter="sendMessage"
          class="text-message"
          cols="30"
          rows="10"
          v-model="text"
          placeholder="Write your message..."
        ></textarea>
      </form>
    </div>
  </div>
</template>
<script>
import { io } from 'socket.io-client';

export default {
  name: 'chat-vue',
  data() {
    return {
      joined: false,
      currentUser: '',
      text: '',
      messages: [],
    };
  },
  methods: {
    join() {
      console.log('currentUser', this.currentUser);
      this.joined = true;
      this.socketInstace = io('http://localhost:3000');
      this.socketInstace.on('message:received', (data) => {
        this.messages = this.messages.concat(data);
      });
    },
    sendMessage() {
      console.log('this.message', this.text);
      this.addMessage();
      this.text = '';
    },
    addMessage() {
      const message = {
        id: Math.random() * 1000,
        text: this.text,
        user: this.currentUser,
      };

      this.messages = this.messages.concat(message);
      this.socketInstace.emit('message', message);
    },
    logOut() {
      const KEYCLOAK = 'spacer-magic.mac.pl:8080';
      const MY_REALM = 'spacer';
      const REDIRECT_URI = 'https://spacer-magic.mac.pl:8081';
      const URL = `https://${KEYCLOAK}/auth/realms/${MY_REALM}/protocol/openid-connect/logout?redirect_uri=${REDIRECT_URI}`;
      console.log('You are logged out');
      window.location.replace(URL);
    },
  },
};
</script>
<style lang="scss" scoped>
.parent-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: top;
  align-items: center;
  flex-direction: column;
  position: fixed;
  padding-top: 0px;
}
.join-title {
  font-size: 3rem;
  margin: 100px 0;
}
.user-name {
  height: 53px;
  font-size: 20px;
  width: 300px;
}
.text-message {
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0;
  height: 150px;
  padding: 10px;
}
// .text-input-container {
//   height: 100vh;
// }
.list-container {
  background: rgb(226, 226, 231);
  color: black;
  border-radius: 5px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // min-width: 200px;
  max-width: 500px;
  padding: 15px;
  margin: 10px auto;
}
</style>
