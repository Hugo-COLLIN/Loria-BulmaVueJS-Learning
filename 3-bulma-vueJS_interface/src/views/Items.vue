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
          <a class="button is-success" href="new-book.html">New</a>
        </p>

        <div class="level-item is-hidden-tablet-only">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Book name, ISBN…">
            </p>
            <p class="control">
              <button class="button">
                Search
              </button>
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
            <select>
              <option>Publish date</option>
              <option>Price</option>
              <option>Page count</option>
            </select>
          </div>
        </div>
      </div>
    </nav>

    <div class="columns is-multiline">
      <div class="column is-12-tablet is-6-desktop is-4-widescreen">
        <article class="box">
          <div class="media">
            <aside class="media-left">
              <img src="images/tensorflow.jpg" width="80">
            </aside>
            <div class="media-content">
              <p class="title is-5 is-spaced is-marginless">
                <a href="edit-book.html">
                  TensorFlow For Machine Intelligence
                </a>
              </p>
              <p class="subtitle is-marginless">
                $22.99
              </p>
              <div class="content is-small">
                270 pages
                <br>
                ISBN: 9781939902351
                <br>
                <a href="edit-book.html">Edit</a>
                <span>·</span>
                <a>Delete</a>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="column is-12-tablet is-6-desktop is-4-widescreen">
        <article class="box ">
          <div class="media">
            <aside class="media-left">
              <img src="images/docker.jpg" width="80">
            </aside>
            <div class="media-content">
              <p class="title is-5 is-spaced is-marginless">
                <a href="edit-book.html">
                  Docker in production
                </a>
              </p>
              <p class="subtitle is-marginless">
                $22.99
              </p>
              <div class="content is-small">
                270 pages
                <br>
                ISBN: 9781939902351
                <br>
                <a href="edit-book.html">Edit</a>
                <span>·</span>
                <a>Delete</a>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-12-tablet is-6-desktop is-4-widescreen">
        <article class="box">
          <div class="media">
            <aside class="media-left">
              <img src="images/gulp.jpg" width="80">
            </aside>
            <div class="media-content">
              <p class="title is-5 is-spaced is-marginless">
                <a href="edit-book.html">
                  Developing a Gulp.js Edge
                </a>
              </p>
              <p class="subtitle is-marginless">
                $22.99
              </p>
              <div class="content is-small">
                270 pages
                <br>
                ISBN: 9781939902351
                <br>
                <a href="edit-book.html">Edit</a>
                <span>·</span>
                <a>Delete</a>
              </div>
            </div>
          </div>
        </article>
      </div>

      <template v-for="(book, key) in books" :key="book.id">
        <div class="media" >
          <div class="media-left is-marginless">
            <p class="number">{{ key +1 }}</p>
          </div>
          <div class="media-left">
            <img :src="require(`@/assets/${book.image}`)" width="40">
          </div>
          <div class="media-content">
            <p class="title is-5 is-spaced is-marginless">
              <router-link to="/edit-book">{{ book.name }}</router-link>
            </p>
          </div>
          <div class="media-right">
            {{ book.copiesSold}} sold
          </div>
        </div>
      </template>

      <div class="column is-12-tablet is-6-desktop is-4-widescreen">
        <article class="box">
          <div class="media">
            <aside class="media-left">
              <img src="images/swift.jpg" width="80">
            </aside>
            <div class="media-content">
              <p class="title is-5 is-spaced is-marginless">
                <a href="edit-book.html">
                  Learning swift
                </a>
              </p>
              <p class="subtitle is-marginless">
                $22.99
              </p>
              <div class="content is-small">
                270 pages
                <br>
                ISBN: 9781939902351
                <br>
                <a href="edit-book.html">Edit</a>
                <span>·</span>
                <a>Delete</a>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="column is-12-tablet is-6-desktop is-4-widescreen">
        <article class="box">
          <div class="media">
            <aside class="media-left">
              <img src="images/js-framework.jpg" width="80">
            </aside>
            <div class="media-content">
              <p class="title is-5 is-spaced is-marginless">
                <a href="edit-book.html">
                  Choosing a Javascript framework
                </a>
              </p>
              <p class="subtitle is-marginless">
                $22.99
              </p>
              <div class="content is-small">
                270 pages
                <br>
                ISBN: 9781939902351
                <br>
                <a href="edit-book.html">Edit</a>
                <span>·</span>
                <a>Delete</a>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="column is-12-tablet is-6-desktop is-4-widescreen">
        <article class="box">
          <div class="media">
            <aside class="media-left">
              <img src="images/google-cardboard.jpg" width="80">
            </aside>
            <div class="media-content">
              <p class="title is-5 is-spaced is-marginless">
                <a href="edit-book.html">
                  Destructuring Google Cardbord Apps
                </a>
              </p>
              <p class="subtitle is-marginless">
                $22.99
              </p>
              <div class="content is-small">
                270 pages
                <br>
                ISBN: 9781939902351
                <br>
                <a href="edit-book.html">Edit</a>
                <span>·</span>
                <a>Delete</a>
              </div>
            </div>
          </div>
        </article>
      </div>
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
</template>

<script>
export default {
  name: 'Items',
  data() {
    return {
      books: [
        {
          title: "TensorFlow For Machine Intelligence",
          price: "$22.99",
          pageCount: 270,
          ISBN: "9781939902351",
          coverImage: "src/assets/images/tensorflow.jpg",
          publishDate: 2017,
        },
        {
          title: "Docker in Production",
          price: "$22.99",
          pageCount: 156,
          ISBN: "9781939902184",
          coverImage: "src/assets/images/docker.jpg",
          publishDate: 2015,
        },
        {
          title: "Learning Swift",
          price: "$24.99",
          pageCount: 342,
          ISBN: "9781939902115",
          coverImage: "src/assets/images/swift.jpg",
          publishDate: 2015,
        },
        {
          title: "Choosing a JavaScript Framework",
          price: "$19.99",
          pageCount: 270,
          ISBN: "9781939902092",
          coverImage: "src/assets/images/js-framework.jpg",
          publishDate: 2016,
        },
        {
          title: "Developing a Gulp.js Edge",
          price: "$15.99",
          pageCount: 134,
          ISBN: "9781939902146",
          coverImage: "src/assets/images/gulp.jpg",
          publishDate: 2014,
        },
      ],
      allBooks: [
        {
          title: "TensorFlow For Machine Intelligence",
          price: "$22.99",
          pageCount: 270,
          ISBN: "9781939902351",
          coverImage: "src/assets/images/tensorflow.jpg",
          publishDate: 2017,
        },
        {
          title: "Docker in Production",
          price: "$22.99",
          pageCount: 156,
          ISBN: "9781939902184",
          coverImage: "src/assets/images/docker.jpg",
          publishDate: 2015,
        },
        {
          title: "Learning Swift",
          price: "$22.99",
          pageCount: 342,
          ISBN: "9781939902115",
          coverImage: "src/assets/images/swift.jpg",
          publishDate: 2015,
        },
        {
          title: "Choosing a JavaScript Framework",
          price: "$19.99",
          pageCount: 270,
          ISBN: "9781939902092",
          coverImage: "src/assets/images/js-framework.jpg",
          publishDate: 2016,
        },
        {
          title: "Developing a Gulp.js Edge",
          price: "$22.99",
          pageCount: 134,
          ISBN: "9781939902146",
          coverImage: "src/assets/images/gulp.jpg",
          publishDate: 2014,
        },
      ],
      book: {},
      showNewModal: false,
      showEditModal: false,
      searchWord: "",
    };
  },
}
</script>

<style lang="sass" scoped>

</style>