<template>
  <div class="wrapper">
    <h2>Do you want to become a space mission member?</h2>
    <i class="fa-solid fa-user-astronaut"></i>
    <i class="fa-solid fa-user-astronaut"></i>
    <i class="fa-solid fa-user-astronaut"></i>
    <h3>What gifts will you take for Marsjans on your first space mission to The Red Planet?</h3>
    <form method="post" @submit="onSubmit">
      <label for="author"> Your name: <input type="text" name="author" v-model="author" required /> </label>
      <label for="email"> Your email: <input type="email" name="email" v-model="email" required /> </label>
      <label for="title"> Title: <input type="text" name="title" v-model="title" required /> </label>
      <label for="message"> Message: <textarea name="message" v-model="message" required> </textarea></label>
      <!-- <div class="terms">
        <label for="terms">
          Accept tems and conditions<input name ="terms" type="checkbox" v-model="terms" required>
        </label>
      </div> -->
      <div class="submit-form">
        <button type="submit">Sign up</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="">

</style>