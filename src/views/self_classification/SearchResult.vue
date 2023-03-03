<template>
  <div class="result">
    <div class="resultHead">
      <com-head title="搜索结果" menu="true"></com-head>
    </div>
    <main>
      <div class="resultContent" v-for="item in searchRes" :key="item.id">
        <img
          :src="item?.s_goods_photos[0].path"
          :alt="item.name"
          @click="goDetail(item.id)"
        />
        <div class="ctn-bottom" @click="goDetail(item.id)">
          <p class="goods-name" :data-value="item.name">{{ item.name }}</p>
          <div class="ctn-bottom-box">
            <p class="price">￥{{ item.price }}</p>
            <p class="sale">
              销量{{ item.sold_num >= 1000 ? "999+" : item.sold_num }}笔
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { goodsSearch } from "@/api/search";
export default {
  data() {
    return {
      searchRes: [],
    };
  },
  async created() {
    try {
      // 搜索
      const { result } = await goodsSearch({ name: this.$route.query.keyword });
      this.searchRes = result.rows;
    } catch (e) {
      return e;
    }
  },
  methods: {
    goDetail(e) {
      this.$router.push({
        path: "/detail",
        query: {
          id: e,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.result {
  height: 100vh;
  background-color: #e9ebef;
  main {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    .resultContent {
      width: 170px;
      background-color: #fff;
      border-radius: 0 0 5px 5px;
      img {
        width: 100%;
        height: 165px;
      }
      .goods-name {
        margin: 15px 0 10px 10px;
        font-size: 14px;
        color: #333333;
      }
      .ctn-bottom-box {
        display: flex;
        padding: 5px;
        justify-content: space-between;
        .price {
          font-size: 14px;
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
</style>
