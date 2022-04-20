<template>
  <div class="about">
    <titles-component> </titles-component>
  </div>
</template>

<script>
/* eslint-disable */

// import axios from 'axios';
import TitlesComponent from '../components/TitlesComponent.vue';

export default {
  name: 'about-view',
  components: {
    TitlesComponent,
  },
  // mounted() {
  //   this.getData();
  // },
  methods: {
  //   getData() {
  //     const config = {
  //       headers: {
  //         // 'content-type': 'application/vnd.api+json',
  //         // 'Access-Control-Allow-Origin': '*',
  //       },
  //     };
  //     axios.get('http://localhost:3000/links', config).then(function (response) {
  //       console.log(response);
  //       // response.data
  //     });
  //   },
  //   /* eslint-enabled */
  },
};
</script>
<style lang="scss">
body {
  background: black;
  color: white;
}
</style>
