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

      identifier: "CustomerId",

      cols: {
        title: {
          name: "Name",
          label: "Name",
          pre: "",
          post: "",
          elements: [{
            name: "FirstName",
            pre: "",
            post: ""
          },
          {
            name: "LastName",
            pre: "",
            post: ""
          }],
        },
        infos: [
          {
            name: "Email",
            label: "Email",
            pre: "",
            post: "",
            style: "code"
          },
          {
            name: "Country",
            label: "Country",
            pre: "",
            post: ""
          },
          {
            name: "OrderCount",
            label: "Orders",
            pre: "",
            post: "",
            route: "orders"
          }
        ],
      },

      formView: [
        [{name: "FirstName", label: "First Name", icon:"fa fa-user", placeholder:"e.g. Luis", type:"text"}, {name: "LastName", label: "Last Name", placeholder:"e.g. Franco", type:"text"}],
        [{name: "Email", label: "Email", icon:"fa fa-envelope", placeholder: "e.g. 22.99", type:"text"}],
        [{name: "Country", label: "Country", icon:"", placeholder:"e.g. France", type:"text"}],
      ]
    }
  },
  mounted() {
    this.$refs.viewList.setView("table");
    this.$refs.viewList.setSortOptions(this.sorts);
    this.$refs.viewList.setModel(this.cols);
    this.$refs.viewList.setDataSet("http://51.91.76.245:8000/api/customers");
    this.$refs.viewList.setIdentifier(this.identifier);
    this.$refs.viewList.setPageTitle("Customers");
    this.$refs.viewList.setSearchComponent(["FirstName", "LastName", "Email"], "Name, email...", "Search");
    this.$refs.viewList.setCounterComponent("customers");
    this.$refs.viewList.setFormView(this.formView);
    // this.$refs.viewList.setCardsTitle("Name");
    this.$refs.viewList.init();
  },
}
</script>

