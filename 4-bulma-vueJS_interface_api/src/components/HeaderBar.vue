<template>
  <LoginMechanics ref="loginMechanics" @login="login"></LoginMechanics>
  <nav class="navbar has-shadow">
    <div class="navbar-brand">
      <a class="navbar-item">
        <img src="../assets/logo.png" alt="logo">
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

            <a class="navbar-item" @click="bugReport">
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
</template>
<script>
import LoginMechanics from "@/components/LoginMechanics.vue";
import bugReport from "@/components/BugReport.vue";

export default {
  name: 'HeaderBar',
  components: {LoginMechanics},
  emits: ['open-bug-report', 'login'],
  data() {
    return {
      openBugReport: false
    }
  },
  methods: {
    bugReport() {
      console.log('bugReport');
      this.$emit('open-bug-report', true);
    },

    login() {
      this.$emit('login');
    }
  }
}
</script>
<style lang="scss">

nav {

}
</style>