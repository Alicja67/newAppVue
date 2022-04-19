<template>
  <div class="hero-wrapper">
  </div>
</template>

<script>
export default {
  name: 'HeroImage',
};
</script>
<style lang="scss" scoped>
.hero-wrapper {
  position: fixed;
  z-index: -1;
  top: 0;
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.1)), url('../assets/moon.jpg');
  // background-image: url('../assets/moon.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 0;
  width: 100%;
  height: 100vh;
}
</style>
