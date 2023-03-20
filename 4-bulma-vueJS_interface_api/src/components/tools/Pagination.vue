<!-- Pagination -->
<!-- Hugo COLLIN, Lucas POIROT, 20/03/2023 -->
<!-- This component is used to paginate a list of items. -->

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
/*
  This component is used to paginate a list of items.
 */
export default {
  name: "Pagination",
  data() {
    return {
      // the page the user is currently on
      currentPage: 1,
      // the number of items per page
      perPage: 5,
      // the total number of items in the list
      totalItems: 0,
      // the total number of pages
      totalPages: 0,
      // the first item on the current page
      startItem: 0,
    };
  },

  methods:
  {
    /** @vuese
     * Set the number of items per page
     * @param totalItems
     */
    setTotalItems(totalItems)
    {
      this.totalItems = totalItems;
    },

    /** @vuese
     * Set the number of pages
     */
    setTotalPages()
    {
      this.totalPages = Math.ceil(this.totalItems / this.perPage);
    },

    /** @vuese
     * Get the current page
     * @returns {number}
     */
    getCurrentPage()
    {
      return this.currentPage;
    },

    /** @vuese
     * Get the number of items per page
     * @returns {number}
     */
    getPerPage()
    {
      return this.perPage;
    },

    /** @vuese
     * Set the page to previous and emit update
     */
    paginPrev()
    {
      if (this.currentPage > 1)
      {
        this.currentPage--;
        // emitted to update the list
        this.$emit('pagin-update');
      }
    },

    /** @vuese
     * Set the page to next and emit update
     */
    paginNext()
    {
      if (this.currentPage < this.totalItems / this.perPage)
      {
        this.currentPage++;
        this.$emit('pagin-update');
      }
    },

    /** @vuese
     * Set the page to the first page and emit update
     */
    paginStart()
    {
      this.currentPage = 1;
      this.$emit('pagin-update');
    },

    /** @vuese
     * Set the page to the last page and emit update
     */
    paginEnd()
    {
      this.currentPage = this.totalPages;
      this.$emit('pagin-update');
    },


    /** @vuese
     * Get the first item on the current page
     * @returns {number}
     */
    startingItem()
    {
      return (this.currentPage - 1) * this.perPage;
    },

    /** @vuese
     * Get the last item on the current page
     * @returns {number}
     */
    endingItem()
    {
      // return (this.currentPage) * (this.perPage) - (this.totalItems % this.perPage);
      // return (this.totalItems % this.perPage);
      return this.currentPage * this.perPage;
    },

    /** @vuese
     * Set a custom page to go to
     * @param page custom page
     */
    setPage(page)
    {
      this.currentPage = page;
    },

    /** @vuese
     * Move the page by a number
     * @param pages number of pages to move
     */
    movePage(pages)
    {
      this.currentPage += pages;
    },

  },
}
</script>

<style scoped>

</style>