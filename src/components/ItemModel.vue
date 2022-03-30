<template>
<div class="outer-wrapper">
  <div class="inner-wrapper">
      <div class="photo">
        <img :src="photo" alt="albedo">
      </div>
      <div class="description">
        <h2 class="title">{{ title }}</h2>
        <p class="subtitle">
          {{ description }}
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
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      photo: null,
      title: '',
      description: '',
      tags: [],
      // photo: this.links[0].href,
      // description: this.links[0].description.substring(0, 200),
      // decsr: this.links[0].title,
    };
  },
  mounted() {
    this.photo = this.item.links[0].href;
    this.description = this.item.data[0].description;
    this.title = this.item.data[0].title;
    // this.tags = this.data[0].keywords;
  },
};
</script>

<style lang="scss">

.outer-wrapper {
  max-width: 60%;
  height: 60%;
  position: fixed;
  background: rgb(248, 245, 245);
  top: 20px;
  left: 20px;
  // border: 4px solid rgb(212, 208, 208);
  box-shadow: 0 30px 30px -10px rgba(0,0,0,.3);
}
.inner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 50px;
  // flex-direction: columns;
}
.photo {
  width: 80%;
  height: auto;
  background: black;
  img {
    width: 80%;
    height: 80%;
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
