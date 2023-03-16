<template>
  <div class="dashboard">
    <div class="level">
      <div class="level-left">
        <h1 class="subtitle is-3">
          <span class="has-text-grey-light">Hello</span> <strong>{{ this.userInfos.FirstName }} {{ this.userInfos.LastName }}</strong>
        </h1>
      </div>
      <div class="level-right">
        <div class="select">
          <select @change="changeStats">
            <option value="today" selected>Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="alltime">All time</option>
          </select>
        </div>
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column is-12-tablet is-6-desktop is-3-widescreen">
        <div class="notification is-link has-text">
          <p class="title is-1">{{selectedStats.orders}}</p>
          <p class="subtitle is-4">Orders</p>
        </div>
      </div>

      <div class="column is-12-tablet is-6-desktop is-3-widescreen">
        <div class="notification is-info has-text">
          <p class="title is-1">{{ selectedStats.revenue }}</p>
          <p class="subtitle is-4">Revenue</p>
        </div>
      </div>

      <div class="column is-12-tablet is-6-desktop is-3-widescreen">
        <div class="notification is-primary has-text">
          <p class="title is-1">{{ selectedStats.visitors }}</p>
          <p class="subtitle is-4">Member</p>
        </div>
      </div>

      <div class="column is-12-tablet is-6-desktop is-4-fullhd">
        <div class="card">
          <div class="card-content">
            <h2 class="title is-4">
              Latest orders
            </h2>

            <template :key="order.InvoiceId" v-for="(order, key) in this.orders">
              <div class="level" >
                <div class="level-left">
                  <div>
                    <p class="title is-5 is-marginless">
                      <router-link to="/orders">{{order.InvoiceId}}</router-link>
                    </p>
                    <small>
                      {{order.InvoiceDate}} by <router-link to="/customers">{{order.name}}</router-link>
                    </small>
                  </div>
                </div>

                <div class="level-right">
                  <div class="has-text-right">
                    <p class="title is-5 is-marginless">
                      $ {{order.Total}}
                    </p>
                  </div>
                </div>
              </div>
            </template>

            <router-link class="button is-link is-outlined" to="/orders">View all orders</router-link>
          </div>
        </div>
      </div>

      <div class="column is-12-tablet is-6-desktop is-4-fullhd">
        <div class="card">
          <div class="card-content">
            <h2 class="title is-4">
              Most popular items
            </h2>

            <template v-for="(item, key) in items" :key="item.TrackId">
              <div class="media" >
                <div class="media-left is-marginless">
                  <p class="number">{{ key + 1 }}</p>
                </div>
                <!--<div class="media-left">
                  <img :src="require(`@/assets/${item.image}`)" width="40">
                </div>-->
                <div class="media-content">
                  <p class="title is-5 is-spaced is-marginless">
                    <router-link to="/items">{{ item.Name }}</router-link>
                  </p>
                </div>
                <div class="media-right">
                  {{ item.Sold}} sold
                </div>
              </div>
            </template>
            <router-link to="/items" class="button is-link is-outlined">View all items</router-link>
          </div>
        </div>
      </div>


      <div class="column is-12-tablet is-6-desktop is-4-fullhd">
        <div class="card">
          <div class="card-content">
            <h2 class="title is-4">
              Most loyal customers
            </h2>
            <template :key="customer.CustomerId" v-for="(customer, key) in customers">
              <div class="media">
                <div class="media-left is-marginless">
                  <p class="number">{{ key + 1 }}</p>
                </div>
                <div class="media-content">
                  <p class="title is-5 is-spaced is-marginless">
                    <router-link to="/customers">{{ customer.FirstName  }} {{ customer.LastName }}</router-link>
                  </p>
                  <p class="subtitle is-6">{{ customer.Country }}</p>
                </div>
                <div class="media-right">{{ customer.OrderCount }} orders
                </div>
              </div>
            </template>

            <router-link class="button is-link is-outlined" to="/customers">View all customers</router-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import ModalItem from "@/components/modals/ModalItem.vue";
import axios from "axios";
import customers from "@/views/Customers.vue";

