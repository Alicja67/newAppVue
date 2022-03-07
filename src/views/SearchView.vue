<template>
  <div :class="[{ flexStart: step === 1 }, 'wrapper']">
    <HeroImage v-if="step === 0"/>
    <HeaderComponent v-if="step === 0" />
    <SearchInput v-model="searchValue" @input="handleInput" :dark="step === 1" />
  </div>
</template>

<script>
import axios from 'axios';
import debounce from 'lodash.debounce';
import HeaderComponent from '../components/HeaderComponent.vue';
import SearchInput from '../components/SearchInput.vue';
import HeroImage from '../components/HeroImage.vue';

const API = 'https://images-api.nasa.gov';

export default {
  name: 'SearchView',
  components: {
    HeaderComponent,
    SearchInput,
    HeroImage,
  },
  data() {
    return {
      loading: false,
      step: 0,
      searchValue: '',
      results: [],
    };
  },
  methods: {
    handleInput: debounce(function () {
      console.log(this.searchValue);
      this.loading = true;
      axios.get(`${API}/search?q=${this.searchValue}&media_type=image`)
        .then((response) => {
          this.results = response.data.collection.items;
          console.log(response.data.collection.items);
          this.loading = false;
          this.step = 1;
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500),
  },
};
</script>

<style lang='scss' scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.flexStart {
      justify-content: flex-start;
    }
  }

</style>
