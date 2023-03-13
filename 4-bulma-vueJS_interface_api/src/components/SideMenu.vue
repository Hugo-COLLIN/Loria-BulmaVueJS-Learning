<template>
  <aside class="menu">
    <p class="menu-label">Menu</p>
    <ul class="menu-list">
      <li v-for="item in menuItems">
        <router-link :to="item.link">
          <span class="icon ">
            <i :class="item.icon"></i>
          </span>
          {{item.name}}
        </router-link>
      </li>
    </ul>
  </aside>
</template>
<script>
export default {
  name: 'SideMenu',
  data() {
    return {
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
  }
}
</script>
<style lang="scss">

nav {
  //padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

  }
}
</style>