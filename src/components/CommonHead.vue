<template>
  <nav>
    <div class="common-head-box">
      <div v-if="showBack" class="head-box-back" @click.stop="backHandle">
        <i class="iconfont icon-yiliaohangyedeICON- backBtn" />
      </div>
      <div class="head-box-center">
        <p v-if="!showMid">{{ title }}</p>
        <slot class="center-box" name="header-center"></slot>
      </div>
      <div class="head-box-right">
        <!-- 弹出层 -->
        <van-popover
          v-if="menu"
          v-model="showPopover"
          trigger="click"
          :actions="actions"
          placement="left-start"
          @select="onSelect"
          theme="dark"
        >
          <!-- 点击事件 -->
          <template #reference>
            <i class="iconfont icon-caidan" />
          </template>
        </van-popover>
        <slot name="header-right"></slot>
      </div>
    </div>
    <div class="seize"></div>
  </nav>
</template>

<script>
export default {
  name: "CommonHead",
  props: {
    // 是否展示返回键
    showBack: {
      type: Boolean,
      default: true,
    },
    // 标题信息
    title: {
      type: String,
      default: "标题",
    },
    // 是否展示中间插槽
    showMid: {
      type: String || Boolean,
      default: null,
    },
    // 是否展示菜单
    menu: {
      type: String || Boolean,
      default: null,
    },
  },
  data() {
    return {
      // 菜单是否显示
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [
        { text: "首页", icon: "wap-home-o" },
        { text: "分类", icon: "apps-o" },
        { text: "购物车", icon: "shopping-cart-o" },
        { text: "我的", icon: "contact" },
      ],
    };
  },
  methods: {
    backHandle() {
      this.$router.back();
    },
    // 菜单栏
    onSelect(action, index) {
      switch (index) {
        case 0:
          this.$router.push("/");
          break;
        case 1:
          this.$router.push("/category/UseView?id=0");
          break;
        case 2:
          this.$router.push("/shop");
          break;
        case 3:
          this.$router.push("/home");
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-caidan {
  font-size: 23px;
}

nav {
  width: 100%;
}
.seize {
  height: 50px;
}
.common-head-box {
  position: fixed;
  display: flex;
  width: 95%;
  padding: 0 2.5%;
  height: 50px;
  top: 0;
  left: 0;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  border-bottom: 0.5px solid #e4e4e4;
  z-index: 99;

  .head-box-back {
    .backBtn {
      font-size: 13px;
      color: #727272;
    }
  }
  .head-box-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    p {
      font-size: 16px;
      color: rgba(85, 85, 85, 1);
    }
  }
}
</style>
