<template>
  <div class="receiptBox">
    <com-head title="发票"></com-head>
    <main>
      <div class="type">
        <div class="txt">发票类型：</div>
        <div class="right">单位</div>
      </div>
      <div class="type">
        <div class="txt">发票抬头：</div>
        <input type="text" placeholder="发票抬头" />
      </div>
      <div class="type">
        <div class="txt">纳税人识别号：</div>
        <input type="text" placeholder="纳税人识别号" />
      </div>
      <div class="type">
        <div class="txt">电子邮箱：</div>
        <input type="text" placeholder="用于接收电子发票的电子邮箱" />
      </div>
      <div class="type">
        <div class="txt">手机号码：</div>
        <input type="text" placeholder="用于接收电子发票的手机号码" />
      </div>
      <p class="message">
        电子发票将于1-7个工作日内开具，并发送到电子邮箱。
        发票类型为普通发票，发票内容为服务费，如有其他开票要求，请联系客服。
      </p>
      <button @click="backHandle">确定</button>
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    backHandle() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.receiptBox {
  .right {
    padding: 6px 15px;
    border: 1px solid #ff734c;
    font-size: 12px;
    align-self: cetner;
  }
  height: 100vh;
  background-color: #f7f7f7;
  main {
    padding: 15px;
    background-color: #fff;
    .type {
      display: flex;
      padding: 15px 0;
      font-size: 14px;
      .txt {
        align-self: center;
      }

      input {
        width: 66%;
        border: none;
      }
    }
    .message {
      margin-top: 15px;
      color: #71797f;
      font-size: 12px;
      line-height: 18px;
    }
    button {
      display: block;
      margin: 40px auto 0;
      width: 220px;
      height: 40px;
      border: none;
      background-color: #884e22;
      color: #fff;
      border-radius: 20px;
      font-size: 14px;
    }
  }
}
</style>
