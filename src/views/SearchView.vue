<template>
  <div :class="[{ flexStart: step === 1 }, 'wrapper']">
    <HeroImage v-if="step === 0"/>
    <HeaderComponent v-if="step === 0" />
    <SearchInput
      v-model="searchValue"
      @input="handleInput"
      :dark="step === 1"
    />
    <div
      class="results"
      v-if="results && !loading && step === 1"
    >
      <ItemComponent
        @click.native="handleModelOpen(item)"
        v-for="item in results"
        :item="item"
        :key="item.data[0].nasa_id"
      />
    </div>
    <ItemModel v-if="modelOpen" :item="modalItem" @closeModel="modelOpen = false" />
  </div>
</template>

<script>
import axios from 'axios';
import debounce from 'lodash.debounce';
import ItemComponent from '@/components/ItemComponent.vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import SearchInput from '../components/SearchInput.vue';
import HeroImage from '../components/HeroImage.vue';
import ItemModel from '../components/ItemModel.vue';

const API = 'https://images-api.nasa.gov';

export default {
  name: 'SearchView',
  components: {
    HeaderComponent,
    SearchInput,
    HeroImage,
    ItemComponent,
    ItemModel,
  },
  data() {
    return {
      loading: false,
      step: 0,
      searchValue: '',
      results: [],
      modelOpen: false,
      modalItem: null,
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
    handleModelOpen(item) {
      this.modelOpen = true;
      this.modalItem = item;
      console.log(item);
    },
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
  .results {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 15px;
    margin: 30px;
    margin-top: 50px;

    // @media (min-width: 992px ) {
    //   grid-template-columns: 1fr 1fr 1fr;
    //   width: 90%;
    // }
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
