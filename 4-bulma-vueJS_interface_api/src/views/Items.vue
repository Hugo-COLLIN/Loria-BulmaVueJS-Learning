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

  },
  mounted() {
    // this.$refs.viewList.init()
  },
}
</script>

