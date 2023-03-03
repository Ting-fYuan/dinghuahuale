<template>
  <div class="pay-order-box">
    <com-head title="支付订单" menu="true"></com-head>
    <main>
      <div class="address">
        <div class="address-left">
          <i class="iconfont icon-dizhi"></i>
        </div>
        <div class="address-right">
          <p>
            {{ orderData?.s_address.name
            }}<span>{{ orderData?.s_address.phone }}</span>
          </p>
          <p>
            {{
              orderData?.s_address.area_name + "  " + orderData?.s_address.desc
            }}
          </p>
        </div>
      </div>
      <div class="order-ctn">
        <div class="shop">
          <div class="shopTitle">
            <i class="iconfont icon-huacai"></i>
            <span>订花乐官方平台</span>
            <i class="iconfont icon-youjiantou"></i>
          </div>
          <!-- 商品信息 -->
          <div
            class="shop-msg"
            v-for="item in orderData?.goods_info"
            :key="item.id"
          >
            <img :src="item.s_goods_photos[0].path" alt="商品图片" />
            <div class="shop-msg-center">
              <p>{{ item.goods_name }}</p>
              <p>全国包邮，质保鲜花</p>
              <p>付款后，24小时内发货</p>
              <!-- <p>下单积攒积分</p> -->
            </div>
            <div class="shop-msg-right">
              <p><span>￥</span>{{ item.sale_price }}</p>
              <p>×{{ item.num }}</p>
            </div>
          </div>
        </div>
        <!-- 价格区域 -->
        <div class="goodsPayDetails">
          <p>
            <span>商品总价</span>
            <span>
              <span>商品总价</span>
              <span
                ><i>￥</i
                ><b>{{
                  orderData?.goods_info[0].num * orderData?.total_price
                }}</b></span
              >
            </span>
          </p>
          <p>
            <span>运费</span>
            <span>
              <span>运费(快递)</span>
              <span><i>￥</i><b>0.00</b></span>
            </span>
          </p>
          <p>
            <span>运费险</span>
            <span>
              <span>运费险 | </span>
              <span>商家已支付</span>
            </span>
          </p>
          <p>
            <span>需付款</span>
            <span class="total-box">￥{{ orderData?.total_price }}</span>
          </p>
        </div>

        <!-- 订单详细区域 -->
        <div class="goodsInfoDetails">
          <p>
            <span>订单编号:</span>
            <span>{{ orderData?.order_id }}</span>
          </p>
          <p>
            <span>创建时间：</span>
            <span>{{ createTime }}</span>
          </p>
        </div>
      </div>
    </main>
    <!-- 提交订单 -->
    <van-action-sheet
      v-model="showSumbit"
      title="确认付款"
      :style="{ height: '80%' }"
      @close="closeHandle"
    >
      <div id="sumbit-content">
        <p>￥{{ orderData?.total_price }}</p>
        <div class="sumbit-box">
          <p>支付宝账号</p>
          <p>{{ userInfo.phone }}</p>
        </div>
        <div class="sumbit-box">
          <p>支付宝方式</p>
          <p>线上支付</p>
        </div>
        <div class="sumbit-button" @click="showPsw = true">输入密码</div>
      </div>
    </van-action-sheet>
    <!-- 密码 -->
    <van-popup
      v-model="showPsw"
      round
      position="bottom"
      :style="{ height: '50%' }"
      :safe-area-inset-bottom="true"
    >
      <van-password-input :value="keyWrodValue" :focused="showKeyboard" />
      <!-- 数字键盘 -->
      <van-number-keyboard v-model="keyWrodValue" :show="showKeyboard" />
    </van-popup>
    <footer>
      <button @click="cancelHandle">取消订单</button>
      <button @click="payHandle">继续付款</button>
    </footer>
  </div>
</template>

