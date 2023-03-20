<!-- Table View List -->
<!-- Hugo COLLIN, 20/03/2023 -->
<!-- This component is used to display a list of items in a table view. -->

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
            <router-link v-else-if="info.route !== ''" :to="info.route" :class="{'codeStyle': info.style === 'code'}">{{info.pre}}{{ item[info.name] }}{{info.post}}</router-link>
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
// @group View
export default {
  name: 'TableViewList',
  emits: ['call-edit-item', 'delete-item'],
  props: {
    /** @vuese
     * The list of items to display.
     */
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
    /** @vuese
     * Emit an event to edit an item.
     * @param item
     */
    callEditItem(item) {
      // emitted to edit an item
      this.$emit('call-edit-item', item);
    },

    /** @vuese
     * Emit an event to delete an item.
     * @param item
     */
    deleteItem(item) {
      // emitted to delete an item
      this.$emit('delete-item', item);
    },


    /*
     `--- CARDS LIST METHODS ---`<br>
     */

    /** @vuese
     * Set the table structure.
     * @param cols
     */
    setTable(cols) {
      console.log(cols)
      this.cols = cols;
    },
  }
}
</script>
