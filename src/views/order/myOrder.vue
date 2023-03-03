<template>
  <div class="myorder">
    <!-- 待付款 -->
    <div class="noobligation" v-if="routeId == 1 && notPayment.length == 0">
      <div class="noobligationContent">
        <img
          src="@/assets/images/coupon.png"
          class="obligationImg"
          alt="优惠券不见了~"
        />
        <span class="obligationText">暂无内容</span>
      </div>
    </div>
    <div class="obligation" v-if="routeId == 1 && notPayment != ''">
      <div class="obligationContent">
        <div class="obligationGoods" v-for="item in notPayment" :key="item.id">
          <div v-if="item.status == 0 || item.status == 1">
            <div
              v-for="(shop, index) in JSON.parse(item.goods_info)"
              :key="index"
            >
              <van-swipe-cell>
                <van-card
                  :num="shop.num"
                  :price="shop.total_price"
                  :desc="shop.desc"
                  :title="shop.goods_name"
                  :thumb="shop.s_goods_photos[0].path"
                  disabled
                  lazy-load
                  centered
                />
                <template #right>
                  <van-button
                    square
                    type="danger"
                    text="删除"
                    @click="delCard(item.id)"
                  />
                </template>
                <div class="obligationBtn" v-show="item.status == 1">
                  <button class="cancle" @click="goCancle(item.id)">
                    取消订单
                  </button>
                  <button class="gopay" @click="gopay()">去支付</button>
                </div>
                <div class="obligationBtn" v-show="item.status == 0">
                  <span>订单已过期</span>
                </div>
              </van-swipe-cell>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 派送中 -->
    <div class="nodelivery" v-if="routeId == 2 && orderList.length == 0">
      <div class="nodeliveryContent">
        <img
          src="@/assets/images/coupon.png"
          class="deliveryImg"
          alt="优惠券不见了~"
        />
        <span class="deliveryText">暂无内容</span>
      </div>
    </div>
    <div class="delivery" v-if="routeId == 2 && orderList != ''">
      <div class="deliveryContent">
        <div
          class="deliveryGoods"
          v-for="item in orderList"
          :key="JSON.parse(item.id)"
        >
          <div v-if="item.status == 3 || item.status == 2">
            <div
              v-for="(shop, index) in JSON.parse(item.goods_info)"
              :key="index"
            >
              <van-swipe-cell>
                <van-card
                  :num="shop.num"
                  :price="shop.total_price"
                  :desc="shop.desc"
                  :title="shop.goods_name"
                  :thumb="shop.s_goods_photos[0].path"
                  disabled
                  lazy-load
                  centered
                />
                <template #right>
                  <van-button
                    square
                    type="danger"
                    text="删除"
                    @click="delCard(item.id)"
                  />
                </template>
                <div class="deliveryBtn">
                  <span>待收货</span>
                  <button class="check" @click="checkDeli(item.order_id)">
                    查看物流
                  </button>
                </div>
              </van-swipe-cell>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 待评价 -->
    <div class="noevaluate" v-if="routeId == 3">
      <div class="noevaluateContent">
        <img
          src="@/assets/images/coupon.png"
          class="evaluateImg"
          alt="优惠券不见了~"
        />
        <span class="evaluateText">暂无内容</span>
      </div>
    </div>
    <!-- <div class="evaluate" v-if="routeId == 3 && orderList != ''">
      <div class="evaluateContent">
        <div class="evaluateGoods" v-for="item in orderList" :key="item.id">
          <van-swipe-cell>
            <van-card
              :num="JSON.parse(item.goods_info)[0]?.num"
              :price="item.total_price"
              :desc="JSON.parse(item.goods_info)[0]?.desc"
              :title="JSON.parse(item.goods_info)[0]?.goods_name"
              :thumb="JSON.parse(item.goods_info)[0]?.s_goods_photos[0].path"
              disabled
              lazy-load
              centered
            />
            <template #right>
              <van-button
                square
                type="danger"
                text="删除"
                @click="delCard(item.id)"
              />
            </template>
            <div class="evaluateBtn">
              <button @click="goComment()">评价</button>
            </div>
          </van-swipe-cell>
        </div>
      </div>
    </div> -->

    <!-- 已完成 -->
    <div class="nofinished" v-if="routeId == 4 && finishedList.length == 0">
      <div class="nofinishedContent">
        <img
          src="@/assets/images/coupon.png"
          class="finishedImg"
          alt="优惠券不见了~"
        />
        <span class="finishedText">暂无内容</span>
      </div>
    </div>
    <div class="finished" v-if="routeId == 4 && finishedList != ''">
      <div class="finishedContent">
        <div class="finishedGoods" v-for="item in orderList" :key="item.id">
          <div v-if="item.status == 6">
            <div
              v-for="(shop, index) in JSON.parse(item.goods_info)"
              :key="index"
            >
              <van-swipe-cell>
                <van-card
                  :num="shop.num"
                  :price="shop.total_price"
                  :desc="shop.desc"
                  :title="shop.goods_name"
                  :thumb="shop.s_goods_photos[0].path"
                  lazy-load
                  centered
                />
                <template #right>
                  <van-button
                    square
                    type="danger"
                    text="删除"
                    @click="delCard(item.id)"
                  />
                </template>
                <div class="finished">
                  <span>订单已完成</span>
                  <button class="delOrder" @click="delOrder(item.id)">
                    删除订单
                  </button>
                  <button
                    class="buyAgain"
                    @click="buyAgain(JSON.parse(item.goods_info)[0]?.id)"
                  >
                    再次购买
                  </button>
                </div>
              </van-swipe-cell>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrder, deleteOrder } from "@/api/order/index";
