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
    loginStateRouter()
    {
      let res = false;
      // console.log(sessionStorage.getItem('tokenSession'));
      axios.get('http://51.91.76.245:8000/api/login', {
        headers: {
          token: sessionStorage.getItem('tokenSession')
        }
      })
          .then((response) => {
            console.log(response);
            res = true;
          })
          .catch((error) => {
            console.log(error);
            sessionStorage.removeItem('tokenSession');
            res = false;
          });
      // console.log("Res : " + res)
      console.log(sessionStorage.getItem('tokenSession'));
      return res;
    },

    // loginState()
    // {
    //   this.loginStateRouter();
    //   this.$router.push({name: 'login'});
    // },

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
            this.loginRequired();
            //message = "Loggged out successfully";
          })
          .catch((error) => {
            console.log(error);
          });
    },

    loginRequired()
    {
      sessionStorage.removeItem('tokenSession');
      this.$router.push({name: 'login'});
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