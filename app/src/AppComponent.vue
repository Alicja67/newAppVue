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
      <router-link to="/profile">Profile</router-link>
      <span>&#160; &#160; &#160; &#160;</span>
      <router-link to="/register">Register</router-link>
      <span>&#160; &#160; &#160; &#160;</span>
    </nav>
    <router-view></router-view>
    <footer-vue></footer-vue>
  </div>
</template>
<script>
import FooterVue from './components/FooterVue.vue';

export default {
  name: 'app-component',
  components: {
    FooterVue,
  },
};
</script>
<style lang="scss" scoped>
@import './assets/scss/main';
@import './assets/scss/variable';
@import './assets/scss/nav';
@import './assets/scss/text';
@import './assets/scss/footer';

body {
  font-family: $title-font-family;
  font-family: 'Montserrat', sans-serif;
  padding: 0;
  margin: 0;
  overflow: auto;
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
