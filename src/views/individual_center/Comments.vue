<template>
  <div class="comments">
    <div class="commentHead">
      <com-head title="用户评价" menu="true"></com-head>
    </div>
    <div class="content">
      <p>
        最近已有<span>{{ commentNum }}</span
        >人评价
      </p>
    </div>
    <div
      class="appraisalmain"
      v-for="(item, index) in commentArr"
      :key="index"
      @scroll="onScroll()"
    >
      <div class="appraisTop">
        <img src="@/assets/images/morenTou.png.webp" alt="图片" />
        <p>1{{ item.phoneNumFront }}****{{ item.phoneNumBehind }}</p>
      </div>
      <div class="appraisBottom">
        <p>{{ item.comment }}</p>
        <img :src="item.commentImgs[index]" alt="图片" />
      </div>
    </div>
  </div>
</template>

<script>
import { generateComment } from "@/utils/comment";
export default {
  name: "CommentsView",
  data() {
    return {
      commentNum: "",
      // 评论数组[]
      commentArr: [],
      phoneNum: "",
    };
  },
  created() {
    let randomNumber = Math.floor(Math.random() * 10000);
    this.phoneNum = randomNumber.toString().padStart(4, "0");

    this.commentNum = localStorage.getItem("commentNum");

    // 评论生成
    for (let i = 0; i < this.commentNum; i++) {
      this.commentArr.push(generateComment());
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.comments {
  .content {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #e4e4e4;
    padding-left: 5px;
    font-size: 14px;

    p {
      line-height: 50px;
      letter-spacing: 2px;
      span {
        color: #f60;
      }
    }
  }

  .appraisalmain {
    padding-top: 20px;
    padding-bottom: 10px;
    border-bottom: 1px dotted #884e22;
    .appraisTop {
      box-sizing: border-box;
      padding-top: 5px;
      display: flex;
      position: relative;
      flex-direction: row;
      align-items: center;
      padding-left: 5px;
      img {
        width: 20px;
      }
      p {
        width: 85px;
        height: 17px;
        opacity: 1;
        padding-left: 10px;
        color: #777;
        font-size: 15px;
        font-weight: 400;
        font-family: "Tahoma";
      }
    }
    .appraisBottom {
      box-sizing: border-box;
      padding-left: 6px;
      p {
        padding-top: 10px;
        font-size: 14px;
        font-family: "Microsoft YaHei", "宋体", Tahoma, Arial, sans-serif;
        color: #555;
      }
      img {
        padding-top: 17px;
        width: 55px;
      }
    }
  }
}
</style>
