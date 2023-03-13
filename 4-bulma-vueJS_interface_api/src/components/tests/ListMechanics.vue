<template>

</template>

<script>
import axios from "axios";
import Collect from 'collect.js';
import ModalItem from "@/components/ModalItem.vue";
import Pagination from "@/components/Pagination.vue";
import Dropdown from "@/components/Dropdown.vue";
import CounterList from "@/components/CounterList.vue";
import Search from "@/components/Search.vue";
import ListMechanics from "@/components/tests/ListMechanics2.vue";
export default {
  name: 'Items',
  components: {ModalItem, Pagination, Dropdown, CounterList, Search, ListMechanics},
  data() {
    return {
      items: [],
      searchItems: [],
      allItems: [],
      item: {
        Name: "",
        UnitPrice: "",
        Milliseconds: "",
        Composer: "",
        TrackId: "",
        AlbumId: "",
        GenreId: "",
        MediaTypeId: "",
        Bytes: "",
      },
      currentItem: null,
      isDescOrder: false,
      showModal: false,
    };
  },

  methods:
  {
    /*
    --- ITEMS FILTERING METHODS ---
     */
    sortItems(sort) {
      if (this.isDescOrder)
      {
        this.allItems = new Collect(this.allItems).sortByDesc(sort).all();
        this.searchItems = new Collect(this.searchItems).sortByDesc(sort).all();
      }
      else
      {
        this.allItems = new Collect(this.allItems).sortBy(sort).all();
        this.searchItems = new Collect(this.searchItems).sortBy(sort).all();
      }

      this.updateList();
    },

    orderItems(order) {
      this.isDescOrder = (order === "desc");
      this.sortItems(this.$refs.sortList.selected);
    },

    search() {
      this.searchItems = this.$refs.search.executeSearch(this.allItems);
      // console.log(this.searchItems)
      this.$refs.pagination.setPage(1);
      this.updateList();
    },

    /*
    --- ITEM EDITION METHODS ---
     */
    addItem(i)
    {
      // this.$refs.list.add(i);
      this.items.push(i);
      this.allItems.push(i);
      this.showModal = false;

      const config = {
          token: sessionStorage.getItem('tokenSession')
        };
      axios({
        method: 'post',
        url: 'http://51.91.76.245:8000/api/tracks',
        data: i,
        headers: config
      })
          .then(response => {
            i.TrackId = response.data.TrackId;
            // console.log(response);
          })
          .catch(error => {
            alert("Please reload the page")
            console.log(error);
            this.loadList();
            // this.displayCutList();
            //this.errorMsg("Erreur lors de la modification de l'item");
          });
    },

    editItem(i)
    {
      let data = {};
      for (let key in this.currentItem) {
        this.currentItem[key] = i[key];
        if (key !== "TrackId")
          data[key] = i[key];
      }
      this.showModal = false;

      const config = {
          token: sessionStorage.getItem('tokenSession')
        };

      axios({
        method: 'put',
        url: 'http://51.91.76.245:8000/api/tracks/' + i.TrackId,
        data: data,
        headers: config
      })
        .then(response => {
          this.updateList();
        })
        .catch(error => {
          alert("Please reload the page")
          console.log(error);
          this.loadList();
          //this.errorMsg("Erreur lors de la modification de l'item");
        });

    },

    deleteItem(item)
    {
      this.items.splice(this.items.indexOf(item), 1);
      this.allItems.splice(this.allItems.indexOf(item), 1);
      this.displayCutAllList();
      axios.delete('http://51.91.76.245:8000/api/tracks/' + item.TrackId, {
        headers:{
          token: sessionStorage.getItem('tokenSession')
        }
      })
          .then(response => {
            this.updateList();
          })
          .catch(error => {
            alert("Please reload the page")
            console.log(error);
            this.loadList();
          });

    },


    /*
    --- MODAL CONFIGURATION ---
     */
    callNewItem()
    {
      this.showModal = true;
      this.$refs.modalItem.newForm();
    },

    callEditItem(item)
    {
      this.showModal = true;
      this.$refs.modalItem.editForm(item);
      this.currentItem = item;
    },

    /*
    --- LIST METHODS ---
     */
    displayCutList(list)
    {
      this.items = [];
      let startItem = this.$refs.pagination.startingItem();
      // console.log(startItem)
      let i = 0;
      while (list[startItem + i] !== undefined && i < this.$refs.pagination.perPage)
      {
        this.items[i] = list[startItem + i];
        i++;
      }
      this.updateCountItems();
    },

    displayCutAllList(searchState)
    {
      if (!searchState)
        this.displayCutList(this.allItems);
      else
        this.displayCutList(this.searchItems);
    },

    loadList()
    {
      axios.get('http://51.91.76.245:8000/api/tracks')
          .then(response => {
            this.allItems = response.data;
            this.sortItems("Name");
            this.updateList();
          })
          .catch(error => {
            console.log(error);
          })
      this.sortItems("Name");
    },

    updateList()
    {
      this.displayCutAllList(searchState);

      if (!this.$refs.search.isSearching())
        this.$refs.pagination.setTotalItems(this.allItems.length);
      else
        this.$refs.pagination.setTotalItems(this.searchItems.length);

      this.$refs.pagination.setTotalPages();
      this.updateCountItems();
      // console.log(this.$refs.pagination.totalPages)
      // console.log(this.$refs.pagination.totalItems)
    },
  },
  mounted() {
    this.loadList();
  },
}
</script>

<style lang="sass" scoped>

</style>