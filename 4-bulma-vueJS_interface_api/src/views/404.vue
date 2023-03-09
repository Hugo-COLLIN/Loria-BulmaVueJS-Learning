<template>
  <div>
    <h2 class="title">Seems you are in troubles...</h2>
    <router-link to="/" class="subtitle is-underlined">↩ Let's go back to safe place</router-link>
  </div>
</template>

<script>
export default {
  name: '404',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>