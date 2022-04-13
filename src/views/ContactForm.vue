<template>
  <div>
    <h2>Contact me</h2>
    <form action="/contacts/send-message" method="POST" @submit.prevent="submitForm">
      <label for="author">
      Your name: <input type="text" name="author" v-model="authorValue" required>
      </label>
      <label for="email">
      Your email: <input type="email" name="email" v-model="emailValue" required>
      </label>
      <label for="title">
      Title: <input type="text" name="title" v-model="titleValue" required>
      </label>
      <label for="message">
      Message: <textarea name="message" v-model="messageValue" required></textarea>
      </label>
      <!-- <div class="terms">
        <label for="terms">
          Accept tems and conditions<input name ="terms" type="checkbox" v-model="terms" required>
        </label>
      </div> -->
      <div class="submit-form">
        <button type="submit"> Send message</button>
      </div>
    </form>
    <div>
      <p> Sender: {{ authorValue }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ContactForm',
  data() {
    return {
      authorValue: '',
      emailValue: '',
      titleValue: '',
      messageValue: '',
      // terms: false,
    };
  },
  methods: {
    submitForm() {
      console.log('Button is clicked');
      this.$axios.post('/contacts/send-message', {
        author: this.author,
        email: this.email,
        title: this.title,
        message: this.message,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    // this.terms = false;
    },
  },
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
  input[type="checkbox"] {
    width: 25px;
    height: 25px;
  }
  .submit-form {
    display: flex;
    justify-content: right;
  }
</style>
