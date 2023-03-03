<template>
  <div class="subscriberBox">
    <com-head title="订购人信息"></com-head>
    <main>
      <div class="userName">
        <p>订购人姓名</p>
        <input
          v-model="name"
          type="text"
          placeholder="订购人姓名"
          maxlength="6"
        />
      </div>
      <div class="userTel">
        <p>订购人手机</p>
        <input
          v-model="tel"
          type="text"
          placeholder="订购人手机"
          maxlength="11"
          @blur="verifyPhone"
        />
        <span class="hint"></span>
      </div>
      <div class="message">
        <i class="iconfont icon-hua"></i>
        <p>请填写您本人的手机号，非收货人手机，以便及时接收订单状态提醒信息</p>
      </div>
      <button @click="sumbit">确定</button>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      tel: "",
    };
  },
  computed: {
    msg() {
      return this.$store.state.fillOrderStore.billData;
    },
  },
  created() {
    if (this.msg && this.msg != "请填写") {
      const res = this.msg.split("，");
      this.name = res[0];
      this.tel = res[1];
    }
  },
  methods: {
    // 封装检测手机号
    verifyPhone() {
      const nextSpan = document.querySelector(".userTel>.hint");
      // 正则
      const phoneReg =
        /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
      if (!phoneReg.test(this.tel)) {
        nextSpan.innerText = "输入不合法,请输入正确的手机号码";
        return false;
      }
      // 合法清空span
      nextSpan.innerText = "";
      return true;
    },
    // 提交
    sumbit() {
      if (JSON.parse(JSON.stringify(this.name)) && this.verifyPhone()) {
        this.$store.commit(
          "fillOrderStore/changeBillData",
          this.name + "，" + this.tel
        );
        this.$router.back();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.subscriberBox {
  background-color: #f7f7f7;
  main {
    padding: 30px 20px;
    background-color: #fff;
    p {
      font-size: 14px;
      color: #000;
    }
    .userName {
      margin-bottom: 20px;
      border-bottom: 2px solid #f7f9fa;
      input {
        padding: 15px 0;
        width: 100%;
        border: none;
        font-size: 12px;
      }
    }
    .userTel {
      @extend .userName;
      .hint {
        color: red;
        font-size: 12px;
      }
    }
    .message {
      display: flex;
      padding: 15px;
      align-items: center;
      background-color: #fff0ec;
      border-radius: 5px;
      i {
        margin-right: 15px;
        font-size: 15px;
        color: #ff734d;
      }
      p {
        font-size: 12.5px;
        line-height: 15px;
      }
    }
    button {
      display: block;
      margin: 40px auto;
      width: 240px;
      height: 40px;
      border-radius: 20px;
      border: none;
      background-color: #894e22;
      color: #fff;
    }
  }
}
</style>
