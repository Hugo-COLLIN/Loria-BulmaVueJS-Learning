<template>

</template>

<script>
import axios from "axios";

export default {
  name: "LoginMechanics",
  methods: {
    /**
     * Check if the user is logged in
     */
    loginState() {
      console.log(sessionStorage.getItem('tokenSession'));
      axios.get('http://51.91.76.245:8000/api/login', {
        headers: {
          token: sessionStorage.getItem('tokenSession')
          // this.$cookies.get("tokenSession")
          //.get("tokenSession") //
        }
      })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
            this.logout();
          });

      console.log(sessionStorage.getItem('tokenSession'));
      if (sessionStorage.getItem('tokenSession') /*this.$store.state.tokenLogin*/ /*this.$cookies.get("tokenSession")*/ === null) {
        this.$router.push({name: 'login'});
      }
    },

    /**
     * Logout the user by deleting the token
     */
    logout()
    {
      console.log(sessionStorage.getItem('tokenSession'))
      axios.delete('http://51.91.76.245:8000/api/login', {
        headers: {
          token: sessionStorage.getItem('tokenSession')
        }
      })
          .then(() => {
            // this.$store.commit('setTokenLogin', null);
            sessionStorage.setItem('tokenSession', null);
            //this.$cookies.remove('tokenSession');
            this.$router.push({name: 'login'});
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }
}
</script>

<style scoped>

</style>