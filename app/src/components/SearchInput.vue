<template>
  <label for="search">
    <input name="search" id="search" type="text" :value="value" @input="handleChange" :class="{ dark }" />
  </label>
  <!-- <ul>
    <li v-for='result in results' :key='result.data[0].nasa_id'>
      <p>{{ result.data[0].description }}</p>
    </li>
  </ul> -->
</template>
<script>
export default {
  name: 'search-input',
  props: {
    value: {
      type: String,
      required: true,
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleChange(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>
<style lang="scss" scoped>
input {
  height: 30px;
  border: 0;
  border-bottom: 1px solid white;
  background: none;
  margin-top: 60px;
  transition: box-shadow 0.5s;
  text-align: center;
  color: white;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
input:focus {
  outline: none;
  box-shadow: 0 5px 10px white;
  background: none;
}
p {
  margin-bottom: 0;
}
.dark {
  color: black;
  border-bottom-color: black;
}
.dark:focus {
  box-shadow: 0 3px 3px black;
}
</style>
