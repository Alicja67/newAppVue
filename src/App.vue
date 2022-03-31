<template>
  <div class="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
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

nav a{
  color: white;
  text-decoration: none;
}
</style>
