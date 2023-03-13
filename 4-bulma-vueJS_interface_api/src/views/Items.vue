<template>
  <ViewList ref="viewList"/>
</template>

<script>
import ViewList from "@/components/ViewList.vue";
export default {
  name: 'Items',
  components: {ViewList},
  mounted() {
    this.$refs.viewList.init("http://51.91.76.245:8000/api/tracks")
  },
}
</script>

