<template>
  <p class="subtitle is-5">
    <strong>{{ this.initItem }} - {{ this.lastItem }}</strong> / {{this.totalItems}} items
  </p>
</template>

<script>
export default {
  name: "CounterList",
  data() {
    return {
      initItem: 0,
      lastItem: 0,
      totalItems: 0
    }
  },
  methods: {
    updateCounter(initItem, lastItem, totalItems) {
      this.initItem = initItem;
      this.lastItem = lastItem;
      this.totalItems = totalItems;
    }
  }
}
</script>

<style scoped>

</style>