export default {
  name: 'Dashboard',
  components: {
    ModalItem
  },
  data() {
    return {
      customers: [
        // {
        //   "Address": "Av. Brigadeiro Faria Lima, 2170",
        //   "City": "S\u00e3o Jos\u00e9 dos Campos",
        //   "Company": "Embraer - Empresa Brasileira de Aeron\u00e1utica S.A.",
        //   "Country": "Brazil",
        //   "CustomerId": 1,
        //   "Email": "luisg@embraer.com.br",
        //   "Fax": "+55 (12) 3923-5566",
        //   "FirstName": "Lu\u00eds",
        //   "LastName": "Gon\u00e7alves",
        //   "Phone": "+55 (12) 3923-5555",
        //   "PostalCode": "12227-000",
        //   "State": "SP",
        //   "SupportRepId": 3
        // },
      ],
      items: [
        // {
        //   "Count": -1,
        //   "Name": "Loading",
        //   "TrackId": 1,
        // },
      ],
      orders: [
        // {
        //   "BillingAddress": "Theodor-Heuss-Stra\u00dfe 34",
        //   "BillingCity": "Stuttgart",
        //   "BillingCountry": "Germany",
        //   "BillingPostalCode": "70174",
        //   "BillingState": null,
        //   "CustomerId": 2,
        //   "InvoiceDate": "2009-01-01T00:00:00",
        //   "InvoiceId": 1,
        //   "Total": 1.98
        // },
      ],
      stats: {
        today: {
          // orders: "0",
          // revenue: "7,648",
          // visitors: "1,678",
          // pageViews: "20,756"
        },
        yesterday: {
          // orders: "200",
          // revenue: "5,465",
          // visitors: "1,400",
          // pageViews: "18,556"
        },
        week: {
          // orders: "200",
          // revenue: "5,465",
          // visitors: "1,400",
          // pageViews: "18,556"
        },
        month: {
          // orders: "200",
          // revenue: "5,465",
          // visitors: "1,400",
          // pageViews: "18,556"
        },
        alltime: {
          // orders: "1000",
          // revenue: "55,465",
          // visitors: "10,400",
          // pageViews: "87,999"
        }
      }
    }
  },
  computed: {
    selectedStats() {
      return this.stats.today;
    },
    userInfos() {
      return JSON.parse(sessionStorage.getItem('userInfos'));
    }
  },
  methods: {
    changeStats(event) {
      this.selectedStats = this.stats[event.target.value];
    },
    getImgPath(image) {
      return image ? require(`@/assets/images/${image}`) : "";
    },
    setCustomer() {
      axios.get(this.$store.state.urlAPI + "customers")
          .then(response => {
            this.customers = response.data;
            this.customers.sort((a, b) => {
              return b.OrderCount - a.OrderCount;
            });
            for (let stats in this.stats) {
              this.stats[stats].visitors = response.data.length;
            }
          })
          .catch(error => {
            console.error(error);
          });
    },
    setOrder() {
      axios.get(this.$store.state.urlAPI + "invoices" )
          .then(response => {
            response.data.sort((a, b) => {
              return new Date(b.InvoiceDate) - new Date(a.InvoiceDate);
            });
            for (let stats in this.stats) {
              this.stats[stats].orders = response.data.length;
            }
            // get only the 3 first orders
            response.data = response.data.slice(0, 3);
            // replace customer id by customer name
            this.orders = response.data;
            for (let i = 0; i < this.orders.length; i++) {
              let c = this.customers.find(customer => customer.CustomerId === this.orders[i].CustomerId);
              if (!c) continue;
              this.orders[i].name = c.FirstName + " " + c.LastName;
            }
            this.customers = this.customers.slice(0, 3);
          })
          .catch(error => {
            console.error(error);
          });
    },
    setItem() {
      axios.get(this.$store.state.urlAPI + "tracks")
          .then(response => {
            this.items = response.data;
            this.items.sort((a, b) => {
              return b.Sold - a.Sold;
            });
            // get the total revenue
            let total = 0;
            for (let i = 0; i < this.items.length; i++) {
              total += this.items[i].Sold * this.items[i].UnitPrice;
            }
            // round the total
            total = Math.round(total * 100) / 100;
            for (let stats in this.stats) {

              this.stats[stats].revenue = total;
            }
            // get only the 3 first items
            this.items = this.items.slice(0, 3);
            this.changeStats({target: {value: "today"}})
          })
          .catch(error => {
            console.error(error);
          });
    }
  },
  mounted() {
    //console.log(this.$store.state.tokenLogin);
    this.setCustomer();
    this.setOrder();
    this.setItem();
  }
}
</script>

<style lang="sass" scoped>

</style>



<!--cards: [-->
<!--{-->
<!--title: "Tracks",-->
<!--subtitle: "Total",-->
<!--icon: "mdi-music",-->
<!--color: "is-primary",-->
<!--value: 0,-->
<!--},-->
<!--{-->
<!--title: "Albums",-->
<!--subtitle: "Total",-->
<!--icon: "mdi-album",-->
<!--color: "is-info",-->
<!--value: 0,-->
<!--},-->
<!--{-->
<!--title: "Artists",-->
<!--subtitle: "Total",-->
<!--icon: "mdi-account-music",-->
<!--color: "is-success",-->
<!--value: 0,-->
<!--},-->
<!--{-->
<!--title: "Genres",-->
<!--subtitle: "Total",-->
<!--icon: "mdi-music-circle",-->
<!--color: "is-warning",-->
<!--value: 0,-->
<!--},-->
<!--],-->