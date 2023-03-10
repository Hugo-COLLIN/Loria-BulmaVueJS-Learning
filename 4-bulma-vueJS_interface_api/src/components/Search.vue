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
    emitSearch(event) {
      this.$emit('search', event.target.value);
    },
    executeSearch(word, list) {
      // console.log(event.target.value)
      // this.searchWord = word//event.target.value;
      // let res = list;
      // console.log("Search word : " + this.searchWord);
      // console.log(list);
      // if (word !== '')
      //   return new Collect(list)
      //       .filter((item) => {
      //         // for (let i = 0; i < this.searchAttributes.length; i++) {
      //         //   item[this.searchAttributes[i]].toLowerCase().includes(this.searchWord.toLowerCase())
      //         // }
      //         item.Name.toLowerCase().includes(this.searchWord.toLowerCase()) || (!item.Composer ? '' : item.Composer).toLowerCase().includes(this.searchWord.toLowerCase())
      //       })
      //       .all();
      // else return list;
      if (word !== '')
        list = new Collect(list)
          .filter((item) => item.Name.toLowerCase().includes(this.searchWord.toLowerCase()) || (!item.Composer ? '' : item.Composer).toLowerCase().includes(this.searchWord.toLowerCase()))
          .all();
      return list;
    },
    setSearchAttributes(attributes) {
      this.searchAttributes = attributes;
    },
    createSearchList(list) {
      this.searchList = list;
    }
  },
}
</script>

<style scoped>

</style>