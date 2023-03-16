<template>
  <div class="items">
    <h1 class="title is-center">{{this.pageTitle}}</h1>

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
              <Search ref="search" @search="search"></Search>
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

    <div class="columns is-multiline is-align-items-stretch" :class="{'is-hidden': this.listView !== 'tiles'}">
      <TileViewList ref="tileViewList" @call-edit-item="callEditItem" @delete-item="deleteItem" :items="this.items"/> <!--v-if="this.listView === 'tile'"-->
    </div>
    <div class="columns is-multiline is-align-items-stretch" :class="{'is-hidden': this.listView !== 'table'}">
      <TableViewList ref="tableViewList" @call-edit-item="callEditItem" @delete-item="deleteItem" :items="this.items"/>
    </div>

    <Pagination ref="pagination" @pagin-update="displayCutAllList"></Pagination>
  </div>
  <ModalItem ref="modalItem" :show-modal="showModal" @close="showModal = false" @sent-data="addItem" @edit-data="editItem"></ModalItem>
</template>

<script>
import axios from "axios";
import Collect from 'collect.js';
import ModalItem from "@/components/modals/ModalItem.vue";
import Pagination from "@/components/tools/Pagination.vue";
import Dropdown from "@/components/tools/Dropdown.vue";
import CounterList from "@/components/tools/CounterList.vue";
import Search from "@/components/tools/Search.vue";
import TileViewList from "@/components/view/list/TileViewList.vue";
import TableViewList from "@/components/view/list/TableViewList.vue";

