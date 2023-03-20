<!-- Dropdown -->
<!-- Hugo COLLIN, 20/03/2023 -->
<!-- This component is used to create a dropdown menu
     It takes a list of options and a label as parameters
     It emits an event when the user selects an option
-->

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
      /**
       * Text before the dropdown
       */
      label: "",

      /**
       * Dropdown elements
       */
      listOptions: {},

      /**
       * Selected option
       */
      selected: "",
    };
  },
  methods: {
    /**
     * Take a list of items and sort them by the selected option
     * @param event event emitted by the dropdown
     */
    sortItems(event) {
      this.selected = event.target.value;
      // Emitted to update the list
      this.$emit("update", this.selected);
      // console.log("Event : " + event.target.value);
    },

    /**
     * Initialize the component
     * @param list elements of the dropdown
     * @param label text before the dropdown
     */
    init(list, label) {
      this.label = label;
      this.listOptions = list;
      this.selected = list[0].shortName;
      console.log("Dropdown : " + this.selected)
    },

  },
}
</script>

<style scoped>

</style>