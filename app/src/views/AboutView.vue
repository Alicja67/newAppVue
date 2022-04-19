<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
/* eslint-disable */

import axios from "axios";

export default {
  name: "AboutView",
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const config = {
        headers: {
          // "content-type": "application/vnd.api+json",
          // "Access-Control-Allow-Origin": "*",
        },
      };
      axios.get("http://localhost:3000/links", config).then(function (response) {
        console.log(response);
        // response.data
      });
    },
    /* eslint-enabled */
  },
};
</script>
<style lang="scss">
body {
  background: black;
  color: white;
}
</style>
