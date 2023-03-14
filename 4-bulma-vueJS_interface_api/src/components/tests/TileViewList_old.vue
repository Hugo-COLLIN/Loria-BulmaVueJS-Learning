<template>
  <template v-for="(item, key) in items">
    <div class="column is-12-tablet is-6-desktop is-4-widescreen">
      <article class="box" style="height: 100%;">
        <div class="media">
          <aside class="media-left">
            <img src="@/assets/images/Speaker_Icon.svg.png" width="80" alt="Piste de musique">
          </aside>
          <div class="media-content">
            <p class="title is-5 is-spaced is-marginless">
              <a @click="callEditItem">{{item.Name}}</a>
            </p>
            <p class="subtitle is-marginless">
              ${{item.UnitPrice}}
            </p>
            <div class="content is-small">
              <!-- convert milliseconds to minutes and second -->
              {{Math.floor(item.Milliseconds / 60000)}} min {{Math.floor((item.Milliseconds % 60000) / 1000)}} sec
              <br>
              Compositeur(s): {{item.Composer}}
              <br>
              <a @click="callEditItem">Edit</a>
              <span> | </span>
              <a @click="deleteItem">Delete</a>
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
  emits: ['callEditItem', 'deleteItem'],
  props: {
    callEditItem: {},
    deleteItem: {},
    items: {}
  }
}
</script>
