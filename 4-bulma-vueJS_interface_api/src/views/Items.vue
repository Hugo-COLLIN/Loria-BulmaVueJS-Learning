<template>
  <ViewList ref="viewList"/>
</template>

<script>
import ViewList from "@/components/ViewList.vue";
export default {
  name: 'Items',
  components: {ViewList},
  data()
  {
    return {
      sorts: [
        {fullName: "Name", shortName: "Name"},
        {fullName: "Unit Price", shortName: "UnitPrice"},
        {fullName: "Duration", shortName: "Milliseconds"},
        {fullName: "Composer", shortName: "Composer"},
        {fullName: "Track Id", shortName: "TrackId"},
        {fullName: "Album Id", shortName: "AlbumId"},
        {fullName: "Genre Id", shortName: "GenreId"},
        {fullName: "Media Type", shortName: "MediaTypeId"},
      ],
    }
  },
  mounted() {
    this.$refs.viewList.setSortOptions(this.sorts);
    this.$refs.viewList.setDataSet("http://51.91.76.245:8000/api/tracks");

  },
}
</script>

