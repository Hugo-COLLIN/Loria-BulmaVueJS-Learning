<template>
  <div class="items">
    <h1 class="title is-center">Tracks</h1>
    <ItemsList ref="itemsList"></ItemsList>
  </div>
</template>

<script>
import ItemsList from '@/components/tests/ItemsList.vue'
export default {
  name: 'Items',
  components: {ItemsList},
}
</script>

<style lang="sass" scoped>

</style>