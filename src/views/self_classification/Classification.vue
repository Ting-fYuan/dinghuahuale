<!-- 子分类 -->
<template>
  <div class="SearchPages">
    <com-head :title="this.$route.query.name" menu="true"> </com-head>
    <div :class="topShow" @click="SetTop">
      <i class="iconfont icon-zhiding"></i>
    </div>
    <van-tabs
      v-model="active"
      @click="getSortData"
      @scroll="ControllerTopSetting"
      color="#894E22"
      :sticky="true"
      :animated="true"
      :swipeable="true"
      :lazy-render="true"
      title-active-color="#894E22"
      title-inactive-color="#888"
    >
      <!-- 综合区间 -->
      <van-tab title="综合" name="综合">
        <template slot="title">
          <div class="vanTitle">
            <p>
              <i class="iconfont icon-huacai"></i>
            </p>
            <i>综合</i>
          </div>
        </template>
        <div class="ContentBox" v-show="emptyState">
          <div
            v-for="goodsInfo of ClassifyGoodsList"
            :key="goodsInfo.id"
            @click="goDetailPage(goodsInfo.id)"
          >
            <van-image :src="goodsInfo['s_goods_photos'][0].path" lazy-load>
              <template v-slot:err>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
            <van-skeleton :row="3" :loading="loading" />

            <div class="GoodsInfo">
              <p>{{ goodsInfo.name }}</p>
              <p>
                <span>
                  <b>￥{{ goodsInfo.sale_price }}</b>
                  <i>￥{{ goodsInfo.price }}</i>
                </span>

                <span
                  >销量{{
                    goodsInfo.sold_num >= 1000 ? "999+" : goodsInfo.sold_num
                  }}</span
                >
              </p>
            </div>
          </div>
        </div>

        <van-empty
          v-show="!emptyState"
          class="custom-image"
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="没有相关商品"
        />
      </van-tab>

      <!-- 销量区间 -->
      <van-tab title="销量" name="销量">
        <template slot="title">
          <div class="vanTitle">
            <i>销量</i>
            <p>
              <i
                class="iconfont icon-shangjiantou"
                :class="saleNumberArrowUp"
              ></i>
              <i
                class="iconfont icon-xiajiantou"
                :class="saleNumberArrowDown"
              ></i>
            </p>
          </div>
        </template>
        <div class="ContentBox" v-show="emptyState">
          <div
            v-for="goodsInfo of SaleClassifyGoodsList"
            :key="goodsInfo.id"
            @click="goDetailPage(goodsInfo.id)"
          >
            <van-image :src="goodsInfo['s_goods_photos'][0].path" lazy-load>
              <template v-slot:err>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>

            <div class="GoodsInfo">
              <p>{{ goodsInfo.name }}</p>
              <p>
                <span>
                  <b>￥{{ goodsInfo.sale_price }}</b>
                  <i>￥{{ goodsInfo.price }}</i>
                </span>
                <span
                  >销量{{
                    goodsInfo.sold_num >= 1000 ? "999+" : goodsInfo.sold_num
                  }}</span
                >
              </p>
            </div>
          </div>
        </div>
        <van-empty
          v-show="!emptyState"
          class="custom-image"
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="没有相关商品"
        />
      </van-tab>

      <!-- 价格区间 -->
      <van-tab title="价格" name="价格">
        <template slot="title">
          <div class="vanTitle">
            <i>价格</i>
            <p>
              <i
                class="iconfont icon-shangjiantou"
                :class="salePriceArrowUp"
              ></i>
              <i
                class="iconfont icon-xiajiantou"
                :class="salePriceArrowDown"
              ></i>
            </p>
          </div>
        </template>
        <div class="ContentBox" v-show="emptyState">
          <div
            v-for="goodsInfo of PriceClassifyGoodsList"
            :key="goodsInfo.id"
            @click="goDetailPage(goodsInfo.id)"
          >
            <van-image :src="goodsInfo['s_goods_photos'][0].path" lazy-load>
              <template v-slot:err>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
            <div class="GoodsInfo">
              <p>{{ goodsInfo.name }}</p>
              <p>
                <span>
                  <b>￥{{ goodsInfo.sale_price }}</b>
                  <i>￥{{ goodsInfo.price }}</i>
                </span>
                <span
                  >销量{{
                    goodsInfo.sold_num >= 1000 ? "999+" : goodsInfo.sold_num
                  }}</span
                >
              </p>
            </div>
          </div>
        </div>
        <van-empty
          v-show="!emptyState"
          class="custom-image"
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="没有相关商品"
        />
      </van-tab>

      <!-- 筛选区间 -->
      <van-tab title="筛选" name="筛选">
        <template slot="title">
          <div class="vanTitle">
            <p>
              <i class="iconfont icon-shaixuanguolv"></i>
            </p>
            <i>筛选</i>
          </div>
        </template>
        <div class="ContentBox">
          <ul>
            <li v-for="parentClass of ClassifyNamesList" :key="parentClass.id">
              <h4>{{ parentClass.name }}</h4>
              <div class="labelName">
                <span
                  v-for="childrenClass of parentClass.children"
                  :key="childrenClass.id"
                  @click="goClassifyPage(childrenClass)"
                  >{{ childrenClass.name }}</span
                >
              </div>
            </li>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { SearchDetails } from "@/api/search";
