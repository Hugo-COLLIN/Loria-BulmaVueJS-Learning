<template>

</template>

<script>
export default {
  name: "ListMechanics",
  data() {
    return {
      items: [],
      searchItems: [],
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
      currentItem: null,
    };
  },
  methods: {
    add(i) {
      this.items.push(i);
      this.allItems.push(i);
      console.log(this.items);
      console.log(this.allItems);
    }
  }
}
</script>

<style scoped>

</style>