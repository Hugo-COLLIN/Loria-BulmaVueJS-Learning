<template>
  <template v-if="$route.name !== 'login'">
    <LoginMechanics ref="loginMechanics"></LoginMechanics>
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

              <a class="navbar-item" @click="this.$refs.loginMechanics.logout">
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
      <div class="columns"> <!-- vv SideMenu vv -->
        <div class="column is-4-tablet is-3-desktop is-2-widescreen" v-if="$route.name !== '404'">
          <SideMenu/>
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
import LoginMechanics from "@/components/LoginMechanics.vue";
import SideMenu from "@/components/SideMenu.vue";

export default {
  name: "App",
  components: {
    SideMenu,
    BugReport,
    LoginMechanics
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

  },
  mounted() {
    // this.$refs.loginMechanics.loginState();
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
}

nav {
  //padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
