<template>
  <div>
    <ClassRoute></ClassRoute>
  </div>
</template>

<script>
// import { indexImg } from "@/api/indexImg/index.js";
import ClassRoute from "@/components/classRoute.vue";
export default {
  name: "UseView",
  components: { ClassRoute },

  created() {
    // console.log("用途触发");
    this.$store.dispatch("classflyStore/getClassData");
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log(to.query);
  //   next();
  // },
};
</script>

<style lang="scss" scoped>
div {
  background-color: white;
}
</style>
