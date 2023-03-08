<template>
  <div class="items">
    <h1 class="title">Items</h1>

    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>{{(this.pagination.currentPage - 1) * this.pagination.perPage + 1}} - {{(this.pagination.currentPage - 1) * this.pagination.perPage + this.pagination.perPage}}</strong> / {{this.allItems.length}} items
          </p>
        </div>

        <p class="level-item">
          <button class="button is-success" @click="callNewItem">New</button>
        </p>

        <div class="level-item is-hidden-tablet-only">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Item name, Composer…" v-model="searchWord" v-on:keyup="search">
            </p>
            <p class="control">
              <button class="button" @click="search">Search</button>
            </p>
          </div>
        </div>
      </div>

      <div class="level-right">
        <div class="level-item">
          Order by
        </div>
        <div class="level-item">
          <div class="select">
            <select @change="sortItems">
              <option value="publishDate">Publish date</option>
              <option value="UnitPrice">Price</option>
              <option value="Milliseconds">Page count</option>
            </select>
          </div>
        </div>
      </div>
    </nav>

    <div class="columns is-multiline">
      <template v-for="(item, key) in items">
        <div class="column is-12-tablet is-6-desktop is-4-widescreen">
          <article class="box">
            <div class="media">
              <aside class="media-left">
                <img src="@/assets/images/Speaker_Icon.svg.png" width="80" alt="Piste de musique">
              </aside>
              <div class="media-content">
                <p class="title is-5 is-spaced is-marginless">
                  <a @click="callEditItem(item)">{{item.Name}}</a>
                </p>
                <p class="subtitle is-marginless">
                  ${{item.UnitPrice}}
                </p>
                <div class="content is-small">
                  {{(item.Milliseconds / 60000).toFixed(2)}} minutes
                  <br>
                  Compositeur(s): {{item.Composer}}
                  <br>
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

    <nav class="pagination is-centered">
      <ul class="pagination-list">
        <li>
          <a class="pagination-link" @click="displaySpecificCutList(1)">&#60;&#60;</a>
        </li>
        <li>
          <a class="pagination-previous" @click="paginPrev">Previous page</a>
        </li>
        <li>
          <span class="pagination-ellipsis"></span>
        </li>
        <li v-if="this.pagination.currentPage > 1">
          <span class="pagination-ellipsis">&hellip;</span>
          <a class="pagination-link" @click="paginPrev">{{this.pagination.currentPage - 1}}</a>
        </li>
        <li>
          <a class="pagination-link is-current">{{this.pagination.currentPage}}</a>
        </li>
        <li v-if="this.pagination.currentPage < this.pagination.totalPages">
          <a class="pagination-link" @click="paginNext">{{this.pagination.currentPage + 1}}</a>
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a class="pagination-next" @click="paginNext">Next page</a>
        </li>
        <li>
          <a class="pagination-link" @click="displaySpecificCutList(this.pagination.totalPages)">&#62;&#62;</a>
        </li>
      </ul>
    </nav>
  </div>
  <ModalItem ref="modalItem" :show-modal="showNewModal" @close="showNewModal = false" @sent-data="addItem" @edit-data="editItem"></ModalItem>
</template>

<script>
import Collect from 'collect.js';
import ModalItem from "@/components/ModalItem.vue";
import axios from "axios";

export default {
  name: 'Items',
  components: {ModalItem},
  data() {
    return {
      items: [],
      allItems: [],
      item: {
        Name: "",
        UnitPrice: "",
        Milliseconds: "",
        Composer: "",
        TrackId: "",
        AlbumId: "",
        GenreId: "",
        MediaTypeId: "",
        Bytes: "",
      },
      showNewModal: false,
      showEditModal: false,
      searchWord: "",
      currentItem: null,

      pagination: {
        currentPage: 1,
        perPage: 5,
        totalItems: 0,
        totalPages: 0,
        startItem: 0,
      },
    };
  },

  methods:
  {
    sortItems(event)
    {
      let selectValue = String(event.target.value);
      let collection = Collect(this.items);
      let sortedBooks = collection.sortBy(selectValue);

      this.items = Object.assign([], sortedBooks.all())
    },

    search() {
      if (this.searchWord === '') {
        this.items = this.allItems;
        return;
      }

      this.items = new Collect(this.allItems)
          .filter((item) => item.Name.toLowerCase().includes(this.searchWord.toLowerCase()))
          .all();
    },

    addItem(i)
    {
      this.items.push(i);
      this.showNewModal = false;

      // let data = {};
      // for (let key in this.currentItem)
      //   if (key !== "TrackId")
      //     data[key] = i[key];


      const config = {
          token: this.$store.state.tokenLogin
        };
      console.log(i)
      axios({
        method: 'post',
        url: 'http://51.91.76.245:8000/api/tracks',
        data: i,
        headers: config
      })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
            this.load();
            //this.errorMsg("Erreur lors de la modification de l'item");
          });
      // axios.post('http://51.91.76.245:8000/api/tracks/', i, config)
      //     .then(response => {
      //       console.log(response);
      //     })
      //     .catch(error => {
      //       console.log(error);
      //       this.load();
      //     });
    },

    editItem(i)
    {
      let data = {};
      for (let key in this.currentItem) {
        this.currentItem[key] = i[key];
        if (key !== "TrackId")
          data[key] = i[key];
      }
      this.showNewModal = false;

      const config = {
          token: this.$store.state.tokenLogin
        };

      axios({
        method: 'put',
        url: 'http://51.91.76.245:8000/api/tracks/' + i.TrackId,
        data: data,
        headers: config
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
          this.load();
          //this.errorMsg("Erreur lors de la modification de l'item");
        });

    },

    callNewItem()
    {
      this.showNewModal = true;
      this.$refs.modalItem.newForm();
    },

    callEditItem(item)
    {
      this.showNewModal = true;
      this.$refs.modalItem.editForm(item);
      this.currentItem = item;
    },

    deleteItem(item)
    {
      this.items.splice(this.items.indexOf(item), 1);
      this.allItems.splice(this.allItems.indexOf(item), 1);
      this.displayCutList();
      // console.log(item)
      // console.log(item.TrackId)
      axios.delete('http://51.91.76.245:8000/api/tracks/' + item.TrackId, {
        headers:{
          token: this.$store.state.tokenLogin
        }
      })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
            this.load();
          });

    },

    paginPrev()
    {
      if (this.pagination.currentPage > 1)
      {
        this.pagination.currentPage--;
        this.displayCutList();
      }
    },

    paginNext()
    {
      if (this.pagination.currentPage < this.allItems.length / this.pagination.perPage)
      {
        this.pagination.currentPage++;
        this.displayCutList();
      }
    },

    displayCutList()
    {
      this.items = [];
      this.pagination.startItem = (this.pagination.currentPage - 1) * this.pagination.perPage;
      let i = 0;
      while (this.allItems[this.pagination.startItem + i] !== undefined && i < this.pagination.perPage)
      {
        this.items[i] = this.allItems[this.pagination.startItem + i];
        i++;
      }
    },

    displaySpecificCutList(page)
    {
      this.pagination.currentPage = page;
      this.displayCutList();
    },

    load()
    {
      axios.get('http://51.91.76.245:8000/api/tracks')
          .then(response => {
            this.allItems = response.data;
            this.displayCutList();
            this.pagination.totalItems = this.allItems.length;
            this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.perPage);
            // console.log(this.pagination.totalPages)
            // console.log(this.pagination.totalItems)
          })
          .catch(error => {
            console.log(error);
          })
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style lang="sass" scoped>

</style>