<template>
  <template v-if="$route.name !== 'login'">
    <nav class="navbar has-shadow">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="./assets/logo.png" alt="logo">
        </a>
        <div class="navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item">
            <small>Publishing at the speed of technology</small>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-link">
              Alex Johnson
            </div>
            <div class="navbar-dropdown">
              <a class="navbar-item">
                <div>
                <span class="icon is-small">
                   <i class="fa fa-user-circle-o"></i>
                </span>
                  Profile
                </div>
              </a>

              <a class="navbar-item"  @click="openBugReport = true">
                <div>
                <span class="icon is-small">
                   <i class="fa fa-bug"></i>
                </span>
                  Report bug
                </div>
              </a>

              <a class="navbar-item" @click="logout">
                <div>
                <span class="icon is-small">
                   <i class="fa fa-sign-out"></i>
                </span>
                  Sign Out
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
    </nav>

    <section class="section">
      <div class="columns">
        <div class="column is-4-tablet is-3-desktop is-2-widescreen">
          <aside class="menu">
            <p class="menu-label">Menu</p>
            <ul class="menu-list">
              <li>
                <router-link to="/dashboard">
              <span class="icon ">
                <i class="fa fa-tachometer"></i>
              </span>Dashboard</router-link>
              </li>
              <li>
                <router-link to="/items">
              <span class="icon">
                <i class="fa fa-book"></i>
              </span> Items
                </router-link>
              </li>
              <li>
                <router-link to="/customers">
              <span class="icon">
                <i class="fa fa-address-book"></i>
              </span> Customers
                </router-link>
              </li>
              <li>
                <router-link to="/orders">
              <span class="icon">
                <i class="fa fa-file-text-o"></i>
              </span>
                  Orders
                </router-link>
              </li>
            </ul>
          </aside>

        </div>
        <main class="column">
          <router-view/>
        </main>
      </div>
    </section>
    <BugReport :show-modal="openBugReport" @close="openBugReport = false"/>
  </template>
  <template v-else><router-view/></template>
</template>

<script>
import BugReport from "@/components/BugReport.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    BugReport
  },
  data()
  {
    return {
      /**
       * "Bug report modal" display state
       */
      openBugReport: false
    }
  },
  methods: {
    /**
     * Check if the user is logged in
     */
    loginState() {
      axios.get('http://51.91.76.245:8000/api/login', {
        headers: {
          token: this.$store.state.tokenLogin
          // this.$cookies.get("tokenSession")
              //.get("tokenSession") //
        }
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          this.$store.state.tokenLogin = null;
          //this.$cookies.remove("tokenSession");
        });

      if (this.$store.state.tokenLogin /*this.$cookies.get("tokenSession")*/ === null) {
        this.$router.push({name: 'login'});
      }
    },

    /**
     * Logout the user by deleting the token
     */
    logout()
    {
      console.log(this.$store.state.tokenLogin)
      axios.delete('http://51.91.76.245:8000/api/login', {
        headers: {
          token: this.$store.state.tokenLogin
        }
      })
        .then(() => {
          this.$store.commit('setTokenLogin', null);
          //this.$cookies.remove('tokenSession');
          this.$router.push({name: 'login'});
        })
          .catch((error) => {
            console.log(error);
          });
    }
  },
  mounted() {
    console.log(this.$store.state.tokenLogin)
    this.loginState();
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
