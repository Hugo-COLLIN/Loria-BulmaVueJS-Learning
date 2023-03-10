<template>
  <nav class="pagination is-centered">
    <ul class="pagination-list">
      <li>
        <a class="pagination-link" @click="paginStart">&#60;&#60;</a>
      </li>
      <li>
        <a class="pagination-previous" @click="paginPrev">Previous page</a>
      </li>
      <li>
        <span class="pagination-ellipsis"></span>
      </li>
      <li v-if="this.currentPage > 1">
        <span class="pagination-ellipsis">&hellip;</span>
        <a class="pagination-link" @click="paginPrev">{{this.currentPage - 1}}</a>
      </li>
      <li>
        <a class="pagination-link is-current">{{this.currentPage}}</a>
      </li>
      <li v-if="this.currentPage < this.totalPages">
        <a class="pagination-link" @click="paginNext">{{this.currentPage + 1}}</a>
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li>
        <a class="pagination-next" @click="paginNext">Next page</a>
      </li>
      <li>
        <a class="pagination-link" @click="paginEnd">&#62;&#62;</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      totalItems: 0,
      totalPages: 0,
      startItem: 0,
    };
  },
  methods: {
    setTotalItems(totalItems)
    {
      this.totalItems = totalItems;
    },

    setTotalPages()
    {
      // console.log("Per page: " + this.perPage)
      this.totalPages = Math.ceil(this.totalItems / this.perPage);
    },

    getCurrentPage()
    {
      return this.currentPage;
    },

    getPerPage()
    {
      return this.perPage;
    },

    paginPrev()
    {
      // console.log(this.currentPage)
      if (this.currentPage > 1)
      {
        this.currentPage--;
        // this.$emit('pagin-prev');
        this.$emit('pagin-update');
      }
    },

    paginNext()
    {
      //console.log(this.currentPage)
      // console.log(this.totalItems / this.perPage)
      // console.log("Next page")
      if (this.currentPage < this.totalItems / this.perPage)
      {
        this.currentPage++;
        // this.$emit('pagin-next');
        this.$emit('pagin-update');
        // console.log(this.currentPage)
      }
    },

    paginStart()
    {
      this.currentPage = 1;
      // this.$emit('pagin-start');
      this.$emit('pagin-update');
    },

    paginEnd()
    {
      this.currentPage = this.totalPages;
      // this.$emit('pagin-end');
      this.$emit('pagin-update');
    },

    //Items.length / this.perPage

    startingItem()
    {
      return (this.currentPage - 1) * this.perPage;
    },

    endingItem()
    {
      // return (this.currentPage) * (this.perPage) - (this.totalItems % this.perPage);
      // return (this.totalItems % this.perPage);
      return this.currentPage * this.perPage;
    },

    setPage(page)
    {
      this.currentPage = page;
    },

    movePage(page)
    {
      this.currentPage += page;
    },
  },
  mounted() {
    // console.log(this)
  }
}
</script>

<style scoped>

</style>