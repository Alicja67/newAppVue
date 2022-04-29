<template>
  <div class="outer-wrapper">
    <div class="inner-wrapper">
      <div class="photo">
        <img :src="photo" alt="albedo" />
      </div>
      <div class="description">
        <h2 class="title">{{ title }}</h2>
        <p class="subtitle">
          {{ description }}
        </p>
        <!-- <p>Tags:</p> -->
        <div class="tags">
          Tags:
          <ul class="tags" v-for="tag in tags" :key="tag">
            <li>{{ tag }}</li>
          </ul>
        </div>
      </div>
    </div>
    <button type="button" class="close" @click="$emit('closeModel')">
      <span>×</span>
    </button>
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
    this.description = this.item.data[0].description.substring(0, 200);
    this.title = this.item.data[0].title;
    this.tags = this.item.data[0].keywords;
  },
};
</script>

<style lang="scss" scoped>
.outer-wrapper {
  max-width: 60%;
  max-height: 80%;
  position: fixed;
  background: rgb(248, 245, 245);
  top: 20px;
  // left: 20px;
  // border: 4px solid rgb(212, 208, 208);
  box-shadow: 0 30px 30px -10px rgba(71, 65, 65, 0.3);
}
.inner-wrapper {
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
  img {
    width: 100%;
    height: 100%;
  }
}
.description {
  // position: absolute;
  text-align: center;
  margin-top: 30px;
  .title {
    font-size: 30px;
    text-transform: uppercase;
  }
  .subtitle {
    font-size: 25px;
  }
}
.close {
  position: absolute;
  top: 20px;
  right: 20px;
  color: black;
  font-size: 20px;
  border: none;
  transition: 0.5s;
}
.close:hover {
  color: grey;
}
.tags {
  list-style-type: none;
  text-align: left;
  margin: 0;
  padding: 0;
}
</style>
