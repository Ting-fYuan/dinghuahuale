<!-- 购物车 -->
<template>
  <div class="shop-view-box">
    <com-head
      :showBack="true"
      :title="shopCarList.length ? `购物车(${shopCarList.length})` : '购物车'"
    ></com-head>
    <main>
      <div class="shop-car-box">
        <div class="shop" v-if="showShopList">
          <van-checkbox-group v-model="list">
            <van-checkbox
              v-for="(item, index) in shopCarList"
              :name="item.id"
              class="shop-list-box"
              :key="item.id"
            >
              <div class="shop-box-right">
                <img
                  :src="item.s_good.s_goods_photos[0].path"
                  alt="item.s_good.name"
                />
                <div class="shop-box-msg">
                  <p>{{ item.s_good.name }}</p>
                  <p>
                    市场价：<span>￥{{ item.s_good.price }}</span>
                  </p>
                  <p>
                    店铺价：<span>￥{{ item.s_good.sale_price }}</span>
                  </p>
                </div>
                <p class="shop-num">x {{ item.num }}</p>
                <i
                  class="delete-shop iconfont icon-iconfontshanchu"
                  @click.stop="delShopCarHandle(item.id, index)"
                ></i>
              </div>
            </van-checkbox>
          </van-checkbox-group>
        </div>
        <div class="no-shop" v-else>
          <img
            class="no-shop-img"
            src="../../src/assets/images/cartback.png"
            alt="购物车没有商品"
          />
          <p>购物车暂时没有商品</p>
          <button @click="toIndex">去逛逛</button>
        </div>
        <div class="like-more">
          <div class="like-more-title">
            <p>猜你喜欢</p>
          </div>
          <van-skeleton class="skeleton" title :row="4" :loading="loading" />
          <div class="like-more-main">
            <div
              class="commodity"
              v-for="item in likeList"
              :key="item.id"
              @click="toDetail(item.id)"
            >
              <img :src="item.s_goods_photos[0].path" :alt="item.name" />
              <div class="ctn-bottom">
                <p class="goods-name">{{ item.name }}</p>
                <div class="ctn-bottom-box">
                  <p class="price">￥ {{ item.price }}</p>
                  <p class="sale">
                    销量{{ item.sold_num >= 1000 ? "999+" : item.sold_num }}
                  </p>
                </div>
              </div>
            </div>
            <p>没有更多了~</p>
          </div>
        </div>
      </div>
    </main>
    <div class="sumUpBox" v-if="isLogin && chooseShopList.length">
      <div class="toggle">
        <van-checkbox v-model="toggleBtn" @click="toggleHandle"
          ><p>全选</p></van-checkbox
        >
      </div>
      <div class="total">
        <p>合计：￥{{ getTotal || 0 }}</p>
        <button @click="toOrder">去结算({{ list.length }})</button>
      </div>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import { guessLikeApi } from "@/api/shopCar";
import TabBar from "@/components/TabBar.vue";
import { Dialog, Toast } from "vant";
export default {
  name: "ShopView",
  data() {
    return {
      // 是否有购物车商品
      showShopList: false,
      // 猜你喜欢
      likeList: [],
      // 选中的商品
      list: [],
      // 全选按钮
      toggleBtn: false,
      // 骨架屏
      loading: true,
      // 没有更多了
      noMore: false,
    };
  },
  computed: {
    // 判断是否登录
    isLogin() {
      return this.$store.state.loginStore.token;
    },
    // 获取购物车列表
    shopCarList() {
      return this.$store.state.shopCarStore.shopCarList;
    },
    // 获取选中商品id数组
    chooseShopList() {
      return this.$store.state.shopCarStore.chooseShopList;
    },
    // 获取总价
    getTotal() {
      return this.$store.getters["shopCarStore/getTotal"];
    },
  },
  watch: {
    // 监听选中商品
    list(newData) {
      // 存储vuex
      this.$store.commit("shopCarStore/upDataChooseShop", newData);
      // 全选
      if (newData.length != 0 && newData.length === this.shopCarList.length) {
        this.toggleBtn = true;
      } else {
        this.toggleBtn = false;
      }
    },
    // 监听购物车列表
    shopCarList(newData) {
      // 没有购物车改变状态
      if (newData.length == 0) {
        this.showShopList = false;
      }
    },
    // ! （暂时）进入页面刷新
    $route() {
      this.$router.go(0);
    },
  },
  async created() {
    // 是否登录
    if (this.isLogin) {
      // 获取购物车列表
      const { result } = await this.$store.dispatch(
        "shopCarStore/getShopCarList"
      );
      // 是否有购物车商品
      if (result?.length) {
        // 展示购物车列表
        this.showShopList = true;
      } else this.showShopList = false;
      // 是否有选中购物车
      const { chooseShopList } = this.$store.state.shopCarStore;
      if (chooseShopList) {
        this.list = chooseShopList;
      }
    }
    // 猜你喜欢
    const { result } = await guessLikeApi();
    this.likeList = result;
    this.loading = false;
  },
  methods: {
    // 去逛逛
    toIndex() {
      // 跳转至首页
      this.$router.push("index");
    },
    // 删除购物车
    delShopCarHandle($id, $idx) {
      Dialog.confirm({
        title: "提示",
        message: "确认删除此购物车?",
      }).then(() => {
        Toast.clear();
        Toast({
          message: "删除成功",
          position: "bottom",
        });
        // 删除
        this.$store.dispatch("shopCarStore/deleteShopCar", {
          id: $id,
          idx: $idx,
        });
      });
    },
    // 全选按钮
    toggleHandle() {
      if (this.list != 0 && this.list.length === this.shopCarList.length) {
        this.toggleBtn = false;
        this.list = [];
      } else {
        this.toggleBtn = true;
        this.list = this.shopCarList.map((item) => item.id);
      }
    },
    // 跳转结算页面
    toOrder() {
      if (this.chooseShopList.length) {
        this.$router.push({
          path: "/fillOrder",
          query: {
            shopcar: true,
          },
        });
      } else {
        Toast({
          message: "请先选择商品",
          position: "bottom",
        });
      }
    },
    // 跳转详情
    toDetail($id) {
      this.$router.push({
        path: "/detail",
        query: {
          id: $id,
        },
      });
    },
  },
  components: { TabBar },
};
</script>

