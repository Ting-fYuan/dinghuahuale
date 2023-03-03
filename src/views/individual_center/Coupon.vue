<template>
  <div class="coupon">
    <com-head title="优惠券"></com-head>
    <div class="couponContent">
      <div class="noCoupon">
        <img src="@/assets/images/coupon.png" class="couponImg" alt="优惠券" />
        <span class="notextTop">暂无优惠券</span>
        <span class="notextBotoom">据说下单后有机会获得大额劵喔~</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CouponView",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.coupon {
  width: 100%;
  height: 100vh;
  background: #eaebef;
  .couponHead {
    width: 375px;
    height: 51px;
    opacity: 1;
    border-bottom: 1px solid rgba(243, 245, 247, 1);
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: flex-start; /* 左对齐 */
    .arrowLeft {
      line-height: 51px;
      font-size: 26px;
    }
    span {
      width: 80px;
      height: 51px;
      opacity: 1;
      color: rgba(85, 85, 85, 1);
      font-size: 13px;
      font-weight: 500;
      line-height: 51px;
      margin-left: auto; /* 居中对齐的样式 */
      margin-right: auto;
    }
  }
  .couponContent {
    width: 100%;
    .noCoupon {
      margin: 20px auto 0;
      display: flex;
      flex-direction: column;
      justify-content: center; /*水平居中*/
      align-items: center; /*垂直居中*/
      .couponImg {
        margin-bottom: 10px;
        width: 50%;
      }
      .notextTop {
        margin-bottom: 5px;
        color: #555555;
        font-size: 14px;
        font-weight: 600;
      }
      .notextBotoom {
        margin-top: 5px;
        color: #555555;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
}
</style>
