<template>
  <template v-if="$route.name !== 'login'">
    <HeaderBar @open-bug-report="bugReport" @login="init"/>

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
  <template v-else><router-view/></template>
</template>

<script>
import BugReport from "@/components/BugReport.vue";
import SideMenu from "@/components/SideMenu.vue";
import HeaderBar from "@/HeaderBar.vue";

export default {
  name: "App",
  components: {
    HeaderBar,
    SideMenu,
    BugReport,
  },
  data()
  {
    return {
      /**
       * "Bug report modal" display state
       */
      openBugReport: false,
      /**
       * Menu items
       */
      menuItems: [
        {
          name: 'Dashboard',
          icon: 'fa fa-tachometer',
          link: '/dashboard'
        },
        {
          name: 'Items',
          icon: 'fa fa-book',
          link: '/items'
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
  methods: {
    /**
     * Open "Bug report modal"
     */
    bugReport(status) {
      console.log(status)
      this.openBugReport = status;
    },

    init() {
      this.$refs.sideMenu.init(this.menuItems);
    }

  },
  mounted() {
    this.$refs.sideMenu.init(this.menuItems);
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