import { Toast, Dialog } from "vant";
export default {
  name: "MyOrder",
  data() {
    return {
      routeId: "",
      orderList: [],
      notPayment: [],
      finishedList: [],
    };
  },
  watch: {
    //监听路由地址的改变
    $route: {
      immediate: true,
      handler() {
        if (this.$route.params.id) {
          //需要监听的参数
          this.routeId = this.$route.params.id;
          localStorage.setItem("routeId", this.routeId - 1);
        }
      },
    },
  },
  beforeRouteUpdate(to, from, next) {
    next(); // 一定要调用 next 函数，否则路由会一直处于等待状态
  },
  async created() {
    try {
      // 获取订单列表
      let orderres = await getOrder({ limit: 1000 });
      console.log(orderres.result.rows);
      this.orderList = orderres.result.rows;

      // 管理待付款的数组
      orderres.result.rows.forEach((e) => {
        if (e.status == 0 || e.status == 1) {
          this.notPayment = orderres.result.rows;
        } else if (e.status == 6) {
          this.finishedList = orderres.result.rows;
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 右滑时点击的删除按钮
    delCard(e) {
      Dialog.confirm({
        message: "确认删除该订单？",
      })
        .then(() => {
          // on confirm
          const index = this.orderList.findIndex((item) => item.id === e);
          deleteOrder(e).then((res) => {
            if (res.msg == "删除成功") {
              if (index > -1) {
                this.orderList.splice(index, 1);
              }
            }
          });
          Toast({
            message: "已删除该订单",
            icon: "success",
          });
        })
        .catch(() => {
          // on cancel
          Toast({
            message: "取消删除",
            icon: "success",
          });
        });
    },
    // 待付款区域两个按钮
    goCancle(e) {
      Dialog.confirm({
        message: "确认删除该订单？",
      })
        .then(() => {
          // on confirm
          const index = this.orderList.findIndex((item) => item.id === e);
          deleteOrder(e).then((res) => {
            if (res.msg == "删除成功") {
              if (index > -1) {
                this.orderList.splice(index, 1);
              }
            }
          });
          Toast({
            message: "已删除该订单",
            icon: "success",
          });
        })
        .catch(() => {
          // on cancel
          Toast({
            message: "取消删除",
            icon: "success",
          });
        });
    },
    gopay($id) {
      // 获取参数跳转支付页面
      this.$router.push({
        path: "/payorder",
        query: {
          id: $id,
        },
      });
    },
    // 派送中区域按钮
    checkDeli(e) {
      this.$router.push({ path: "/logistics", query: { id: e } });
    },
    // 待评价区域的按钮
    goComment() {
      Toast("正在前往评价~~");
    },
    // 已完成区域两个按钮
    delOrder(e) {
      Dialog.confirm({
        message: "确认删除该订单？",
      })
        .then(() => {
          // on confirm
          const index = this.orderList.findIndex((item) => item.id === e);
          deleteOrder(e).then((res) => {
            if (res.msg == "删除成功") {
              if (index > -1) {
                this.orderList.splice(index, 1);
              }
            }
          });
          Toast({
            message: "已删除该订单",
            icon: "success",
          });
        })
        .catch(() => {
          // on cancel
          Toast({
            message: "取消删除",
            icon: "success",
          });
        });
    },
    buyAgain(id) {
      this.$router.push({ path: "/detail", query: { id: id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.myorder {
  padding: 40px 0;
  width: 100%;
  // 没有订单时显示
  .noobligation,
  .nodelivery,
  .noevaluate,
  .nofinished {
    .noobligationContent,
    .nodeliveryContent,
    .noevaluateContent,
    .nofinishedContent {
      margin: 20px auto 0;
      display: flex;
      flex-direction: column;
      justify-content: center; /*水平居中*/
      align-items: center; /*垂直居中*/
      .obligationImg,
      .deliveryImg,
      .evaluateImg,
      .finishedImg {
        margin-bottom: 10px;
        width: 50%;
      }
      .obligationText,
      .deliveryText,
      .evaluateText,
      .finishedText {
        margin-bottom: 5px;
        color: #555555;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }

  // 待付款和已完成
  .obligation,
  .finished {
    .obligationContent,
    .finishedContent {
      .obligationGoods,
      .finishedGoods {
        .obligationBtn,
        .finished {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 10px;
          span {
            flex: 1;
            font-size: 14px;
            color: #884e22;
          }
          button {
            margin-right: 9px;
            border: 1px solid #884e22;
            width: 75px;
            height: 25px;
            font-size: 14px;
            background: #fff;
            border-radius: 50px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
            color: #884e22;
          }
          .cancle,
          .delOrder {
            border: 1px solid #fff;
            color: #666;
          }
          .gopay,
          .buyAgain {
            margin-right: 0;
          }
        }
      }
    }
  }

  // 待收货
  .delivery {
    .deliveryContent {
      .deliveryGoods {
        .deliveryBtn {
          display: flex;
          justify-content: space-between; /* 水平方向两端对齐 */
          align-items: center; /* 垂直方向居中对齐 */
          padding: 10px;
          span {
            flex: 1;
            font-size: 14px;
            color: #884e22;
          }
          button {
            color: #884e22;
            border: 1px solid #884e22;
            width: 75px;
            height: 25px;
            font-size: 14px;
            margin-right: 0px;
            background: #fff;
            border-radius: 50px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
          }
        }
      }
    }
  }
  // 待评价
  .evaluate {
    .evaluateContent {
      .evaluateGoods {
        .evaluateBtn {
          display: flex;
          justify-content: flex-end;
          padding: 10px;
          button {
            margin-right: 0;
            border: 1px solid #884e22;
            width: 75px;
            height: 25px;
            font-size: 14px;
            background: #fff;
            border-radius: 50px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
            color: #884e22;
          }
        }
      }
    }
  }
}

::v-deep .van-swipe-cell__wrapper {
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

::v-deep .van-swipe-cell {
  height: 165px;
  // border-bottom: 1px solid #884e22;
}
::v-deep .van-card {
  margin-top: 8px;
  width: 98vw;
}
::v-deep .van-button--danger {
  height: 100%;
}
// 商品标题
::v-deep .van-card__title {
  font-size: 15px;
}
// 商品介绍
::v-deep .van-ellipsis {
  font-size: 12px;
  padding-top: 5px;
}

::v-deep .van-card__bottom {
  margin-top: 10px;
}

::v-deep .van-tabs__line {
  background-color: #884e22;
}
</style>