import { indexImg } from "@/api/indexImg";
import debounce from "lodash/debounce";

export default {
  name: "ClassificationView",
  data() {
    return {
      active: "综合",
      show: false,
      loading: true, // 控制骨架屏的显示
      actions: [{ name: "选项一" }, { name: "选项二" }, { name: "选项三" }],
      ClassifyGoodsList: [],
      SaleClassifyGoodsList: [],
      PriceClassifyGoodsList: [],
      ClassifyNamesList: [],
      topShow: "backTop backTopHidden", // 控制显示与隐藏置顶按钮
      // @ 控制升序和降序
      saleNumberSort: true, //销量
      salePriceSort: true, //价格
      // @控制升序和降序的样式
      saleNumberArrowUp: "unactiveStyle", //销量上箭头
      saleNumberArrowDown: "unactiveStyle", //销量下箭头

      salePriceArrowUp: "unactiveStyle", //价格上箭头
      salePriceArrowDown: "unactiveStyle", //价格下箭头

      emptyState: true, //空状态的时候展示空内容提示
    };
  },
  mounted() {
    // todo:首次进入页面的数据渲染
    this.getClassifyGoods();
    console.log(this.$route.query.name, this.$route.query.id);
  },

  methods: {
    // todo:请求子类下的商品(节流)
    getClassifyGoods: debounce(async function () {
      try {
        let SearchRes = await SearchDetails(this.$route.query.id);
        // todo:判断类别下面是否拥"有数据"，有存数据，没有展示空
        if (SearchRes.result.length != 0) {
          this.ClassifyGoodsList = JSON.parse(JSON.stringify(SearchRes.result));
          this.SaleClassifyGoodsList = JSON.parse(
            JSON.stringify(SearchRes.result)
          );
          this.PriceClassifyGoodsList = JSON.parse(
            JSON.stringify(SearchRes.result)
          );
          this.emptyState = true;
          this.loading = false;
          // console.log("有数据", SearchRes.result);
        } else {
          this.emptyState = false;
          console.log("无数据", SearchRes.result);
        }
      } catch (error) {
        console.log(error);
      }
    }, 500),

    // todo:获取到所有的商品分类
    async getAllClassify() {
      try {
        let AllClassify = await indexImg();
        this.ClassifyNamesList = AllClassify.result.slice(0, -1);
        // console.log("获取所有的数据", AllClassify);
      } catch (error) {
        console.log(error);
      }
    },

    // todo:获取销量数据
    getSortData(title) {
      switch (title) {
        case "综合":
          this.saleNumberSort = true; // @初始化图标样式
          this.salePriceSort = true;
          this.ClearStyle();
          this.getClassifyGoods(); //@更新数据
          // console.log("综合");
          break;
        case "销量":
          this.salePriceSort = true;
          if (this.saleNumberSort) {
            this.SaleClassifyGoodsList = this.SaleClassifyGoodsList.sort(
              (a, b) => {
                return b.sold_num - a.sold_num;
              }
            );
            this.ClearStyle();
            this.saleNumberArrowUp = "activeStyle";
            this.saleNumberArrowDown = "unactiveStyle";
            this.saleNumberSort = !this.saleNumberSort;
            // console.log("销量升序", this.ClassifyGoodsList);
          } else {
            this.SaleClassifyGoodsList = this.SaleClassifyGoodsList.sort(
              (a, b) => {
                return a.sold_num - b.sold_num;
              }
            );
            this.ClearStyle();
            this.saleNumberArrowUp = "unactiveStyle";
            this.saleNumberArrowDown = "activeStyle";
            this.saleNumberSort = !this.saleNumberSort;
            // console.log("销量降序", this.ClassifyGoodsList);
          }
          break;

        case "价格":
          this.saleNumberSort = true;
          if (this.salePriceSort) {
            this.PriceClassifyGoodsList = this.PriceClassifyGoodsList.sort(
              (a, b) => {
                return a.sale_price - b.sale_price;
              }
            );
            this.ClearStyle();
            this.salePriceArrowUp = "activeStyle";
            this.salePriceArrowDown = "unactiveStyle";
            this.salePriceSort = !this.salePriceSort;
            // console.log("升序价格", this.ClassifyGoodsList);
          } else {
            this.PriceClassifyGoodsList = this.PriceClassifyGoodsList.sort(
              (a, b) => {
                return b.sale_price - a.sale_price;
              }
            );
            this.ClearStyle();
            this.salePriceArrowUp = "unactiveStyle";
            this.salePriceArrowDown = "activeStyle";
            this.salePriceSort = !this.salePriceSort;
            // console.log("降序价格", this.ClassifyGoodsList);
          }
          break;

        default:
          this.saleNumberSort = true; // @初始化图标样式
          this.salePriceSort = true;
          this.ClearStyle();
          // todo:获取到样式的类型
          this.getAllClassify();
          break;
      }
    },

    // todo:点击子类跳转到分类页面
    goClassifyPage(data) {
      console.log(data.name, data.id);
      this.$router.replace({
        path: "/classification",
        query: { id: data.id, name: data.name },
      });
      this.active = "综合";
      this.getClassifyGoods();
    },

    // @置空样操作
    ClearStyle() {
      this.saleNumberArrowUp = "";
      this.saleNumberArrowDown = "";

      this.salePriceArrowUp = "";
      this.salePriceArrowDown = "";
    },

    // @设置置顶操作
    SetTop() {
      scrollTo({ top: 0, behavior: "smooth" });
    },
    ControllerTopSetting() {
      if (scrollY > 400) {
        this.topShow = "backTop backTopShow";
      } else {
        this.topShow = "backTop backTopHidden";
      }
    },

    // 跳转每个商品的详情页面
    goDetailPage(data) {
      console.log(data);
      this.$router.push({ path: "/Detail", query: { id: data } });
    },
  },
};
</script>

