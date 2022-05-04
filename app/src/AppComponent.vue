<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <span>&#160; &#160; &#160; &#160;</span>
      <router-link to="/tag">Your tag</router-link>
      <span>&#160; &#160; &#160; &#160;</span>
      <router-link to="/visitors">Space Members</router-link>
      <span>&#160; &#160; &#160; &#160;</span>
      <router-link to="/contacts">Sign up</router-link>
    </nav>
    <footer>
      <p><span>©</span> 2022 Copyrights: Alicja Latała</p>
    </footer>
    <router-view></router-view>
  </div>
</template>

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
</style>
