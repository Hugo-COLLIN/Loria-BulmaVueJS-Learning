<template>
  <div class="items">
    <h1 class="title">Books</h1>

    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>6</strong> books
          </p>
        </div>

        <p class="level-item">
          <button class="button is-success" @click="showNewModal = true">New</button>
        </p>

        <div class="level-item is-hidden-tablet-only">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Book name, ISBN…" v-model="searchWord" v-on:keyup="search">
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
              <option value="price">Price</option>
              <option value="pageCount">Page count</option>
            </select>
          </div>
        </div>
      </div>
    </nav>

    <div class="columns is-multiline">
      <template v-for="(book, key) in books">
        <div class="column is-12-tablet is-6-desktop is-4-widescreen">
          <article class="box">
            <div class="media">
              <aside class="media-left">
                <img :src="require(`@/assets/images/${book.coverImage}`)" width="80">
              </aside>
              <div class="media-content">
                <p class="title is-5 is-spaced is-marginless">
                  <router-link to="edit-item">{{book.title}}</router-link>
                </p>
                <p class="subtitle is-marginless">
                  {{book.price}}
                </p>
                <div class="content is-small">
                  {{book.pageCount}} pages
                  <br>
                  ISBN: {{book.ISBN}}
                  <br>
                  <router-link to="edit-item">Edit</router-link>
                  <span>·</span>
                  <a>Delete</a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </template>

    </div>

    <nav class="pagination">
      <a class="pagination-previous">Previous</a>
      <a class="pagination-next">Next page</a>
      <ul class="pagination-list">
        <li>
          <a class="pagination-link">1</a>
        </li>
        <li>
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a class="pagination-link">45</a>
        </li>
        <li>
          <a class="pagination-link is-current">46</a>
        </li>
        <li>
          <a class="pagination-link">47</a>
        </li>
        <li>
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a class="pagination-link">86</a>
        </li>
      </ul>
    </nav>
  </div>
  <ModalItem :show-modal="showNewModal" @close="showNewModal = false"></ModalItem>
</template>

<script>
import Collect from 'collect.js';
import ModalItem from "@/components/ModalItem.vue";

export default {
  name: 'Items',
  components: {ModalItem},
  data() {
    return {
      books: [
        {
          title: "TensorFlow For Machine Intelligence",
          price: "$22.99",
          pageCount: 270,
          ISBN: "9781939902351",
          coverImage: "tensorflow.jpg",
          publishDate: 2017,
        },
        {
          title: "Docker in Production",
          price: "$22.99",
          pageCount: 156,
          ISBN: "9781939902184",
          coverImage: "docker.jpg",
          publishDate: 2015,
        },
        {
          title: "Learning Swift",
          price: "$24.99",
          pageCount: 342,
          ISBN: "9781939902115",
          coverImage: "swift.jpg",
          publishDate: 2015,
        },
        {
          title: "Choosing a JavaScript Framework",
          price: "$19.99",
          pageCount: 270,
          ISBN: "9781939902092",
          coverImage: "js-framework.jpg",
          publishDate: 2016,
        },
        {
          title: "Developing a Gulp.js Edge",
          price: "$15.99",
          pageCount: 134,
          ISBN: "9781939902146",
          coverImage: "gulp.jpg",
          publishDate: 2014,
        },
      ],
      allBooks: [
        {
          title: "TensorFlow For Machine Intelligence",
          price: "$22.99",
          pageCount: 270,
          ISBN: "9781939902351",
          coverImage: "tensorflow.jpg",
          publishDate: 2017,
        },
        {
          title: "Docker in Production",
          price: "$22.99",
          pageCount: 156,
          ISBN: "9781939902184",
          coverImage: "docker.jpg",
          publishDate: 2015,
        },
        {
          title: "Learning Swift",
          price: "$22.99",
          pageCount: 342,
          ISBN: "9781939902115",
          coverImage: "swift.jpg",
          publishDate: 2015,
        },
        {
          title: "Choosing a JavaScript Framework",
          price: "$19.99",
          pageCount: 270,
          ISBN: "9781939902092",
          coverImage: "js-framework.jpg",
          publishDate: 2016,
        },
        {
          title: "Developing a Gulp.js Edge",
          price: "$22.99",
          pageCount: 134,
          ISBN: "9781939902146",
          coverImage: "gulp.jpg",
          publishDate: 2014,
        },
      ],
      book: {},
      showNewModal: false,
      showEditModal: false,
      searchWord: "",
    };
  },

  methods:
  {
    sortBooks(event)
    {
      let selectValue = String(event.target.value);
      let collection = Collect(this.books);
      let sortedBooks = collection.sortBy(selectValue);

      this.books = Object.assign([], sortedBooks.all())
    },

    search() {
      if (this.searchWord === '') {
        this.books = this.allBooks;
        return;
      }

      this.books = new Collect(this.allBooks)
          .filter((book) => book.title.toLowerCase().includes(this.searchWord.toLowerCase()))
          .all();
    },
  },
  mounted() {
    this.allBooks = this.books;
  }
}
</script>

<style lang="sass" scoped>

</style>