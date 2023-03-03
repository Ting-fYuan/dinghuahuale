<template>
  <div>
    <van-tabbar
      v-model="active"
      :route="true"
      :fixed="true"
      active-color="#905B32"
      inactive-color="#000"
    >
      <van-tabbar-item to="/index">
        <span>首页</span>
        <template #icon="index">
          <i
            :class="index.active ? icon.index.active : icon.index.inactive"
            class="iconfont_Style"
          ></i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item :to="`/category/UseView?id=${classIdx}`">
        <span>分类</span>
        <template #icon="category">
          <i
            :class="
              category.active ? icon.category.active : icon.category.inactive
            "
            class="Category_iconfont_Style"
          ></i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/shop">
        <span>购物车</span>
        <template #icon="shop">
          <i
            :class="shop.active ? icon.shop.active : icon.shop.inactive"
            class="iconfont_Style"
          ></i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/home">
        <span>我的</span>
        <template #icon="home">
          <i
            :class="home.active ? icon.home.active : icon.home.inactive"
            class="iconfont_Style"
          ></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "TabbarComponent",
  mounted() {
    console.log(this.classIdx);
    console.log(this.$store.state.classflyStore.classId);
  },
  data() {
    return {
      active: 0,
      id: 0,
      icon: {
        index: {
          active: "iconfont icon-huangguan",
          inactive: "iconfont icon-huangguan",
        },
        category: {
          active: "iconfont icon-fenlei",
          inactive: "iconfont icon-fenlei",
        },
        shop: {
          active: "iconfont icon-icon_gouwuche",
          inactive: "iconfont icon-icon_gouwuche",
        },
        home: {
          active: "iconfont icon-weibiaoti2fuzhi12",
          inactive: "iconfont icon-weibiaoti2fuzhi12",
        },
      },
    };
  },
  computed: {
    classIdx() {
      return this.$store.state.classflyStore.classId;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.iconfont_Style {
  font-size: 26px;
}

.Category_iconfont_Style {
  font-size: 22px;
}
</style>
