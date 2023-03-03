<!-- 首页 -->
<template>
  <div class="box">
    <div class="top">
      <i class="iconfont icon-icon_sousuo" @click="toSearch"></i>
      <img src="../assets/images/logo.png" alt="" />
    </div>
    <van-swipe :autoplay="3000" class="swiper" indicator-color="#884E22">
      <van-swipe-item
        v-for="(image, index) in images"
        :key="index"
        @click="toswipe(index)"
      >
        <div class="back" :style="`background-image:url(${image});`"></div>
        <!-- <img v-lazy="image" style="width: 100%" /> -->
      </van-swipe-item>
    </van-swipe>

    <div class="classflies">
      <!-- 文字连接 -->
      <div class="classfiles_top">
        <!-- <van-skeleton title avatar :row="1" :loading="loading" row-width="70%"> -->

        <ul @click="loveMore">
          <li><i class="iconfont icon-a-ziyuan642"></i>品牌鲜花网</li>
          <li><i class="iconfont icon-a-ziyuan642"></i>实拍秀</li>
          <li><i class="iconfont icon-a-ziyuan642"></i>1小时送达</li>
          <li><i class="iconfont icon-a-ziyuan642"></i>50w+好评</li>
        </ul>
        <!-- </van-skeleton> -->
      </div>
      <div class="classfiles_bottom">
        <!-- 五个圆形图片连接 -->
        <ul>
          <li @click="toPosy">
            <div><img src="../assets/images/mIndex1.png.webp" alt="" /></div>
            花束
          </li>
          <li @click="toGiftbox">
            <div><img src="../assets/images/mIndex2.png.webp" alt="" /></div>
            礼盒
          </li>
          <li @click="toCake">
            <div><img src="../assets/images/mIndex3.png.webp" alt="" /></div>
            蛋糕
          </li>
          <li @click="toBasketflower">
            <div><img src="../assets/images/mIndex4.png.webp" alt="" /></div>
            花篮
          </li>
          <li @click="toGreenflower">
            <div><img src="../assets/images/mIndex5.png.webp" alt="" /></div>
            绿植
          </li>
        </ul>
      </div>
    </div>

    <div class="chooseflower">
      <div class="chooseflower_top">一秒选花</div>
      <div class="chooseflower_center">
        <div
          class="choose_box"
          v-for="(item, index) in yimiaoxuanhua"
          :key="index"
          @click="yimiaoxuanhuaTo(item)"
        >
          <img
            :src="`${img.path}`"
            v-for="img in item.s_goods_photos"
            :key="img.id"
            alt=""
            v-lazy="img.path"
          />
          <div class="choose_box_bottom">{{ item.name }}</div>
        </div>
      </div>

      <div class="chooseflower_bottom">
        <div
          v-for="(item, index) in yimiaoxuanhua2"
          :key="index"
          @click="yimiaoxuanhuaTo2(item)"
        >
          {{ item.name }}
          <img
            :src="`${img.path}`"
            v-for="img in item.s_goods_photos"
            :key="img.id"
            alt=""
            v-lazy="img.path"
          />
        </div>
      </div>
    </div>

    <main>
      <div class="main_title">{{ love.name }}</div>
      <div class="xian"></div>
      <div class="main_box">
        <div
          class="goods"
          @click="toShop(item, index)"
          v-for="(item, index) in love.s_goods"
          :key="index"
        >
          <img
            :src="item.s_goods_photos[0].path"
            alt=""
            v-lazy="item.s_goods_photos[0].path"
          />

          <div class="goods_name">{{ item.name }}</div>
          <div class="goods_price">
            <span class="price">￥{{ item.sale_price }}</span>
            <span class="number"
              >销量{{ item.sold_num > 1000 ? "999+" : item.sold_num }}</span
            >
          </div>
        </div>
      </div>
      <div class="btn" @click="loveMore">查看更多</div>

      <div class="main_title">{{ friendly.name }}</div>
      <div class="xian"></div>
      <div class="main_box">
        <div
          class="goods"
          @click="toShop(item, index)"
          v-for="(item, index) in friendly.s_goods"
          :key="index"
        >
          <img
            :src="item.s_goods_photos[0].path"
            alt=""
            v-lazy="item.s_goods_photos[0].path"
          />
          <div class="goods_name">{{ item.name }}</div>
          <div class="goods_price">
            <span class="price">￥{{ item.sale_price }}</span>
            <span class="number"
              >销量{{ item.sold_num > 1000 ? "999+" : item.sold_num }}</span
            >
          </div>
        </div>
      </div>
      <div class="btn" @click="friendlyMore">查看更多</div>

      <div class="main_title">鲜花{{ flowerBox.name }}</div>
      <div class="xian"></div>
      <div class="main_box">
        <div
          class="goods"
          @click="toShop(item, index)"
          v-for="(item, index) in flowerBox.s_goods"
          :key="index"
        >
          <img
            :src="item.s_goods_photos[0].path"
            alt=""
            v-lazy="item.s_goods_photos[0].path"
          />
          <div class="goods_name">{{ item.name }}</div>
          <div class="goods_price">
            <span class="price">￥{{ item.sale_price }}</span>
            <span class="number"
              >销量{{ item.sold_num > 1000 ? "999+" : item.sold_num }}</span
            >
          </div>
        </div>
      </div>
      <div class="btn" @click="flowerBoxMore">查看更多</div>

      <div class="main_title">{{ cake.name }}</div>
      <div class="xian"></div>
      <div class="main_box">
        <div
          class="goods"
          @click="toShop(item, index)"
          v-for="(item, index) in cake.s_goods"
          :key="index"
        >
          <img
            :src="item.s_goods_photos[0].path"
            alt=""
            v-lazy="item.s_goods_photos[0].path"
          />
          <div class="goods_name">{{ item.name }}</div>
          <div class="goods_price">
            <span class="price">￥{{ item.sale_price }}</span>
            <span class="number"
              >销量{{ item.sold_num > 1000 ? "999+" : item.sold_num }}</span
            >
          </div>
        </div>
      </div>
      <div class="btn" @click="cakeMore">查看更多</div>

      <div class="main_title">{{ startBusinsse.name }}</div>
      <div class="xian"></div>
      <div class="main_box">
        <div
          class="goods"
          @click="toShop(item, index)"
          v-for="(item, index) in startBusinsse.s_goods"
          :key="index"
        >
          <img
            :src="item.s_goods_photos[0].path"
            alt=""
            v-lazy="item.s_goods_photos[0].path"
          />
          <div class="goods_name">{{ item.name }}</div>
          <div class="goods_price">
            <span class="price">￥{{ item.sale_price }}</span>
            <span class="number"
              >销量{{ item.sold_num > 1000 ? "999+" : item.sold_num }}</span
            >
          </div>
        </div>
      </div>
      <div class="btn" @click="businsseMore">查看更多</div>

      <div class="main_title">{{ greenFlower.name }}</div>
      <div class="xian"></div>
      <div class="main_box">
        <div
          class="goods"
          @click="toShop(item, index)"
          v-for="(item, index) in greenFlower.s_goods"
          :key="index"
        >
          <img
            :src="item.s_goods_photos[0].path"
            alt=""
            v-lazy="item.s_goods_photos[0].path"
          />
          <div class="goods_name">{{ item.name }}</div>
          <div class="goods_price">
            <span class="price">￥{{ item.sale_price }}</span>
            <span class="number"
              >销量{{ item.sold_num > 1000 ? "999+" : item.sold_num }}</span
            >
          </div>
        </div>
      </div>
      <div class="btn" @click="greenMore">查看更多</div>
    </main>

    <footer>
      <div class="footer_text1">Copyright©2020 成都勿忘我科技有限公司</div>
      <div class="footer_text2">蜀ICP备20016463号-2</div>
    </footer>
    <div>
      <TabBar />
    </div>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar.vue";