export default {
  name: 'Items',
  components: {TileViewList, ModalItem, Pagination, Dropdown, CounterList, Search, TableViewList},
  data() {
    return {
      items: [],
      searchItems: [],
      allItems: [],
      item: {
        // Name: "",
        // UnitPrice: "",
        // Milliseconds: "",
        // Composer: "",
        // TrackId: "",
        // AlbumId: "",
        // GenreId: "",
        // MediaTypeId: "",
        // Bytes: "",
      },
      showModal: false,
      // searchWord: "",
      currentItem: null,

      isDescOrder: false,
      sorts: [],
      orders: [
        {fullName: "Ascending", shortName: "asc"},
        {fullName: "Descending", shortName: "desc"},
      ],

      urlAPI: "",
      pageTitle: "",

      searchComponent: {
        att: [],
        placeholder: "",
        button: "",
      },

      counterComponent: {
        label: "",
      },

      listView: "",
      identifier: "",
      excludedProps: [],
    };
  },

  methods:
  {
    setPageTitle(title) {
      this.pageTitle = title;
    },

    // setSearchPlaceholder(placeholder) {
    //   this.$refs.search.setPlaceholder(placeholder);
    // },
        /*
    --- ITEMS FILTERING METHODS ---
     */
    sortItems(sort) {
      if (this.isDescOrder) {
        this.allItems = new Collect(this.allItems).sortByDesc(sort).all();
        this.searchItems = new Collect(this.searchItems).sortByDesc(sort).all();
      } else {
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
    addItem(i) {
      this.items.push(i);
      this.allItems.push(i);
      this.showModal = false;

      let data = {};
      console.log(this.excludedProps)
      for (let key in i) {
        if (key !== this.identifier && this.excludedProps.indexOf(key) === -1 && i[key] !== null)
          data[key] = i[key];
      }

      console.log(data)

      const config = {
        token: sessionStorage.getItem('tokenSession')
      };
      axios({
        method: 'post',
        url: this.urlAPI,
        data: data,
        headers: config
      })
          .then(response => {
            i[this.identifier] = response.data[this.identifier];
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

    editItem(i) {
      let data = {};
      for (let key in this.currentItem) {
        this.currentItem[key] = i[key];
        if (key !== this.identifier && i[key] !== null)
          data[key] = i[key];
      }
      this.showModal = false;

      const config = {
        token: sessionStorage.getItem('tokenSession')
      };

      axios({
        method: 'put',
        url: this.urlAPI + '/' + i[this.identifier],
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

    deleteItem(item) {
      this.items.splice(this.items.indexOf(item), 1);
      this.allItems.splice(this.allItems.indexOf(item), 1);
      this.displayCutAllList();
      axios.delete(this.urlAPI + '/' + item[this.identifier], {
        headers: {
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
    callNewItem() {
      this.showModal = true;
      this.$refs.modalItem.newForm();
    },

    callEditItem(item) {
      this.showModal = true;
      this.$refs.modalItem.editForm(item);
      this.currentItem = item;
    },

        /*
    --- LIST METHODS ---
     */
    displayCutList(list) {
      this.items = [];
      let startItem = this.$refs.pagination.startingItem();
      // console.log(startItem)
      let i = 0;
      while (list[startItem + i] !== undefined && i < this.$refs.pagination.perPage) {
        this.items[i] = list[startItem + i];
        i++;
      }
      this.updateCountItems();
    },

    displayCutAllList() {
      if (!this.$refs.search.isSearching())
        this.displayCutList(this.allItems);
      else
        this.displayCutList(this.searchItems);
    },

    loadList() {
      axios.get(this.urlAPI)
          .then(response => {
            this.allItems = response.data;
            this.$refs.modalItem.setItemAttributes(this.allItems[0])
            this.sortItems(this.$refs.sortList.selected);
            this.updateList();
            // this.setCardsTitle("Name");
            console.log()
          })
          .catch(error => {
            console.log(error);
          })
      // this.sortItems("Name");
    },

    updateList() {
      this.displayCutAllList();

      if (!this.$refs.search.isSearching())
        this.$refs.pagination.setTotalItems(this.allItems.length);
      else
        this.$refs.pagination.setTotalItems(this.searchItems.length);

      this.$refs.pagination.setTotalPages();
      this.updateCountItems();
      // console.log(this.$refs.pagination.totalPages)
      // console.log(this.$refs.pagination.totalItems)
    },

      /*
      --- OTHER COMPONENTS METHODS ---
     */
    updateCountItems() {
      const init = this.$refs.pagination.startingItem() + 1;
      const last = this.items.length + init - 1;
      if (!this.$refs.search.isSearching())
        this.$refs.counterList.updateCounter(init, last, this.allItems.length);
      else
        this.$refs.counterList.updateCounter(init, last, this.searchItems.length);
    },

    initComponents() {
      this.$refs.orderList.init(this.orders);
      this.$refs.sortList.init(this.sorts, "Order by");

      this.$refs.counterList.init(this.counterComponent.label);
      this.$refs.search.init(this.searchComponent.att, this.searchComponent.placeholder, this.searchComponent.button);
    },

    setDataSet(url) {
      this.urlAPI = url;
      console.log(this.urlAPI)
    },

    setSortOptions(sorts) {
      this.sorts = sorts;
    },

    setSearchComponent(attributes, placeholder, button) {
      this.searchComponent.att = attributes;
      this.searchComponent.placeholder = placeholder;
      this.searchComponent.button = button;
    },

    setFormView(formStruct) {
      this.$refs.modalItem.setFormStruct(formStruct);
    },

    setCounterComponent(label) {
      this.counterComponent.label = label;
    },

    setView(view) {
      console.log(view)
      this.listView = view;
    },

    setIdentifier(id) {
      this.identifier = id;
    },



    init() {
      this.initComponents();
      this.loadList();
    },

    setModel(cards) {
      // if (this.listView === "table")
        this.$refs.tableViewList.setTable(cards);
      // else if (this.listView === "tiles")
        this.$refs.tileViewList.setCards(cards);
    },

    setExcludedProps(props) {
      console.log(props)
      this.excludedProps = props;
    },
  },
  mounted() {
    // this.initComponents();
    // this.loadList();
    // console.log(this.items)
    // console.log(this.searchItems)
    // console.log(this.allItems)
  },
}
</script>

