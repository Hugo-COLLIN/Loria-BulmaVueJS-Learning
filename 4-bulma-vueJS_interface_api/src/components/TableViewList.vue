<template>
  <table class="table is-hoverable is-fullwidth">
    <thead>
    <tr>
<!--      <th class="is-narrow">-->
<!--        <input type="checkbox">-->
<!--      </th>-->
      <th>{{ this.cols.title.label }}</th>
      <template v-for="(col) in this.cols.infos">
        <th>{{ col.label }}</th>
      </template>
      <th>Actions</th>
    </tr>
    </thead>
    <tfoot>
    <tr>
<!--      <th class="is-narrow">-->
<!--        <input type="checkbox">-->
<!--      </th>-->
      <th>{{ this.cols.title.label }}</th>
      <template v-for="(col) in this.cols.infos">
        <th>{{ col.label }}</th>
      </template>
      <th>Actions</th>
    </tr>
    </tfoot>
    <tbody>
    <template v-for="(item) in items">
      <tr>
<!--        <td>-->
<!--          <input type="checkbox">-->
<!--        </td>-->
        <td>
          <a @click="callEditItem(item)">
            <strong v-if="this.cols.title.elements !== undefined" v-for="t in this.cols.title.elements">{{ item[t.name] }}&nbsp;</strong>
            <strong v-else>{{ item[this.cols.title.name] }}</strong>
          </a>
        </td>
        <td v-for="info in this.cols.infos">
          <span v-if="info.route === undefined" :class="{'codeStyle': info.style === 'code'}">{{info.pre}}{{ item[info.name] }}{{info.post}}</span>
          <router-link v-else-if="info.route !== ''" to="orders" :class="{'codeStyle': info.style === 'code'}">{{info.pre}}{{ item[info.name] }}{{info.post}}</router-link>
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
      cols: { //nécessaire sinon erreur label inconnu ?!
        title: {
          pre: "",
          post: "",
        },
        infos: [],
      },
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