<style lang="scss" scoped>
.SearchPages {
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
  // background-color: #eaebef;

  // @置顶
  .backTop {
    position: fixed;
    right: 30px;
    bottom: 110px;
    z-index: 999;
    i {
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      border: 2px solid #894e22;
      font-size: 20px;
      color: #894e22;
    }

    // @置顶按钮隐藏
    &.backTopHidden {
      transition: all 0.5s;
      transform: translateX(80px);
    }

    // @置顶按钮隐藏
    &.backTopShow {
      transition: all 0.5s;
      transform: translateX(0px);
    }
  }
  // @选项卡标题区域
  .vanTitle {
    display: flex;
    justify-content: space-around;
    align-items: center;
    // todo:标签
    > p {
      height: 20px;
      // background-color: pink;
      display: flex;
      flex-direction: column;
      > i {
        box-sizing: border-box;
        font-size: 16px;
        &.icon-shangjiantou {
          display: inline-block;
          box-sizing: border-box;
          margin-top: -2px;
          height: 7px;
          font-size: 10px;
          // background-color: skyblue;
        }
        &.icon-xiajiantou {
          font-size: 10px;
          // color: #888;
        }
        // 激活下箭头的样式
        &.activeStyle {
          color: rgb(66, 31, 5);
        }
        &.unactiveStyle {
          color: rgba(136, 136, 136, 0.5);
        }
      }
    }
    // todo:文字
    > i {
      margin-left: 4px;
    }
  }

  // @内容区域
  .ContentBox {
    padding: 4px 8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    > div {
      margin: 4px;
      width: 165px;
      height: 220px;
      border-radius: 0px 0px 6px 6px;
      background-color: #fff;
      // box-shadow: 1px 1px 8px #9d9d9d;
      filter: drop-shadow(2px 2px 4px rgba(157, 157, 157, 0.2));
      ::v-deep .van-image__img {
        margin: 0;
        padding: 0;
        height: 165px;
        background-color: #eeeeee;
      }

      img {
        margin: 0;
        padding: 0;
        height: 165px;
        background-color: #eeeeee;
      }
      // 信息区域
      .GoodsInfo {
        margin-top: 10px;
        padding: 0px 4px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        > p:first-of-type {
          height: 20px;
          opacity: 1;
          color: rgba(51, 51, 51, 1);
          font-size: 14px;
          font-weight: 400;
          font-family: "PingFang SC";
          text-align: left;
        }
        > p:last-of-type {
          display: flex;
          justify-content: space-between;
          > span:first-of-type {
            height: 20px;
            opacity: 1;
            color: rgba(255, 115, 76, 1);
            font-size: 14px;
            font-family: "PingFang SC";
            text-align: left;
            b {
              font-weight: 600;
            }
            i {
              margin-left: 6px;
              vertical-align: middle;
              color: rgba(153, 153, 153, 1);
              font-size: 10px;
              text-decoration: line-through;
            }
          }
          > span:last-of-type {
            display: inline-block;
            height: 17px;
            opacity: 1;
            color: rgba(153, 153, 153, 1);
            font-size: 12px;
            font-weight: 400;
            font-family: "PingFang SC";
            text-align: left;
            vertical-align: bottom;
          }
        }
      }
    }
    ul {
      display: flex;
      flex-direction: column;

      li {
        h4 {
          margin: 6px;
          font-size: 20px;
          color: #894e22;
        }
        > .labelName {
          width: 100%;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          span {
            margin: 6px;
            padding: 8px 6px;
            display: inline-block;
            color: #000;
            font-size: 16px;
            background-color: white;
          }
        }
      }
    }
  }
  // @ 内容为空的时候的样式展示
  ::v-deep .custom-image .van-empty__image {
    margin-top: 50%;
    width: 100px;
    height: 100px;
  }

  ::v-deep .van-skeleton__content {
    padding-top: 6px;
    height: 20px;
  }
}
</style>
