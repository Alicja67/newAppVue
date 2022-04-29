<template>
  <form @submit="onSubmit">
    <input name="search" id="search" type="text" :class="{ dark }" v-model="searchValue" />
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
input {
  height: 50px;
  border: 0;
  border-bottom: 1px solid rgb(245, 241, 241);
  border-right: 1px solid rgb(245, 241, 241);
  border-left: 1px solid rgb(245, 241, 241);
  border-radius: 5px;
  background: none;
  margin-top: 60px;
  transition: box-shadow 0.5s;
  text-align: center;
  color: rgb(245, 241, 241);
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
input:focus {
  outline: none;
  box-shadow: 0 5px 10px rgb(245, 241, 241);
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
.submit {
  cursor: pointer;
  height: 100%;
  background: #12141a;
  color: rgb(234, 237, 247);
  font-size: 1.5rem;
  border-bottom: 1px solid rgb(245, 241, 241);
  border-right: 1px solid rgb(245, 241, 241);
  border-left: 1px solid rgb(245, 241, 241);
  border-radius: 5px;
  padding: 10px;
  margin-left: 20px;
}
form {
  display: flex;
  align-items: flex-end;
  margin-left: 60px;
  margin-top: 100px;
}
</style>
