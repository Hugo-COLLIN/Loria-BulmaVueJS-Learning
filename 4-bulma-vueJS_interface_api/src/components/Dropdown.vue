<template>
  <div class="level-item">
    Order by
  </div>
  <div class="level-item">
    <div class="select">
      <select @change="sortItems">
        <option v-for="option in listOptions" :value="option.shortName">{{ option.fullName }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  emits: ["sort-update"],
  data() {
    return {
      listOptions: {}
    };
  },
  methods: {
    sortItems(event) {
      this.$emit("sort-update", event.target.value, );
      // console.log("Event : " + event.target.value);
    },

    createFilters(list) {
      this.listOptions = list;
    },

    // createFilter(name, short)
    // {
    //   this.listOptions.push({fullName: name, shortName: short});
    // }
  },
}
</script>

<style scoped>

</style>