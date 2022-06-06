<template>
  <div class="outer-wrapper">
    <div class="photo-part">
      <div class="photo">
        <img :src="photo" alt="albedo" />
      </div>
      <button type="button" class="close" @click="$emit('closeModel')">
        <span>×</span>
      </button>
    </div>
    <div class="description-wrapper">
      <h2 class="title">{{ title }}</h2>
      <p class="subtitle">
        {{ description }}
      </p>
      <!-- <p>Tags:</p> -->
      <div class="tags">
        Tags:
        <ul class="tag" v-for="tag in tags" :key="tag">
          <li>{{ tag }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'item-model',
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
    console.log('photo', this.photo);
    this.description = this.item.data[0].description.substring(0, 100);
    this.title = this.item.data[0].title;
    this.tags = this.item.data[0].keywords;
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/input';
@import '../assets/scss/variable';
@import '../assets/scss/text';

.outer-wrapper {
  width: 50%;
  // height: 80%;
  position: fixed;
  background: $light-font-color;
  top: 20px;
  // left: 20px;
  // border: 4px solid rgb(212, 208, 208);
  box-shadow: 0 30px 30px -10px rgba(71, 65, 65, 0.3);
  border: 4px solid rgb(243, 242, 242);
  border-radius: 5px;
}
.photo-part {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 50px;
  flex-direction: column;
  color: $dark-font-color;
}
.photo {
  // position: absolute;
  width: 300px;
  height: 300px;
  background: $dark-font-color;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.description-wrapper {
  background: $dark-font-color;
  text-align: center;
  padding-top: 30px;
  .title {
    font-size: 1.9rem !important;
    font-family: $title-font-family;
    text-transform: uppercase;
    color: $light-font-color;
  }
  .subtitle {
    font-size: 1.2rem;
    margin: 0 20px 20px 20px;
    color: $light-font-color;
    font-family: $subtitle-font-family;
  }
}
.close {
  position: absolute;
  top: 20px;
  right: 20px;
  color: $light-font-color;
  font-size: 20px;
  border: none;
  transition: 0.5s;
  background: $dark-font-color;
  border-radius: 5px;
  padding: 5px 10px !important;
  span {
    height: 10px;
    width: 1px;
  }
}
.close:hover {
  color: grey;
}
.tags {
  list-style-type: none;
  text-align: left;
  padding: 0 0 20px 20px;
  color: $light-font-color;
  font-family: $subtitle-font-family;
}
.tag {
  list-style-type: none;
  text-align: left;
  margin: 0;
  padding: 0;
  color: $light-font-color;
  font-family: $subtitle-font-family;
  font-style: italic;
  font-size: 0.9rem;
}
</style>
