<!-- 我的 -->
<template>
  <div>
    <com-head :showBack="false" title="个人中心"></com-head>
    <div class="loginArea">
      <div class="UserArea">
        <img src="../../src/assets/images/homeBackground.jpg" />
        <div class="content" v-if="!token">
          <p>Hi, 欢迎来到订花乐 !</p>
          <button class="loginBtn" @click="goLogin">登录 / 注册</button>
        </div>
        <div class="content" v-if="token">
          <div>
            <img :src="userInfo.header_img || defaultAvatar" alt="默认头像" />
            <span>{{ userInfo.name || "订花乐用户" }}</span>
          </div>
          <button @click="changeLoginState">退出登录</button>
        </div>
        <div class="OtherInformationBox">
          <div class="OrderBox">
            <p>
              <span>我的订单</span>
              <span @click="goSearch"
                >全部订单<i class="iconfont icon-youjiantou"></i
              ></span>
            </p>
            <ul>
              <li @click="goPayment">
                <i class="iconfont icon-daifukuan"></i>
                <span>待付款</span>
              </li>
              <li @click="goSending">
                <i class="iconfont icon-daifahuo"></i>
                <span>派送中</span>
              </li>
              <li @click="goComment">
                <i class="iconfont icon-pingjia"></i>
                <span>待评价</span>
              </li>
              <li @click="goComplete">
                <i class="iconfont icon-dingdan"></i>
                <span>已完成</span>
              </li>
            </ul>
          </div>

          <div class="OtherActivity">
            <ul>
              <li @click="goCoupon">
                <p>
                  <i class="iconfont icon-youhuiquan"></i>
                  <span>优惠券</span>
                </p>
                <i class="iconfont icon-youjiantou"></i>
              </li>
              <li @click="goAddress">
                <p>
                  <i class="iconfont icon-dizhi"></i>
                  <span>收获地址</span>
                </p>
                <i class="iconfont icon-youjiantou"></i>
              </li>
              <li @click="goSetting">
                <p>
                  <i class="iconfont icon-shezhi"></i>
                  <span>设置</span>
                </p>
                <i class="iconfont icon-youjiantou"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <TabBar />
  </div>
</template>

<script>
// import defaultAvatar from "@/assets/images/avatar.png";
import TabBar from "@/components/TabBar.vue";
import { logout } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "HomeView",
  components: { TabBar },
  data() {
    return {
      defaultAvatar:
        "https://img2.baidu.com/it/u=3072027427,2673781637&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    };
  },
  async created() {},
  computed: {
    token() {
      return this.$store.state.loginStore.token;
    },
    userInfo() {
      return this.$store.state.loginStore.userInfo;
    },
  },
  methods: {
    // @ 注销
    async changeLoginState() {
      if (this.token) {
        // 注销登录
        let logoutRes = await logout();
        if (logoutRes) {
          this.$store.commit("loginStore/clearUserInfo");
          this.$store.commit("addressStore/clearAddress");
          this.$store.commit("shopCarStore/clearShopCar");
          Toast.success("注销成功");
        }
      }
    },
    goSearch() {
      this.$router.push("/order");
    },
    goPayment() {
      this.$router.push("/order/myorder/1");
    },
    goSending() {
      this.$router.push("/order/myorder/2");
    },
    goComment() {
      this.$router.push("/order/myorder/3");
    },
    goComplete() {
      this.$router.push("/order/myorder/4");
    },
    goCoupon() {
      this.$router.push("/coupon");
    },
    goAddress() {
      this.$router.push("/address");
    },
    goSetting() {
      this.$router.push("/setting");
    },
    goLogin() {
      this.$router.push({
        path: "/login",
        query: {
          redirect: this.$route.fullPath,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.loginArea {
  box-sizing: border-box;
  width: 100vw;
  background-color: #e8ecef;
}

.UserArea {
  position: relative;
  width: 100%;
  // height: 140px;
  height: 200px;
  > img {
    height: 100%;
    width: inherit;
  }
  // @ 登录用户
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    left: calc(50% - 50vw);
    top: calc(50% - 45px);
    width: inherit;
    height: 90px;
    > p {
      font-weight: 500;
      font-size: 20px;
      color: #321804;
    }
    > button {
      width: 150px;
      height: 40px;
      border: none;
      border-radius: 20px;
      background-color: white;
      font-size: 14px;
    }
    .loginBtn {
      margin-top: 8px;
      font-size: 14px;
      font-weight: 600;
      background-color: #fff;
      color: #894e22;
    }

    > div {
      display: flex;
      align-items: center;
      img {
        margin-right: 8px;
        width: 60px;
        height: 60px;
        border-radius: 32px;
        opacity: 1;
        border: 2px solid rgba(255, 255, 255, 0.5);
        margin-bottom: 10px;
      }
      span {
        width: 70.2px;
        height: 17px;
        opacity: 1;
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        font-weight: 400;
        font-family: "PingFang SC";
        text-align: left;
      }
    }

    button {
      box-sizing: border-box;
      width: 100px;
      color: #000;
      background-color: #fff;
      padding: 10px 0;
    }
  }

  .OtherInformationBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: -30px;
    width: 96vw;
    .icon-youjiantou {
      font-size: 14px;
      vertical-align: middle;
    }

    .OrderBox {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: inherit;
      height: 140px;
      background-color: #fff;
      border-radius: 8px;
      > p {
        border-bottom: 1px solid rgba(233, 236, 240, 1);
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 90%;
        height: 50px;
        > span {
          font-size: 15px;
          color: #555555;
        }
      }

      > ul {
        display: flex;
        justify-content: space-around;
        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          > i {
            color: #555555;
            margin-bottom: 2px;
            font-size: 24px;
          }
          > span {
            color: #555555;
            font-size: 14px;
          }
        }
      }
    }
    .OtherActivity {
      margin-bottom: 60px;
      width: inherit;
      background-color: #fff;
      border-radius: 8px;
      > ul {
        > li {
          padding: 10px 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 40px;
          border-bottom: 1px solid rgba(233, 236, 240, 1);
          &:last-of-type {
            border: none;
          }
          p:first-of-type {
            i {
              margin-right: 6px;
              vertical-align: middle;
              font-size: 24px;
            }
            span {
              vertical-align: middle;
              font-size: 16px;
            }
          }
          p:last-of-type {
            font-size: 20px;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
