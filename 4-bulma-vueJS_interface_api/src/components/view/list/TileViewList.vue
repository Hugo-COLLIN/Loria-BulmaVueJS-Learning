<!-- TileViewList.vue -->
<!-- Hugo COLLIN, 20/03/2023 -->
<!-- This component is used to display a list of items in a tile view -->

<template>
  <div class="columns is-multiline is-align-items-stretch">
    <template v-for="(item, key) in items">
      <div class="column is-12-tablet is-6-desktop is-4-widescreen">
        <article class="box" style="height: 100%;">
          <div class="media">
            <aside class="media-left">
              <img src="@/assets/images/Speaker_Icon.svg.png" width="80" alt="Piste de musique">
            </aside>
            <div class="media-content">
              <p class="title is-5 is-spaced is-marginless" v-if="this.cards.title !== undefined">
                <a @click="callEditItem(item)"> <!-- <!> Important -->
                  <span v-if="this.cards.title.elements === undefined">{{this.cards.title.pre}}{{item[this.cards.title.name]}}{{this.cards.title.post}}&nbsp;</span>
                  <span v-else v-for="elt in this.cards.title.elements">{{elt.pre}}{{item[elt.name]}}{{elt.post}}&nbsp;</span>
                  <!--                <span v-for="elt in this.cards.title">{{elt.pre}}{{item[elt.label]}}{{elt.post}}&nbsp;</span>-->
                  <!--                {{this.cards}}-->
                  <!--                <span v-if="this.cards.title.elements !== undefined" v-for="t in this.cards.title.elements">{{ item[t.name] }}&nbsp;</span>-->
                  <!--                <span >{{item[this.cards.title.name]}}&nbsp;</span>-->
                </a>
              </p>
              <p class="subtitle is-marginless" v-if="this.cards.subtitle !== undefined">
                <span v-if="this.cards.subtitle.elements === undefined">{{this.cards.subtitle.pre}}{{item[this.cards.subtitle.name]}}{{this.cards.subtitle.post}}&nbsp;</span>
                <span v-else v-for="elt in this.cards.subtitle.elements">{{elt.pre}}{{item[elt.name]}}{{elt.post}}&nbsp;</span>
                <!--              <span v-for="elt in this.cards.subtitle">{{elt.pre}}{{item[elt.label]}}{{elt.post}}&nbsp;</span>-->
                <!--              <span v-if="this.cards.subtitle.elements !== undefined" v-for="t in this.cards.subtitle.elements">{{ item[t.name] }}&nbsp;</span>-->
                <!--              <span>{{this.cards.subtitle.pre}}{{item[this.cards.subtitle.name]}}{{this.cards.subtitle.post}}&nbsp;</span>-->
              </p>
              <div class="content is-small">
                <div v-for="info in this.cards.infos" v-if="this.cards.infos !== undefined">
                  <!-- convert milliseconds to minutes and second -->
                  <span v-if="info.name === 'Milliseconds'">{{Math.floor(item[info.name] / 60000)}} min {{Math.floor((item[info.name] % 60000) / 1000)}} sec</span>
                  <span v-else>{{info.pre}} {{item[info.name]}} {{info.post}}</span>
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
  </div>
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
      cards: {
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
    setCards(cards) {
      // this.cards.title = this.allItems[0][title];
      this.cards = cards;
    },
    // setCardsTitle(title, pre = "", post = "") {
    //   this.cards.title = title;
    //   this.cards.pre = pre;
    //   this.cards.post = post;
    // },
    // setCardsSubtitle(subtitle, pre = "", post = "") {
    //   this.cards.title = title;
    //   this.cards.pre = pre;
    //   this.cards.post = post;
    // },
    // addCardsInfo(label, pre = "", post = "") {
    //   this.cards.infos.push({label: label, pre: pre, post: post});
    // },
  }
}
</script>
