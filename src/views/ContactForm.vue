<template>
  <div>
    <h2>Contact me</h2>
    <form>
      <label for="author">
      Your name: <input type="text" name="author">
      </label>
      <label for="sender">
      Your email: <input type="email" name="sender">
      </label>
      <label for="title">
      Title: <input type="text" name="title">
      </label>
      <label for="message">
      Message: <textarea name="message"></textarea>
      </label>
      <button type="submit">Send message</button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'ContactForm',
};
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Hubballi&family=Montserrat:ital,wght@0,300;0,600;1,300&display=swap');

  div {
    background: #343a46;
    color: #fff;
    padding: 30px;
    text-align: center;
    // font-family: 'Hubballi', cursive;
    font-family: 'Montserrat', sans-serif;
    margin: 0;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h1 {
    font-weight: lighter;
  }
  p {
    color: #999;
    font-size: 0.8rem;
  }
  a {
    color: #999;
    font-size: 0.8rem;
  }
  label {
    display: block;
    margin: 1rem;
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: right;
  }
  input,
  textarea {
    background: rgba(7, 3, 3, 0.2);
    padding: 0.6rem 1rem;
    border: none;
    margin: 0 1rem;
    border-radius: 0.5rem;
    outline: none;
    color: #fff;
    font-size: inherit;
  }
  textarea {
    margin: 1rem auto;
    width: 400px;
    height: 200px;
    display: block;
  }
  button {
    background: #0064e7;
    border: none;
    border-radius: 15px;
    padding: 10px 25px;
    color: #fff;
    font-family: inherit;
    margin: 20px 10px;
    text-transform: uppercase;
    outline: none;
    transition: .2s;
    cursor: pointer;
  }
</style>
