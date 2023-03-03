<template>
  <div>
    <ClassRoute></ClassRoute>
  </div>
</template>

<script>
import { indexImg } from "@/api/indexImg/index";
import ClassRoute from "@/components/classRoute.vue";
export default {
  name: "NumberView",
  components: { ClassRoute },
  created() {
    console.log("指数触发");
    indexImg({})
      .then((res) => {
        this.$store.commit(
          "classflyStore/getClassDate",
          res.result[3].children
        );
        this.$store.commit("classflyStore/getClassName", res.result[3].name);
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
