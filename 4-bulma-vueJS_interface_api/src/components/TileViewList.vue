<template>
<!--  <h1>C'est Tile</h1>-->
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
                <span v-for="elt in this.cards.title">{{elt.pre}}{{item[elt.label]}}{{elt.post}}&nbsp;</span>
              </a>
            </p>
            <p class="subtitle is-marginless">
              <span v-for="elt in this.cards.subtitle">{{elt.pre}}{{item[elt.label]}}{{elt.post}}&nbsp;</span>
            </p>
            <div class="content is-small">
              <div v-for="info in this.cards.infos">
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
</template>
<script>
export default {
  name: 'TileViewList',
  emits: ['call-edit-item', 'delete-item'],
  props: {
    items: {},
  },
  data() {
    return {
      cards: {},
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
    setCards(cards) {
      // this.cards.title = this.allItems[0][title];
      this.cards = cards;
    },
    setCardsTitle(title, pre = "", post = "") {
      this.cards.title = title;
      this.cards.pre = pre;
      this.cards.post = post;
    },
    setCardsSubtitle(subtitle, pre = "", post = "") {
      this.cards.title = title;
      this.cards.pre = pre;
      this.cards.post = post;
    },
    addCardsInfo(label, pre = "", post = "") {
      this.cards.infos.push({label: label, pre: pre, post: post});
    },
  }
}
</script>
