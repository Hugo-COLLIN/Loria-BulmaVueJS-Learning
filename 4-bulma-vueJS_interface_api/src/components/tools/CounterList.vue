<template>
  <p class="subtitle is-5">
    <strong>{{ this.initItem }} - {{ this.lastItem }}</strong> / {{this.totalItems}} {{ this.label }}
  </p>
</template>

<script>
/*
  This component is used to show the number of items in the list
  and the number of items that are currently being displayed.
 */
export default {
  name: "CounterList",
  data() {
    return {
      label: "",
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
    },

    init(label) {
      this.label = label;
    }
  }
}
</script>

<style scoped>

</style>