<template>
  <div>
    <h3>All titles related to the space tag</h3>
    <div class="titles">
      <div class="title" v-for="one in newTitles" :key="one.id">{{ one }}</div>
      <div class="title" v-for="title in allTitles" :key="title.data[0].nasa_id">{{ title.data[0].title }}</div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'titles-component',
  methods: {
    ...mapActions(['fetchTitles']),
  },
  computed: { ...mapGetters(['allTitles', 'newTitles']) },
  created() {
    this.fetchTitles();
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
.titles {
  margin: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.title {
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
.title:hover {
  background: #25272c;
}
</style>
