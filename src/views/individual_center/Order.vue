<!-- 全部订单 -->
<template>
  <div class="order">
    <div class="orderHead">
      <i class="iconfont icon-yiliaohangyedeICON- backBtn" @click="goBack()" />
      <span>我的订单</span>
    </div>
    <div class="orderTab">
      <keep-alive>
        <van-tabs v-model="active" sticky animated swipeable color="#884e22">
          <van-tab
            v-for="item in titleList"
            :key="item.id"
            :title="item.title"
            :to="{ name: 'myorder', params: { id: item.id } }"
          ></van-tab>
        </van-tabs>
      </keep-alive>
    </div>

    <div class="orderContent">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderView",
  data() {
    return {
      active: 0,
      titleList: [
        {
          id: 1,
          title: "待付款",
        },
        {
          id: 2,
          title: "派送中",
        },
        {
          id: 3,
          title: "待评价",
        },
        {
          id: 4,
          title: "已完成",
        },
      ],
    };
  },
  mounted() {
    // 从 localStorage 获取当前选中的 tab
    const activeTab = localStorage.getItem("routeId");
    if (activeTab) {
      this.active = parseInt(activeTab);
    }
  },
  methods: {
    goBack() {
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="scss" scoped>
.order {
  padding: 40px 0;
  width: 100%;
  height: 100%;
  .orderHead {
    position: fixed;
    top: 0;
    width: 95%;
    padding: 0 2.5%;
    height: 42px;
    opacity: 1;
    border-bottom: 1px solid rgba(243, 245, 247, 1);
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: flex-start; /* 左对齐 */
    z-index: 999;
    .arrowLeft {
      line-height: 42px;
      font-size: 23px;
    }
    span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      align-self: center;
      opacity: 1;
      color: rgba(85, 85, 85, 1);
      font-size: 14px;
      font-weight: 500;
    }
  }
  .orderTab {
    position: fixed;
    top: 40px;
    width: 100%;
    z-index: 99;
  }
}

.backBtn {
  align-self: center;
  font-size: 13px;
  color: #727272;
}
</style>
