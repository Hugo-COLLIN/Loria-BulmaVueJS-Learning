<template>
<!--  <h1>C'est TableViewList</h1>-->
  <template v-for="(item, key) in items">
    <div class="column is-12-tablet is-6-desktop is-4-widescreen">
      <article class="box" style="height: 100%;">
        <div class="media">
          <aside class="media-left">
            <img src="@/assets/images/Speaker_Icon.svg.png" width="80" alt="Piste de musique">
          </aside>
          <div class="media-content">
            <p class="title is-5 is-spaced is-marginless">
              <a @click="callEditItem(item)">
                <span v-for="elt in this.cols.title">{{elt.pre}}{{item[elt.label]}}{{elt.post}}&nbsp;</span>
              </a>
            </p>
            <p class="subtitle is-marginless">
              <span v-for="elt in this.cols.subtitle">{{elt.pre}}{{item[elt.label]}}{{elt.post}}&nbsp;</span>
            </p>
            <div class="content is-small">
              <div v-for="info in this.cols.infos">
                <!-- convert milliseconds to minutes and second -->
                <span v-if="info.label === 'Milliseconds'">{{Math.floor(item[info.label] / 60000)}} min {{Math.floor((item[info.label] % 60000) / 1000)}} sec</span>
                <span v-else>{{info.pre}} {{item[info.label]}} {{info.post}}</span>
                <br>
              </div>
              <a @click="callEditItem(item)">Edit</a>
              <span> | </span>
              <a @click="deleteItem(item)">Delete</a>
            </div>
          </div>
        </div>
      </article>
    </div>
  </template>

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
</template>
<script>
export default {
  name: 'TableViewList',
  emits: ['call-edit-item', 'delete-item'],
  props: {
    items: {},
  },
  data() {
    return {
      cols: {},
    }
  },
  methods: {
    callEditItem(item) {
      console.log(item)
      this.$emit('call-edit-item', item);
    },
    deleteItem(item) {
      this.$emit('delete-item', item);
    },
    /*
    --- CARDS LIST METHODS ---
     */
    setTable(cols) {
      // this.cards.title = this.allItems[0][title];
      console.log(cols)
      this.cols = cols;
    },
  }
}
</script>
