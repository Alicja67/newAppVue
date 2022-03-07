/* eslint-disable no-trailing-spaces */
/*eslint quotes: [2, "double", "avoid-escape"]*/

<template>
<div class="wrapper">
    <div class="search">
      <p>Search</p>
      <label for="search">
        <input
          name="search"
          id="search"
          type="text"
          v-model="searchValue"
          @input="handleInput"
        />
      </label>
    </div>
    <ul>
      <li v-for="result in results" :key="result.data[0].nasa_id">
        <p>{{ result.data[0].description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import debounce from 'lodash.debounce';

const API = 'https://images-api.nasa.gov';

export default {
  name: 'SearchView',
  data() {
    return {
      searchValue: '',
      results: [],
    };
  },
  methods: {
    handleInput: debounce(function () {
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

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .search {
    display: flex;
    flex-direction: column;
    width: 250px;

    input {
      height: 30px;
      border: 0;
      border-bottom: 1px solid black;
    }

    p {
      margin-bottom: 0;
    }
  }
</style>
