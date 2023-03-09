<template>

</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "LoginMechanics",
  methods: {
    /**
     * Log in the user
     */
    login(email, password) {
      axios.post('http://51.91.76.245:8000/api/login', {
        username: email,
        password: password,
      })
          .then(response => {
            sessionStorage.setItem('tokenSession', response.data);
            this.$router.push({name: 'dashboard'});
          })
          .catch(error => {
            console.log(error);
          });
    },
    /**
     * Check if the user is logged in
     */
    loginState() {
      console.log(sessionStorage.getItem('tokenSession'));
      axios.get('http://51.91.76.245:8000/api/login', {
        headers: {
          token: sessionStorage.getItem('tokenSession')
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
            sessionStorage.removeItem('tokenSession');
            this.$router.push({name: 'login'});
            //message = "Loggged out successfully";
          })
          .catch((error) => {
            console.log(error);
          });
    },


    loginStateRouter() {
      console.log(sessionStorage.getItem('tokenSession'));
      axios.get('http://51.91.76.245:8000/api/login', {
        headers: {
          token: sessionStorage.getItem('tokenSession')
        }
      })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
            this.logoutRouter();
          });

      console.log(sessionStorage.getItem('tokenSession'));
    },
    logoutRouter()
    {
      console.log(sessionStorage.getItem('tokenSession'))
      axios.delete('http://51.91.76.245:8000/api/login', {
        headers: {
          token: sessionStorage.getItem('tokenSession')
        }
      })
          .then(() => {
            sessionStorage.removeItem('tokenSession');
            // this.$router.push({name: 'login'});
            //message = "Logout successfully";
          })
          .catch((error) => {
            console.log(error);
          });
    },
  }
}
</script>

<style scoped>

</style>