import Vue from "vue";
import { Lazyload } from "vant";
import { detailSwipe } from "@/api/swiper/index.js";
import { indexImg } from "@/api/indexImg/index.js";
Vue.use(Lazyload);

export default {
  name: "IndexView",
  components: { TabBar },

  created() {
    if (this.images.length == 0) {
      //获取轮播图数据
      detailSwipe({
        site_id: 365,
        // project_id: 295,
      })
        .then((res) => {
          res.result.forEach((item) => {
            this.images.push(item.s_photos[0].path);
          });
        })
        .catch((err) => {
          console.log(err);
        });

      //获取首页一秒选花数据
      indexImg({})
        .then((res) => {
          // console.log(res.result[0].children[0]);
          //获取一秒选花上三宗
          let arr = res.result[4].children[0].s_goods;
          this.yimiaoxuanhua = arr;
          //获取一秒选花下五宗
          let arr2 = res.result[4].children[1].s_goods;
          this.yimiaoxuanhua2 = arr2;
          this.loading = false;
          //获取爱情鲜花
          console.log(res.result[0].children[0]);
          this.love = res.result[0].children[0];
          //获取友情鲜花
          this.friendly = res.result[0].children[2];
          //获取鲜花礼盒
          this.flowerBox = res.result[2].children[1];
          //获取蛋糕
          this.cake = res.result[2].children[2];
          //获取开业花篮
          this.startBusinsse = res.result[2].children[3];
          //获取绿植
          this.greenFlower = res.result[2].children[4];
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  data() {
    return {
      images: [],
      yimiaoxuanhua: [],
      yimiaoxuanhua2: [],
      love: [],
      friendly: [],
      flowerBox: [],
      cake: [],
      startBusinsse: [],
      greenFlower: [],
      loading: true,
    };
  },
  // mounted() {
  //   this.loading = false;
  // },
  methods: {
    //去详情页
    toShop(item) {
      // console.log(item.id);
      this.$router.push({ path: "/detail", query: { id: item.id } });
    },
    //去搜索页
    toSearch() {
      this.$router.push("/search");
    },
    //去花束页面
    toPosy() {
      this.$router.push({
        path: "/classification",
        query: { id: 2619, name: "花束" },
      });
    },
    //去礼盒页面
    toGiftbox() {
      this.$router.push({
        path: "/classification",
        query: { id: 2620, name: "礼盒" },
      });
    },
    //去蛋糕页面
    toCake() {
      this.$router.push({
        path: "/classification",
        query: { id: 2621, name: "蛋糕" },
      });
    },
    //去花篮页面
    toBasketflower() {
      this.$router.push({
        path: "/classification",
        query: { id: 2622, name: "花篮" },
      });
    },
    //去绿植页面
    toGreenflower() {
      this.$router.push({
        path: "/classification",
        query: { id: 2623, name: "绿植" },
      });
    },
    //一秒选花页面点击跳转页面
    yimiaoxuanhuaTo(item) {
      if (item.id == 5111) {
        this.loveMore();
      } else if (item.id == 5112) {
        this.$router.push({
          path: "/classification",
          query: { id: 2607, name: "给长辈送花_问候长辈" },
        });
      } else if (item.id == 5113) {
        this.friendlyMore();
      }
    },
    yimiaoxuanhuaTo2(item) {
      console.log(item.id);
      if (item.id == 5114) {
        this.$router.push({
          path: "/classification",
          query: { id: 2603, name: "生日鲜花_过生日送花" },
        });
      } else if (item.id == 5115) {
        this.$router.push({
          path: "/classification",
          query: { id: 2602, name: "爱情鲜花_送未来老婆" },
        });
      } else if (item.id == 5116) {
        this.$router.push({
          path: "/classification",
          query: { id: 2622, name: "花篮_开业花篮" },
        });
      } else if (item.id == 5117) {
        this.$router.push({
          path: "/classification",
          query: { id: 2623, name: "绿植_开业绿植_办公室" },
        });
      }
    },
    //爱情更多
    loveMore() {
      this.$router.push({
        path: "/classification",
        query: { id: 2602, name: "爱情鲜花_送女同学" },
      });
    },
    //友情更多
    friendlyMore() {
      this.$router.push({
        path: "/classification",
        query: { id: 2606, name: "友情鲜花_送给朋友的鲜花" },
      });
    },
    //鲜花礼盒更多
    flowerBoxMore() {
      this.$router.push({
        path: "/classification",
        query: { id: 2620, name: "鲜花礼盒_心型礼盒" },
      });
    },
    //蛋糕更多
    cakeMore() {
      this.$router.push({
        path: "/classification",
        query: { id: 2621, name: "蛋糕店_订蛋糕" },
      });
    },
    //开业花篮更多
    businsseMore() {
      this.$router.push({
        path: "/classification",
        query: { id: 2622, name: "花篮_开业花篮" },
      });
    },
    //绿植更多
    greenMore() {
      this.$router.push({
        path: "/classification",
        query: { id: 2623, name: "绿植_开业绿植_办公室" },
      });
    },
    //点击轮播图
    toswipe(index) {
      console.log(index);
      if (index == 0) {
        this.$router.push({
          path: "/classification",
          query: { id: 2621, name: "蛋糕店_订蛋糕" },
        });
      } else if (index == 1) {
        this.$router.push({
          path: "/classification",
          query: { id: 2603, name: "给生日鲜花_生日鲜花" },
        });
      } else if (index == 2) {
        this.$router.push({
          path: "/classification",
          query: { id: 2602, name: "送女神_表白鲜花" },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.box {
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  .top {
    height: 50px;
    background-color: white;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 0;

    img {
      width: 80px;
      height: 31px;
    }

    i {
      font-size: 30px;
      font-weight: 600;
      position: absolute;
      left: 10px;
    }
  }
  .swiper {
    width: 100%;
    height: 205px;
    .back {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .classflies {
    width: 100%;
    height: 118px;
    background-color: white;
    .classfiles_top {
      width: 100%;
      height: 33px;
      ul {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        li {
          font-size: 13px;
          i {
            font-size: 14px;
            margin-right: 4px;
          }
        }
      }
    }
    .classfiles_bottom {
      width: 100%;
      height: 85px;
      ul {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        li {
          width: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          font-size: 14px;
          div {
            width: 40px;
            height: 40px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }

  .chooseflower {
    width: 100%;
    height: 297px;
    background-color: white;
    margin-top: 8px;
    padding: 10px 10px 0 10px;
    box-sizing: border-box;
    .chooseflower_top {
      width: 100%;
      height: 15px;
      border-left: 1px solid #884e22;
      font-size: 15px;
      font-weight: 600;
      color: #884e22;
      line-height: 15px;
      padding-left: 10px;
    }
    .chooseflower_center {
      width: 100%;
      height: 126px;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      .choose_box {
        width: 111px;
        height: 126px;
        border-radius: 10px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
        &:nth-of-type(1) .choose_box_bottom {
          background-color: pink;
        }
        &:nth-of-type(2) .choose_box_bottom {
          background-color: green;
        }
        &:nth-of-type(3) .choose_box_bottom {
          background-color: orange;
        }
        .choose_box_bottom {
          width: 100%;
          height: 40px;
          border-radius: 0 0px 10px 10px;
          position: absolute;
          bottom: 0;
          text-align: center;
          line-height: 40px;
          font-size: 15px;
          font-weight: 600;
          color: white;
        }
      }
    }
    .chooseflower_bottom {
      width: 100%;
      height: 106px;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 85px;
        height: 106px;
        border-radius: 5px;
        background: rgba(243, 235, 227, 1);
        font-size: 14px;
        font-weight: 600;
        color: #884e22;
        img {
          width: 70%;
        }
      }
    }
  }
  main {
    width: 100%;
    height: 100%;
    margin-top: 8px;
    background-color: white;
    box-sizing: border-box;
    padding: 29px 15px 5px 15px;
    .main_title {
      width: 100%;
      text-align: center;
      font-size: 15px;
      font-weight: 600;
    }
    .xian {
      width: 80px;
      height: 4px;
      border-radius: 10px;
      background-color: #884e22;
      margin: 0 auto;
      margin-top: 5px;
    }
    .main_box {
      width: 100%;
      height: 100%;
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .goods {
        width: 165px;
        height: 215px;
        margin-bottom: 15px;
        img {
          width: 100%;
          height: 165px;
        }
        .goods_name {
          width: 100%;
          height: 20px;
          color: rgba(102, 102, 102, 1);
          font-size: 14px;
          font-weight: 400;
          text-align: left;
          line-height: 20px;
          margin-top: 5px;
        }
        .goods_price {
          width: 100%;
          height: 20px;
          margin-top: 5px;
          line-height: 20px;
          display: flex;
          justify-content: space-between;
          .price {
            height: 20px;
            color: red;
            font-size: 14px;
            font-weight: 600;
            text-align: left;
          }
          .number {
            height: 17px;
            color: rgba(153, 153, 153, 1);
            font-size: 12px;
            font-weight: 400;
            text-align: left;
          }
        }
      }
    }
    .btn {
      width: 70px;
      height: 27px;
      margin: 0 auto;
      border: 1px solid rgba(153, 153, 153, 1);
      text-align: center;
      line-height: 27px;
      margin-bottom: 20px;
    }
  }
  footer {
    width: 100%;
    height: 80px;
    background-color: white;
    margin-top: 10px;
    color: rgba(153, 153, 153, 1);
    font-size: 12px;
    font-weight: 400;
    padding-top: 25px;
    .footer_text1 {
      width: 235px;
      height: 20px;
      margin: 0 auto;
    }
    .footer_text2 {
      width: 125px;
      height: 20px;
      margin: 0 auto;
    }
  }
}
</style>