<style lang="scss" scoped>
::v-deep .van-checkbox__icon--checked .van-icon {
  background-color: #884e22;
  border-color: #884e22;
}
.skeleton {
  margin-top: 30px;
}
.shop-view-box {
  height: 100vh;
  background-color: #e8ecef;
  main {
    .shop-car-box {
      .shop {
        .shop-list-box {
          display: flex;
          padding: 15px 10px;
          background: #fff;
          border-bottom: 0.5px solid #ccc;

          .shop-box-right {
            display: flex;
            position: relative;
            width: 330px;
            // background-color: pink;
            // 删除
            .delete-shop {
              position: absolute;
              top: 15px;
              right: 6px;
              font-size: 16px;
            }
            img {
              width: 135px;
              height: 135px;
              background-color: yellowgreen;
            }
            .shop-box-msg {
              display: flex;
              margin-left: 10px;
              flex-direction: column;
              justify-content: center;

              p {
                font-size: 13px;
                color: #555555;

                &:first-of-type {
                  margin-bottom: 13px;
                  font-size: 16px;
                  color: #333333;
                }

                &:nth-of-type(2) span {
                  color: #a6a6a6;
                  text-decoration: line-through;
                }

                &:last-of-type span {
                  color: #e92d31;
                }
              }
            }
            .shop-num {
              position: absolute;
              bottom: 0;
              right: 10px;
              display: flex;
              margin-bottom: 5px;
              flex-direction: column;
              justify-content: flex-end;
              font-size: 16px;
            }
          }
        }
      }
      .no-shop {
        padding: 50px 0 0;
        width: 100vw;
        min-height: 260px;
        background: #ffffff;
        .no-shop-img {
          margin: 0 auto;
          width: 34%;
        }

        p {
          margin-top: 14px;
          font-size: 14px;
          text-align: center;
          color: #555555;
        }

        button {
          display: block;
          margin: 15px auto 0;
          width: 122px;
          height: 30px;
          outline: none;
          border: none;
          border-radius: 15px;
          opacity: 1;
          background: rgba(136, 78, 34, 1);
          color: #fff;
          font-size: 14px;
        }
      }

      .like-more {
        margin-top: 15px;
        padding: 15px;
        background-color: #fff;

        .like-more-title {
          p {
            font-size: 18px;
            color: #555555;
          }
        }
        .like-more-main {
          display: flex;
          margin-top: 15px;
          padding-bottom: 30%;
          justify-content: space-between;
          flex-wrap: wrap;

          & > p {
            margin-top: 20px;
            width: 100%;
            text-align: center;
            color: gray;
          }

          .commodity {
            margin-bottom: 10px;
            width: 165px;
            height: 235px;
            box-shadow: 0 5px 10px 0 #dee2e5;
            border-radius: 0 0 5px 5px;

            img {
              width: 100%;
              height: 165px;
            }
            .ctn-bottom {
              display: flex;
              margin: 0 5px;
              justify-content: space-between;
              flex-direction: column;
              height: 30%;
              .goods-name {
                margin-top: 20px;
                font-size: 14px;
                color: #333333;
              }
              .ctn-bottom-box {
                display: flex;
                margin: 5px 0;
                justify-content: space-between;

                .price {
                  font-size: 14px;
                  color: #ff734c;
                  font-weight: 600;
                }
                .sale {
                  font-size: 12px;
                  color: #999999;
                }
              }
            }
          }
        }
      }
    }
  }

  .sumUpBox {
    position: fixed;
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: space-between;
    bottom: 50px;
    background-color: #fff;
    z-index: 9;
    .toggle {
      display: flex;
      margin-left: 20px;
      flex-direction: column;
      justify-content: center;
      p {
        font-size: 14px;
        color: #999999;
      }
    }
    .total {
      display: flex;
      p {
        margin-right: 10px;
        line-height: 50px;
        font-size: 14px;
        color: #884e22;
      }
      button {
        padding: 0 15px;
        height: 100%;
        border: none;
        text-align: center;
        color: #ffffff;
        font-size: 14px;
        background: rgba(136, 78, 34, 1);
      }
    }
  }
}
</style>
