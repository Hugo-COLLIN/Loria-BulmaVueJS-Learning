<template>

</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "LoginMechanics",
  created() {
    //this.loginState();
  },
  methods: {
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

      // this.$refs.router.beforeEach((to, from, next) => {
      //   if (to.matched.some(record => record.meta.requiresAuth)) {
      //     // this route requires auth, check if logged in
      //     // if not, redirect to login page.
      //     console.log('tokenSession: ' + sessionStorage.getItem('tokenSession'));
      //     console.log(sessionStorage.getItem('tokenSession') === "null");
      //     // LoginMechanics.methods.loginState();
      //     if (sessionStorage.getItem('tokenSession') === "null" && to.name !== 'login')
      //       next({ name: 'login' })
      //     else
      //       next() // go to wherever I'm going
      //   } else if (to.name === 'login' && sessionStorage.getItem('tokenSession') !== "null") {
      //     next('/') // does not require auth, make sure to always call next()!
      //   }
      //   else {
      //     next() // does not require auth, make sure to always call next()!
      //   }
      // });
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
            //message = "Logout successfully";
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