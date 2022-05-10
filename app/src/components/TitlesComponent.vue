<template>
  <div>
    <h3>All titles related to the space tag</h3>
    <div class="titles" v-if="!editing">
      <div class="title" v-for="one in newTitles" :key="one._id">
        {{ one.title }}
        <i @click="updatingTitle(one)" v-bind="titleText" :class="[editig ? duringEditingClass : editClass]"></i>
        <i @click="deleteTitle(one._id)" class="fa-solid fa-trash"></i>
      </div>
      <div class="title" v-for="nasaTitle in nasaData" :key="nasaTitle.data[0].nasa_id">
        {{ nasaTitle.data[0].title }}
      </div>
    </div>
    <div v-else class="form-control">
      <input v-model="titleText" type="text" class="form-control-input" placeholder="Update your title" />
      <button type="button" @click="updateTitleAction(currentData)" class="form-control-button">
        <span>Update</span>
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'titles-component',
  data() {
    return {
      currentData: {},
      editing: false,
      titleText: '',
      editClass: 'fa-solid fa-pen',
      duringEditingClass: 'fa-solid fa-pen-field',
    };
  },
  methods: {
    ...mapActions(['fetchNewTitles', 'deleteTitle', 'updateTitle']),
    updatingTitle(data) {
      this.currentData = { id: data._id, title: '' };
      this.editing = !this.editing;
    },
    updateTitleAction(data) {
      const { id, title } = data;
      this.currentData = { ...{ id: data.id, title: this.titleText } };
      this.editing = !this.editing;
      this.updateTitle(this.currentData);
      this.titleText = '';
    },
  },
  computed: { ...mapGetters(['allTitles', 'newTitles', 'nasaData']) },
  created() {
    this.fetchNewTitles();
    // this.nasaData();
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
  grid-column-gap: 1.5rem;
  grid-row-gap: 1rem;
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
i {
  color: white;
  cursor: pointer;
  position: absolute;
  right: 15px;
}
i[class*='trash'] {
  top: 30px;
}
i[class*='pen'] {
  top: 5px;
}
.form-control {
  display: flex;
  margin: 200px 200px;
  border-radius: 5px;
  .form-control-input {
    flex: 10;
    padding: 10px;
    border: 1px solid #2e3035;
    cursor: pointer;
  }
  .form-control-button {
    cursor: pointer;
    background: #36383b;
    color: #fff;
    flex: 2;
    border: 1px solid #33394b;
  }
}
</style>
