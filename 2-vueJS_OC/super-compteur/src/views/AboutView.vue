<template>
    <div class="about">
        <h1>This is an about page</h1>
    </div>
    <Compteur />
</template>


<script>
import Compteur from "@/components/Compteur.vue";

export default {
    name: 'About',
    components: {
        Compteur
    }
}
</script>
