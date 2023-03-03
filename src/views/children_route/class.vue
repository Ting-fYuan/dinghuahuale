<template>
  <div><ClassRoute></ClassRoute></div>
</template>

<script>
import { indexImg } from "@/api/indexImg/index";
import ClassRoute from "@/components/classRoute.vue";
export default {
  name: "ClassView",
  components: { ClassRoute },
  // watch: {
  //   $route(q) {
  //     console.log(q);
  //   },
  // },
  created() {
    console.log("类别组件触发");
    indexImg({})
      .then((res) => {
        this.$store.commit(
          "classflyStore/getClassDate",
          res.result[2].children
        );
        this.$store.commit("classflyStore/getClassName", res.result[2].name);
        // this.$store.classflyStore.name = res.result[0].name;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
div {
  background-color: white;
}
</style>
