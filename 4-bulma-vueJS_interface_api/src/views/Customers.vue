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

      cols: {
        title: [
          {
            label: "FirstName",
            pre: "",
            post: ""
          },
          {
            label: "LastName",
            pre: "",
            post: ""
          }
        ],
        infos: [
          {
            label: "Email",
            pre: "",
            post: ""
          },
          {
            label: "Country",
            pre: "",
            post: ""
          },
          {
            label: "Orders",
            pre: "",
            post: ""
          }
        ],
      },

      formView: [
        [{name: "Name", label: "Title", icon:"", placeholder:"Title", type:"text", classes: "is-large"}],
        [{name: "UnitPrice", label: "Price", icon:"fa fa-dollar", placeholder: "e.g. 22.99", type:"number"}, {name: "Milliseconds", label: "Duration (minutes)", icon:"", placeholder: "e.g. 1.8", type:"number"}],
        [{name: "Composer", label: "Composers (comma separated)", icon:"", placeholder:"e.g. Mozart", type:"area"}],
      ]
    }
  },
  mounted() {
    this.$refs.viewList.setView("table");
    this.$refs.viewList.setSortOptions(this.sorts);
    this.$refs.viewList.setModel(this.cols);
    this.$refs.viewList.setDataSet("http://51.91.76.245:8000/api/customers");
    this.$refs.viewList.setPageTitle("Customers");
    this.$refs.viewList.setSearchComponent(["FirstName", "LastName", "Email"], "Name, email...", "Search");
    this.$refs.viewList.setCounterComponent("customers");
    this.$refs.viewList.setFormView(this.formView);
    // this.$refs.viewList.setCardsTitle("Name");
    this.$refs.viewList.init();
  },
}
</script>

