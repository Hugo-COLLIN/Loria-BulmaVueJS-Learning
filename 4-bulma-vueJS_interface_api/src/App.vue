<!-- Global app vue -->
<!-- Hugo COLLIN, 20/03/2023 -->
<!-- This component is the main component of the application
     It contains the header bar, the side menu and the main content. -->

<template>
  <LoginMechanics ref="loginMechanics" @login="init"></LoginMechanics>
  <HeaderBar @open-bug-report="bugReport" @logout="logout"/>

  <template v-if="$route.name !== 'login'">

    <section class="section">
      <div class="columns">
        <div class="column is-4-tablet is-3-desktop is-2-widescreen" v-if="$route.name !== '404'">
          <SideMenu ref="sideMenu"/>
        </div>
        <main class="column">
          <router-view/>
        </main>
      </div>
    </section>

    <BugReport :show-modal="openBugReport" @close="openBugReport = false"/>

  </template>
  <template v-else><router-view @login="login"/></template>

</template>

<script>
import BugReport from "@/components/modals/BugReport.vue";
import SideMenu from "@/components/persistent/SideMenu.vue";
import HeaderBar from "@/components/persistent/HeaderBar.vue";
import LoginMechanics from "@/components/LoginMechanics.vue";

export default {
  name: "App",
  components: {
    HeaderBar,
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
      openBugReport: false,

      /**
       * URL of the API
       */
      urlAPI: 'http://51.91.76.245:8000/api/',

      /**
       * Elemnts displayed in the side menu
       */
      menuItems: [
        {
          name: 'Dashboard',
          icon: 'fa fa-tachometer',
          link: '/dashboard'
        },
        {
          name: 'Tracks',
          icon: 'fa fa-book',
          link: '/tracks'
        },
        {
          name: 'Customers',
          icon: 'fa fa-address-book',
          link: '/customers'
        },
        {
          name: 'Orders',
          icon: 'fa fa-file-text-o',
          link: '/orders'
        }
      ]
    }
  },
  /**
   * App global methods
   */
  methods: {
    /**
     * Open "Bug report modal"
     */
    bugReport(status) {
      console.log(status)
      this.openBugReport = status;
    },

    /**
     * Initialize the side menu
     */
    init() {
      this.$refs.sideMenu.init(this.menuItems);
    },

    /**
     * Call the login method of the LoginMechanics component with the user-entered credentials
     */
    login(email, password) {
      this.$refs.loginMechanics.login(email, password);
    },

    /**
     * Call the logout method of the LoginMechanics component
     */
    logout() {
      this.$refs.loginMechanics.logout();
    }

  },
  /**
   * Initialize the side menu and the API URL
   */
  mounted()
  {
    // console.log(sessionStorage.getItem('tokenSession') !== null);
    this.$store.state.urlAPI = this.urlAPI;
    this.$refs.sideMenu.init(this.menuItems);
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

/**
 * Inline codeblock style
 */
.codeStyle {
  background-color: #f5f5f5;
  //padding: 0;
  //border: 1px solid #e8e8e8;
  border-radius: 3px;
  color: #DA1039;
  //display: inline-block;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  //font-size: 12px;
  //line-height: 1.5;
  padding: 0.2em 0.4em;
  margin: 0;
  white-space: nowrap;
}
</style>
