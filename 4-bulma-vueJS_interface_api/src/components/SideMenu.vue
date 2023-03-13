<template>
  <aside class="menu">
    <p class="menu-label">Menu</p>
    <ul class="menu-list">
      <li>
        <router-link to="/dashboard">
              <span class="icon ">
                <i class="fa fa-tachometer"></i>
              </span>Dashboard
        </router-link>
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
</template>
<script>
export default {
  name: 'SideMenu'
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