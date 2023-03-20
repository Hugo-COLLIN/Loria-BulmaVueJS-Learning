<!-- Header bar -->
<!-- Hugo COLLIN, 20/03/2023 -->
<!-- This component is used to create a header bar. -->
<!-- TODO : account menu in DropMenu component -->

<template>
  <nav class="navbar has-shadow">
    <router-link to="/" class="navbar-brand">
      <a class="navbar-item">
        <img src="../../assets/logo.png" alt="logo">
      </a>
      <div class="navbar-burger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </router-link>
    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <small>Publishing at the speed of technology</small>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">

          <router-link :to="isConnected ? 'profile' : 'login'" :class="isConnected ? 'navbar-link' : 'navbar-item'" class="has-icons-left">
            <span class="icon is-left">
              <i class="fa fa-user"></i>
            </span>
            <span>&nbsp;{{ this.userInfos.FirstName }} {{ this.userInfos.LastName }}</span>
          </router-link>

          <div class="navbar-dropdown" v-if="isConnected">
            <router-link to="profile" class="navbar-item">
              <div>
                <span class="icon is-small">
                   <i class="fa fa-user-circle-o"></i>
                </span>
                Profile
              </div>
            </router-link>

            <a class="navbar-item" @click="bugReport">
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

          <div class="navbar-dropdown" v-else>
            <router-link class="navbar-item" to="login">
              <div>
                <span class="icon is-small">
                   <i class="fa fa-arrow-right"></i>
                </span>
                Log in
              </div>
            </router-link>

            <router-link class="navbar-item" to="register">
              <div>
                <span class="icon is-small">
                   <i class="fa fa-user-plus"></i>
                </span>
                Register
              </div>
            </router-link>
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import LoginMechanics from "@/components/LoginMechanics.vue"; //necessary
import bugReport from "@/components/modals/BugReport.vue";
import store from "@/store";

export default {
  name: 'HeaderBar',
  computed: {
    store() {
      return store
    },

    /**
     * Get the user infos from the session storage
     * @returns {{FirstName: string, LastName: string}|any}
     */
    userInfos() {
      if (JSON.parse(sessionStorage.getItem('userInfos')) !== null)
        return JSON.parse(sessionStorage.getItem('userInfos'));

      return {
        FirstName: 'Logged',
        LastName: 'out'
      };
    },

    /**
     * Return true if the user is connected
     * @returns {boolean}
     */
    isConnected() {
      return this.userInfos.FirstName !== 'Logged';
    }
  },
  components: {LoginMechanics, store},
  emits: ['open-bug-report', 'login', 'logout'],
  data() {
    return {
      /**
       * Bug report modal visibility
       */
      openBugReport: false
    }
  },
  methods: {
    /**
     * Displays the bug report modal
     */
    bugReport() {
      // emitted to parent to open the bug report modal
      this.$emit('open-bug-report', true);
      console.log('bugReport modal opened');
    },

    /**
     * Request the login page
     */
    login() {
      // emitted to parent to open the login page
      this.$emit('login');
    },

    /**
     * Request to disconnect the user
     */
    logout() {
      // emitted to parent to disconnect the user
      this.$emit('logout');
    },

    // userAction() {
    //   if (this.isConnected) {
    //     this.$router.push('/profile');
    //   } else {
    //     this.login();
    //   }
    // }

  }
}
</script>
<style lang="scss">

nav {

}
</style>