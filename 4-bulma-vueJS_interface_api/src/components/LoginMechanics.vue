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
      // TODO : Mettre un message d'erreur correct a la place des alert
      // Check if the email and password are not empty
      if (!email || !password){
        alert("Please enter email and password");
        return
      }
      // Ask the API to log in the user
      axios.post('http://51.91.76.245:8000/api/login', {
        username: email,
        password: password,
      })
          .then(response => {
            // save the token in the session storage
            sessionStorage.setItem('tokenSession', response.data[0]);

            this.$router.go(0) // refresh page : loading side menu temporary solution
            // redirect to the dashboard
            // this.$router.push({name: 'dashboard'});
          })
          .catch(error => {
            // TODO : Remplacer les alert par des messages d'erreur
            // If the email or password is incorrect , then the API return a 401 error
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
      let isLogin = false;
      // console.log(sessionStorage.getItem('tokenSession'));
      // if the token is null then the user is not logged in
      if (sessionStorage.getItem('tokenSession') !== null) {
        // Ask the API if the token is valid
        axios.get('http://51.91.76.245:8000/api/login', {
          headers: {
            token: sessionStorage.getItem('tokenSession')
          }
        })
            .then((response) => {
              console.log(response);
              // If the token is valid then the user is logged in
              isLogin = true;
            })
            .catch((error) => {
              console.log(error);
              // If the token is not valid then the user is not logged in and the token is deleted
              sessionStorage.removeItem('tokenSession');
              // redirect to the login page
              router.push({name: 'login'});
              // alert("Disconnected");
              isLogin = false;
            });
      }

      return isLogin;
    },

    /**
     * Logout the user by deleting the token
     */
    logout()
    {
      console.log(sessionStorage.getItem('tokenSession'))
      // Ask the API to delete the token to log out the user
      axios.delete('http://51.91.76.245:8000/api/login', {
        headers: {
          token: sessionStorage.getItem('tokenSession')
        }
      })
          .then(() => {
            //message = "Logged out successfully";
            // redirect to the login page
            this.loginRequired();
          })
          .catch((error) => console.log(error));
      // redirect to the login page
      this.loginRequired();
    },

    /**
     * Redirect to the login page
     */
    loginRequired()
    {
      sessionStorage.removeItem('tokenSession');
      this.$router.push({name: 'login'});
    },
  }
}
</script>

<style scoped>

</style>