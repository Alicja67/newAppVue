<template>
  <div class="snack-wrapper">
    <p :style="{ background: snack.color }" class="snack" v-if="snack">
      {{ snack.text }}
    </p>
    <p :style="{ background: snackTitle.color }" class="snack" v-if="snackTitle">
      {{ snackTitle.text }}
    </p>
    <p :style="{ background: snackUser.color }" class="snack" v-if="snackUser">
      {{ snackUser.text }}
    </p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'snack-vue',
  computed: {
    ...mapGetters({
      snack: 'snack',
      snackTitle: 'snackTitle',
      snackUser: 'snackUser',
    }),
  },
};
</script>
<style lang="scss" scoped>
.snack-wrapper {
  position: fixed;
  display: flex;
  top: 70px;
  left: 0;
  width: 100vw;
  height: 100px;
  justify-content: center;
  align-items: center;
}
.snack {
  padding: 10px 10px;
  // background: #26bb5f;
  // border: 1px solid white;
  font-weight: bold;
  color: rgb(239, 241, 252);
  cursor: pointer;
  font-size: 1.1rem;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
// .snackBar-enter-active,
// .snackBar-leave-active {
//   transition: opacity 0.5s ease;
// }

// .snackBar-enter-from,
// .snackBar-leave-to {
//   opacity: 0;
// }
</style>
