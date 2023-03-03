<template>
  <div class="box">
    <div class="box2">
      <div class="img">
        <img src="../assets/images/banner1_m.jpg.png" alt="" />
      </div>
      <main>
        <!-- <van-skeleton title :row="4" /> -->
        <van-skeleton title :row="5" :loading="loading">
          <div class="title">{{ nameList }}</div>

          <ul>
            <li
              v-for="(item, index) in classList"
              :key="index"
              @click="toClassification(item)"
            >
              {{ item?.name }}
            </li>
          </ul>
        </van-skeleton>
      </main>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Skeleton } from "vant";

Vue.use(Skeleton);
export default {
  name: "ClassRoute",
  data() {
    return {
      loading: true,
      name: "",
    };
  },
  mounted() {
    // this.loading = false;
  },
  watch: {
    $route: {
      immediate: true,
      handler(q) {
        // 有id再存
        if (q.query.id) {
          this.$store.commit("classflyStore/updateClassIdx", q.query.id);
        }
      },
    },
    classList: {
      //立刻执行
      immediate: true,
      handler(newvalue) {
        if (newvalue) {
          console.log(this.loading);
          this.loading = false;
          console.log(this.loading);
        }
      },
    },
  },
  computed: {
    classList() {
      // console.log(this.id);
      return this.$store.state.classflyStore.arr[this.classIdx]?.children;
    },
    nameList() {
      // console.log(this.$store.state.classflyStore.arr[this.id]?.name);
      return this.$store.state.classflyStore.arr[this.classIdx]?.name;
    },
    // 当前分类ID
    classIdx() {
      return this.$store.state.classflyStore.classId;
    },
  },
  // created() {
  //   setTimeout((item) => {
  //     console.log(item);
  //     this.arr = this.$store.state.classflyStore;
  //     this.name = this.$store.state.classflyStore.name;
  //   }, 700);
  // },
  methods: {
    toClassification(item) {
      // console.log(item.id);
      this.$router.push({
        path: "/classification",
        query: {
          id: item.id,
          name: item.name,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 10px;
  background-color: white;
  .img {
    width: 272px;
    height: 140px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  main {
    width: 272px;
    height: 235px;
    border: 1px solid rgba(233, 236, 240, 1);
    box-sizing: border-box;
    margin-top: 18px;
    .title {
      height: 35px;
      line-height: 35px;
      color: rgba(85, 85, 85, 1);
      margin-left: 10px;
      font-size: 16px;
      font-weight: 600;
      text-align: left;
    }
    ul {
      width: 100%;
      height: 200px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      li {
        width: 136px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: rgba(102, 102, 102, 1);
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
}
</style>
