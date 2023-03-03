<template>
  <div class="fillOrderBox">
    <com-head title="填写订单"></com-head>
    <main>
      <!-- 日历组件 -->
      <van-calendar
        v-model="showCalendar"
        @confirm="onConfirm"
        color="#884E22"
      />
      <!-- 时间组件 -->
      <van-popup
        v-model="showTime"
        round
        position="bottom"
        :style="{ height: '50%' }"
        :safe-area-inset-bottom="true"
      >
        <van-picker
          title="时间选择"
          show-toolbar
          :columns="timeColumns"
          @confirm="timeConfirm"
          visible-item-count="7"
          item-height="70px"
          @cancel="showTime = false"
        />
      </van-popup>
      <!-- 配送方式 -->
      <van-popup
        v-model="showMethod"
        round
        position="bottom"
        :style="{ height: '50%' }"
        :safe-area-inset-bottom="true"
      >
        <van-picker
          title="配送方式选择"
          show-toolbar
          :columns="methodColumns"
          @confirm="methodConfirm"
          visible-item-count="7"
          item-height="70px"
          @cancel="showMethod = false"
        />
      </van-popup>
      <!-- 提交订单 -->
      <van-action-sheet
        v-model="showSumbit"
        title="确认付款"
        :style="{ height: '80%' }"
        @close="closeHandle"
      >
        <div id="sumbit-content">
          <p>￥{{ buyShopTotal?.toFixed(2) || total.toFixed(2) }}</p>
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
      <div class="telandarea">
        <div class="receiving" @click="toAddressHandle">
          <p class="receivingLeft">收货信息</p>
          <div class="txtRight">
            <div class="addressBox">
              <p>
                {{
                  chooseAddress &&
                  chooseAddress.name + "  " + chooseAddress.phone
                }}
              </p>
              <p>
                {{
                  chooseAddress &&
                  chooseAddress.area_name +
                    "  " +
                    chooseAddress.desc.slice(0, 10)
                }}
              </p>
            </div>
            &nbsp;&nbsp;
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="delivery" @click="showCalendar = true">
          <p class="deliveryLeft">送达日期</p>
          <div class="txtRight">
            <p>{{ date }}</p>
            &nbsp;&nbsp;
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="time" @click="showTime = true">
          <p class="timeLeft">配送时间</p>
          <div class="txtRight">
            <p>{{ time }}</p>
            &nbsp;&nbsp;
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="dMethod" @click="showMethod = true">
          <p class="dMethodLeft">配送方式</p>
          <div class="txtRight">
            <p>{{ delivery }}</p>
            &nbsp;&nbsp;
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="bordered"></div>
      </div>
      <div class="subscriber" @click="toBill">
        <p class="subscriberLeft">订购人信息</p>
        <div class="subscriberRight">
          <div class="txtRight">
            <p>{{ billData }}</p>
            &nbsp;&nbsp;
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
      </div>
      <div class="richText">
        <div class="textareaWords">
          <div class="greeting">
            <p class="greetingTitle">贺卡留言</p>
            <textarea
              name=""
              id=""
              placeholder="选填 请输入贺卡留言！"
            ></textarea>
          </div>
          <div class="buyer">
            <p class="buyerTitle">买家留言</p>
            <textarea
              class="buyerText"
              name=""
              id=""
              placeholder="选填 请输入买家留言！"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="goodsMsg" v-for="item in selectShopMsg" :key="item.id">
        <div class="goodsMsgLeft">
          <img
            :src="item.s_good.s_goods_photos[0].path"
            :alt="item.s_good[0]?.name"
          />
          <div class="goodsMsgText">
            <p>{{ item.s_good.name }}</p>
            <p>{{ "x " + item.num }}</p>
          </div>
        </div>
        <p class="price">{{ "￥" + item.s_good.sale_price * item.num }}</p>
      </div>
      <div class="payMethods">
        <p class="payTitle">支付方式</p>
        <!-- <div class="wechatBox">
          <div class="payMainLeft">
            <i class="iconfont icon-weixinzhifu2"></i>
            <p>微信</p>
          </div>
          <div class="payMainRight">
            <i class="iconfont icon-zhengque1"></i>
          </div>
        </div> -->
        <div class="alipayBox">
          <div class="payMainLeft">
            <i class="iconfont icon-zhifubaozhifu"></i>
            <p>支付宝</p>
          </div>
          <div class="payMainRight">
            <i class="iconfont icon-zhengque1"></i>
          </div>
        </div>
      </div>
      <div class="billBox" @click="toReceipt">
        <p>发票</p>
        <div class="txtRight">
          <p>选填</p>
          &nbsp;&nbsp;
          <i class="iconfont icon-youjiantou"></i>
        </div>
      </div>
      <div class="priceBox">
        <div class="priceBoxTop">
          <p>共 {{ selectShopMsg.length || 1 }} 件商品</p>
          <p>优惠： -￥{{ buyShopCoupon || discount }}</p>
        </div>
        <div class="priceBoxBtm">
          <p>运费￥ {{ deliveryfee }}</p>
          <p>
            商品总价: <span>￥{{ buyShopTotal || total }}</span>
          </p>
        </div>
      </div>
    </main>
    <footer>
      <div class="footerMain">
        <p class="footerLeft">实付款：￥{{ buyShopTotal || total }}</p>
        <button class="footerRight" @click="sumbitHadnle">提交订单</button>
      </div>
      <div class="footerBox"></div>
    </footer>
    <van-dialog
      show-cancel-button
      title="是否放弃本次付款"
      confirmButtonText="继续支付"
      cancelButtonText="放弃"
      confirmButtonColor="#1378fe"
      v-model="showPayConfirm"
      @confirm="conFHandle"
      @cancel="cancelHandle"
    >
    </van-dialog>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapState } from "vuex";
