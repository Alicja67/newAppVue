<template>
  <div>
    <h2 class="title">I's nice to meet all space explorers</h2>
    <div class="contacts">
      <div v-for="contact in contacts" :key="contact._id">
        <p class="author">
          <i class="fa-solid fa-heart"></i>
          {{ contact.author }}
          <i class="fa-solid fa-heart"></i>
        </p>
      </div>
    </div>
    <form>
      <button>Today's gift for aliens</button>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'space-visitors',
  methods: {
    ...mapActions(['fetchContact', 'fetchCon']),
  },
  computed: {
    ...mapGetters(['contacts', 'allContacts']),
  },
  created() {
    return this.fetchContact();
  },
};
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
  margin-top: 150px;
  font-size: 2rem;
}
.contacts {
  display: inline-block;
  color: white;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 50px 0 100px 0;
  justify-content: center;
  .author {
    margin: 10px;
  }
}
form {
  display: flex;
  justify-content: center;
}
button {
  position: relative;
  padding: 10px;
  border: 1px solid #b0b1b3;
  background: #2770dd;
  border-radius: 5px;
  color: rgb(231, 232, 236);
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  transition: 1s;
}
button:hover {
  background: #0a0a0a;
}
</style>
