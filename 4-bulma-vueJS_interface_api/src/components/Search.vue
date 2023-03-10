<template>
  <div class="field has-addons">
    <p class="control">
      <input class="input" type="text" placeholder="Item name, Composer…" v-model="searchWord" v-on:keyup="emitSearch">
    </p>
    <p class="control">
      <button class="button" @click="executeSearch">Search</button>
    </p>
  </div>
</template>

<script>
import Collect from "collect.js";
import Items from "@/views/Items.vue";

export default {
  name: "Search",
  components: {Items},
  data() {
    return {
      searchWord: '',
      searchList: [],
      searchAttributes: ["Name", "Composer"]
    }
  },
  methods: {
    isSearching() {
      return (this.searchWord !== '');
    },
    emitSearch() {
      this.$emit('search');
    },
    executeSearch(list) {
      if (this.searchWord !== '')
        list = new Collect(list)
            .filter((item) => {
              for (let att in item)
                if (item[att] !== null && this.searchAttributes.indexOf(att) !== -1) //(att === "Name" || att === "Composer")
                  if (item[att].toLowerCase().includes(this.searchWord.toLowerCase())) return true;
            })
            .all();
      return list;
    },
    setSearchAttributes(attributes) {
      this.searchAttributes = attributes;
    },
  }
}
</script>

<style scoped>

</style>