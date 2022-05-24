<template>
  <form @submit="onSubmit">
    <input class="search-input" name="search" id="search" type="text" :class="{ dark }" v-model="searchValue" />
    <input class="submit" type="submit" value="GO!" />
    <!-- <ul>
    <li v-for='result in results' :key='result.data[0].nasa_id'>
      <p>{{ result.data[0].description }}</p>
    </li>
  </ul> -->
  </form>
</template>
<script>
export default {
  name: 'search-input',
  data() {
    return {
      searchValue: '',
    };
  },
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
    onSubmit(e) {
      e.preventDefault();
      this.$emit('input', this.searchValue);
      console.log('value', this.searchValue);
    },
    // handleChange(e) {
    //   this.$emit('input', e.target.value);
    //   console.log('value', e.target.value);
    // },
  },
};
</script>
<style lang="scss" scoped>
.search-input {
  height: 50px;
  border: 0;
  border-bottom: 1px solid rgb(245, 241, 241);
  border-radius: 5px;
  background: none;
  margin-top: 60px;
  transition: box-shadow 0.5s;
  text-align: center;
  color: rgb(230, 232, 238);
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  transition: 1s;
}
.search-input:hover {
  outline: none;
  box-shadow: 0 5px 10px rgb(114, 119, 182);
  background: none;
}
p {
  margin-bottom: 0;
}
.dark {
  color: rgb(175, 166, 166);
  border-color: rgb(236, 232, 232);
}
.dark:focus {
  box-shadow: 0 5px 10px rgb(245, 241, 241);
  border-color: rgb(245, 241, 241);
}
.submit:hover {
  background: #0a0a0a;
}
.submit {
  cursor: pointer;
  background: #a0a0a0;
  color: rgb(227, 229, 238);
  font-size: 1.1rem;
  flex: 2;
  border: 1px solid #a0a0a0;
  border-radius: 5px;
  padding: 10px;
  transition: 1s;
  margin-right: 50px;
  padding: 10px 40px 10px;
  width: 250px;
  margin-left: 10px;
}
.submit:hover {
  background: #0a0a0a;
  border-color: black;
}
form {
  display: flex;
  align-items: flex-end;
  margin-left: 60px;
  margin-top: 100px;
}
</style>
