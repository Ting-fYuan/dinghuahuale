<template>
  <div class="pay-success-box">
    <com-head title="结算成功"></com-head>
    <main>
      <img src="@/assets/images/order_paysuccess.jpg" alt="结算成功" />
      <p>恭喜您</p>
      <p>本次交易支付成功</p>
      <p>
        订单号：<span>{{ orderId }}</span>
      </p>
      <button class="back" @click="toIndex">返回首页</button>
      <button class="to" @click="toOrderInfo">查看订单详情</button>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: null,
    };
  },
  created() {
    // 订单号
    this.orderId = this.$route.query.order_id;
  },
  methods: {
    toIndex() {
      this.$router.replace("/index");
    },
    toOrderInfo() {
      this.$router.replace({
        path: "/orderdetails",
        query: {
          id: this.$route.query.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pay-success-box {
  height: 100vh;
  background-color: #eae9e5;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      margin-top: 80px;
      width: 165px;
      height: 165px;
    }
    p {
      display: block;
      font-size: 14px;
      line-height: 25px;
      color: #999;

      &:first-of-type {
        margin-top: 20px;
      }
      span {
        color: #d1082a;
        font-size: 13px;
      }
    }

    button {
      margin-bottom: 20px;
      width: 300px;
      height: 40px;
      border-radius: 20px;
      font-size: 14px;
    }

    .to {
      color: #fff;
      border: 0.5px solid #fff;
      background-color: #894e22;
    }
    .back {
      margin-top: 100px;
      color: #894e22;
      background-color: #fff;
      border: 0.5px solid #894e22;
    }
  }
}
</style>
