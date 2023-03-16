<template>
  <ViewList ref="viewList"/>
</template>

<script>
import ViewList from "@/components/view/list/ViewList.vue";
export default {
  name: 'Items',
  components: {ViewList},
  data()
  {
    return {
      sorts: [
        {fullName: "Order Id", shortName: "InvoiceId"},
        {fullName: "Order Date", shortName: "InvoiceDate"},
        {fullName: "Customer", shortName: "CustomerId"},
        {fullName: "Total", shortName: "Total"},
        {fullName: "Billing State", shortName: "BillingState"},
        {fullName: "Billing Postal Code", shortName: "BillingPostalCode"},
        {fullName: "Billing Country", shortName: "BillingCountry"},
        {fullName: "Billing City", shortName: "BillingCity"},
        {fullName: "Billing Address", shortName: "BillingAddress"},
      ],

      identifier: "InvoiceId",

      cols: {
        title: {
          name: "InvoiceId",
          label: "Order #",
        },
        infos: [
          {
            name: "InvoiceDate",
            label: "Date",
            pre: "",
            post: ""
          },
          {
            name: "CustomerId",
            label: "Customer", //TODO: replace to customer name ; change ViewList options to allow different API calls
            pre: "",
            post: "",
            route: "customers"
          },
          {
            name: "Total",
            label: "Total",
            pre: "$",
            post: "",
          },
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
    this.$refs.viewList.setDataSet("http://51.91.76.245:8000/api/invoices");
    this.$refs.viewList.setIdentifier(this.identifier);
    this.$refs.viewList.setPageTitle("Orders");
    this.$refs.viewList.setSearchComponent(["InvoiceId", "CustomerId", "Date"], "Order #, Customer, Date...", "Search");
    this.$refs.viewList.setCounterComponent("orders");
    this.$refs.viewList.setFormView(this.formView);
    this.$refs.viewList.setExcludedProps(["OrderCount"]);
    // this.$refs.viewList.setCardsTitle("Name");
    this.$refs.viewList.init();
  },
}
</script>

