<template>
    <div>
        <h1>Mon super compteur</h1>
        <p @click="increment">Vous avez cliqué {{ total }} fois ! Super !</p>
        <p>La donnée du store vaut {{totalGeneral}}</p>
        <p>Le double vaut : {{doubleDuTotalVue}}</p>
    </div>
</template>

<script>
export default {
    name: 'Compteur',
    data()
    {
        return {total:0}
    },
    computed:
    {
      totalGeneral() {
        return this.$store.state.totalFromVueX;
      },
      doubleDuTotalVue () {
        return this.$store.getters.doubleDuTotal;
      }
    },
    methods:{
        increment()
        {
            ++ this.total
            this.$store.commit('setTotalFromVueX', ++ this.totalGeneral);
        }
    }
}
</script>

<style scoped>

</style>