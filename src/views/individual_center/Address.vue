<!-- 地址 -->
<template>
  <div class="address">
    <div class="addressHead">
      <com-head title="收货地址"></com-head>
    </div>
    <main></main>
    <div class="addressList">
      <van-address-list
        v-model="chosenAddressId"
        :list="getAddressList"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        add-button-text="+新建地址"
        @select="changeAddressHandle"
        :switchable="!switchFlag"
      >
        <template v-slot:item-bottom></template>
      </van-address-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressView",
  data() {
    return {
      chosenAddressId: "",
      list: [],
      // 默认关闭选中地址
      switchFlag: false,
    };
  },
  watch: {},
  computed: {
    // 用户地址列表
    getAddressList() {
      return this.$store.getters["addressStore/getAddressList"];
    },
  },
  async created() {
    // 请求地址
    await this.$store.dispatch("addressStore/getAllcity").catch((err) => err);
    if (!this.$route.query.order) {
      // 开启地址选择
      this.switchFlag = true;
    } else {
      // 关闭地址选择
      this.switchFlag = false;
    }
    // 请求地址
    await this.$store.dispatch("addressStore/getUserAddress");
    // 请求默认选中
    const res = await this.getAddressList.find((item) => item.isDefault);
    if (res) this.chosenAddressId = res.id;
  },
  methods: {
    // 新增地址
    onAdd() {
      this.$router.push("/addressEdit");
    },
    // 编辑地址
    onEdit(e) {
      this.$router.push({
        path: "/addressEdit",
        query: {
          id: e.id,
        },
      });
    },
    // 选中地址
    changeAddressHandle(newData) {
      this.$store.commit("fillOrderStore/changeAddress", newData);
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
.address {
  width: 100%;
  min-height: 100vh;
  background: #eaebef;
  .addressList {
    width: 100%;
  }
}
// 新增地址按钮
::v-deep .van-button--danger {
  border: none;
  background: #884e22;
}
// 选中icon样式
::v-deep .van-radio__icon {
  display: none;
  // font-size: 16px !important;
}
// ::v-deep .van-address-item .van-radio__icon--checked .van-icon {
//   background-color: #884e22;
//   border-color: #884e22;
// }
// 默认图标样式
.van-tag--danger {
  background-color: #884e22;
}

#manage {
  font-size: 14px;
  color: #884e22;
}
</style>
