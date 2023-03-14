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
// export default {
//   name: 'SideMenu',
//   // props: ['menuItems'],
//   // surveiller la prop menuItems et appeler la méthode init() quand elle change
//   watch: {
//     menuItems() {
//       this.init(this.menuItems)
//     }
//   },
//   data() {
//     return {
//       // initialiser menuItems à une valeur par défaut au cas où la prop ne serait pas fournie
//       // ce n'est pas obligatoire, mais cela peut éviter des erreurs si la prop est omise
//       // dans l'usage de ce composant
//       menuItems: []
//     }
//   },
//   methods: {
//     init(items) {
//       this.menuItems = items;
//     }
//   }
// }

export default {
  name: 'SideMenu',
  // props: ['menuItems'],
  // watch: {
  //   // surveiller la prop menuItems et appeler la méthode init() quand elle change
  //   menuItems()
  //   {
  //     this.init(this.menuItems);
  //   }
  // },
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
      // console.log(this.menuItems)
    }
  }
}
</script>
<style lang="scss">

</style>