<template>
  <div>
    <h3>All titles related to the space tag</h3>
    <div class="tags">
      <div class="tag" v-for="tag in allTags" :key="tag.data[0].nasa_id">{{ tag.data[0].title }}</div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'titles-component',
  methods: {
    ...mapActions(['fetchTags']),
  },
  computed: { ...mapGetters(['allTags']) },
  created() {
    this.fetchTags();
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Hubballi&family=Montserrat:ital,wght@0,300;0,600;1,300&display=swap');

body {
  font-family: 'Montserrat', sans-serif;
}
h3 {
  text-align: center;
  font-size: 35px;
}
.tags {
  margin: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.tag {
  border: 1px solid rgb(231, 210, 210);
  background: #343a46;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: 0.5s;
  // font-family: 'Hubballi', cursive;
}
.tag:hover {
  background: #25272c;
}
</style>
