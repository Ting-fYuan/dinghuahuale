<!-- 分类 -->
<template>
  <div class="box">
    <div class="top">
      <div class="search" @click="toSearch">
        <i class="iconfont icon-icon_sousuo"></i>
        搜索鲜花、蛋糕、礼品
      </div>
    </div>

    <main>
      <nav>
        <router-link to="/category/UseView?id=0">用途</router-link>
        <router-link to="/category/UseView?id=1">花材</router-link>
        <router-link to="/category/UseView?id=2">类别</router-link>
        <router-link to="/category/UseView?id=3">枝数</router-link>
        <!-- <router-link to="/category/UseView?id=0">用途</router-link>
        <router-link to="/category/MaterialView">花材</router-link>
        <router-link to="/category/ClassView">类别</router-link>
        <router-link to="/category/NumberView?">枝数</router-link> -->
      </nav>
      <keep-alive>
        <router-view />
      </keep-alive>
    </main>
    <div>
      <TabBar />
    </div>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar.vue";
import Vue from "vue";
import { Search } from "vant";

Vue.use(Search);
export default {
  name: "CategoryView",
  components: { TabBar },
  methods: {
    //去搜索页
    toSearch() {
      this.$router.push("/search");
    },
  },
  // watch: {
  //   $route: {
  //     immediate: true,
  //     handler(q) {
  //       console.log(q);
  //     },
  //   },
  // },
  // beforeRouteUpdate(to, from, next) {
  //   console.log(to.name);
  //   next(); // 一定要调用 next 函数，否则路由会一直处于等待状态
  // },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100vh;
  .top {
    width: 100%;
    height: 50px;
    background-color: white;
    border-bottom: 1px solid rgba(233, 236, 240, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 999;
    .search {
      width: 90%;
      height: 70%;
      background-color: rgba(243, 245, 247, 1);
      border-radius: 20px;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #71797f;
      i {
        font-size: 25px;
        margin: 0 10px;
      }
    }
  }
  main {
    width: 100%;
    display: flex;
    height: 88vh;
    nav {
      width: 80px;
      background-color: white;
      border: 1px solid rgba(233, 236, 240, 1);
      box-sizing: border-box;
      a {
        width: 80px;
        height: 40px;
        color: black;
        margin-top: 15px;
        font-size: 14px;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid rgba(233, 236, 240, 1);
        &.router-link-exact-active {
          color: rgba(136, 78, 34, 1);
          border-left: 1px solid rgba(136, 78, 34, 1);
        }
      }
    }
  }
}
</style>
