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
      // TODO : Mettre un message d'erreur correcte
      if (!email || !password){
        alert("Please enter email and password");
        return
      }
      axios.post('http://51.91.76.245:8000/api/login', {
        username: email,
        password: password,
      })
          .then(response => {
            sessionStorage.setItem('tokenSession', response.data);
            this.$router.push({name: 'dashboard'});
          })
          .catch(error => {
            // TODO : Same as above
            if (error.response.status === 401)
              alert("Please enter a valid password and email");
            else
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
      if (sessionStorage.getItem('tokenSession') !== null) {
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
              router.push({name: 'login'});
              res = false;
            });
        // console.log("Res : " + res)
        console.log(sessionStorage.getItem('tokenSession'));
      }

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
            //message = "Loggged out successfully";
            this.loginRequired();
          })
          .catch((error) => {
            console.log(error);
          });
      this.loginRequired();
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