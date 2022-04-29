<template>
  <div>
    <h2>I's nice to meet all space explorers</h2>
    <div class="contacts" v-for="contact in contacts" :key="contact._id">
      {{ contact.name }}
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'space-visitors',
  methods: {
    ...mapActions(['fetchContacts']),
  },
  computed: {
    ...mapGetters(['contacts']),
  },
  created() {
    this.fetchContacts();
  },
};
</script>
.contacts { color: white; }
<style lang="scss" scoped></style>