import { addOrder, orderPay } from "@/api/order";
import { goodsDataApi } from "@/api/goods";
export default {
  name: "FillOrder",
  data() {
    return {
      // 今日时间
      nowDate: null,
      // 支付方式
      checkPayMethods: "1",
      // 是否展示日历组件
      showCalendar: false,
      // 是否展示时间组件
      showTime: false,
      // 是否展示配送方式组件
      showMethod: false,
      // 提交订单
      showSumbit: false,
      // 唤起密码框
      showPsw: false,
      // 时间组件列表
      timeColumns: [
        { text: "不限时段" },
        { id: 10, text: "8:00-10:00" },
        { id: 12, text: "10:00-12:00" },
        { id: 14, text: "12:00-14:00" },
        { id: 16, text: "14:00-16:00" },
        { id: 18, text: "16:00-18:00" },
        { id: 20, text: "18:00-20:00" },
        { id: 22, text: "20:00-22:00" },
        { type: 0, text: "上午" },
        { type: 1, text: "下午" },
        { type: 2, text: "晚上" },
      ],
      // 配送方式组件列表
      methodColumns: ["市区免费配送", "近郊+30.00运费", "近郊+50.00运费"],
      // 密码
      keyWrodValue: "",
      // 密码聚焦
      showKeyboard: true,
      // 直接购买的数据
      goodsList: null,
      // 是否继续支付面板
      showPayConfirm: false,
      id: sessionStorage.getItem("orderId") || null,
    };
  },
  async created() {
    // 没有商品跳转首页
    if (this.$route.query.id) {
      // 是否直接购买
      try {
        const res = await goodsDataApi(this.$route.query.id);
        this.goodsList = res.result;
        this.$set(this.goodsList, "num", Number(this.$route.query.num));
      } catch (err) {
        return err;
      }
    } else if (!this.$store.state.shopCarStore.chooseShopList.length) {
      return this.$router.push("/");
    }
    // 获取默认地址
    this.$store.dispatch("fillOrderStore/getDeaultAddress");
    // 获取今日时间
    const time = new Date();
    // 默认送达时间设置为今天
    const nowTime = `${time.getFullYear()}-${
      time.getMonth() + 1
    }-${time.getDate()}`;
    this.nowDate = nowTime;
    this.$store.commit("fillOrderStore/changeDate", nowTime);
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
          // ! 手动支付订单
          await orderPay({
            id: this.id,
            status: 1,
          });
          Toast({
            message: "支付成功",
            position: "bottom",
          });
          this.$router.back();
          this.showPsw = false;
          this.showSumbit = false;
          this.keyWrodValue = "";
          // 清空购物车
          this.$store.commit("shopCarStore/clearShopCar");
          // 请求购物车
          this.$store.dispatch("shopCarStore/getShopCarList");
        } catch (err) {
          return err;
        }
      }
    },
  },
  computed: {
    // 获取选中商品的信息
    ...mapState("shopCarStore", ["selectShopMsg"]),
    // 收货地址
    ...mapState("fillOrderStore", ["chooseAddress"]),
    // 收货日期
    ...mapState("fillOrderStore", ["date"]),
    // 收货时间
    ...mapState("fillOrderStore", ["time"]),
    // 配送方式
    ...mapState("fillOrderStore", ["delivery"]),
    // 发票信息
    ...mapState("fillOrderStore", ["billData"]),
    // 用户信息
    ...mapState("loginStore", ["userInfo"]),
    // 总价
    total() {
      return this.$store.getters["shopCarStore/getTotal"];
    },
    // 优惠价
    discount() {
      return this.$store.getters["shopCarStore/getDiscount"];
    },
    // 运费
    deliveryfee() {
      return this.$store.getters["fillOrderStore/getDeliveryfee"];
    },
    // 直购商品的总价
    buyShopTotal() {
      return this.goodsList && this.goodsList.sale_price * this.goodsList.num;
    },
    // 直购商品的优惠
    buyShopCoupon() {
      return (
        this.goodsList &&
        this.goodsList.price * this.goodsList.num -
          this.goodsList.sale_price * this.goodsList.num
      );
    },
  },
  destroyed() {
    sessionStorage.removeItem("orderId");
  },
  methods: {
    // 继续支付
    conFHandle() {
      this.showSumbit = true;
    },
    // 放弃支付
    cancelHandle() {
      // 清空选中购物车
      this.$store.commit("shopCarStore/clearShopCar");
      // 更新购物车
      this.$store.dispatch("shopCarStore/getShopCarList");
      this.$router.replace({
        path: "/payorder",
        query: {
          id: this.id,
        },
      });
    },
    // 取消支付
    closeHandle() {
      this.showPayConfirm = true;
    },
    // 跳转填写地址
    toAddressHandle() {
      this.$router.push({
        path: "/address",
        query: {
          order: true,
        },
      });
    },
    // 日历
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    // 修改收货日期
    onConfirm($date) {
      // 关闭面版
      this.showCalendar = false;
      // 修改日期
      const date = this.formatDate($date);
      this.$store.commit("fillOrderStore/changeDate", date);
    },
    // 修改收货时间
    timeConfirm($time) {
      // 关闭面版
      this.showTime = false;
      this.$store.commit("fillOrderStore/changeTime", $time.text);
    },
    // 修改配送方式
    methodConfirm($data) {
      // 关闭面版
      this.showMethod = false;
      this.$store.commit("fillOrderStore/changeDelivery", $data);
    },
    // 跳转订购人页面
    toBill() {
      this.$router.push("/subscriber");
    },
    // 跳转发票页面
    toReceipt() {
      this.$router.push("/receipt");
    },
    // 提交订单
    async sumbitHadnle() {
      // 选中的地址id
      const { id } = this.$store.state.fillOrderStore.chooseAddress;
      // 商品组信息
      const GoodsList = this.selectShopMsg?.map((item) => {
        return {
          id: item.goods_id,
          num: item.num,
        };
      });
      // 购物车id
      const CarList = this.selectShopMsg?.map((item) => item.id);
      try {
        let res = null;
        // 是否直接购买
        if (!this.$route.query.shopcar) {
          res = await addOrder({
            goods_info: [
              {
                id: Number(this.$route.query.id),
                num: Number(this.$route.query.num),
              },
            ],
            addr_id: id,
          });
          // 添加订单成功
          this.showSumbit = true;
          // 存储id
          this.id = res.result.id;
          sessionStorage.setItem("orderId", res.result.id);
        } else {
          res = await addOrder({
            goods_info: GoodsList,
            addr_id: id,
            shoppingCartIds: CarList,
          });
          this.showSumbit = true;
          // 存储id
          this.id = res.result.id;
          sessionStorage.setItem("orderId", res.result.id);
        }
      } catch (err) {
        return err;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// 输入框公用
@mixin ComInput() {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  & > p {
    font-size: 15px;
  }
  .txtRight {
    display: flex;
    & > p {
      align-self: center;
    }
    & > i {
      align-self: center;
      font-size: 11px;
    }
  }
}
.fillOrderBox {
  background-color: #f7f7f7;

  // 内容
  main {
    padding: 10px;
    p {
      font-size: 14px;
      color: #000000;
    }
    .telandarea {
      padding: 10px 10px 0;
      background-color: #fff;
      border-radius: 5px;
      .receiving {
        @include ComInput();
        padding-top: 0;
        .addressBox {
          p {
            font-size: 12px;
            &:last-child {
              margin-top: 5px;
            }
          }
        }
      }
      .delivery {
        @include ComInput();
      }
      .time {
        @include ComInput();
      }
      .dMethod {
        @include ComInput();
      }
      .bordered {
        width: 100%;
        height: 3px;
        background-image: url("@/assets/images/m_orderinfo_bd2.png");
        background-repeat: repeat-x;
        background-size: contain;
      }
    }

    .subscriber {
      @include ComInput();
      @extend .telandarea;
      margin-top: 10px;
      padding: 10px;
    }
    .richText {
      @extend .telandarea;
      margin-top: 10px;
      padding-bottom: 15px;
      p {
        font-size: 15px;
      }
      textarea {
        margin-top: 10px;
        padding: 5px;
        width: 100%;
        min-height: 80px;
        border: 0.5px solid #767676;
        font-size: 12px;
        color: #757575;
        box-sizing: border-box;
      }
      .buyerTitle {
        margin-top: 10px;
      }
    }
    .goodsMsg {
      display: flex;
      margin-top: 10px;
      padding: 25px 10px;
      justify-content: space-between;
      background-color: #fff;
      border-radius: 5px;
      .goodsMsgLeft {
        display: flex;
        img {
          margin-right: 10px;
          width: 65px;
          height: 65px;
        }
        p {
          line-height: 18px;
        }
      }

      & > p {
        align-self: center;
        font-weight: 600;
      }
    }
    .payMethods {
      margin-top: 10px;
      padding: 10px;
      background-color: #fff;
      border-radius: 5px;
      .payTitle {
        margin-bottom: 5px;
      }
      .wechatBox {
        display: flex;
        padding: 7px 0;
        display: flex;
        width: 100%;
        justify-content: space-between;
        .payMainLeft {
          display: flex;
          & > i {
            font-size: 20px;
            color: #5ab418;
            align-self: center;
          }
          & > p {
            margin-left: 10px;
            align-self: center;
          }
        }
        .payMainRight {
          align-self: center;
          & > i {
            font-size: 18px;
            color: #ff734c;
          }
        }
      }
      .alipayBox {
        @extend .wechatBox;
        .payMainLeft {
          & > i {
            color: #0fa5e9;
          }
        }
      }
    }
    .billBox {
      @extend .telandarea;
      @include ComInput();
      margin-top: 10px;
      padding: 10px;
    }

    .priceBox {
      margin-top: 10px;
      padding: 10px;
      border-radius: 5px;
      background-color: #fff;
      .priceBoxTop {
        display: flex;
        justify-content: space-between;
      }
      .priceBoxBtm {
        margin-top: 10px;
        @extend .priceBoxTop;
        span {
          color: #ff2222;
        }
      }
    }
  }

  footer {
    .footerMain {
      position: fixed;
      display: flex;
      justify-content: space-between;
      bottom: 0;
      width: 100%;
      min-height: 50px;
      background-color: #fff;
      .footerLeft {
        display: flex;
        justify-content: center;
        line-height: 50px;
        width: 60%;
        color: #884e22;
      }
      .footerRight {
        width: 40%;
        min-height: 100%;
        border: none;
        background-color: #884f22;
        color: #fff;
        font-size: 14px;
      }
    }

    .footerBox {
      min-height: 50px;
    }
  }
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
</style>
