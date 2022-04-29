/* eslint-disable */
<template>
  <div class="header-wrapper">
    <h1 class="title">Space walk</h1>
    <p class="subtitle-one">Nasa shows amazing photos from the farthest places of space.</p>
    <p class="subtitle">What do you want to explore?</p>
  </div>
</template>
<script>
export default {
  name: 'header-component',
};
</script>
<style lang="scss" scoped>
.header-wrapper {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding-top: 180px;
}
.title {
  font-size: 5.5rem;
  text-transform: uppercase;
  font-weight: bold;
}
.subtitle-one {
  font-weight: bold;
  font-size: 1.3rem;
}
</style>
