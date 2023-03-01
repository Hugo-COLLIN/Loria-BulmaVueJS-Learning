<template>
  <div class="dashboard">
    <div class="level">
      <div class="level-left">
        <h1 class="subtitle is-3">
          <span class="has-text-grey-light">Hello</span> <strong>Alex Johnson</strong>
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
          <p class="subtitle is-4">Visitors</p>
        </div>
      </div>

      <div class="column is-12-tablet is-6-desktop is-3-widescreen">
        <div class="notification is-success has-text">
          <p class="title is-1">{{ selectedStats.pageViews }}</p>
          <p class="subtitle is-4">Pageviews</p>
        </div>
      </div>

      <div class="column is-12-tablet is-6-desktop is-4-fullhd">
        <div class="card">
          <div class="card-content">
            <h2 class="title is-4">
              Latest orders
            </h2>

            <template :key="order.id" v-for="(order, key) in this.orders">
              <div class="level" >
                <div class="level-left">
                  <div>
                    <p class="title is-5 is-marginless">
                      <router-link to="/edit-order">{{order.id}}</router-link>
                    </p>
                    <small>
                      {{order.date}} by <router-link to="/edit-customer">{{order.purchasedBy}}</router-link>
                    </small>
                  </div>
                </div>

                <div class="level-right">
                  <div class="has-text-right">
                    <p class="title is-5 is-marginless">
                      $ {{order.price}}
                    </p>
                    <span class="tag" :class="order.status.class">{{ order.status.name }}</span>
                  </div>
                </div>
              </div>
            </template>

            <router-link class="button is-link is-outlined" to="/orders">View all orders</router-link>
          </div>
        </div>
      </div>
<!--
      <div class="column is-12-tablet is-6-desktop is-4-fullhd">
        <div class="card">
          <div class="card-content">
            <h2 class="title is-4">
              Most popular items
            </h2>

            <template :key="item.rank" v-for="(item, key) in this.items">
              <div class="media" >
                <div class="media-left is-marginless">
                  <p class="number">{{item.rank}}</p>
                </div>

                <div class="media-left">
                  <img :src="require(`@/assets/images/${item.image}`)" width="40">
                </div>

                <div class="media-content">
                  <p class="title is-5 is-spaced is-marginless">
                    <router-link to="/edit-item">{{item.title}}</router-link>
                  </p>
                </div>

                <div class="level-right">
                  <div class="level-right">
                    {{ item.totalSales }} sold
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
              Latest orders
            </h2>

            <template :key="order.id" v-for="(order, key) in this.orders">
              <div class="media" >
                <div class="level-left">
                  <div>
                    <p class="title is-5 is-marginless">
                      <router-link to="/edit-order">{{order.id}}</router-link>
                    </p>
                    <small>
                      {{order.date}} by <router-link to="/edit-customer">{{order.purchasedBy}}</router-link>
                    </small>
                  </div>
                </div>

                <div class="level-right">
                  <div class="has-text-right">
                    <p class="title is-5 is-marginless">
                      $ {{order.price}}
                    </p>
                    <span class="tag" :class="order.status.class">In progress</span>
                  </div>
                </div>
              </div>
            </template>



            <router-link class="button is-link is-outlined" to="/orders">View all orders</router-link>

          </div>
        </div>
      </div>-->

    </div>
  </div>

</template>

<script>
import orders from "@/views/Orders.vue";

export default {
  name: 'Dashboard',
  data() {
    return {

      stats:
      {
        today: {
          orders: "232",
          revenue: "7,648",
          visitors: "1,678",
          pageViews: "18,556"
        },
        yesterday: {
          orders: "200",
          revenue: "5,465",
          visitors: "1,400",
          pageviews: "18,556"
        },
        week: {
          orders: "1,200",
          revenue: "32,648",
          visitors: "6,678",
          pageViews: "68,556"
        },
        month: {
          orders: "4,200",
          revenue: "132,648",
          visitors: "16,678",
          pageViews: "168,556"
        },
        year: {
          orders: "42,200",
          revenue: "1,132,648",
          visitors: "116,678",
          pageViews: "1,168,556"
        },
        alltime: {
          orders: "142,200",
          revenue: "3,132,648",
          visitors: "216,678",
          pageViews: "3,168,556"
        }
      },

      orders:
      [
        {
          id: 787352,
          date: "Nov 18, 17:38",
          purchasedBy: "John Miller",
          price: "56.98",
          status: {
            name: "In progress",
            class: "is-warning"
          }
        },

        {
          id: 787351,
          date: "Nov 18, 07:30",
          purchasedBy: "Alex Johnson",
          price: "23.98",
          status: {
            name: "Successful",
            class: "is-success"
          }
        },

        {
          id: 787350,
          date: "Nov 17, 15:20",
          purchasedBy: "John Miller",
          price: "30.55",
          status: {
            name: "Successful",
            class: "is-success"
          }
        }
      ],

      customers: [
        {
          id: 1,
          name: "John Miller",
          country: "United States",
          orderCount: 7
        },
        {
          id: 2,
          name: "Samantha Rogers",
          country: "United Kingdom",
          orderCount: 5
        },
        {
          id: 3,
          name: "Mikko Mikkonen",
          country: "Finland",
          orderCount: 2
        }
      ],
      items: [
        {
          id: 1,
          title: "Learning Swift",
          totalSales: 146,
          image: "swift.jpg"
        },
        {
          id: 2,
          title: "TensorFlow for Machine Intelligence",
          totalSales: 56,
          image: "tensorflow.jpg"
        },
        {
          id: 3,
          title: "Choosing a Javascript Framework",
          totalSales: 47,
          image: "js-framework.jpg"
        }
      ]

    }
  },
  computed: {
    selectedStats() {
      return this.stats.today;
    }
  },
  methods: {
    changeStats(event) {
      this.selectedStats = this.stats[event.target.value];
    }
  }
}
</script>

<style lang="sass" scoped>

</style>