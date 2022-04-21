<template>
  <div>
    <h3>All titles related to the space tag</h3>
    <div class="titles" v-if="!editing">
      <div class="title" v-for="one in newTitles" :key="one._id">
        {{ one.title }}
        <i
          @click="updatingTitle(one, title)"
          v-bind="titleText"
          @change="titleTextChange"
          :class="[editig ? duringEditingClass : editClass]"
        ></i>
        <i @click="deleteTitle(one._id)" class="fa-solid fa-trash"></i>
      </div>
      <div class="title" v-for="title in allTitles" :key="title.data[0].nasa_id">{{ title.data[0].title }}</div>
    </div>
    <div v-else>
      <input v-model="titleText" type="text" class="form-control" />
      <button type="button" @click="updateTitleAction(currentTitle)">
        <span>×</span>
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
      currentTitle: {},
      editing: false,
      titleText: 'ddd',
      editClass: 'fa-solid fa-pen',
      duringEditingClass: 'fa-solid fa-pen-field',
    };
  },
  methods: {
    ...mapActions(['fetchTitles', 'fetchNewTitles', 'deleteTitle', 'updateTitle']),
    titleTextChange(e) {
      this.textTitle = e.target.value;
    },
    updatingTitle(data, title) {
      this.currentTitle = { id: data._id, title: this.titleText };

      this.editing = !this.editing;
      console.log('title', this.titleText);
      if (this.editing) {
        this.titleText = title.title;
      }
    },
    updateTitleAction(data) {
      // const { id, title } = data;
      console.log('data', data);
      console.log('textTile', this.textTitle);
      this.updateTitle(data);
    },
  },
  computed: { ...mapGetters(['allTitles', 'newTitles']) },
  created() {
    this.fetchTitles();
    this.fetchNewTitles();
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
  grid-gap: 1rem;
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
</style>
