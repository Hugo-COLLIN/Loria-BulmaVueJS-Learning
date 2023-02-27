<template>
    <div>
        <h1>Mon super compteur</h1>
        <p @click="increment">Vous avez cliqué {{ total }} fois ! Super !</p>
    </div>
</template>

<script>
export default {
    name: 'Compteur',
    data()
    {
        return {total:0}
    },
    methods:{
        increment()
        {
            ++ this.total
        }
    }
}
</script>

<style scoped>

</style>