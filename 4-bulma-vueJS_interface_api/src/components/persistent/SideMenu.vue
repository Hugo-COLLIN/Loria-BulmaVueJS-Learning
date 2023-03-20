<!-- SideMenu.vue -->
<!-- Hugo COLLIN, 20/03/2023 -->
<!-- This component is used to create a navigation menu. -->
<!-- TODO: Make listItem child component usable with SideMenu, Dropdown and DropMenu -->

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
      // initialiser menuItems à une valeur par défaut au cas où la prop ne serait pas fournie
      // pas obligatoire, mais permet d'éviter des erreurs si la prop n'est pas déclarée
      // dans l'usage de ce composant
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