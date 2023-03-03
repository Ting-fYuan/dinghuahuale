<!-- 搜索 -->
<template>
  <div class="search">
    <div class="searchHead">
      <van-search
        v-model="value"
        placeholder="爱情鲜花"
        show-action
        action-text="搜索"
        shape="round"
      >
        <template>
          <i
            class="iconfont icon-yiliaohangyedeICON- backIcon"
            slot="left"
            @click="goback"
          ></i>
          <i class="iconfont icon-icon_sousuo MirrorIcon" slot="left-icon"></i>
        </template>
        <template #action>
          <div @click="Search" class="SearchButton">搜索</div>
        </template>
      </van-search>
    </div>
    <!-- 历史记录 -->
    <div class="searchHistory">
      <div class="history">
        <span class="historyTitle">历史记录</span>
        <i class="iconfont icon-iconfontshanchu delIcon" @click="delAll"></i>
      </div>
      <div class="noHistory" v-if="history == ''">
        <van-empty
          image="search"
          image-size="160"
          style="margin-top: -80px"
          description="暂无搜索记录~"
        />
      </div>
      <div
        class="historyText"
        v-else
        @click="handleClick"
        v-show="isHitoryEmpty"
      >
        <span
          class="historySpan"
          v-for="(item, index) in history"
          :data-value="item"
          :key="index"
          >{{ item }}
        </span>
      </div>
    </div>
    <van-divider
      :dashed="true"
      :style="{ color: '#1989fa', borderColor: 'rgb(136, 78, 34)' }"
    />
    <!-- 热搜 -->
    <div class="hotSearch">
      <div class="hot">热门搜索</div>
      <div class="like-more-main">
        <div class="commodity" v-for="item in hotSearch" :key="item.id">
          <img
            :src="item.s_goods_photos[0].path"
            :alt="item.name"
            @click="goSearch(item.name)"
          />
          <div class="ctn-bottom" @click="handleClick">
            <p class="goods-name" :data-value="item.name">{{ item.name }}</p>
            <div class="ctn-bottom-box">
              <p class="price">￥{{ item.price }}</p>
              <p class="sale">
                销量{{ item.sold_num >= 1000 ? "999+" : item.sold_num }}笔
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { hotSearch } from "@/api/search/index";
// import { Toast } from "vant";
export default {
  name: "SearchView",
  data() {
    return {
      value: "",
      history: [],
      hotSearch: [],
    };
  },
  async created() {
    this.loadHistory();
    let res = await hotSearch(); //获取热搜
    this.hotSearch = res.result;
  },
  computed: {
    //控制是否显示历史记录，大于0则显示
    isHitoryEmpty() {
      return this.history;
    },
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    async Search() {
      try {
        if (this.value === "") return false;
        // 添加到历史记录
        this.history.unshift(this.value);
        let historySet = new Set(this.history);
        this.history = Array.from(historySet); //历史记录去重
        const maxHistoryLength = 8; //限制历史搜索数量
        if (this.history.length > maxHistoryLength) {
          this.history.splice(
            maxHistoryLength - 1,
            this.history.length - maxHistoryLength
          );
        }
        localStorage.setItem("searchHistory", JSON.stringify(this.history));
        this.$router.push({
          path: "/searchresult",
          query: {
            keyword: this.value,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    loadHistory() {
      const history = localStorage.getItem("searchHistory");
      if (history) {
        this.history = JSON.parse(history);
      }
    },
    // 点击图片进行搜索
    goSearch(e) {
      this.value = e;
      this.Search(this.value);
    },
    // 点击下面文字进行搜索
    handleClick(event) {
      const childDiv = event.target;
      if (
        childDiv.classList.contains("goods-name") ||
        childDiv.classList.contains("historySpan")
      ) {
        this.value = childDiv.dataset.value;
        this.Search(this.value);
      }
    },
    // 点击垃圾桶移除全部历史记录
    delAll() {
      localStorage.removeItem("searchHistory");
      this.history = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  padding: 50px 0;
  width: 100%;
  height: 100vh;
  background: #fff;

  .searchHead {
    position: fixed;
    top: 0;
    width: 100%;
    border-bottom: 0.5px solid gray;
    .backIcon {
      margin-left: -4px;
      margin-right: 8px;
      font-size: 18px;
      color: #888;
    }

    .MirrorIcon {
      font-size: 24px;
      color: #888;
    }
  }
  .SearchButton {
    width: 54px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    color: white;
    box-shadow: 3px 2px 12px rgba(136, 78, 34, 0.6);
    background-color: rgb(136, 78, 34);
  }
  // 历史记录
  .searchHistory {
    width: 100%;
    height: 200px;
    .history {
      padding: 16px 10px 10px 10px;
      display: flex;
      justify-content: space-between;
      > .historyTitle {
        font-size: 15px;
        color: rgb(136, 78, 34);
        font-weight: 600;
      }
      .delIcon {
        font-size: 22px;
        color: #444;
      }
    }

    .noHistory {
      width: 100%;
      height: 120px;
      text-align: center;
    }
    .historyText {
      display: flex;
      padding: 0 15px;
      flex-wrap: wrap;
      .historySpan {
        margin: 3px 8px;
        padding: 5px 10px;
        height: 21px;
        font-size: 14px;
        border-radius: 2px;
        text-align: center;
        line-height: 21px;
        background: rgba(142, 142, 142, 0.1);
        // flex-basis: calc(50% - 20px);
        border-radius: 5px;
      }
    }
  }
  // 热搜
  .hotSearch {
    .hot {
      font-size: 16px;
      color: rgb(136, 78, 34);
      font-weight: 600;
      padding-left: 10px;
      padding-top: 8px;
    }
    .like-more-main {
      display: flex;
      margin-top: 15px;
      padding-bottom: 20;
      justify-content: space-around;
      flex-wrap: wrap;

      .commodity {
        margin-bottom: 10px;
        width: 165px;
        box-shadow: 0 5px 10px 0 #dee2e5;
        border-radius: 0 0 5px 5px;

        img {
          width: 100%;
          height: 165px;
        }
        .ctn-bottom {
          padding: 6px 8px;
          display: flex;
          flex-direction: column;
          .goods-name {
            margin-bottom: 20px;
            font-size: 16px;
            color: #333333;
          }
          .ctn-bottom-box {
            display: flex;
            justify-content: space-between;
            .price {
              font-size: 16px;
              color: #ff734c;
              font-weight: 600;
            }
            .sale {
              font-size: 12px;
              color: #999999;
            }
          }
        }
      }
    }
  }
}

// ::v-deep .van-search__action {
//   background: #ff734c;
//   color: #ffffff;
//   border-radius: 50%;
// }
//历史记录为空时vant的样式
::v-deep .van-empty {
  height: 200px;
}

::v-deep .van-search {
  height: 50px;
}
</style>
