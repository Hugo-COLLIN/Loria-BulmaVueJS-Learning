<template>
  <div class="customers">
    <h1 class="title">Customer</h1>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <CounterList ref="counterList"></CounterList>
          </p>
        </div>

        <p class="level-item">
          <a class="button is-success" @click="callNewItem">New</a>
        </p>

        <div class="level-item is-hidden-tablet-only">
          <div class="field has-addons">
            <Search ref="search" @search="search"></Search>
          </div>
        </div>
      </div>

      <div class="level-right">
        <Dropdown ref="sortList" @update="sortItems"></Dropdown>
        <Dropdown ref="orderList" @update="orderItems"></Dropdown>
      </div>

    </nav>

    <table class="table is-hoverable is-fullwidth">
      <thead>
      <tr>
        <th class="is-narrow">
          <input type="checkbox">
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Country</th>
        <th>Orders</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tfoot>
      <tr>
        <th class="is-narrow">
          <input type="checkbox">
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Country</th>
        <th>Orders</th>
        <th>Actions</th>
      </tr>
      </tfoot>
      <tbody>
      <template v-for="(item) in items">
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td>
            <strong>{{ item.FirstName }} {{ item.LastName }}</strong>
          </td>
          <td><code>{{ item.Email }}</code></td>
          <td>{{ item.Country }}</td>
          <td>
            <!-- TODO: Add redirect to orders -->
            <router-link to="orders">{{ item.OrderCount }}</router-link>
          </td>
          <td>
            <div class="buttons">
              <a class="button is-small" @click="callEditItem(item)">Edit</a>
              <a class="button is-small" @click="deleteItem(item)">Delete</a>
            </div>
          </td>
        </tr>
      </template>
      </tbody>

    </table>
    <Pagination ref="pagination" @pagin-update="displayCutAllList"></Pagination>
  </div>
  <Modal ref="modalCustomers" :show-modal="showModal" @close="showModal = false" @sent-data="addItem"
         @edit-data="editItem"></Modal>
</template>

<script>
import CounterList from "@/components/tools/CounterList.vue";
import Search from "@/components/tools/Search.vue";
import Dropdown from "@/components/tools/Dropdown.vue";
import Pagination from "@/components/tools/Pagination.vue";
import axios from "axios";
import Collect from "collect.js";
import Modal from "@/components/Modal.vue";

export default {
  name: 'Dashboard',
  components: {Modal, Pagination, Dropdown, Search, CounterList},
  data() {
    return {
      items: [],
      allItems: [],
      item: {
        Address: '',
        City: '',
        Company: '',
        Country: '',
        CustomerId: '',
        Email: '',
        Fax: '',
        FirstName: '',
        LastName: '',
        OrderCount: '',
        Phone: '',
        PostalCode: '',
        State: '',
        SupportRepId: '',
      },
      showModal: false,
      isDescOrder: false,
      currentItem: null,
      sorts: [
        {fullName: "Name", shortName: "Name"},
        {fullName: "Email", shortName: "Email"},
        {fullName: "Country", shortName: "Country"},
        {fullName: "Orders", shortName: "OrderCount"},
      ],
      orders: [
        {fullName: "Ascending", shortName: "asc"},
        {fullName: "Descending", shortName: "desc"},
      ],
    }
  },
  methods: {

    search() {
      this.searchItems = this.$refs.search.executeSearch(this.allItems);
      // console.log(this.searchItems)
      this.$refs.pagination.setPage(1);
      this.updateList();
    },

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

    getCustomers() {
      axios.get('http://51.91.76.245:8000/api/customers')
          .then(response => {
            this.allItems = response.data;
            this.items = response.data;
            this.total = this.allItems.length;
            this.updateList();
          })
          .catch(error => {
            console.error(error);
          });
    },

    editItem(i) {
      let data = {};
      for (let key in this.currentItem) {
        this.currentItem[key] = i[key];
        if (key !== "CustomerId")
          data[key] = i[key];
      }
      this.showModal = false;

      const config = {
        token: sessionStorage.getItem('tokenSession')
      };

      axios({
        method: 'put',
        url: 'http://51.91.76.245:8000/api/customers/' + i.CustomerId,
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

    callNewItem() {
      this.showModal = true;
      console.log(this.$refs.modalCustomers.showModal);
      this.$refs.modalCustomers.showModal = true;
    },

    addItem(item) {
      this.items.push(item);
      this.total = this.items.length;
      this.displayCutAllList();
      item.SupportRepId = 1;
      axios({
        method: 'post',
        url: "http://51.91.76.245:8000/api/customers",
        data: item,
        headers: {
          token: sessionStorage.getItem('tokenSession')
        }
      })
          .then(response => {
            item.CustomerId = response.data.CustomerId;
          })
          .catch(error => {
            console.error(error);
          });
    },

    callEditItem(item) {
      this.showModal = true;
      this.$refs.modalCustomers.editForm(item);
      this.currentItem = item;
    },

    deleteItem(item) {
      this.items.splice(this.items.indexOf(item), 1);
      this.allItems.splice(this.allItems.indexOf(item), 1);
      this.displayCutAllList();
      axios.delete('http://51.91.76.245:8000/api/customers/' + item.CustomerId, {
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

    displayCutAllList() {
      if (!this.$refs.search.isSearching())
        this.displayCutList(this.allItems);
      else
        this.displayCutList(this.searchItems);
    },

    displayCutList(list) {
      this.items = [];
      let startItem = this.$refs.pagination.startingItem();
      let i = 0;
      while (list[startItem + i] !== undefined && i < this.$refs.pagination.perPage) {
        this.items[i] = list[startItem + i];
        i++;
      }
      this.updateCountItems();
    },

    updateCountItems() {
      const init = this.$refs.pagination.startingItem() + 1;
      const last = this.items.length + init - 1;
      if (!this.$refs.search.isSearching())
        this.$refs.counterList.updateCounter(init, last, this.allItems.length);
      else
        this.$refs.counterList.updateCounter(init, last, this.searchItems.length);
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
  },
  mounted() {
    this.getCustomers();
    this.$refs.search.init(["FirstName", "LastName", "Email", "Country"], "Name,Email,Country");
    this.$refs.sortList.init(this.sorts, "Order by");
    this.$refs.orderList.init(this.orders, "Order");
    this.$refs.modalCustomers.init(this.item)
  },
}
</script>

<style lang="sass" scoped>

</style>