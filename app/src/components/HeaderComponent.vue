/* eslint-disable */
<template>
  <div class="header-wrapper">
    <h1 class="main-title">Space walk</h1>
    <p class="subtitle-one">Nasa shows amazing photos from the farthest places of space.</p>
    <p class="subtitle-two">What do you want to explore?</p>
  </div>
</template>
<script>
export default {
  name: 'header-component',
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/text';

.header-wrapper {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding-top: 180px;
}
</style>
