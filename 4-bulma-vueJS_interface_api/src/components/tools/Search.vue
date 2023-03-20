<!-- Search -->
<!-- Hugo COLLIN, 20/03/2023 -->
<!-- This component is used to create a search bar. -->

<template>
  <div class="field has-addons">
    <p class="control">
      <input class="input" type="text" :placeholder="this.placeholder" v-model="searchWord" v-on:keyup="emitSearch">
    </p>
    <p class="control">
      <button class="button" @click="executeSearch">Search</button>
    </p>
  </div>
</template>

<script>
/* @vuese
 * This component is used to create a search bar.
 */
import Collect from "collect.js";

export default {
  name: "Search",
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

      // The text to display inside the search bar
      placeholder: '',
    }
  },
  methods: {
    /** @vuese
      * Check if the search bar is empty or not.
     */
    isSearching() {
      return (this.searchWord !== '');
    },

    /** @vuese
      * Emit the search event.
     */
    emitSearch() {
      // emitted to update the list
      this.$emit('search');
    },

    /** @vuese
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
              if (item[att] !== null && this.searchAttributes.indexOf(att) !== -1)
                  // Check if the attribute contains the search word
                if (item[att].toLowerCase().includes(this.searchWord.toLowerCase())) return true;
            }
          })
          .all();
      return list;
    },

    /** @vuese
     * Initialize the search bar data attributes
     * @param attributes search attributes
     * @param placeholder text to display inside the search bar
     * @param label text to display on the button
     */
    init(attributes, placeholder, label) {
      this.searchAttributes = attributes;
      this.placeholder = placeholder;
      this.label = label;
    },
  }
}
</script>

<style scoped>

</style>