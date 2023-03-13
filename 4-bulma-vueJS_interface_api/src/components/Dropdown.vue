<template>
  <div class="level-item mr-2">
    {{ this.label }}
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
/*
  This component is used to create a dropdown menu
  It takes a list of options and a label as parameters
  It emits an event when the user selects an option
 */
export default {
  name: "Dropdown",
  emits: ["update"],
  data() {
    return {
      label: "",
      listOptions: {},
      selected: "",
    };
  },
  methods: {
    sortItems(event) {
      this.selected = event.target.value;
      this.$emit("update", this.selected);
      // console.log("Event : " + event.target.value);
    },

    create(list, label) {
      this.label = label;
      this.listOptions = list;
      this.selected = list[0].shortName;
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