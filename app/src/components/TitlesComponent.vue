<template>
  <div>
    <h3>All titles relating space tag</h3>
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
.tags {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 12px;
}
</style>
