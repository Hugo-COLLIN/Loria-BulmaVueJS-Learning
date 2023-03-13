<template>
  <div class="field has-addons">
    <p class="control">
      <input class="input" type="text" :placeholder="this.label" v-model="searchWord" v-on:keyup="emitSearch">
    </p>
    <p class="control">
      <button class="button" @click="executeSearch">Search</button>
    </p>
  </div>
</template>

<script>
/*
 * This component is used to create a search bar.
 */
import Collect from "collect.js";
import Items from "@/views/Items.vue";

export default {
  name: "Search",
  components: {Items},
  data() {
    return {
      // The word to search
      searchWord: '',
      // The list of items that has been searched
      searchList: [],
      // The list of attributes to search
      searchAttributes: [],
      // The label of the button
      label: '',
    }
  },
  methods: {
    /*
      * Check if the search bar is empty or not.
     */
    isSearching() {
      return (this.searchWord !== '');
    },

    /*
      * Emit the search event.
     */
    emitSearch() {
      this.$emit('search');
    },

    /*
      * Execute the search in a given list.
     */
    executeSearch(list) {
      // console.log(list)
      if (!this.isSearching())
        return list;
      // Filter the list
      list = new Collect(list)
          .filter((item) => {
            for (let att in item) {
              // Check if the attribute is in the list of attributes to search
              if (item[att] !== null && this.searchAttributes.indexOf(att) !== -1) //(att === "Name" || att === "Composer")
                  // Check if the attribute contains the search word
                if (item[att].toLowerCase().includes(this.searchWord.toLowerCase())) return true;
            }
          })
          .all();
      return list;
    },
    init(attributes, label) {
      this.searchAttributes = attributes;
      this.label = label;
    },
  }
}
</script>

<style scoped>

</style>