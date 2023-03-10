<template>
  <div class="items">
    <h1 class="title is-center">Tracks</h1>

    <nav>
      <div class="level is-flex-wrap-wrap is-ancestor">
        <div class="level-left mb-4">
          <div class="level-item">
          <CounterList ref="counterList"></CounterList>
          <p class="level-item ml-2">
            <button class="button is-success" @click="callNewItem">New</button>
          </p>
          </div>

          <div class="level-left">
            <div class="level-item">
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="text" placeholder="Item name, Composer…" v-model="searchWord" v-on:keyup="search">
                </p>
                <p class="control">
                  <button class="button" @click="search">Search</button>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="level-right mb-4">
          <div class="level-item is-flex-wrap-wrap">
            <Dropdown ref="sortList" @update="sortItems"></Dropdown>
            <Dropdown ref="orderList" @update="orderItems"></Dropdown>
            <div></div>
          </div>
        </div>
      </div>
    </nav>

<!--    <Pagination ref="pagination" @pagin-update="displayCutList"></Pagination>--> <!--Initialization error, only for the last and bug when vue reload data-->

    <div class="columns is-multiline  is-align-items-stretch">
      <template v-for="(item, key) in items">
        <div class="column is-12-tablet is-6-desktop is-4-widescreen">
          <article class="box" style="height: 100%;">
            <div class="media">
              <aside class="media-left">
                <img src="@/assets/images/Speaker_Icon.svg.png" width="80" alt="Piste de musique">
              </aside>
              <div class="media-content">
                <p class="title is-5 is-spaced is-marginless">
                  <a @click="callEditItem(item)">{{item.Name}}</a>
                </p>
                <p class="subtitle is-marginless">
                  ${{item.UnitPrice}}
                </p>
                <div class="content is-small">
                  <!-- convert milliseconds to minutes and second -->
                  {{Math.floor(item.Milliseconds / 60000)}} min {{Math.floor((item.Milliseconds % 60000) / 1000)}} sec
                  <br>
                  Compositeur(s): {{item.Composer}}
                  <br>
                  <a @click="callEditItem(item)">Edit</a>
                  <span> | </span>
                  <a @click="deleteItem(item)">Delete</a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </template>
    </div>
    <Pagination ref="pagination" @pagin-update="displayCutAllList"></Pagination>
  </div>
  <ModalItem ref="modalItem" :show-modal="showNewModal" @close="showNewModal = false" @sent-data="addItem" @edit-data="editItem"></ModalItem>
</template>

<script>
import axios from "axios";
import Collect from 'collect.js';
import ModalItem from "@/components/ModalItem.vue";
import Pagination from "@/components/Pagination.vue";
import Dropdown from "@/components/Dropdown.vue";
import CounterList from "@/components/CounterList.vue";

export default {
  name: 'Items',
  components: {ModalItem, Pagination, Dropdown, CounterList},
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
      showNewModal: false,
      showEditModal: false,
      searchWord: "",
      currentItem: null,

      isDescOrder: false,
      sorts: [
        { fullName: "Name", shortName: "Name" },
        { fullName: "Unit Price", shortName: "UnitPrice" },
        { fullName: "Duration", shortName: "Milliseconds" },
        { fullName: "Composer", shortName: "Composer" },
        { fullName: "Track Id", shortName: "TrackId" },
        { fullName: "Album Id", shortName: "AlbumId" },
        { fullName: "Genre Id", shortName: "GenreId" },
        { fullName: "Media Type", shortName: "MediaTypeId" },
      ],

      orders: [
        { fullName: "Ascending", shortName: "asc" },
        { fullName: "Descending", shortName: "desc" },
      ],
    };
  },

  methods:
  {
    sortItems(sort) {
      console.log("F: " + sort)
      // let collection = (this.searchWord === '') ? new Collect(this.allItems) : new Collect(this.searchItems);
      if (this.isDescOrder)
      {
        console.log("on change l'ordre")
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
      console.log("O: " + order)
      // let collection = (this.searchWord === '') ? new Collect(this.allItems) : new Collect(this.searchItems);
      this.isDescOrder = (order === "desc");
      console.log("Selected: " + this.$refs.sortList.selected)
      this.sortItems(this.$refs.sortList.selected);
    },

    search() {
      if (this.searchWord !== '')
        this.searchItems = new Collect(this.allItems)
          .filter((item) => item.Name.toLowerCase().includes(this.searchWord.toLowerCase()) || (!item.Composer ? '' : item.Composer).toLowerCase().includes(this.searchWord.toLowerCase()))
          .all();
      this.$refs.pagination.setPage(1);
      this.updateList();
    },

    addItem(i)
    {
      this.items.push(i);
      this.allItems.push(i);
      this.showNewModal = false;

      const config = {
          token: sessionStorage.getItem('tokenSession')
        };
      console.log(i)
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
      this.showNewModal = false;

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
          console.log(response);
          this.search();
        })
        .catch(error => {
          alert("Please reload the page")
          console.log(error);
          this.loadList();
          //this.errorMsg("Erreur lors de la modification de l'item");
        });

    },

    callNewItem()
    {
      this.showNewModal = true;
      this.$refs.modalItem.newForm();
    },

    callEditItem(item)
    {
      this.showNewModal = true;
      this.$refs.modalItem.editForm(item);
      this.currentItem = item;
    },

    deleteItem(item)
    {
      this.items.splice(this.items.indexOf(item), 1);
      this.allItems.splice(this.allItems.indexOf(item), 1);
      this.displayCutAllList();
      // console.log(item)
      // console.log(item.TrackId)
      axios.delete('http://51.91.76.245:8000/api/tracks/' + item.TrackId, {
        headers:{
          token: sessionStorage.getItem('tokenSession')
        }
      })
          .then(response => {
            console.log(response);
            this.search();
          })
          .catch(error => {
            alert("Please reload the page")
            console.log(error);
            this.loadList();
          });

    },

    displayCutList(list) // A modif pour le filtre
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
      // console.log(this.items)
    },

    displayCutAllList()
    {
      if (this.searchWord === '')
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
      this.displayCutAllList();

      if (this.searchWord === '')
        this.$refs.pagination.setTotalItems(this.allItems.length);
      else
        this.$refs.pagination.setTotalItems(this.searchItems.length);

      this.$refs.pagination.setTotalPages();
      this.updateCountItems();
      // console.log(this.$refs.pagination.totalPages)
      // console.log(this.$refs.pagination.totalItems)
    },

    updateCountItems()
    {
      const init = this.$refs.pagination.startingItem() + 1;
      const last = this.items.length + init - 1;
      if (this.searchWord === '')
        this.$refs.counterList.updateCounter(init, last, this.allItems.length);
      else
        this.$refs.counterList.updateCounter(init, last, this.searchItems.length);
    },

    setSortList() {
      this.$refs.orderList.create(this.orders);
      this.$refs.sortList.create(this.sorts,"Order by");
    },
  },
  mounted() {
    this.setSortList();
    this.loadList();
    //this.$refs.sortList.sortBy('Name');
  },
}
</script>

<style lang="sass" scoped>

</style>