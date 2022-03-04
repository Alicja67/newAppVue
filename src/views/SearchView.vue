/* eslint-disable no-trailing-spaces */

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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchView',
  data() {
    return {
      searchValue: '',
    };
  },
  methods: {
    handleInput() {
      const API = 'https://images-api.nasa.gov';
      axios.get(`${API}/search?q=${this.searchValue}&media_type=image`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
