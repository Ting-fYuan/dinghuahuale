<!-- 商品详情 -->
<template>
  <div class="detail">
    <!-- 详情页导航栏 -->
    <com-head showMid="true" menu="true">
      <template slot="header-center">
        <img
          class="nav-img"
          src="http://www.dinghuale.com/public/images/logo.png"
          alt="logo"
        />
      </template>
    </com-head>
    <!-- 详情页轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" touchable>
      <van-swipe-item v-for="(item, index) in swipeArrs" :key="index"
        ><img v-lazy="item.path"
      /></van-swipe-item>
    </van-swipe>
    <div class="moneyhead">
      <div class="moneyheadr">
        <div class="moneytop">
          <h3>{{ resarr.name }}</h3>
        </div>
        <div class="moneybottom">
          <div class="leftmoney">
            <p>&yen;{{ resarr.sale_price }}</p>
            <p>&yen;{{ resarr.price }}</p>
          </div>
          <div class="rightmoney">
            <p>已售{{ resarr.sold_num >= 1000 ? "999+" : resarr.sold_num }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 富文本上部分数据 -->
    <div class="conston">
      <div class="constop">
        <p v-html="consonptop"></p>
      </div>
      <!-- 数量 -->
      <div class="cutbut">
        <div class="cutauto">
          <p>数量</p>
          <van-stepper v-model="value" max="10" />
          <p>
            库存&nbsp;{{
              resarr.stock_num <= 0
                ? 0
                : resarr.stock_num || resarr.stock_num >= 1000
                ? "999+"
                : resarr.stock_num
            }}
          </p>
        </div>
      </div>
      <!-- 订单评价 -->
      <div class="appraisal">
        <div class="appraisalBox">
          <div class="appraisalhead">
            <p>订单评价</p>
            <p v-if="resarr.sold_num != 0">
              最近已有<span>{{
                resarr.sold_num < commentNum ? resarr.sold_num : commentNum
              }}</span
              >评论
            </p>
            <p v-else>该商品暂无评价~</p>
          </div>
          <div
            class="appraisalmain"
            v-for="(item, index) in commentArr.slice(0, 2)"
            :key="index"
          >
            <div class="appraisTop">
              <img src="../assets/images/morenTou.png.webp" alt="图片" />
              <p>1{{ item.phoneNumFront }}****{{ item.phoneNumBehind }}</p>
              <img src="../assets/images/WechatIMG264 1.webp" alt="图片" />
            </div>
            <div class="appraisBottom">
              <p>{{ item.comment }}</p>
              <img :src="item.commentImgs[index]" alt="图片" />
            </div>
          </div>
          <div class="appraibtn" v-if="resarr.sold_num != 0">
            <button @click="goComments()">查看更多评价</button>
          </div>
        </div>
      </div>
      <div class="consbottom">
        <span>产品详情</span>
        <p v-html="consonbottom"></p>
      </div>
    </div>
    <!-- 购买按钮 -->
    <footer>
      <div class="footer">
        <van-goods-action>
          <van-goods-action-icon
            icon="wap-home-o"
            text="首页"
            @click="toIndex"
          />
          <van-goods-action-icon
            icon="cart-o"
            text="购物车"
            @click="toShopCar"
            :badge="carListNum.length ? carListNum.length : ''"
          />
          <van-goods-action-button
            type="warning"
            text="加入购物车"
            @click="shopCarHandle"
            color="#3d4d42"
          />
          <van-goods-action-button
            type="danger"
            text="立即购买"
            color="#ff734c"
            @click="orderHandle"
          />
        </van-goods-action>
      </div>
    </footer>
  </div>
</template>

<script>
// import { detailSwipe } from "@/api/swiper";
import { consondend } from "@/api/detail";
import { generateComment } from "@/utils/comment";
import { addShopCar } from "@/api/shopCar";
import { Toast } from "vant";
// import { addOrder } from "@/api/order";
import { defaultAddressApi } from "@/api/address";
export default {
  name: "DetailView",
  data() {
    return {
      // 详情轮播图数据
      swipeArrs: [],
      conspush: "",
      // 后台副文本上半部分数据
      consonptop: "",
      // 后台副文本下半部分数据
      consonbottom: "",
      // 数量
      value: 1,
      shopsId: "",
      // 评论数量
      commentNum: "",
      // 评论数组
      commentArr: [],
      resarr: "",
      // 销售数量
      sold_num: "",
    };
  },
  async created() {
    // 获取商品id
    this.shopsId = this.$route.query.id;
    if (this.token) {
      // 获取购物车列表
      this.$store.dispatch("shopCarStore/getShopCarList");
    }
    let res = await consondend(this.shopsId);
    this.resarr = res.result;
    // 轮播图取消第一个数据
    this.swipeArrs = res.result.s_goods_photos.splice(0, 1);
    // 轮播图数据
    this.swipeArrs = res.result.s_goods_photos;
    this.consale_price = res.result.sale_price;
    this.conspush = res.result.rich_text;
    // 分隔后台数据
    if (this.conspush) {
      this.consonptop = this.conspush.split("<blockquote><br></blockquote>")[0];
      this.consonbottom = this.conspush.split(
        "<blockquote><br></blockquote>"
      )[1];
    }
    // 生成随机评论数
    this.commentNum = Math.floor(Math.random() * 10 + 3);

    if (this.resarr.sold_num < this.commentNum) {
      localStorage.setItem("commentNum", this.resarr.sold_num);
    } else {
      localStorage.setItem("commentNum", this.commentNum);
    }
    // 评论生成
    if (this.resarr.sold_num > 0) {
      if (this.commentNum > this.resarr.sold_num) {
        for (let i = 0; i < this.resarr.sold_num; i++) {
          this.commentArr.push(generateComment());
        }
      } else {
        for (let i = 0; i < this.commentNum; i++) {
          // console.log(generateComment());
          this.commentArr.push(generateComment());
        }
      }
    }
  },
  computed: {
    // 购物车数量
    carListNum() {
      return this.$store.state.shopCarStore.shopCarList;
    },
    // 登录状态
    token() {
      return this.$store.state.loginStore.token;
    },
  },
  methods: {
    // 后退按钮
    lefticonfn() {
      this.$router.back(1);
    },
    // 跳转首页
    toIndex() {
      this.$router.push("/index");
    },
    // 跳转购物车
    toShopCar() {
      this.$router.push("/shop");
    },
    // 封装鉴权
    authHandle() {
      if (!this.token) {
        this.$router.push("/login");
        Toast({
          message: "请先登录",
          position: "bottom",
        });
        return false;
      } else return true;
    },
    // 添加购物车
    async shopCarHandle() {
      // 鉴权
      if (!this.authHandle()) return;
      try {
        // ! 库存bug 小于负数不添加购物车
        if (this.resarr.stock_num > 0 && this.value <= this.resarr.stock_num) {
          // 请求
          const res = await addShopCar({
            goods_id: this.shopsId,
            num: this.value,
          });
          if (res) {
            const res = await this.$store.dispatch(
              "shopCarStore/getShopCarList"
            );
            if (res == "商品已在购物车中，数量已更新") {
              Toast.success("数量已更新");
            } else {
              Toast.success("添加成功");
            }
          }
        } else {
          Toast({
            message: "商品库存不足",
            position: "bottom",
          });
        }
      } catch (err) {
        return err;
      }

      this.value;
    },
    // 添加订单
    async orderHandle() {
      // ! 库存bug 小于负数不添加购物车
      if (this.resarr.stock_num <= 0 && this.value >= this.resarr.stock_num) {
        Toast({
          message: "商品库存不足",
          position: "bottom",
        });
        return false;
      }
      try {
        // 鉴权
        if (!this.authHandle()) return;
        await defaultAddressApi();
        await this.$router.push({
          path: "fillOrder",
          query: {
            id: this.shopsId,
            num: this.value,
          },
        });
      } catch (err) {
        // 是否有默认地址
        if (err.response.data.msg === "找不到该地址信息") {
          Toast({
            message: "请先添加默认地址",
            position: "bottom",
          });
          // 没有默认地址跳转地址页面
          this.$router.push({
            path: "/addressEdit",
            // 完整路径
            query: { redirect: this.$route.fullPath },
          });
        }
      }
    },
    // 打开评论页面
    goComments() {
      this.$router.push("/comments");
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  height: 100%;
  background-color: #e9ecf0;
  // 头部导航栏
  .nav-img {
    height: 31px;
  }
  // 轮播图
  .my-swipe {
    width: 375px;
    height: 375px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .moneyhead {
    width: 375px;
    height: 95px;
    position: relative;
    background-color: #fff;
    border-bottom: 0.5px solid #c7c5c5;
    .moneyheadr {
      position: absolute;
      width: 345px;
      height: 64px;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;

      .moneytop {
        height: 21px;

        h3 {
          height: 21px;
          opacity: 1;
          color: rgba(85, 85, 85, 1);
          font-size: 15px;
          font-weight: 400;
          font-family: "PingFang SC";
          text-align: left;
        }
      }
      .moneybottom {
        width: 345px;
        height: 43px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .leftmoney {
          width: 103px;
          height: 28px;
          display: flex;
          justify-content: space-between;
          p {
            &:nth-of-type(1) {
              opacity: 1;
              color: rgba(255, 115, 76, 1);
              font-weight: 700;
              text-align: left;
              font-size: 20px;
              font-family: "Tahoma";
            }
            &:nth-of-type(2) {
              opacity: 1;
              color: rgba(180, 186, 191, 1);
              font-weight: 400;
              text-align: left;
              font-size: 14px;
              font-family: "PingFang SC";
              padding-top: 5px;
              text-decoration: line-through;
            }
          }
        }
        .rightmoney {
          p {
            width: 69px;
            height: 17px;
            opacity: 1;
            color: rgba(85, 85, 85, 1);
            font-size: 12px;
            font-weight: 400;
            font-family: "PingFang SC";
            text-align: left;
          }
        }
      }
    }
  }
  .constop {
    padding-bottom: 10px;
    width: 375px;
    height: 173px;
    border-top: 0.5px solid #e9ecf0;
    background-color: #fff;
    p {
      display: block;
      margin: 0 auto;
      padding: 15px;
      font-size: 15px;
      color: #555555;
      line-height: 41px;
      border-bottom: 0.5px solid red;
    }
  }
  .cutbut {
    margin: 10px 0;
    width: 375px;
    height: 62px;
    opacity: 1;
    position: relative;
    background: #ffffff;
    .cutauto {
      position: absolute;
      width: 345px;
      height: 52px;
      opacity: 1;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      p {
        width: 28px;
        height: 30px;
        opacity: 1;
        color: #555555;
        font-size: 14px;
        font-weight: 400;
        font-family: "PingFang SC";
        text-align: left;
        line-height: 30px;
        &:nth-of-type(2) {
          width: 70px;
          height: 30px;
          font-size: 13px;
          color: #555555;
        }
      }
      .van-stepper {
        width: 200px;
        height: 32px;
      }
    }
  }
  .appraisal {
    width: 375px;
    background-color: #fff;
    .appraisalBox {
      margin-bottom: 10px;
      padding: 0px 15px 30px;
      width: 345px;
      .appraisalhead {
        display: flex;
        padding: 15px 0;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e9ecf0;
        p {
          &:nth-of-type(1) {
            width: 64px;
            height: 22px;
            opacity: 1;
            color: #555555;
            font-size: 16px;
            font-weight: 400;
          }
          &:nth-of-type(2) {
            width: 111px;
            height: 17px;
            opacity: 1;
            color: #333333;
            font-size: 12px;
            font-weight: 400;
          }
        }
        span {
          color: #f60;
        }
      }
      .appraisalmain {
        padding-top: 20px;
        padding-bottom: 10px;
        .appraisTop {
          padding-top: 5px;
          display: flex;
          position: relative;
          flex-direction: row;
          align-items: center;
          img {
            width: 20px;
            height: 20px;
            &:nth-of-type(2) {
              position: absolute;
              right: 0;
              width: 14px;
              height: 14px;
              opacity: 1;
            }
          }
          p {
            width: 85px;
            height: 17px;
            opacity: 1;
            padding-left: 10px;
            color: #555555;
            font-size: 14px;
            font-weight: 400;
            font-family: "Tahoma";
          }
        }
        .appraisBottom {
          p {
            line-height: 25px;
            padding-top: 10px;
            font-size: 14px;
          }
          img {
            padding-top: 20px;
            width: 55px;
          }
        }
      }
      .appraibtn {
        width: 84px;
        height: 29px;
        border: 1px solid #232628;
        margin: 0 auto;
        text-align: center;

        button {
          height: 29px;
          opacity: 1;
          color: #232628;
          font-size: 12px;
          font-weight: 400;
          background-color: #fff;
          border: none;
        }
      }
    }
  }
  .consbottom {
    margin-bottom: 30px;
    padding: 20px 10px 70px;
    height: 100%;
    background-color: #fff;
    span {
      width: 66px;
      height: 23px;
      opacity: 1;
      color: #555555;
      font-size: 16.5px;
      font-weight: 400;
      font-family: "PingFang SC";
      display: block;
      width: 100%;
    }
  }
}
::v-deep img {
  width: 100%;
}
</style>
