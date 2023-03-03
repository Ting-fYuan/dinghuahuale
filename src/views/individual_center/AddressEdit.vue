<template>
  <div class="addressEdit">
    <div class="editHead">
      <com-head title="新增收货地址"></com-head>
    </div>
    <van-popup v-model="showAddress" round position="bottom">
      <van-cascader
        v-model="cascaderValue"
        title="请选择所在地区"
        :options="options"
        @close="showAddress = false"
        @finish="onFinish"
        :field-names="fieldNames"
        :active-color="'#884e22'"
      />
    </van-popup>
    <div class="editContent">
      <van-field
        class="address"
        v-model="fieldValue"
        is-link
        readonly
        label="地区"
        placeholder="请选择城市"
        @click="showAddress = true"
      />
      <van-address-edit
        show-set-default
        show-search-result
        :save-button-text="editTxt"
        tel-maxlength="11"
        :show-area="false"
        :show-delete="editType"
        :address-info="AddressInfo"
        @delete="delAddress"
        @save="onSave"
        detail-maxlength="30"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import {
  addressApi,
  deleteAddressApi,
  setDefaultApi,
  updateAddressApi,
} from "@/api/address";
import { mapState } from "vuex";
export default {
  data() {
    return {
      // 展示地址面板
      showAddress: false,
      // 城市选项列表
      options: [],
      cascaderValue: "",
      // 选中的城市(字符串)
      fieldValue: "",
      // 地址配置
      fieldNames: {
        text: "label",
        value: "id",
        children: "children",
      },
      // 地区集合
      area: [],
      // 地址编辑类型
      // false 新增地址
      // true 修改地址
      editType: false,
      // 类型
      editTxt: "新增",
      // 收货人信息初始值
      AddressInfo: {},
    };
  },
  async created() {
    // 获取所有城市
    await this.$store.dispatch("addressStore/getAllcity");
    this.options = this.cityList;
    // 查看地址编辑类型
    const { id } = this.$route.query;
    // 修改为保存类型
    if (id) {
      this.editType = true;
      this.editTxt = "保存";
      await this.$store.dispatch("addressStore/getUserAddress");
      // 寻找地址
      const res = await this.addressData?.find(
        (item) => Number(item.id) == Number(id)
      );
      // 新增初始值
      if (res) {
        this.fieldValue = res.area_name;
        this.area = res.area;
        this.AddressInfo = {
          name: res.name,
          tel: res.phone,
          addressDetail: res.desc,
          isDefault: JSON.parse(res.default_set) ? true : false,
        };
      }
    } else {
      this.editType = false; // 修改为新增类型
      this.editTxt = "新增";
    }
  },
  watch: {
    // 获取城市列表
    cityList(newValue) {
      this.options = newValue;
    },
  },
  computed: {
    // 获取城市
    ...mapState("addressStore", ["cityList"]),
    ...mapState("addressStore", ["addressData"]),
  },
  methods: {
    // 保存地址
    async onSave(e) {
      try {
        if (this.editType) {
          // 保存地址请求
          const { id } = this.$route.query;
          const { result } = await updateAddressApi(id, {
            name: e.name,
            phone: e.tel,
            area: this.area,
            area_name: this.fieldValue,
            desc: e.addressDetail,
          });
          // 设置默认地址
          if (result && e.isDefault && result.default_set != 1) {
            const res = await setDefaultApi(result.id);
            if (res) {
              await this.$store.dispatch("addressStore/getUserAddress", true);
              this.$router.back();
              Toast({
                message: "添加地址成功",
                position: "bottom",
              });
            }
            // 跳转回去
          } else if (result) {
            await this.$store.dispatch("addressStore/getUserAddress");
            this.$router.back();
            Toast({
              message: "更改地址成功",
              position: "bottom",
            });
          }
        } else {
          // 新增地址请求
          if (this.area.length) {
            const { result } = await addressApi({
              name: e.name,
              phone: e.tel,
              area: this.area,
              area_name: this.fieldValue,
              desc: e.addressDetail,
            });
            // 设置默认地址
            if (result && e.isDefault) {
              const res = await setDefaultApi(result.id);
              if (res) {
                await this.$store.dispatch("addressStore/getUserAddress", true);
                // 有redirect值就跳转回去
                if (this.$route.query.redirect) {
                  this.$router.replace({
                    path: this.$route.query.redirect,
                  });
                } else this.$router.back();
                Toast({
                  message: "添加地址成功",
                  position: "bottom",
                });
              }
              // 跳转回去
            } else if (result) {
              await this.$store.dispatch("addressStore/getUserAddress", true);
              // 有redirect值就跳转回去
              if (this.$route.query.redirect) {
                this.$router.replace({
                  path: this.$route.query.redirect,
                });
              } else this.$router.back();
              Toast({
                message: "添加地址成功",
                position: "bottom",
              });
            }
          }
        }
      } catch (err) {
        if (err.message == "参数phone格式不对或者缺失") {
          Toast({
            message: "请输入正确的手机号",
            position: "bottom",
          });
        }
      }
    },
    // 删除地址
    async delAddress() {
      const { id } = this.$route.query;
      const { msg } = await deleteAddressApi(id);
      Toast({
        message: msg,
        position: "bottom",
      });
      await this.$store.dispatch("addressStore/getUserAddress");
      this.$router.back();
    },
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      // 关闭选择地区面板
      this.showAddress = false;
      // 赋值 input 框
      this.fieldValue = selectedOptions.map((item) => item.cityname).join("");
      this.area = selectedOptions.map((item) => item.id).join(",");
    },
  },
};
</script>

<style lang="scss" scoped>
.addressEdit {
  width: 100%;
  height: 100%;
  background: #eaebef;
  .editContent {
    margin: 10px auto 0;
    width: 95%;
    height: calc(100vh - 42px);
  }
}

// 保存按钮
::v-deep .van-button--danger {
  border: none;
  background: #884e22;
}

// 下圆角
::v-deep .van-address-edit__fields {
  border-radius: 0 0 5px 5px;
}

// 表单padding
::v-deep .van-address-edit {
  padding: 0;
}

// 上圆角
::v-deep .van-cell--clickable {
  border-radius: 5px 5px 0 0;
}

// 输入框缩进
::v-deep .van-field__label {
  width: 40px;
}
</style>