<script>
import { deleteOrder, getSingleOrder, orderPay } from "@/api/order";
import { Toast } from "vant";
export default {
  data() {
    return {
      // 订单数据
      orderData: null,
      // 唤起密码框
      showPsw: false,
      // 提交订单
      showSumbit: false,
      // 密码
      keyWrodValue: "",
      // 密码聚焦
      showKeyboard: true,
    };
  },
  async created() {
    try {
      const { id } = this.$route.query;
      // 获取单条订单
      const { result } = await getSingleOrder(id);
      this.orderData = result;
      console.log(result);
    } catch (err) {
      this.$router.replace("/index");
      return err;
    }
  },
  watch: {
    async keyWrodValue(value) {
      if (value.length === 6 && value !== "123456") {
        this.keyWrodValue = "";
        Toast({
          message: "密码错误！",
          position: "bottom",
        });
      } else if (value == "123456") {
        try {
          const res = await orderPay({
            id: this.$route.query.id,
            status: 1,
          });
          if (res.code === 200) {
            this.showPsw = false;
            this.showSumbit = false;
            this.keyWrodValue = "";
            // 清空购物车
            this.$store.commit("shopCarStore/clearShopCar");
            // 请求购物车
            this.$store.dispatch("shopCarStore/getShopCarList");
            Toast.success({
              message: "支付成功",
              forbidClick: true,
            });
            setTimeout(() => {
              this.$router.back();
            }, 1000);
          }
        } catch (err) {
          return err;
        }
      }
    },
  },
  computed: {
    // 订单创建时间
    createTime() {
      const time = this.orderData?.order_time;
      return new Date(Number(time)).toLocaleString();
      // return time;
    },
    // 订单剩余时间
    orderTime() {
      let res = Date.now() - this.orderData?.order_time;
      const time = new Date(res);
      return `${time.getHours()}小时${time.getMinutes()}分`;
    },
    // 用户信息
    userInfo() {
      return this.$store.state.loginStore.userInfo;
    },
  },
  methods: {
    // 取消订单
    async cancelHandle() {
      try {
        await deleteOrder(this.orderData.id);
        this.$router.back();
      } catch (e) {
        Toast({
          message: "取消订单失败",
          position: "bottom",
        });
        return e;
      }
    },
    // 支付订单
    payHandle() {
      this.showSumbit = true;
    },
    // 取消支付
    closeHandle() {
      this.showPayConfirm = true;
    },
    // 继续支付
    conFHandle() {
      this.showSumbit = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.pay-order-box {
  main {
    padding: 8px 4px;
    .order-top {
      padding: 6px 10px;
      display: flex;
      justify-content: space-between;
      > p {
        color: #894e22;
        font-size: 14px;
        font-weight: 600;
      }
    }
    .address {
      display: flex;
      padding: 15px 0;
      align-items: center;
      border-radius: 8px;
      background-color: #ffffff;
      .address-left {
        margin: 0 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #894e22;
        text-align: center;

        i {
          line-height: 40px;
          font-size: 20px;
          color: #ffffffd8;
        }
      }
      .address-right {
        > p {
          font-size: 14px;
          &:first-of-type {
            margin-bottom: 5px;
            span {
              display: inline-block;
              text-indent: 1em;
              font-size: 12px;
              color: #000000a4;
            }
          }
          &:last-of-type {
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
    }

    .order-ctn {
      padding: 4px;
      margin-top: 8px;
      background-color: #fff;
      border-radius: 8px;
      .shop {
        .shopTitle {
          display: flex;
          align-items: center;
          .icon-huacai {
            margin-top: 4px;
            margin-right: 6px;
            margin-bottom: 4px;
            font-size: 20px;
            color: rgb(255, 1, 43);
          }
          span {
            vertical-align: middle;
            font-size: 14px;
          }
          .icon-youjiantou {
            margin-left: 6px;
            margin-top: 4px;
            vertical-align: middle;
            font-size: 12px;
          }
        }
        .shop-msg {
          display: flex;
          justify-content: space-evenly;
          img {
            width: 100px;
            border-radius: 4px;
          }
          .shop-msg-center {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            > p {
              font-size: 12px;
            }
            p:first-of-type {
              font-weight: 600;
              font-size: 14px;
            }
            p:nth-of-type(2) {
              color: #888;
            }
            p:nth-of-type(3) {
              color: #f2ba31;
            }
            // p:last-of-type {
            //   letter-spacing: 2px;
            //   color: rgb(237, 42, 91);
            // }
          }

          .shop-msg-right {
            padding-bottom: 10px;
            p:first-of-type {
              margin-bottom: 10px;
              font-size: 16px;
              font-weight: 600;
              > span {
                font-size: 12px;
              }
            }
            p:last-of-type {
              text-align: right;
              font-size: 14px;
              color: #888;
            }
          }
        }
      }
      .goodsPayDetails {
        padding-bottom: 20px;
        border-bottom: 1px solid #d1d1d1;

        display: flex;
        flex-direction: column;
        > p {
          display: flex;
          justify-content: space-between;
          margin: 10px 6px;
        }
      }

      .goodsInfoDetails {
        display: flex;
        flex-direction: column;
        > p {
          padding: 10px 6px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
  footer {
    position: fixed;
    display: flex;
    padding: 10px 5%;
    width: 90%;
    justify-content: space-between;
    bottom: 0;
    background-color: #fff;
    border-top: 0.5px solid gray;

    button {
      width: 80px;
      height: 30px;
      border: none;
      border-radius: 15px;
      &:first-of-type {
        background-color: #fff;
        color: #894e22;
        border: 0.5px solid #894e22;
      }
      &:last-of-type {
        background-color: #894e22;
        color: #fff;
      }
    }
  }
  // 密码面板
  #sumbit-content {
    padding: 0 10px;
    border-top: 1px solid #f0f0f0;
    & > p {
      padding: 40px 0;
      width: 100%;
      color: #000;
      text-align: center;
      font-weight: 600;
      font-size: 28px;
    }
    .sumbit-box {
      display: flex;
      justify-content: space-between;
      padding: 18px 0;
      border-bottom: 0.5px solid #d0d0d0;
      p {
        font-size: 16px;
      }
    }
    .sumbit-button {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20px;
      font-size: 16px;
      color: blue;
    }
  }
}
.total-box {
  color: #fd0e0e;
  font-size: 18px;
  font-weight: 600;
}
</style>
