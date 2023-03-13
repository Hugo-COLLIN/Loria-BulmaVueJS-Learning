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
      menuItems: []
    }
  },
  methods: {
    init(items)
    {
      this.menuItems = items;
    }
  }
}
</script>
<style lang="scss">

</style>