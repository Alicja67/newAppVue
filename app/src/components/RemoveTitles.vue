<template>
  <form @submit="onSubmit">
    <button class="remove-button">Remove all added titles</button>
  </form>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'remove-titles',
};
</script>
<style lang="scss" scoped>
form {
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
}
.remove-button {
  position: relative;
  padding: 10px;
  border: 1px solid #b0b1b3;
  background: #36383b;
  border-radius: 5px;
  color: rgb(139, 142, 155);
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
}
</style>
