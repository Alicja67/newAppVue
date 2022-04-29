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
    <div class="description">
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
    this.description = this.item.data[0].description.substring(0, 100);
    this.title = this.item.data[0].title;
    this.tags = this.item.data[0].keywords;
  },
};
</script>

<style lang="scss" scoped>
.outer-wrapper {
  width: 50%;
  // height: 80%;
  position: fixed;
  background: rgb(238, 234, 234);
  top: 20px;
  // left: 20px;
  // border: 4px solid rgb(212, 208, 208);
  box-shadow: 0 30px 30px -10px rgba(71, 65, 65, 0.3);
  border: 4px solid white;
  border-radius: 5px;
}
.photo-part {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 50px;
  flex-direction: column;
  color: black;
}
.photo {
  // position: absolute;
  width: 300px;
  height: 300px;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.description {
  // position: absolute;
  background: black;
  text-align: center;
  padding-top: 30px;
  .title {
    font-size: 30px;
    text-transform: uppercase;
  }
  .subtitle {
    font-size: 25px;
    margin: 0 20px 20px 20px;
  }
}
.close {
  position: absolute;
  top: 20px;
  right: 20px;
  color: rgb(241, 238, 238);
  font-size: 20px;
  border: none;
  transition: 0.5s;
  background: black;
  border-radius: 5px;
}
.close:hover {
  color: grey;
}
.tags {
  list-style-type: none;
  text-align: left;
  // margin: 20px;
  padding: 0 0 20px 20px;
}
.tag {
  list-style-type: none;
  text-align: left;
  margin: 0;
  padding: 0;
}
</style>
