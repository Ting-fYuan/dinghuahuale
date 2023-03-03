<template>
  <div class="order-details-box">
    <com-head title="订单详情"></com-head>
    <main>
      <div class="address">
        <div class="address-left">
          <i class="iconfont icon-dizhi"></i>
        </div>
        <div class="address-right">
          <p>
            {{ order.s_address?.name }}<span>{{ order.s_address?.phone }}</span>
          </p>
          <p>{{ order.s_address?.area_name + "  " + order.s_address?.desc }}</p>
        </div>
      </div>
      <div class="pay-bg">
        <div class="pay-bg-msg">
          <i class="iconfont icon-success"></i>
          <p>支付已完成</p>
        </div>
      </div>
      <div class="goods-ctn">
        <div class="goods-box" v-for="item in order.goods_info" :key="item.id">
          <div class="goods-left">
            <img :src="item?.s_goods_photos[0].path" :alt="item.goods_name" />
            <p>商品名称</p>
          </div>
          <div class="goods-right">
            <p>￥{{ item.sale_price * item.num }}</p>
            <p>x{{ item.num }}</p>
          </div>
        </div>
        <div class="total">
          <p>商品总价</p>
          <p>￥{{ total }}</p>
        </div>
      </div>
      <div class="order-msg">
        <p>订单信息</p>
        <div class="order-msg-box">
          <p>订单编号</p>
          <p>{{ order.order_id }}</p>
        </div>
        <div class="order-msg-box">
          <p>支付宝交易号</p>
          <p>无</p>
        </div>
        <div class="order-msg-box">
          <p>创建时间</p>
          <p>{{ createdAt }}</p>
        </div>
        <div class="order-msg-box">
          <p>成交时间</p>
          <p>{{ updateAt }}</p>
        </div>
        <button @click="toIndex">回到首页</button>
      </div>
    </main>
    <header>
      <p>已经到底了~</p>
    </header>
  </div>
</template>

<script>
import { getSingleOrder } from "@/api/order";
export default {
  data() {
    return {
      order: {},
    };
  },
  async created() {
    const { id } = this.$route.query;
    try {
      const { result } = await getSingleOrder(id);
      this.order = result;
      if (!this.order) {
        this.$router.replace({
          path: "/",
        });
      }
    } catch (err) {
      return err;
    }
  },
  computed: {
    // 总价
    total() {
      let res = 0;
      this.order.goods_info?.map((item) => {
        res += item.sale_price * item.num;
      });
      return res;
    },
    // 创建时间
    createdAt() {
      const date = this.order.createdAt?.split("T");
      return date && date[0] + " " + date[1]?.slice(0, 8);
    },
    // 成交时间
    updateAt() {
      const date = this.order.updatedAt?.split("T");
      return date && date[0] + " " + date[1]?.slice(0, 8);
    },
  },
  methods: {
    toIndex() {
      this.$router.replace("/index");
    },
  },
};
</script>

<style lang="scss" scoped>
.order-details-box {
  background-color: #e9ecf0;
  height: 100vh;

  main {
    position: relative;
    .address {
      position: absolute;
      display: flex;
      padding: 15px 0;
      align-items: center;
      top: 40px;
      left: 50%;
      width: 90%;
      transform: translateX(-50%);
      background-color: #ffffff;
      border-radius: 20px;
      box-shadow: 1px 1px 1px rgb(0 0 0 / 10%),
        0.53333vw 0.53333vw 0.53333vw 0.53333vw rgb(0 0 0 / 10%);

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
        p {
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
            font-size: 12px;
          }
        }
      }
    }
    .pay-bg {
      width: 100%;
      height: 80px;
      background-color: #52b086;
      .pay-bg-msg {
        display: flex;
        padding: 10px 0 0 15px;
        font-size: 15px;
        font-weight: 600;
        align-items: center;
        color: #fff;

        i {
          margin-right: 5px;
          font-size: 13px;
        }
      }
    }

    .goods-ctn {
      padding: 80px 20px 20px;
      background-color: #fff;
      .goods-box {
        display: flex;
        justify-content: space-between;
        .goods-left {
          display: flex;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            margin-top: 20px;
            margin-left: 15px;
            font-size: 14px;
          }
        }
        .goods-right {
          display: flex;
          align-self: center;
          flex-direction: column;
          p {
            align-self: flex-end;
            line-height: 30px;
            font-size: 12px;
          }
        }
      }
      .total {
        display: flex;
        margin-top: 20px;
        justify-content: space-between;
        p {
          font-size: 14px;
        }
      }
    }
    .order-msg {
      margin-top: 20px;
      padding: 20px;
      padding-bottom: 80px;
      background-color: #fff;
      height: 100%;
      & > p {
        margin-bottom: 15px;
        font-size: 14px;
      }
      .order-msg-box {
        display: flex;
        margin-bottom: 10px;
        justify-content: space-between;
        font-size: 12px;
        color: gray;
      }

      button {
        position: absolute;
        right: 15px;
        bottom: 10px;
        width: 70px;
        height: 25px;
        background-color: #fff;
        color: #884f22;
        border-radius: 20px;
        font-size: 13px;
        border: 0.5px solid #884f22;
      }
    }
  }
  header {
    position: fixed;
    width: 100%;
    bottom: 0;
    right: 0;
    p {
      margin-bottom: 5px;
      color: #000000a9;
      text-align: center;
    }
  }
}
</style>
