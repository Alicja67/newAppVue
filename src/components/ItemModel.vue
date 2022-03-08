<template>
<div class="outer-wrapper">
  <div class="inner-wrapper">
      <div class="photo">
        <img src="https://images-assets.nasa.gov/image/PIA12235/PIA12235~thumb.jpg" alt="albedo">
      </div>
      <div class="description">
        <h2 class="title">Lorem Ipsum</h2>
        <p class="subtitle">
          Lorem Ipsum is simply dummy text of the printing and typesetting.
        </p>
        <p class='tags'>
          Tags:
        </p>
      </div>
    </div>
    <button type="button" class="close" @click="$emit('closeModel')">
      <span>×</span>
    </button>
  </div>
</template>
<script>
export default {
  name: 'ItemModel',
};
</script>
<style lang="scss">

.outer-wrapper {
  max-width: 60%;
  height: 60%;
  position: fixed;
  background: white;
  top: 50px;
  left: 0;
}
.inner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 50px;
  flex-direction: column;
}
.photo {
  width: 90%;
  height: auto;
  background: black;
  img {
    width: 100%;
    height: 100%;
  }
}
.description {
  text-align: center;
  margin-top: 30px;
}
.close{
  position: absolute;
  top: 20px;
  right: 20px;
  color: black;
  font-size: 20px;
  border: none;
  transition: .5s;
}
.close:hover {
  color: grey;
}
</style>
