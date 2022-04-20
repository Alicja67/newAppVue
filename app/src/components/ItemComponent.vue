<template>
  <div :style="style" class="item"></div>
</template>
<script>
export default {
  name: 'item-component',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      photo: this.item.links[0].href,
      title: this.item.data[0].title,
    };
  },
  computed: {
    style() {
      return `background-image: url("${this.photo}")`;
    },
  },
};
</script>
<style lang="scss" scoped>
.item {
  width: 25vw;
  height: 250px;
  // background-color: rgb(226, 221, 221);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  // border: 1px solid black;
}
</style>
