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
        {fullName: "First Name", shortName: "FirstName"},
        {fullName: "Last Name", shortName: "LastName"},
        {fullName: "Email", shortName: "Email"},
        {fullName: "Phone number", shortName: "Phone"},
        {fullName: "Address", shortName: "Address"},
        {fullName: "City", shortName: "City"},
        {fullName: "State", shortName: "State"},
        {fullName: "Country", shortName: "Country"},
        {fullName: "Orders", shortName: "OrderCount"},
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
        [{name: "Email", label: "Email", icon:"fa fa-envelope", placeholder: "e.g. 22.99", type:"text"},],
        [{name: "Company", label: "Company", icon:"fa fa-building", placeholder: "e.g. Brackets", type:"text"},],
        [{name: "Phone", label: "Phone number", icon:"fa fa-phone", placeholder:"e.g. +00 (00) 1234-5678", type:"text"}, {name: "Fax", label: "Fax number", icon:"fa fa-fax", placeholder:"e.g. +00 (00) 1234-5679", type:"text"},],
        [{name: "Address", label: "Address", icon:"fa fa-home", placeholder:"e.g. 1 Long Street", type:"text"}, {name: "PostalCode", label: "Postal Code", icon:"", placeholder:"e.g. 00000", type:"text"},],
        [{name: "City", label: "City", icon:"fa fa-tree-city", placeholder:"e.g. London", type:"text"}, {name: "State", label: "State", icon:"fa fa-route-interstate", placeholder:"e.g. SP", type:"text"}, {name: "Country", label: "Country", icon:"fa fa-globe", placeholder:"e.g. France", type:"text"},],
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
    this.$refs.viewList.setExcludedProps(["OrderCount"]);
    // this.$refs.viewList.setCardsTitle("Name");
    this.$refs.viewList.init();
  },
}
</script>

