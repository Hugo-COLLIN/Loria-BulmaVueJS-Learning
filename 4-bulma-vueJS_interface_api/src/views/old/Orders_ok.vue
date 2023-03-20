<template>
  <div class="invoice">
    <h1 class="title">Order</h1>
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
        <th>Order #</th>
        <th>Customer</th>
        <th>Date</th>
        <th>Tracks</th>
        <th>Total</th>
      </tr>
      </thead>
      <tfoot>
      <tr>
        <th class="is-narrow">
          <input type="checkbox">
        </th>
        <th>Order #</th>
        <th>Customer</th>
        <th>Date</th>
        <th>Tracks</th>
        <th>Total</th>
      </tr>
      </tfoot>
      <tbody>
      <template v-for="(item, key) in items">
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td>
            <strong>{{ item.InvoiceId }}</strong>
          </td>
          <td>{{ item.CustomerName }}</td>
          <td>{{ item.InvoiceDate }}</td>
          <td>{{ item.Amount }}</td>
          <td>{{ item.Total }}</td>
          <td>
            <div class="buttons">
              <a class="button is-small" @click="deleteItem(item)">Delete</a>
            </div>
          </td>
        </tr>
      </template>
      </tbody>

    </table>
    <Pagination ref="pagination" @pagin-update="displayCutAllList"></Pagination>
  </div>
  <!-- TODO: Add modal -->
  <ModalItem ref="modalItem" :show-modal="showModal" @close="showModal = false" @sent-data="addItem"
             @edit-data="editItem"></ModalItem>
</template>

<script>
import CounterList from "@/components/tools/CounterList.vue";
import Search from "@/components/tools/Search.vue";
import Dropdown from "@/components/tools/Dropdown.vue";
import Pagination from "@/components/tools/Pagination.vue";
import ModalItem from "@/components/view/form/Formular.vue";
import axios from "axios";
import Collect from "collect.js";

export default {
  name: 'Dashboard',
  components: {ModalItem, Pagination, Dropdown, Search, CounterList},
  data() {
    return {
      items: [],
      allItems: [],
      item: {
        "BillingAddress": '',
        "BillingCity": "",
        "BillingCountry": "",
        "BillingPostalCode": "",
        "BillingState": '',
        "CustomerId": '',
        "InvoiceDate": '',
        "InvoiceId": '',
        "Amount": '',
        "CustomerName": '',
        "Total": ''
      },
      showModal: false,
      isDescOrder: false,
      currentItem: null,
      sorts: [
        {fullName: "Order #", shortName: "InvoiceId"},
        {fullName: "Customer", shortName: "CustomerName"},
        {fullName: "Date", shortName: "InvoiceDate"},
        {fullName: "Total", shortName: "Total"},
      ],
      orders: [
        {fullName: "Ascending", shortName: "asc"},
        {fullName: "Descending", shortName: "desc"},
      ],
      customers: [],
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

    getInvoice() {
      axios.get('http://51.91.76.245:8000/api/invoices')
          .then(response => {
            this.allItems = response.data;
            this.items = response.data;
            this.total = this.allItems.length;
            // get customer name and amount for each
            this.updateList();
          })
          .catch(error => {
            console.error(error);
          });
    },

    callNewItem() {
      this.showModal = true;
      this.$refs.modalItem.showModal = true;
    },

    addItem(item) {
      this.items.push(item);
      this.total = this.items.length;
      this.displayCutAllList();
      axios.post('http://51.91.76.245:8000/api/invoices', item, {
        headers: {
          token: sessionStorage.getItem('tokenSession')
        }
      })
          .then(response => {
            item.InvoiceId = response.data.InvoiceId;
          })
          .catch(error => {
            console.error(error);
          });
    },

    callEditItem(item) {
      this.showModal = true;
      this.$refs.modalItem.editForm(item);
      this.currentItem = item;
    },

    deleteItem(item) {
      this.items.splice(this.items.indexOf(item), 1);
      this.allItems.splice(this.allItems.indexOf(item), 1);
      this.displayCutAllList();
      axios.delete('http://51.91.76.245:8000/api/invoices/' + item.InvoiceId, {
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

    async updateCountItems() {
      const init = this.$refs.pagination.startingItem() + 1;
      const last = this.items.length + init - 1;
      if (!this.$refs.search.isSearching())
        this.$refs.counterList.updateCounter(init, last, this.allItems.length);
      else
        this.$refs.counterList.updateCounter(init, last, this.searchItems.length);
      // if there is no amount or customer name, get it
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].CustomerName === undefined)
          await this.getCustomer(this.items[i].CustomerId, this.allItems.indexOf(this.items[i]));
        if (this.items[i].Amount === undefined)
          this.getAmount(this.items[i].InvoiceId, this.allItems.indexOf(this.items[i]));
      }
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
    async getCustomer(CustomerId, index) {
      // check if customers is in the customers list
      if (this.customers[CustomerId] !== undefined) {
        this.allItems[index].CustomerName = this.customers[CustomerId].FirstName + " " + this.customers[CustomerId].LastName;
        return;
      }
      // print calling function
      await axios.get('http://51.91.76.245:8000/api/customers')
          .then(response => {
            for (let i = 0; i < response.data.length; i++) {
              this.customers[response.data[i].CustomerId] = response.data[i];
            }
            this.allItems[index].CustomerName = this.customers[CustomerId].FirstName + " " + this.customers[CustomerId].LastName;
          })
          .catch(error => {
            console.error(error);
          });
    },

    getAmount(InvoiceId, index) {
      axios.get('http://51.91.76.245:8000/api/invoices/' + InvoiceId + '/items')
          .then(response => {
            this.allItems[index].Amount = response.data.reduce((a, b) => a + b.Quantity, 0);
          })
          .catch(error => {
            console.error(error);
          });
    }
  },
  mounted() {
    this.getInvoice();
    this.$refs.search.init(["Order #", "Customer", "Date", "Total"], "Order #,Customer, Date, Total");
    this.$refs.sortList.init(this.sorts, "Order by");
    this.$refs.orderList.init(this.orders, "Order");
  },
}
</script>

<style lang="sass" scoped>

</style>