<template>
<!--  <LoginMechanics ref="loginMechanics" @login="login"></LoginMechanics>-->
  <nav class="navbar has-shadow">
    <div class="navbar-brand">
      <a class="navbar-item">
        <img src="../../assets/logo.png" alt="logo">
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
          <div class="navbar-link has-icons-left" @click="userAction">
            <span class="icon is-left">
              <i class="fa fa-user"></i>
            </span>
            <span>&nbsp;{{ this.userInfos.FirstName }} {{ this.userInfos.LastName }}</span>
          </div>

          <div class="navbar-dropdown" v-if="isConnected">
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
    userInfos() {
      // console.log(JSON.parse(sessionStorage.getItem('userInfos')).FirstName);
      // console.log(JSON.parse(sessionStorage.getItem('userInfos')));
      if (JSON.parse(sessionStorage.getItem('userInfos')) !== null)
        return JSON.parse(sessionStorage.getItem('userInfos'));
      // console.log('userInfos is null')
      // console.log(sessionStorage.getItem('userInfos'))
      return {
        FirstName: 'Log',
        LastName: 'in'
      };
    },
    isConnected() {
      return this.userInfos.FirstName !== 'Log';
    }
  },
  components: {LoginMechanics, store},
  emits: ['open-bug-report', 'login', 'logout'],
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
    },

    logout() {
      this.$emit('logout');
    },

    userAction() {
      if (this.isConnected) {
        this.$router.push('/profile');
      } else {
        this.login();
      }
    }

  }
}
</script>
<style lang="scss">

nav {

}
</style>