<template>
  <div class="wrapper">
    <HeaderComponent />
    // eslint-disable-next-line
    <SearchInput v-model="searchValue" @input="handleInput"/>
  </div>

</template>

<script>
import axios from 'axios';
import debounce from 'lodash.debounce';
import HeaderComponent from '../components/HeaderComponent.vue';
import SearchInput from '../components/SearchInput.vue';

const API = 'https://images-api.nasa.gov';

export default {
  name: 'SearchView',
  components: {
    HeaderComponent,
    SearchInput,
  },
  data() {
    return {
      searchValue: '',
      results: [],
    };
  },
  methods: {
    handleInput: debounce(function () {
      console.log(this.searchValue);
      axios.get(`${API}/search?q=${this.searchValue}&media_type=image`)
        .then((response) => {
          this.results = response.data.collection.items;
          console.log(response.data.collection.items);
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
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.1)), url('../assets/moon.jpg');
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 0;
    width: 100%;
    height: 100vh;
  }

</style>
