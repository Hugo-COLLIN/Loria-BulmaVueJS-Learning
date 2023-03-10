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
              // for (let i = 0; i < this.searchAttributes.length; i++) {
              //   item[this.searchAttributes[i]].toLowerCase().includes(this.searchWord.toLowerCase())
              // }
      //         //item.Name.toLowerCase().includes(this.searchWord.toLowerCase()) || (!item.Composer ? '' : item.Composer).toLowerCase().includes(this.searchWord.toLowerCase())
      //       })
      //       .all();
      // else return list;
      // if (word !== '')
      //   list = new Collect(list)
      //     .filter((item) => item.Name.toLowerCase().includes(this.searchWord.toLowerCase()) || (!item.Composer ? '' : item.Composer).toLowerCase().includes(this.searchWord.toLowerCase()))
      //     .all();

      if (word !== '')
            list = new Collect(list)
                .filter((item) => {
                  for (let att in item)
                    if (item[att] !== null && this.searchAttributes.indexOf(att) !== -1) //(att === "Name" || att === "Composer")
                      if (item[att].toLowerCase().includes(this.searchWord.toLowerCase())) return true;




                  // for (let att in item)
                  //   if (item[att] !== null)
                  //     for (let sa in this.searchAttributes)
                  //       if (att === this.searchAttributes[sa])
                  //         if (item[att].toLowerCase().includes(this.searchWord.toLowerCase())) return true;


                  // console.log(item)
                  // for (let att in item)
                  //   if (item[att] !== null)
                  //     for (let sa in this.searchAttributes)
                      // for (let i = 0; i < this.searchAttributes.length; i++)
                      //   console.log(item[sa])
                        // if (att === this.searchAttributes[i])
                          // return item[att].toLowerCase().includes(this.searchWord.toLowerCase());
                        // console.log (att + " " + this.searchAttributes[i])
                        // if (item[att] === item[sa]) console.log("Att: " + att + "Sa: " + sa)

                      // console.log(this.searchAttributes[sa])
                      // if (att === sa && item[att] !== null && (att === "Name" || att === "Composer"))
                      //   if (item[att].toLowerCase().includes(this.searchWord.toLowerCase())) return true;
                      // if (item[att] !== null /*&& (this.isInAttributes(att))*/) this.isInAttributes(att)
                        // if (item[att].toLowerCase().includes(this.searchWord.toLowerCase())) return true;
                    // console.log(item[att])
                  // for (let sa in this.searchAttributes)
                    // if (item[this.searchAttributes].toLowerCase().includes(this.searchWord.toLowerCase())) return true;
                    // console.log(item[this.searchAttributes[sa]])
                    //if(item.isIn(sa)) return true;
                  // console.log(item[this.searchAttributes[0]])
                  // for (let i = 0 ; i < list.length ; i++) {
                  //   // console.log(item[this.searchAttributes[i]])
                  //   // item[this.searchAttributes[i]].toLowerCase().includes(this.searchWord.toLowerCase())
                  // }
                })
                .all();

      // if (word !== '')
      //   list = new Collect(list)
      //       .filter((item) => {
      //         // console.log(item)
      //         for (let att in item)
      //           if (item[att] !== null)
      //             for (let sa in this.searchAttributes)
      //             // for (let i = 0; i < this.searchAttributes.length; i++)
      //               console.log(item[sa])
      //               // if (att === this.searchAttributes[i])
      //                 // return item[att].toLowerCase().includes(this.searchWord.toLowerCase());
      //               // console.log (att + " " + this.searchAttributes[i])
      //               // if (item[att] === item[sa]) console.log("Att: " + att + "Sa: " + sa)
      //
      //             // console.log(this.searchAttributes[sa])
      //             // if (att === sa && item[att] !== null && (att === "Name" || att === "Composer"))
      //             //   if (item[att].toLowerCase().includes(this.searchWord.toLowerCase())) return true;
      //             // if (item[att] !== null /*&& (this.isInAttributes(att))*/) this.isInAttributes(att)
      //               // if (item[att].toLowerCase().includes(this.searchWord.toLowerCase())) return true;
      //           // console.log(item[att])
      //         // for (let sa in this.searchAttributes)
      //           // if (item[this.searchAttributes].toLowerCase().includes(this.searchWord.toLowerCase())) return true;
      //           // console.log(item[this.searchAttributes[sa]])
      //           //if(item.isIn(sa)) return true;
      //         // console.log(item[this.searchAttributes[0]])
      //         // for (let i = 0 ; i < list.length ; i++) {
      //         //   // console.log(item[this.searchAttributes[i]])
      //         //   // item[this.searchAttributes[i]].toLowerCase().includes(this.searchWord.toLowerCase())
      //         // }
      //       })
      //       .all();
      return list;
    },
    isInAttributes(att) {
      // console.log("Att:" + att)
      for (let sa in this.searchAttributes)
        // console.log("Att: " + att + "Sa: " + sa)
        console.log("Att: " + att + "Sa: " + sa)
        // if (att === sa) console.log("Att: " + att + "Sa: " + sa)
          // return true;
      // return (att === "Name" || att === "Composer");
    },
    // isInAttributes(att) {
      // for (let i = 0 ; i < this.searchAttributes.length ; i++) {
        // console.log(att === this.searchAttributes[i])
        // if (att === this.searchAttributes[i]) {
        //   console.log(this.searchAttributes[i])
        //   console.log(att)
        //   // return true;
        // }
      //}
    //   return false;
    // },
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