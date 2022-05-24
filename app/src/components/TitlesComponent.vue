<template>
  <div>
    <div class="titles" v-if="editing">
      <div class="title" v-for="one in newTitles" :key="one._id">
        {{ one.title }}
        <i @click="updatingTitle(one)" v-bind="titleText" :class="[editig ? duringEditingClass : editClass]"></i>
        <i @click="deleteTitle(one._id)" class="fa-solid fa-trash"></i>
      </div>
    </div>
    <div v-else class="form-control">
      <input v-model="titleText" type="text" placeholder="Update your title..." />
      <button type="button" @click="updateTitleAction(currentData)">
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
      editing: true,
      titleText: '',
      title: '',
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
  computed: { ...mapGetters(['newTitles', 'nasaData']) },
  created() {
    this.fetchNewTitles();
    // this.nasaData();
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/input';
@import '../assets/scss/variable';
@import '../assets/scss/text';

body {
  font-family: 'Montserrat', sans-serif;
}
.main-title {
  text-align: center;
  font-size: 3rem;
}
input[type='text'] {
  text-align: center;
}
.titles {
  margin: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1.5rem;
  grid-row-gap: 1rem;
}
.title {
  border: 1px solid #0e0f0f;
  background: #0a0a0a;
  font-size: 1.4rem !important;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: 1s ease-out;
  font-family: $title-font-family;
}
.title:hover {
  background: #cdced1;
  color: black;
  i {
    color: black;
  }
}
i {
  color: white;
  cursor: pointer;
  position: absolute;
  right: 15px;
  font-size: 17px;
  color: rgb(184, 178, 178);
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
}
button {
  margin: 0;
  font-size: 1.1rem;
}
</style>
