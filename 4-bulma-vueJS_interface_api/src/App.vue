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
import BugReport from "@/components/modals/BugReport.vue";
import SideMenu from "@/components/persistent/SideMenu.vue";
import HeaderBar from "@/components/persistent/HeaderBar.vue";

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
